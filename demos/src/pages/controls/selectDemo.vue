
<script lang="ts" setup>
import { RwSelect } from 'rw-vue-framework/controls'
import { ref } from 'vue'
import { moduleName } from './langs'

// 基本使用示例
const value1 = ref('')
const testInput1 = RwSelect.init(moduleName, 'username', {
  lists: [{value:'1',label:1},{value:'2',label:2},{value:'3',label:3,disabled:true}],
  showCheckAll: true,
  multiple: true,
  change: (val) => {
    console.log('change', val)
    return true
  }
})



const value2 = ref('')
const testInput2 = RwSelect.init(moduleName, 'password',{
  placeholder: '请输入密码222222',
  lists: [
    { value: '1', label: '苹果' },
    { value: '2', label: '香蕉' },
    { value: '3', label: '橙子' },
    { value: '4', label: '西红柿' },
    { value: '5', label: '黄瓜' },
    { value: '6', label: '胡萝卜' },
  ]
})

// 分组示例
const value3 = ref('')
const groupedOptions = [
  { value: '1', label: '苹果', category: '水果' },
  { value: '2', label: '香蕉', category: '水果' },
  { value: '3', label: '橙子', category: '水果' },
  { value: '4', label: '西红柿', category: '蔬菜' },
  { value: '5', label: '黄瓜', category: '蔬菜' },
  { value: '6', label: '胡萝卜', category: '蔬菜' },
  { value: '7', label: '牛肉', category: '肉类' },
  { value: '8', label: '猪肉', category: '肉类' }
]
const testInput3 = RwSelect.init(moduleName, 'food', {
  lists: groupedOptions,
  groupBy: 'category',
  placeholder: '请选择食物',
  change: (val) => {
    console.log('选择的食物:', val)
    return true
  }
})

// 远程搜索示例
const value41 = ref('')
const testInput41 = RwSelect.init(moduleName, 'user', {
  remote: true,  // 确保这个属性设置为 true
  filterable: true,
  valueKey:'id',
  placeholder: '请输入用户名搜索',
  remoteUrl:'https://adpi.mazudao.com/admin/ip/page?limit=100000',
  change: (val) => {
    console.log('选择的用户:', val)
    return true
  }
})

// 自定义远程搜索示例
const value42 = ref('')
const testInput42 = RwSelect.init(moduleName, 'user', {
  remote: true,  // 确保这个属性设置为 true
  filterable: true,
  placeholder: '请输入用户名搜索',
  remoteMethod: (query: string) => {
    // 模拟远程搜索
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = [
          { value: '1', label: '张三' },
          { value: '2', label: '李四' },
          { value: '3', label: '王五' },
          { value: '4', label: '赵六' }
        ].filter(item => item.label.includes(query))
        resolve(result)
      }, 1000)
    })
  },
  change: (val) => {
    console.log('选择的用户:', val)
    return true
  }
})

// 自定义模板示例
const value5 = ref('')
const customOptions = [
  { value: '1', label: '管理员', icon: 'el-icon-user', description: '系统管理员，拥有所有权限' },
  { value: '2', label: '编辑者', icon: 'el-icon-edit', description: '可以编辑内容，但无法删除' },
  { value: '3', label: '访客', icon: 'el-icon-view', description: '只能查看内容，无法修改' }
]
const testInput5 = RwSelect.init(moduleName, 'role', {
  lists: customOptions,
  placeholder: '请选择角色',
  optionTemplate:`<div style="display: flex; align-items: center;">
            <span style="margin-right: 8px;">{{ item.label }}</span>
            <span style="color: #999; font-size: 12px;">{{ item.description }}</span>
          </div>`,
  change: (val) => {
    console.log('选择的角色:', val)
    return true
  }
})

const value = ref<string[]>([])
const colors = [
  {
    value: '#E63415',
    label: 'red',
  },
  {
    value: '#FF6600',
    label: 'orange',
  },
  {
    value: '#FFDE0A',
    label: 'yellow',
  },
  {
    value: '#1EC79D',
    label: 'green',
  },
  {
    value: '#14CCCC',
    label: 'cyan',
  },
  {
    value: '#4167F0',
    label: 'blue',
  },
  {
    value: '#6222C9',
    label: 'purple',
  },
]
const testInput6 = RwSelect.init(moduleName, 'color', {
  lists: colors,
  placeholder: '请选择颜色',
  multiple: true,
  change: (val) => {
    console.log('选择的颜色:', val)
    return true
  }
})

// 添加表单提交处理函数
const handleSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault() // 阻止表单默认提交行为
  console.log('表单提交', {
    username: value1.value,
    password: value2.value,
    food: value3.value,
    user: value41.value,
    role: value5.value
  })
}
</script>

<template>
  <h2>RwSelect 组件示例</h2>

  <!-- 将输入框包裹在表单中 -->
  <form @submit="handleSubmit">
    <h3>1. 基本用法</h3>
    <div style="margin-bottom: 20px;">
      <RwSelect.Template :control="testInput2" v-model="value2" />
    </div>

    <h3>2. 全选和禁用</h3>
    <div style="margin-bottom: 20px;">
      <RwSelect.Template :control="testInput1" v-model="value1" />
    </div>

    <h3>3. 分组选择</h3>
    <div style="margin-bottom: 20px;">
      <RwSelect.Template :control="testInput3" v-model="value3" />
    </div>

    <h3>4.1 api远程搜索</h3>
    <div style="margin-bottom: 20px;">
      <RwSelect.Template :control="testInput41" v-model="value41" />
    </div>

    <h3>4.2 自定义远程搜索</h3>
    <div style="margin-bottom: 20px;">
      <RwSelect.Template :control="testInput42" v-model="value42" />
    </div>

    <h3>5. 自定义选项模板</h3>
    <div style="margin-bottom: 20px;">
      <RwSelect.Template :control="testInput5" v-model="value5">
        <!-- <template #option-template="{ item }">
          <div style="display: flex; align-items: center;">
            <span style="margin-right: 8px;">{{ item.label }}</span>
            <span style="color: #999; font-size: 12px;">{{ item.description }}</span>
          </div>
        </template> -->
      </RwSelect.Template>
    </div>

    <h3>6. 自定义标签模版</h3>
    <div style="margin-bottom: 20px;">
      <RwSelect.Template :control="testInput6" v-model="value">
        <template #option-template="{ item }">
          <div style="display: flex; align-items: center;">
            <span style="margin-right: 8px;">{{ item.label }}</span>
            <span style="color: #999; font-size: 12px;">{{ item.value }}</span>
          </div>
        </template>
        <template #tag-template>
          <div v-for="color in value" :key="color" :color="color" :style="{ 'background-color': color, 'border-radius': '6px', padding: '10px', 'aspect-ratio': 1 }" />
        </template>
      </RwSelect.Template>
    </div>

    <!-- 提交按钮 -->
    <button type="submit" style="margin-top: 20px; padding: 8px 16px;">提交</button>
  </form>
</template>

<style scoped>
h2, h3 {
  margin-bottom: 16px;
}
</style>
