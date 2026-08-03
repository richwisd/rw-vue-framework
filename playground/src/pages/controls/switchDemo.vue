<script lang="ts" setup>
import { RwSwitch } from 'rw-vue-framework/controls'

import { ElMessage } from 'rw-vue-framework/element-plus'

import { ref } from 'vue'
import { moduleName } from './langs'
// import { OptionT } from 'rw-element-admin/switch/switch'
import { Check, Close } from 'rw-vue-framework/element-plus'

const ONbeforeChange = (): Promise<boolean> => {
  testSwitch2.loading = true
  return new Promise((resolve) => {
    setTimeout(() => {
      testSwitch2.loading = false
      ElMessage.success('Switch success')
      return resolve(true)
    }, 500)
  })
}

const onChange = (val:any):any =>{
  console.log('val:',val)
}


const switch1 = ref(false)

const testSwitch1 = RwSwitch.init(moduleName, 'sex', {
    beforeChange: ONbeforeChange,
    change: onChange,
  })

const switch2 = ref(false)
const testSwitch2 = RwSwitch.init(moduleName, 'test', {
    activeIcon:Check,
    inactiveIcon:Close,
  })


</script>

<template>
  <h2>基本用法</h2>
  <!-- <RwSwitch.Template v-model="switch1" :control="testSwitch1"  /> -->
  <h2>自定义图标</h2>
  <!-- <RwSwitch.Template v-model="switch2" :control="testSwitch2"  /> -->
</template>
