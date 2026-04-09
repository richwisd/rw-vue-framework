<script lang="ts" setup>
import { RwButton } from 'rw-vue-framework'
import { moduleName } from './langs';
import { Search } from '@element-plus/icons-vue'
import { markRaw, ref, reactive } from 'vue';

const button1 = ref(RwButton.init(moduleName, 'hz', {
  icon: markRaw(Search),
}))

function clickButton1() {
  console.log('点击了按钮1',Date.now(),button1)
  console.log(button1.value)
}
</script>

<template>
  <RwButton.Template :control="button1" @click="clickButton1"/>
</template>
