<script lang="ts" setup>
import { RwAffix } from 'rw-vue-framework/controls'
import { moduleName } from './langs'

const affix1 = RwAffix.init(moduleName, 'affix1', {
  offset: 100,
  position: 'top',
})
</script>
<template>
  <RwAffix.Template :control="affix1" />
</template>
