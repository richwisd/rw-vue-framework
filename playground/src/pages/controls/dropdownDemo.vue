<script lang="ts" setup>
import { RwDropdown } from 'rw-vue-framework/controls'
import { moduleName } from './langs';
import { Search,Eleme } from 'rw-vue-framework/element-plus'

const button1 = RwDropdown.init(moduleName, 'hz')
button1.addItem('year',{ icon: Search })
button1.addItem('year',{
  icon: Eleme, divided: false,
})

// const button3 = RwDropDown.init(moduleName, 'button3')
</script>

<template>
  <RwDropdown.Template :control="button1"/>
  <p/>

  <p/>
  <!-- <RwDropDown.Template :control="button3" /> -->
</template>
