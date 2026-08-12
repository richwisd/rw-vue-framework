<script lang="ts" setup>
import { RwPopover } from 'rw-vue-framework/controls'
import { moduleName } from './langs'

const popover1 = RwPopover.init(moduleName, 'popover1', {
  title: '这是Popover1',
  content: '这是Popover1的内容',
  reference: '<button>popover</button>'
})
</script>

<template>
  <RwPopover.Template :control="popover1" />
</template>
