<template>
  <div class="checkbox-examples">
    <h1>RwCheckbox 组件示例</h1>

    <!-- 单个复选框示例 -->
    <section class="example-section">
      <h2>1. 单个复选框</h2>

      <div class="example-item">
        <h3>基础用法</h3>
        <RwCheckbox.Template
          :control="singleCheckbox"
          v-model="singleValue"
        />
        <p>当前值:{{ singleValue }}</p>
      </div>

      <div class="example-item">
        <h3>带边框的复选框</h3>
        <RwCheckbox.Template
          :control="borderCheckbox"
          v-model="borderValue"
        />
        <p>当前值: {{ borderValue }}</p>
      </div>

      <div class="example-item">
        <h3>禁用状态</h3>
        <RwCheckbox.Template
          :control="disabledCheckbox"
          v-model="disabledValue"
        />
        <p>当前值: {{ disabledValue }}</p>
      </div>
    </section>

    <!-- 复选框组示例 -->
    <section class="example-section">
      <h2>2. 复选框组</h2>

      <div class="example-item">
        <h3>基础复选框组</h3>
        <RwCheckbox.Template
          :control="basicGroup"
          v-model="basicGroupValue"
        />
        <p>当前值: {{ JSON.stringify(basicGroupValue) }}</p>
      </div>

      <div class="example-item">
        <h3>带全选功能的复选框组</h3>
        <RwCheckbox.Template
          :control="checkAllGroup"
          v-model="checkAllGroupValue"
        />
        <p>当前值: {{ JSON.stringify(checkAllGroupValue) }}</p>
      </div>

      <div class="example-item">
        <h3>垂直排列的复选框组</h3>
        <RwCheckbox.Template
          :control="verticalGroup"
          v-model="verticalGroupValue"
        />
        <p>当前值: {{ JSON.stringify(verticalGroupValue) }}</p>
      </div>

      <div class="example-item">
        <h3>带边框的复选框组</h3>
        <RwCheckbox.Template
          :control="borderGroup"
          v-model="borderGroupValue"
        />
        <p>当前值: {{ JSON.stringify(borderGroupValue) }}</p>
      </div>

      <div class="example-item">
        <h3>限制选择数量的复选框组</h3>
        <RwCheckbox.Template
          :control="limitGroup"
          v-model="limitGroupValue"
        />
        <p>当前值: {{ JSON.stringify(limitGroupValue) }} (最少1个，最多3个)</p>
      </div>
    </section>

    <!-- 复选框按钮示例 -->
    <section class="example-section">
      <h2>3. 复选框按钮</h2>

      <div class="example-item">
        <h3>基础按钮组</h3>
        <RwCheckbox.Template
          :control="basicButtons"
          v-model="basicButtonsValue"
        />
        <p>当前值: {{ JSON.stringify(basicButtonsValue) }}</p>
      </div>

      <div class="example-item">
        <h3>不同尺寸的按钮组</h3>
        <div class="size-examples">
          <div>
            <label>Large:</label>
            <RwCheckbox.Template
              :control="largeButtons"
              v-model="largeButtonsValue"
            />
          </div>
          <div>
            <label>Default:</label>
            <RwCheckbox.Template
              :control="defaultButtons"
              v-model="defaultButtonsValue"
            />
          </div>
          <div>
            <label>Small:</label>
            <RwCheckbox.Template
              :control="smallButtons"
              v-model="smallButtonsValue"
            />
          </div>
        </div>
      </div>

      <div class="example-item">
        <h3>自定义颜色的按钮组</h3>
        <RwCheckbox.Template
          :control="colorButtons"
          v-model="colorButtonsValue"
        />
        <p>当前值: {{ JSON.stringify(colorButtonsValue) }}</p>
      </div>
    </section>

    <!-- 远程数据示例 -->
    <section class="example-section">
      <h2>4. 远程数据加载</h2>

      <div class="example-item">
        <h3>模拟远程数据加载</h3>
        <RwCheckbox.Template
          :control="remoteGroup"
          v-model="remoteGroupValue"
        />
        <p>当前值: {{ JSON.stringify(remoteGroupValue) }}</p>
        <button @click="refreshRemoteData">刷新数据</button>
      </div>
    </section>

    <!-- 自定义内容示例 -->
    <section class="example-section">
      <h2>5. 自定义选项内容</h2>

      <div class="example-item">
        <h3>带图标的选项</h3>
        <RwCheckbox.Template
          :control="iconGroup"
          v-model="iconGroupValue"
        >
          <template #option="{ option }">
            <div class="custom-option">
              <span class="option-icon">{{ option.icon }}</span>
              <span class="option-label">{{ option.label }}</span>
              <span class="option-desc">{{ option.description }}</span>
            </div>
          </template>
        </RwCheckbox.Template>
        <p>当前值: {{ JSON.stringify(iconGroupValue) }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RwCheckbox } from 'rw-vue-framework/controls'

// 单个复选框示例
const singleCheckbox = RwCheckbox.init('example', 'agree', {
  multiple: false,
  label: '我同意用户协议',
})
const singleValue = ref(false)

const borderCheckbox = RwCheckbox.init('example', 'newsletter', {
  multiple: false,
  label: '订阅邮件通知',
  border: true,
  size: 'default',
})
const borderValue = ref(true)

const disabledCheckbox = RwCheckbox.init('example', 'disabled', {
  multiple: false,
  label: '禁用的复选框',
  disabled: true,
})
const disabledValue = ref(false)

// 复选框组示例
const basicGroup = RwCheckbox.init('example', 'hobbies', {
  multiple: true,
  checkBoxType: 'default',
  direction: 'horizontal',
  gap: 16,
  options: [
    { label: '读书', value: 'reading' },
    { label: '音乐', value: 'music' },
    { label: '运动', value: 'sports' },
    { label: '旅行', value: 'travel' },
  ],
})
const basicGroupValue = ref(['reading', 'music'])

const checkAllGroup = RwCheckbox.init('example', 'skills', {
  multiple: true,
  checkBoxType: 'default',
  checkAll: true,
  checkAllText: '全选技能',
  direction: 'horizontal',
  gap: 12,
  options: [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'node', disabled: true },
  ],
})
const checkAllGroupValue = ref(['js', 'vue'])

const verticalGroup = RwCheckbox.init('example', 'permissions', {
  multiple: true,
  checkBoxType: 'default',
  direction: 'vertical',
  gap: 8,
  options: [
    { label: '查看权限', value: 'view' },
    { label: '编辑权限', value: 'edit' },
    { label: '删除权限', value: 'delete' },
    { label: '管理权限', value: 'admin' },
  ],
})
const verticalGroupValue = ref(['view', 'edit'])

const borderGroup = RwCheckbox.init('example', 'categories', {
  multiple: true,
  checkBoxType: 'default',
  border: true,
  direction: 'horizontal',
  gap: 12,
  options: [
    { label: '前端', value: 'frontend' },
    { label: '后端', value: 'backend' },
    { label: '移动端', value: 'mobile' },
    { label: '运维', value: 'devops' },
  ],
})
const borderGroupValue = ref(['frontend'])

const limitGroup = RwCheckbox.init('example', 'priorities', {
  multiple: true,
  checkBoxType: 'default',
  min: 1,
  max: 3,
  direction: 'horizontal',
  gap: 16,
  options: [
    { label: '高优先级', value: 'high' },
    { label: '中优先级', value: 'medium' },
    { label: '低优先级', value: 'low' },
    { label: '紧急', value: 'urgent' },
    { label: '延期', value: 'delayed' },
  ],
})
const limitGroupValue = ref(['high', 'medium'])

// 复选框按钮示例
const basicButtons = RwCheckbox.init('example', 'frameworks', {
  multiple: true,
  checkBoxType: 'button',
  direction: 'horizontal',
  gap: 8,
  options: [
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
})
const basicButtonsValue = ref(['vue', 'react'])

const largeButtons = RwCheckbox.init('example', 'large', {
  multiple: true,
  checkBoxType: 'button',
  size: 'large',
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
})
const largeButtonsValue = ref(['1'])

const defaultButtons = RwCheckbox.init('example', 'default', {
  multiple: true,
  checkBoxType: 'button',
  size: 'default',
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
})
const defaultButtonsValue = ref(['2'])

const smallButtons = RwCheckbox.init('example', 'small', {
  multiple: true,
  checkBoxType: 'button',
  size: 'small',
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
})
const smallButtonsValue = ref(['3'])

const colorButtons = RwCheckbox.init('example', 'colors', {
  multiple: true,
  checkBoxType: 'button',
  fill: '#ff6b6b',
  textColor: '#ffffff',
  options: [
    { label: '红色', value: 'red' },
    { label: '绿色', value: 'green' },
    { label: '蓝色', value: 'blue' },
    { label: '黄色', value: 'yellow' },
  ],
})
const colorButtonsValue = ref(['red', 'blue'])

// 远程数据示例
const remoteGroup = RwCheckbox.init('example', 'remote', {
  multiple: true,
  checkBoxType: 'default',
  url: '/api/mock/options', // 模拟接口
  checkAll: true,
  checkAllText: '全选',
  direction: 'horizontal',
})
const remoteGroupValue = ref([])

// 自定义内容示例
const iconGroup = RwCheckbox.init('example', 'platforms', {
  multiple: true,
  checkBoxType: 'default',
  direction: 'vertical',
  gap: 12,
  options: [
    {
      label: 'GitHub',
      value: 'github',
      icon: '🐙',
      description: '代码托管平台',
    },
    {
      label: 'GitLab',
      value: 'gitlab',
      icon: '🦊',
      description: 'DevOps 平台',
    },
    {
      label: 'Bitbucket',
      value: 'bitbucket',
      icon: '🪣',
      description: 'Atlassian 代码管理',
    },
  ],
})
const iconGroupValue = ref(['github'])

// 模拟刷新远程数据
const refreshRemoteData = () => {
  // 这里可以触发重新加载
  console.log('刷新远程数据')
}

onMounted(() => {
  // 模拟远程数据加载
  setTimeout(() => {
    remoteGroup.options = [
      { label: '选项 1', value: 'option1' },
      { label: '选项 2', value: 'option2' },
      { label: '选项 3', value: 'option3', disabled: true },
      { label: '选项 4', value: 'option4' },
    ]
  }, 1000)
})
</script>

<style scoped>
.checkbox-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
}

.example-section h2 {
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.example-item {
  margin-bottom: 30px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
}

.example-item h3 {
  color: #606266;
  margin-bottom: 15px;
  font-size: 16px;
}

.example-item p {
  margin-top: 10px;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #606266;
}

.size-examples {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.size-examples > div {
  display: flex;
  align-items: center;
  gap: 15px;
}

.size-examples label {
  min-width: 80px;
  font-weight: 500;
  color: #606266;
}

.custom-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-icon {
  font-size: 18px;
}

.option-label {
  font-weight: 500;
}

.option-desc {
  font-size: 12px;
  color: #909399;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #66b1ff;
}
</style>
