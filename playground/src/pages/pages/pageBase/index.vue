<script lang="ts" setup>
import {moduleName} from "./langs"
import {  RwPageBase } from 'rw-vue-framework/controls'
const testpage = RwPageBase.init(moduleName, "customize")


</script>

<template>
  <RwPageBase.Template :control="testpage">
    这儿是页面的内容
  </RwPageBase.Template>
</template>
