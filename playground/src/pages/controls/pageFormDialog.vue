<script lang="ts" setup>
import { RwFormItems } from 'rw-vue-framework/controls'
import { RwPageForm } from 'rw-vue-framework/controls'
import formDemo from './formDemo.vue'
import struct from './index'
import { ref, reactive } from 'vue'

const formDate = {
  username:'秦彻',
  password:'123456',
  inputC:'123456',
  inputD:'123456',
  inputE:'123456',
  inputF:'12defewfe3456',
}

const pageformC = reactive(RwPageForm.init(struct)) // 创建一个form结构，其下的contents为空数组

const formItems = RwFormItems.init(struct)
formItems.add('Input', 'username')
formItems.add('Input', 'password')
formItems.add('Input', 'inputC')
formItems.add('Select', 'inputD', { lists: [{label: 1, value: 1},{label: 2, value: 2}] })
formItems.add('Input', 'inputE', { placeholder: '请输入1111111111',
  change: changeData })

pageformC.form.addFormItems(struct, formItems) // 将formItems添加到formC中contents数组中


pageformC.form.onLoad = () => formDate

pageformC.page.pushDialog('test', formDemo)

pageformC.form.buttons.addButton('111', { click: ()=> {
  console.log('12323', pageformC.page, pageformC.page.dialogs[0].show)
  pageformC.page.dialogs[0].show = !pageformC.page.dialogs[0].show
}})


function changeData(val: any) {
  pageformC.form.loading=true
  const item = pageformC.form.findItem('username')
  const item1 = pageformC.form.findItem('password')
  pageformC.form.changeItem('username', {
    hide: !item.hide,
  })
  pageformC.form.changeItem('password', {
    disabled: !item1.disabled,
    required: !item1.required,
  })
  console.log(pageformC.form.contents[0])
  return true
}

const formRef = ref<InstanceType<typeof RwPageForm.Template>>()

</script>

<template>
  <RwPageForm.Template :control="pageformC" ref="formRef" />
  <br />
</template>

