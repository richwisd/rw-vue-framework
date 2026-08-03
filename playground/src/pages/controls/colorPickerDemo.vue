<script lang="ts" setup>
  import { RwColorPicker } from 'rw-vue-framework/controls'
  import { ref } from 'vue'
  import { moduleName } from './langs'

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

  const value1 = ref('#ff0000')
  const testColorPicker1 = RwColorPicker.init( moduleName, 'testColorPicker1')
  const value2 = ref('rgba(19, 206, 102, 0.8)')
  const testColorPicker2 = RwColorPicker.init( moduleName, 'testColorPicker2', {
    showAlpha: true,
  })

  const value3 = ref('rgba(255, 69, 0, 0.68)')
  const testColorPicker3 = RwColorPicker.init( moduleName, 'testColorPicker3', {
    predefine:predefineColors.value,
  })

  const value4 = ref()
  const testColorPicker4 = RwColorPicker.init( moduleName, 'testColorPicker4', {
    size:'large',
  })
</script>

<template>
  <h2>基本用法</h2>
  <RwColorPicker.Template v-model="value1" :control="testColorPicker1" />
  <h2>透明度</h2>
  <RwColorPicker.Template v-model="value2" :control="testColorPicker2" />
  <h2>预设颜色</h2>
  <RwColorPicker.Template v-model="value3" :control="testColorPicker3" />
  <h2>尺寸</h2>
  <RwColorPicker.Template v-model="value4" :control="testColorPicker4" />
</template>
