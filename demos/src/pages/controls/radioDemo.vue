<template>
  <div class="radio-examples">
    <h1>RwRadio 组件示例</h1>

    <!-- 单个单选框示例 -->
    <section class="example-section">
      <h2>1. 单个单选框</h2>

      <div class="example-item">
        <h3>基础用法</h3> <RwRadio.Template :control="singleRadio" v-model="singleValue" />
        <p>当前值: {{ singleValue }}</p>
      </div>

      <div class="example-item">
        <h3>带边框的单选框</h3>
        <RwRadio.Template :control="borderRadio" v-model="borderValue" />
        <p>当前值: {{ borderValue }}</p>
      </div>

      <div class="example-item">
        <h3>禁用状态</h3>
        <RwRadio.Template :control="disabledRadio" v-model="disabledValue" />
        <p>当前值: {{ disabledValue }}</p>
      </div>
    </section>

    <!-- 单选框组示例 -->
    <section class="example-section">
      <h2>2. 单选框组</h2>

      <div class="example-item">
        <h3>基础单选框组</h3>
        <RwRadio.Template :control="basicGroup" v-model="basicGroupValue" />
        <p>当前值: {{ basicGroupValue }}</p>
      </div>

      <div class="example-item">
        <h3>垂直排列的单选框组</h3>
        <RwRadio.Template :control="verticalGroup" v-model="verticalGroupValue" />
        <p>当前值: {{ verticalGroupValue }}</p>
      </div>

      <div class="example-item">
        <h3>带边框的单选框组</h3>
        <RwRadio.Template :control="borderGroup" v-model="borderGroupValue" />
        <p>当前值: {{ borderGroupValue }}</p>
      </div>

      <div class="example-item">
        <h3>不同尺寸的单选框组</h3>
        <div class="size-examples">
          <div>
            <label>Large:</label>
            <RwRadio.Template :control="largeGroup" v-model="largeGroupValue" />
          </div>
          <div>
            <label>Default:</label>
            <RwRadio.Template :control="defaultGroup" v-model="defaultGroupValue" />
          </div>
          <div>
            <label>Small:</label>
            <RwRadio.Template :control="smallGroup" v-model="smallGroupValue" />
          </div>
        </div>
      </div>
    </section>

    <!-- 单选框按钮示例 -->
    <section class="example-section">
      <h2>3. 单选框按钮</h2>

      <div class="example-item">
        <h3>基础按钮组</h3>
        <RwRadio.Template :control="basicButtons" v-model="basicButtonsValue" />
        <p>当前值: {{ basicButtonsValue }}</p>
      </div>

      <div class="example-item">
        <h3>不同尺寸的按钮组</h3>
        <div class="size-examples">
          <div>
            <label>Large:</label>
            <RwRadio.Template :control="largeButtons" v-model="largeButtonsValue" />
          </div>
          <div>
            <label>Default:</label>
            <RwRadio.Template :control="defaultButtons" v-model="defaultButtonsValue" />
          </div>
          <div>
            <label>Small:</label>
            <RwRadio.Template :control="smallButtons" v-model="smallButtonsValue" />
          </div>
        </div>
      </div>

      <div class="example-item">
        <h3>自定义颜色的按钮组</h3>
        <RwRadio.Template :control="colorButtons" v-model="colorButtonsValue" />
        <p>当前值: {{ colorButtonsValue }}</p>
      </div>

      <div class="example-item">
        <h3>垂直排列的按钮组</h3>
        <RwRadio.Template :control="verticalButtons" v-model="verticalButtonsValue" />
        <p>当前值: {{ verticalButtonsValue }}</p>
      </div>
    </section>

    <!-- 远程数据示例 -->
    <section class="example-section">
      <h2>4. 远程数据加载</h2>

      <div class="example-item">
        <h3>模拟远程数据加载</h3>
        <RwRadio.Template :control="remoteGroup" v-model="remoteGroupValue" />
        <p>当前值: {{ remoteGroupValue }}</p>
        <button @click="refreshRemoteData">刷新数据</button>
      </div>
    </section>

    <!-- 自定义内容示例 -->
    <section class="example-section">
      <h2>5. 自定义选项内容</h2>

      <div class="example-item">
        <h3>带图标的选项</h3>
        <RwRadio.Template :control="iconGroup" v-model="iconGroupValue">
          <template #option="{ option }">
            <div class="custom-option">
              <span class="option-icon">{{ option.icon }}</span>
              <span class="option-label">{{ option.label }}</span>
              <span class="option-desc">{{ option.description }}</span>
            </div>
          </template>
        </RwRadio.Template>
        <p>当前值: {{ iconGroupValue }}</p>
      </div>
    </section>

    <!-- 实际应用场景示例 -->
    <section class="example-section">
      <h2>6. 实际应用场景</h2>

      <div class="example-item">
        <h3>性别选择</h3>
        <RwRadio.Template :control="genderRadio" v-model="genderValue" />
        <p>当前值: {{ genderValue }}</p>
      </div>

      <div class="example-item">
        <h3>支付方式选择</h3>
        <RwRadio.Template :control="paymentRadio" v-model="paymentValue" />
        <p>当前值: {{ paymentValue }}</p>
      </div>

      <div class="example-item">
        <h3>主题切换</h3>
        <RwRadio.Template :control="themeRadio" v-model="themeValue" />
        <p>当前值: {{ themeValue }}</p>
      </div>

      <div class="example-item">
        <h3>优先级选择</h3>
        <RwRadio.Template :control="priorityRadio" v-model="priorityValue" />
        <p>当前值: {{ priorityValue }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RwRadio } from 'rw-vue-framework/controls'

// 单个单选框示例
const singleRadio = RwRadio.init('example', 'agree', {
  mode: 'single',
  label: '我同意用户协议'
})
const singleValue = ref(false)

const borderRadio = RwRadio.init('example', 'newsletter', {
  mode: 'single',
  label: '订阅邮件通知',
  border: true,
  size: 'default'
})
const borderValue = ref(true)

const disabledRadio = RwRadio.init('example', 'disabled', {
  mode: 'single',
  label: '禁用的单选框',
  disabled: true
})
const disabledValue = ref(false)

// 单选框组示例
const basicGroup = RwRadio.init('example', 'level', {
  mode: 'group',
  direction: 'horizontal',
  gap: 16,
  options: [
    { label: '初级', value: 'junior' },
    { label: '中级', value: 'middle' },
    { label: '高级', value: 'senior' },
    { label: '专家', value: 'expert' }
  ]
})
const basicGroupValue = ref('middle')

const verticalGroup = RwRadio.init('example', 'education', {
  mode: 'group',
  direction: 'vertical',
  gap: 8,
  options: [
    { label: '高中及以下', value: 'high_school' },
    { label: '大专', value: 'college' },
    { label: '本科', value: 'bachelor' },
    { label: '硕士', value: 'master' },
    { label: '博士', value: 'doctor' }
  ]
})
const verticalGroupValue = ref('bachelor')

const borderGroup = RwRadio.init('example', 'department', {
  mode: 'group',
  border: true,
  direction: 'horizontal',
  gap: 12,
  options: [
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '设计部', value: 'design' },
    { label: '运营部', value: 'operation' }
  ]
})
const borderGroupValue = ref('tech')

const largeGroup = RwRadio.init('example', 'large', {
  mode: 'group',
  size: 'large',
  options: [
    { label: '选项 1', value: '1' },
    { label: '选项 2', value: '2' },
    { label: '选项 3', value: '3' }
  ]
})
const largeGroupValue = ref('1')

const defaultGroup = RwRadio.init('example', 'default', {
  mode: 'group',
  size: 'default',
  options: [
    { label: '选项 1', value: '1' },
    { label: '选项 2', value: '2' },
    { label: '选项 3', value: '3' }
  ]
})
const defaultGroupValue = ref('2')

const smallGroup = RwRadio.init('example', 'small', {
  mode: 'group',
  size: 'small',
  options: [
    { label: '选项 1', value: '1' },
    { label: '选项 2', value: '2' },
    { label: '选项 3', value: '3' }
  ]
})
const smallGroupValue = ref('3')

// 单选框按钮示例
const basicButtons = RwRadio.init('example', 'status', {
  mode: 'button',
  direction: 'horizontal',
  gap: 8,
  options: [
    { label: '待处理', value: 'pending' },
    { label: '进行中', value: 'processing' },
    { label: '已完成', value: 'completed' },
    { label: '已取消', value: 'cancelled' }
  ]
})
const basicButtonsValue = ref('pending')

const largeButtons = RwRadio.init('example', 'large_btn', {
  mode: 'button',
  size: 'large',
  options: [
    { label: '选项 1', value: '1' },
    { label: '选项 2', value: '2' },
    { label: '选项 3', value: '3' }
  ]
})
const largeButtonsValue = ref('1')

const defaultButtons = RwRadio.init('example', 'default_btn', {
  mode: 'button',
  size: 'default',
  options: [
    { label: '选项 1', value: '1' },
    { label: '选项 2', value: '2' },
    { label: '选项 3', value: '3' }
  ]
})
const defaultButtonsValue = ref('2')

const smallButtons = RwRadio.init('example', 'small_btn', {
  mode: 'button',
  size: 'small',
  options: [
    { label: '选项 1', value: '1' },
    { label: '选项 2', value: '2' },
    { label: '选项 3', value: '3' }
  ]
})
const smallButtonsValue = ref('3')

const colorButtons = RwRadio.init('example', 'colors', {
  mode: 'button',
  fill: '#ff6b6b',
  textColor: '#ffffff',
  options: [
    { label: '红色主题', value: 'red' },
    { label: '绿色主题', value: 'green' },
    { label: '蓝色主题', value: 'blue' },
    { label: '紫色主题', value: 'purple' }
  ]
})
const colorButtonsValue = ref('blue')

const verticalButtons = RwRadio.init('example', 'vertical_btn', {
  mode: 'button',
  direction: 'vertical',
  gap: 8,
  options: [
    { label: '选项 A', value: 'a' },
    { label: '选项 B', value: 'b' },
    { label: '选项 C', value: 'c' }
  ]
})
const verticalButtonsValue = ref('a')

// 远程数据示例
const remoteGroup = RwRadio.init('example', 'remote', {
  mode: 'group',
  url: '/api/mock/radio-options', // 模拟接口
  direction: 'horizontal'
})
const remoteGroupValue = ref('')

// 自定义内容示例
const iconGroup = RwRadio.init('example', 'platforms', {
  mode: 'group',
  direction: 'vertical',
  gap: 12,
  options: [
    {
      label: 'GitHub',
      value: 'github',
      icon: '🐙',
      description: '代码托管平台'
    },
    {
      label: 'GitLab',
      value: 'gitlab',
      icon: '🦊',
      description: 'DevOps 平台'
    },
    {
      label: 'Bitbucket',
      value: 'bitbucket',
      icon: '🪣',
      description: 'Atlassian 代码管理'
    }
  ]
})
const iconGroupValue = ref('github')

// 实际应用场景示例
const genderRadio = RwRadio.init('example', 'gender', {
  mode: 'group',
  direction: 'horizontal',
  gap: 20,
  options: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
    { label: '其他', value: 'other' }
  ]
})
const genderValue = ref('male')

const paymentRadio = RwRadio.init('example', 'payment', {
  mode: 'group',
  direction: 'vertical',
  gap: 12,
  options: [
    { label: '支付宝', value: 'alipay' },
    { label: '微信支付', value: 'wechat' },
    { label: '银行卡', value: 'bank_card' },
    { label: '现金', value: 'cash', disabled: true }
  ]
})
const paymentValue = ref('alipay')

const themeRadio = RwRadio.init('example', 'theme', {
  mode: 'button',
  direction: 'horizontal',
  gap: 0,
  options: [
    { label: '浅色', value: 'light' },
    { label: '深色', value: 'dark' },
    { label: '自动', value: 'auto' }
  ]
})
const themeValue = ref('light')

const priorityRadio = RwRadio.init('example', 'priority', {
  mode: 'button',
  direction: 'horizontal',
  fill: '#409eff',
  textColor: '#ffffff',
  options: [
    { label: '低', value: 'low' },
    { label: '中', value: 'medium' },
    { label: '高', value: 'high' },
    { label: '紧急', value: 'urgent' }
  ]
})
const priorityValue = ref('medium')

// 模拟刷新远程数据
const refreshRemoteData = () => {
  // 这里可以触发重新加载
  console.log('刷新远程数据')
}

onMounted(() => {
  // 模拟远程数据加载
  setTimeout(() => {
    remoteGroup.options = [
      { label: '远程选项 1', value: 'remote1' },
      { label: '远程选项 2', value: 'remote2' },
      { label: '远程选项 3', value: 'remote3', disabled: true },
      { label: '远程选项 4', value: 'remote4' }
    ]
  }, 1000)
})
</script>

<style scoped>
.radio-examples {
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
