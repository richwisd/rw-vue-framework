<script lang="ts" setup>
import { RwMessage } from 'rw-vue-framework/controls'
import { moduleName } from './langs'
import { h } from 'vue';

const message1 = RwMessage.init(moduleName, 'message1', {
  message: () => h('p', { style: 'line-height: 1; font-size: 14px' }, [h('span', null, 'Message can be '),h('i', { style: 'color: teal' }, 'VNode'),]),
  showClose: true,
  type: 'success',
})
</script>
<template>
  <RwMessage.Template :control="message1" />
</template>
