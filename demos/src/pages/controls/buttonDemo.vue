<script lang="ts" setup>
import { RwButton, RwDialog } from 'rw-vue-framework/controls'
import formDemo from './formDemo.vue'
import { moduleName } from './langs';
import { Search } from 'rw-vue-framework/element-plus'
import { markRaw, ref, reactive } from 'vue';

const dialogRef = ref<InstanceType<typeof RwDialog.Template>>()
const dialog = reactive(RwDialog.init('test', markRaw(formDemo)))

const button1 = ref(RwButton.init(moduleName, 'hz', {
  icon: markRaw(Search),
}))

function clickButton1() {
  console.log('点击了按钮1',Date.now(),button1)
  console.log(button1.value)
  dialog.show = true
}



</script>

<template>
  <RwButton.Template :control="button1" @click="clickButton1"/>
  <RwDialog.Template :control="dialog" ref="dialogRef" />
</template>
