<script lang="ts" setup>
import { RwText } from 'rw-vue-framework/controls'
import { moduleName } from './langs'

const text1 = RwText.init(moduleName, 'text1', {})

const text2 = RwText.init(moduleName, 'text2', {
  type: 'primary',
})

const text3 = RwText.init(moduleName, 'text3', {
  type: 'success',
  size: 'large',
})
</script>
<template>
  <div style="margin-bottom: 20px;">
    <RwText.Template :control="text1">text1</RwText.Template>
  </div>

  <div style="margin-bottom: 20px;">
    <RwText.Template :control="text2">text2</RwText.Template>
  </div>

  <div style="margin-bottom: 20px;">
    <RwText.Template :control="text3">text3</RwText.Template>
  </div>
</template>
