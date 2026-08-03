<script lang="ts" setup>

import struct from './index'

import { RwSearch } from 'rw-vue-framework/controls'

const searchC = RwSearch.init(struct,{})

searchC.addInput('name','like', {
  labelShow: false
})

searchC.addInput('address', 'like', {
  labelShow: false
})

searchC.addInput('username', 'like',{
  labelShow: false
})

</script>

<template>
  <div style="display: flex; flex-direction: column; flex: 1;">
    <h3 style="margin-bottom: 40px;">搜索数据</h3>
    <RwSearch.Template :control="searchC"/>
  </div>
</template>

<style lang="scss" scoped>

</style>
