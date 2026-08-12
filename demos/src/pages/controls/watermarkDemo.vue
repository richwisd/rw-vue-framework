<script lang="ts" setup>
import { RwWatermark } from 'rw-vue-framework/controls'
import { moduleName } from './langs'

const watermark1 = RwWatermark.init(moduleName, 'watermark1', {
  // width:130,
  // height:30,
  // image:"https://element-plus.org/images/element-plus-logo.svg"
  content: ['水印内容1', '水印内容2'],
})
</script>
<template>
  <div style="width: 500px;height: 500px;">
  <RwWatermark.Template :control="watermark1" />
  </div>
</template>
