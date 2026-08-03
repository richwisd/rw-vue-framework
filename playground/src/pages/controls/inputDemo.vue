
<script lang="ts" setup>
import { RwInput } from 'rw-vue-framework/controls'
import { ref } from 'vue'
import { moduleName } from './langs'

const value1 = ref('12323')
const testInput1 = RwInput.init(moduleName, 'username', {
  type: 'text',
  placeholder: '请输入用户名111111',
  change: (val) => {
    console.log('change', val)
    return true
  }
})

const value2 = ref('')
const testInput2 = RwInput.init(moduleName, 'password', {
  type: 'password',
  autocomplete: 'new-password',
  showPassword: true
})

// 添加表单提交处理函数
const handleSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault() // 阻止表单默认提交行为
  console.log('表单提交', { username: value1.value, password: value2.value })
}
</script>

<template>
  <!-- 将输入框包裹在表单中 -->
  <form @submit="handleSubmit">
    <RwInput.Template :control="testInput1" v-model="value1" />
    <RwInput.Template :control="testInput2" v-model="value2" />

    <!-- 可选：添加提交按钮 -->
    <button type="submit" style="margin-top: 10px;">提交</button>
  </form>
</template>
