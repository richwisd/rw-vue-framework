<script lang="ts" setup>
import struct from '../pageTable/index'
import { RwPageForm } from 'rw-vue-framework/controls'

const pageFormC = RwPageForm.init(struct, {})

// 添加一组表单项
const formItems = pageFormC.form.addFormItems(struct)
formItems.addInput('username')
formItems.addInput('nickname')
formItems.addInput('usermobile')

// 表单数据
pageFormC.form.data = {
  username: '秦彻',
  nickname: '夜枭',
  usermobile: '13800138000',
}
</script>

<template>
  <RwPageForm.Template :control="pageFormC" />
</template>
