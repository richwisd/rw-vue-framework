<script  lang="ts" setup>
import { RwSeleton } from 'rw-vue-framework/controls'
import { moduleName } from './langs';
import { ref } from 'vue';
import { ElSwitch } from 'rw-vue-framework/element-plus';

const loading= ref(true)

const seleton1 = RwSeleton.init(moduleName, 'Seleton1', {
  animated: true,
 default: '<div>默认内容1</div>',
 template:[{variant:'p',style:"width:50%"},{variant:'image',style:"width: 240px; height: 240px"},]
})

const seleton2 = RwSeleton.init(moduleName, 'Seleton2', {
  default: '<div>默认内容2</div>',
 template:'<div>自定义模板</div>'
})

</script>

<template>
  <el-switch v-model="loading"></el-switch>
  <RwSeleton.Template :control="seleton1" :loading="loading"/>
  <RwSeleton.Template :control="seleton2" :loading="loading"/>
</template>
