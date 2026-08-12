<script lang="ts" setup>
import { RwMessageBox } from 'rw-vue-framework/controls'
import { moduleName } from './langs'

const messageBox1 = RwMessageBox.init(moduleName, 'messageBox1', {
  message: 'This is a messageBox',
  title: 'Title',
  showInput: true,
})
</script>

<template>
  <RwMessageBox.Template :control="messageBox1" />
</template>
