<script lang="ts" setup>
import { RwBacktop } from 'rw-vue-framework/controls'
import { moduleName } from './langs';

const backtop1 = RwBacktop.init(moduleName, 'backtop1', {
  default:'<div>UP</div>',
  right:100,
  bottom:100,
})
</script>
<template>
  <RwBacktop.Template :control="backtop1" />
</template>
