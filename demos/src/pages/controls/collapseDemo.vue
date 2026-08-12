<script lang="ts" setup>
import { RwCollapse } from 'rw-vue-framework/controls'
import { ref } from 'vue'
import { moduleName } from './langs'

const value1 = ref('1')
const collapse1 = RwCollapse.init(moduleName, 'collapse1', {
  default: [{ value: '<span>Collapse 1</span>',title:'title1',name:'1'},
            { value: '<span>Collapse 2</span>',title:'title2',name:'2'}],
  accordion: true,
})
</script>
<template>
  <RwCollapse.Template v-model="value1" :control="collapse1" />
</template>
