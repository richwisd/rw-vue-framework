<script lang="ts" setup>
  import { RwAlert } from 'rw-vue-framework/controls'
  import { moduleName } from './langs'

  const alert1 = RwAlert.init(moduleName, 'alert1', {
    type:'error',
    title:'<span>错误提示</span>',
    // default:'<span>这是一条错误提示信息</span>',
    showIcon:true,
  })
  const alert2 = RwAlert.init(moduleName, 'alert2', {
    type:'success',
    title:'<span>成功提示</span>',
    // default:'<span>这是一条成功提示信息</span>',
    showIcon:true,
  })
  const alert3 = RwAlert.init(moduleName, 'alert3', {
    type:'warning',
    title:'<span>警告提示</span>',
    // default:'<span>这是一条警告提示信息</span>',
    showIcon:true,
  })
  const alert4 = RwAlert.init(moduleName, 'alert4', {
    type:'info',
    title:'<span>信息提示</span>',
    // default:'<span>这是一条信息提示信息</span>',
    showIcon:true,
  })
</script>
<template>
  <RwAlert.Template :control="alert1" />
  <p/>
  <RwAlert.Template :control="alert2" />
  <p/>
  <RwAlert.Template :control="alert3" />
  <p/>
  <RwAlert.Template :control="alert4" />
</template>
