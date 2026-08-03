<script lang="ts" setup>
import { RwBadge } from 'rw-vue-framework/controls'
import { moduleName } from './langs';

const value1 = 100
const badge1 = RwBadge.init(moduleName, 'badge1', {
  max: 99,
  default:'<span>value1</span>',
  content: '<span>value1</span>',
  offset: [10, 5],
})
const value2 = 10
const badge2 = RwBadge.init(moduleName, 'badge2', {
  isDot: true,
  default: '<button style="background-color: deepskyblue;">value2</button>',
})
</script>

<template>
<RwBadge.Template :value="value1" :control="badge1" />
<p/>
<RwBadge.Template :value="value2" :control="badge2" />
</template>
