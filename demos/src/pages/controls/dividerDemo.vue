<script lang="ts" setup>
import { RwDivider } from 'rw-vue-framework/controls'
import { moduleName } from './langs'

const divider1 = RwDivider.init(moduleName, 'divider1', {
  direction:'vertical'
})
const divider2 = RwDivider.init(moduleName, 'divider2', {
})
</script>

<template>
  <span>Divider Demo</span>
  <RwDivider.Template :control="divider1" />
  <span>Divider Demo</span>
  <p/>
  <span>Divider Demo</span>
  <RwDivider.Template :control="divider2"/>
  <span>Divider Demo</span>
</template>
