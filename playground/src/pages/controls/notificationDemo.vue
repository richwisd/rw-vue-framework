<script lang="ts" setup>
import { RwNotification } from 'rw-vue-framework/controls'
import { moduleName } from './langs'
import { h, ref } from 'vue';
import { ElSwitch } from 'rw-vue-framework/element-plus';

const notification1 = RwNotification.init(moduleName,'notification1', {
    title: 'Notification1',
    message: ()=> h('i', { style: 'color: teal' }, 'This is a reminder'),
    type: 'success',
    position: 'top-left',
})

const notification2 = RwNotification.init(moduleName,'notification2', {
  dangerouslyUseHTMLString: true,
  message: '<strong>This is <i>HTML</i> string</strong>',
  title: 'Notification2',
})

const checked = ref<boolean | string | number>(false)
const message = () => h(ElSwitch, {modelValue: checked.value,'onUpdate:modelValue': (val: boolean | string | number) => {checked.value = val},})
const notification3 = RwNotification.init(moduleName,'notification3', {
  title: 'Notification3',
  message: message,
})
</script>
<template>
  <RwNotification.Template :control="notification1" />
  <RwNotification.Template :control="notification2" />
  <RwNotification.Template :control="notification3" />
</template>
