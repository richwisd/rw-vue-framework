<script lang="ts" setup>
import { RwDescriptions } from 'rw-vue-framework/controls'
import { moduleName } from './langs'
import { ElRadioGroup, ElRadio } from 'rw-vue-framework/element-plus'
import { ref } from 'vue'

const size = ref('default')

const descriptions1 = RwDescriptions.init(moduleName, 'descriptions1', {
  default: [{value:'kooriookami',label:'Username'},
            {value:'123456',label:'Password'},
            {value:'123456',label:'Confirm Password'},
            {value:'123456',label:'Email'},],
  title: '<span>Login Information</span>',
  extra: '<button style="background-color:#409eff">Login</button>',
  column: 3,
  border: true,
})

const descriptions2 = RwDescriptions.init(moduleName, 'descriptions2', {
  default: [{value:'kooriookami',label:'Username'},
            {value:'18100000000', label:'Phone'},
            {value:'123456',label:'Password'},
            {value:'123456',label:'Confirm Password'},
            {value:'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province', label:'Address'},],
  direction: 'vertical',
  column: 4,
  border: true,
})

const descriptions3 = RwDescriptions.init(moduleName, 'descriptions3', {
  default: [{value:'<image style="width: 100px; height: 100px" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM0MDllZmYiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjM4IiByPSIxOCIgZmlsbD0iI2ZmZiIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9Ijg1IiByeD0iMzAiIHJ5PSIyMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=="></image>',rowspan:"2",width:"140",label:"Photo",align:"center"},
            {value:'kooriookami',label:'Username'},
            {value:'18100000000', label:'Phone'},
            {value:'123456',label:'Password'},
            {value:'123456',label:'Confirm Password'},
            {value:'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province', label:'Address'},],
  border: true,
  direction:'vertical',
})
</script>
<template>
  <RwDescriptions.Template :control="descriptions1" />
  <div style="margin-top: 80px;"></div>
  <ElRadioGroup v-model="size">
    <ElRadio value="large">Large</ElRadio>
    <ElRadio value="default">Default</ElRadio>
    <ElRadio value="small">Small</ElRadio>
  </ElRadioGroup>
  <RwDescriptions.Template :control="descriptions2" :size="size" />
  <div style="margin-top: 80px;"></div>
  <RwDescriptions.Template :control="descriptions3" />
</template>
