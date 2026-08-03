<template>
  <div class="http-debug-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>接口调试工具</h2>
      <p>快速测试和调试 HTTP 接口</p>
    </div>

    <!-- 请求配置表单 -->
    <RwForm.Template
      :control="formControl"
      @submit="handleSubmit"
      @reset="handleReset"
    />

    <!-- 响应结果区域 -->
    <el-card v-if="response || error" class="response-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>响应结果</span>
          <div v-if="response" class="response-status">
            <el-tag :type="getStatusType(response.status)" size="large">
              {{ response.status }} {{ response.statusText }}
            </el-tag>
            <span class="response-time">{{ response.duration }}ms</span>
          </div>
        </div>
      </template>

      <!-- 错误信息 -->
      <el-alert
        v-if="error"
        :title="error.title"
        :description="error.message"
        type="error"
        show-icon
        class="error-alert"
      />

      <!-- 响应内容 -->
      <el-tabs v-if="response" type="border-card">
        <el-tab-pane label="响应头" name="headers">
          <div class="response-headers">
            <div
              v-for="(value, key) in response.headers"
              :key="key"
              class="header-item"
            >
              <span class="header-name">{{ key }}:</span>
              <span class="header-value">{{ value }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="响应体" name="body">
          <pre class="response-body">{{ response.rawData }}</pre>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 历史记录 -->
    <el-card
      v-if="requestHistory.length > 0"
      class="history-card"
      shadow="hover"
    >
      <template #header>
        <div class="card-header">
          <span>请求历史</span>
          <el-button size="small" @click="clearHistory">清空历史</el-button>
        </div>
      </template>

      <div class="history-list">
        <div
          v-for="(item, index) in requestHistory"
          :key="item.id"
          class="history-item"
          @click="loadFromHistory(item)"
        >
          <div class="history-method">{{ item.method }}</div>
          <div class="history-url">{{ item.url }}</div>
          <div class="history-time">{{ formatTime(item.timestamp) }}</div>
          <div class="history-status" :class="getStatusClass(item.status)">
            {{ item.status }}
          </div>
          <el-button
            type="danger"
            size="small"
            @click.stop="deleteHistory(index)"
          >
            删除
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  ElMessage,
  ElCard,
  ElTag,
  ElAlert,
  ElTabs,
  ElTabPane,
  ElButton,
} from 'rw-vue-framework/element-plus'
import axios from 'axios'
import { RwForm } from 'rw-vue-framework/controls'
import { pageStruct } from 'rw-vue-framework/controls'

// 严格类型定义
interface ResponseData {
  readonly status: number
  readonly statusText: string
  readonly headers: Record<string, string>
  readonly data: unknown
  readonly rawData: string
  readonly duration: number
}

interface HistoryItem {
  readonly id: number
  readonly method: string
  readonly url: string
  readonly timestamp: number
  readonly status: number
  readonly statusText: string
}

interface ErrorInfo {
  readonly title: string
  readonly message: string
}

// HTTP 方法枚举
const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const
type HttpMethod = (typeof HTTP_METHODS)[number]

// 请求体类型枚举
const BODY_TYPES = ['json', 'form', 'text'] as const
type BodyType = (typeof BODY_TYPES)[number]

// 响应式数据
const loading = ref<boolean>(false)
const error = ref<ErrorInfo | null>(null)
const response = ref<ResponseData | null>(null)
const requestHistory = ref<HistoryItem[]>([])

// 常量定义
const MAX_HISTORY_SIZE = 10
const REQUEST_TIMEOUT = 30000
const MAX_RESPONSE_SIZE = 1024 * 1024 // 1MB

// 创建表单结构
const httpStruct = pageStruct.init('httpDebug','fwagwegwefwe', '', {
  fields: {
    method: { type: 'string', default: 'GET', not_null: true },
    url: { type: 'string', default: '', not_null: true },
    headers: {
      type: 'string',
      default: '{"Content-Type": "application/json"}',
    },
    params: { type: 'string', default: '{}' },
    body: { type: 'string', default: '' },
    bodyType: { type: 'string', default: 'json' },
  },
})

// 创建表单控件
const formControl = reactive(
  RwForm.init(httpStruct, {
    type: 'form',
    buttonsPosition: 'bottom',
    buttonLocation: 'center',
  }),
)

// 初始化表单
const initForm = () => {
  // 添加表单项组
  const formItems = formControl.addFormItems(httpStruct, {
    span: 24,
  })

  // 请求方法和URL
  formItems.addSelect('method', {
    label: '请求方法',
    span: 6,
    options: [
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' },
      { label: 'DELETE', value: 'DELETE' },
      { label: 'PATCH', value: 'PATCH' },
    ],
  })

  formItems.addInput('url', {
    label: '接口地址',
    span: 18,
    placeholder: '请输入接口地址，如: https://api.example.com/users',
  })

  // 请求头
  formItems.addInput('headers', {
    label: '请求头 (JSON格式)',
    span: 24,
    type: 'textarea',
    rows: 3,
    placeholder:
      '{"Content-Type": "application/json", "Authorization": "Bearer token"}',
  })

  // 查询参数（仅GET请求显示）
  formItems.addInput('params', {
    label: '查询参数 (JSON格式)',
    span: 24,
    type: 'textarea',
    rows: 2,
    placeholder: '{"page": 1, "size": 10}',
    show: computed(() => formControl.data.method === 'GET'),
  })

  // 请求体类型（仅POST/PUT/PATCH显示）
  formItems.addSelect('bodyType', {
    label: '请求体类型',
    span: 8,
    options: [
      { label: 'JSON', value: 'json' },
      { label: 'Form Data', value: 'form' },
      { label: 'Raw Text', value: 'text' },
    ],
    show: computed(() =>
      ['POST', 'PUT', 'PATCH'].includes(formControl.data.method),
    ),
  })

  // 请求体内容
  formItems.addInput('body', {
    label: '请求体内容',
    span: 24,
    type: 'textarea',
    rows: 6,
    placeholder: computed(() => {
      switch (formControl.data.bodyType) {
        case 'json':
          return '{"name": "张三", "age": 25}'
        case 'form':
          return '{"field1": "value1", "field2": "value2"}'
        default:
          return '请输入请求体内容'
      }
    }),
    show: computed(() =>
      ['POST', 'PUT', 'PATCH'].includes(formControl.data.method),
    ),
  })

  // 修改提交按钮
  formControl.changeButton('submit', {
    label: '发送请求',
  })
}

// 输入验证函数
const validateInput = (formData: any): string | null => {
  if (!formData.url?.trim()) {
    return '请输入接口地址'
  }

  // URL 格式验证
  try {
    const url = new URL(formData.url.trim())
    if (!['http:', 'https:'].includes(url.protocol)) {
      return '仅支持 HTTP 和 HTTPS 协议'
    }
  } catch {
    return '请输入有效的URL地址'
  }

  // 验证 HTTP 方法
  if (!HTTP_METHODS.includes(formData.method as HttpMethod)) {
    return '无效的HTTP方法'
  }

  return null
}

// JSON 验证函数
const validateJSON = (jsonString: string, fieldName: string): any => {
  if (!jsonString.trim()) {
    return {}
  }

  try {
    return JSON.parse(jsonString)
  } catch (parseError) {
    throw new Error(
      `${fieldName} JSON 格式错误: ${parseError instanceof Error ? parseError.message : '未知错误'}`,
    )
  }
}

// 表单提交处理
const handleSubmit = async (): Promise<void> => {
  const formData = formControl.data

  // 输入验证
  const validationError = validateInput(formData)
  if (validationError) {
    ElMessage.error(validationError)
    return
  }

  loading.value = true
  error.value = null
  response.value = null

  const startTime = Date.now()

  try {
    // 构建请求配置
    const config: Record<string, any> = {
      method: formData.method.toLowerCase(),
      url: formData.url.trim(),
      headers: {},
      timeout: REQUEST_TIMEOUT,
      maxContentLength: MAX_RESPONSE_SIZE,
      maxBodyLength: MAX_RESPONSE_SIZE,
    }

    // 解析请求头
    if (formData.headers?.trim()) {
      config.headers = validateJSON(formData.headers, '请求头')
    }

    // 添加查询参数
    if (formData.method === 'GET' && formData.params?.trim()) {
      config.params = validateJSON(formData.params, '查询参数')
    }

    // 添加请求体
    if (
      ['POST', 'PUT', 'PATCH'].includes(formData.method) &&
      formData.body?.trim()
    ) {
      const bodyType = formData.bodyType as BodyType

      switch (bodyType) {
        case 'json':
          config.data = validateJSON(formData.body, '请求体')
          break

        case 'form':
          const formDataObj = validateJSON(formData.body, 'Form Data')
          const formDataInstance = new FormData()

          // 验证并添加表单字段
          Object.entries(formDataObj).forEach(([key, value]) => {
            if (typeof key === 'string' && value != null) {
              formDataInstance.append(key, String(value))
            }
          })

          config.data = formDataInstance
          // 删除 Content-Type，让浏览器自动设置 boundary
          delete config.headers['Content-Type']
          break

        case 'text':
        default:
          config.data = formData.body
          break
      }
    }

    // 发送请求
    const res = await axios(config)
    const endTime = Date.now()

    // 处理响应
    response.value = {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers as Record<string, string>,
      data: res.data,
      rawData: JSON.stringify(res.data, null, 2),
      duration: endTime - startTime,
    }

    // 添加到历史记录
    const historyItem: HistoryItem = {
      id: Date.now(),
      method: formData.method,
      url: formData.url,
      timestamp: Date.now(),
      status: res.status,
      statusText: res.statusText,
    }

    requestHistory.value.unshift(historyItem)

    // 限制历史记录数量
    if (requestHistory.value.length > MAX_HISTORY_SIZE) {
      requestHistory.value = requestHistory.value.slice(0, MAX_HISTORY_SIZE)
    }

    ElMessage.success('请求成功')
  } catch (err: any) {
    const endTime = Date.now()

    if (err.response) {
      // 服务器响应了错误状态码
      response.value = {
        status: err.response.status,
        statusText: err.response.statusText,
        headers: err.response.headers as Record<string, string>,
        data: err.response.data,
        rawData: JSON.stringify(err.response.data, null, 2),
        duration: endTime - startTime,
      }

      const historyItem: HistoryItem = {
        id: Date.now(),
        method: formData.method,
        url: formData.url,
        timestamp: Date.now(),
        status: err.response.status,
        statusText: err.response.statusText,
      }

      requestHistory.value.unshift(historyItem)
    } else {
      // 网络错误或其他错误
      error.value = {
        title: '请求失败',
        message: err.message || '网络错误，请检查网络连接或接口地址',
      }
    }
  } finally {
    loading.value = false
  }
}

// 表单重置处理
const handleReset = () => {
  error.value = null
  response.value = null
  ElMessage.success('表单已重置')
}

// 历史记录操作
const loadFromHistory = (item: HistoryItem) => {
  formControl.data.method = item.method
  formControl.data.url = item.url
  ElMessage.success('已加载历史请求配置')
}

const deleteHistory = (index: number) => {
  requestHistory.value.splice(index, 1)
  ElMessage.success('已删除历史记录')
}

const clearHistory = () => {
  requestHistory.value = []
  ElMessage.success('历史记录已清空')
}

// 工具函数
const getStatusType = (status: number) => {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 300 && status < 400) return 'warning'
  if (status >= 400) return 'danger'
  return 'info'
}

const getStatusClass = (status: number) => {
  if (status >= 200 && status < 300) return 'status-success'
  if (status >= 300 && status < 400) return 'status-warning'
  if (status >= 400) return 'status-error'
  return 'status-info'
}

const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleString()
}

// 初始化表单
initForm()
</script>

<style lang="scss" scoped>
.http-debug-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .page-header {
    margin-bottom: 24px;
    text-align: center;

    h2 {
      margin: 0 0 8px 0;
      color: #303133;
      font-size: 28px;
      font-weight: 600;
    }

    p {
      margin: 0;
      color: #606266;
      font-size: 14px;
    }
  }

  .response-card,
  .history-card {
    margin-top: 20px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;

      .response-status {
        display: flex;
        align-items: center;
        gap: 12px;

        .response-time {
          color: #909399;
          font-size: 14px;
        }
      }
    }

    .error-alert {
      margin-bottom: 16px;
    }

    .response-headers {
      background: #f5f7fa;
      padding: 12px;
      border-radius: 4px;
      max-height: 300px;
      overflow-y: auto;

      .header-item {
        display: flex;
        margin-bottom: 4px;
        font-size: 14px;

        .header-name {
          font-weight: 600;
          color: #606266;
          min-width: 150px;
        }

        .header-value {
          color: #303133;
          word-break: break-all;
        }
      }
    }

    .response-body {
      background: #f5f7fa;
      padding: 16px;
      border-radius: 4px;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.5;
      max-height: 400px;
      overflow: auto;
      white-space: pre-wrap;
      word-break: break-all;
      color: #303133;
    }
  }

  .history-list {
    .history-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #f5f7fa;
        border-color: #409eff;
      }

      .history-method {
        width: 80px;
        font-weight: 600;
        color: #409eff;
      }

      .history-url {
        flex: 1;
        color: #303133;
        margin: 0 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .history-time {
        width: 150px;
        color: #909399;
        font-size: 12px;
      }

      .history-status {
        width: 60px;
        text-align: center;
        font-weight: 600;
        margin-right: 12px;

        &.status-success {
          color: #67c23a;
        }

        &.status-warning {
          color: #e6a23c;
        }

        &.status-error {
          color: #f56c6c;
        }

        &.status-info {
          color: #909399;
        }
      }
    }
  }
}


@media (max-width: 768px) {
  .http-debug-page {
    padding: 12px;
  }

  .card-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start !important;
  }

  .history-item {
    flex-direction: column;
    align-items: flex-start !important;

    .history-method,
    .history-url,
    .history-time,
    .history-status {
      width: 100% !important;
      margin: 2px 0 !important;
    }
  }
}
</style>
