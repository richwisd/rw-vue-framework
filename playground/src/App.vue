<script setup lang="ts">

// import  {RwButton} from '../../dist/controls/button'

// import  {RwAffix} from '../../dist/controls/affix'

import { RwButton, RwAffix } from 'duck-vue-components/controls'

import { Search } from '@element-plus/icons-vue'

import { markRaw, ref, reactive } from 'vue';

import 'element-plus/dist/index.css'

import "element-plus/theme-chalk/dark/css-vars.css"

import { moduleName } from './langs';

const button1 = ref(RwButton.init(moduleName, 'hz', {
  icon: markRaw(Search),
}))

const affix1 = ref(RwAffix.init(moduleName, 'affix', {
  offset: 100,
}))


function clickButton1() {
  console.log('点击了按钮1',Date.now(),button1)
  console.log(button1.value)
}

</script>

<template>

  <RwAffix.Template :control="affix1"></RwAffix.Template>

  <br/>
  
  <RwButton.Template  :control="button1" @click="clickButton1"></RwButton.Template>

</template>
