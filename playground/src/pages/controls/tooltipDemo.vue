<script lang="ts" setup>
import { RwTooltip } from 'rw-vue-framework/controls'
import { moduleName } from './langs'

const tooltip1 = RwTooltip.init(moduleName, 'tooltip1', {
  content:'这是一个提示框',
  default:'<button>reference</button>',
  placement:'top',
})
</script>
<template>
  <div>
  <RwTooltip.Template :control="tooltip1" />
  </div>
</template>
