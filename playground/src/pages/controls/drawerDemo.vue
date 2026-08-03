<script lang="ts" setup>
import { RwDrawer } from 'rw-vue-framework/controls'
import { moduleName } from './langs'
import { ref } from 'vue';
import { ElButton, ElRadioGroup, ElRadio, ElMessageBox } from 'rw-vue-framework/element-plus';
import type { DrawerProps } from 'rw-vue-framework/element-plus';

const direction = ref<DrawerProps['direction']>('rtl')
  const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const value1 = ref (false)
const drawer1 = RwDrawer.init(moduleName, 'this is drawer1', {
  title: '这是标题',
})
const value2 = ref (false)
const drawer2 = RwDrawer.init(moduleName, 'this is drawer2', {
  title: '这是标题',
})
</script>
<template>
   <ElRadioGroup v-model="direction">
    <ElRadio value="ltr">left to right</ElRadio>
    <ElRadio value="rtl">right to left</ElRadio>
    <ElRadio value="ttb">top to bottom</ElRadio>
    <ElRadio value="btt">bottom to top</ElRadio>
  </ElRadioGroup>
  <p/>
  <ElButton @click="value1 = true" type="primary">open</ElButton>
  <ElButton @click="value2 = true" type="primary">with footer</ElButton>
  <RwDrawer.Template :control="drawer1" v-model="value1"  :direction="direction" :beforeClose="handleClose" />
  <RwDrawer.Template :control="drawer2" v-model="value2" :direction="direction"  />
</template>
