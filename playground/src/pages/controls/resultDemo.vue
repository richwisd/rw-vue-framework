<script lang="ts" setup>
import { RwResult } from 'rw-vue-framework/controls'
import { moduleName } from './langs';

const result1 = RwResult.init(moduleName, 'result1', {
  icon:'',
  title: '<span>成功</span>',
  subTitle: '<span>这是一条成功消息</span>',
  extra:'<span>额外信息</span>'
})

const result2 = RwResult.init(moduleName, 'result2', {
  icon:'<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></img>',
  title: '<span>失败</span>',
  subTitle: '<span>这是一条失败消息</span>',
  extra:'<button style="background: #ff4757;color: white;">Back</button>'
})
</script>

<template>
  <RwResult.Template :control="result1" />
  <RwResult.Template :control="result2" />
</template>
