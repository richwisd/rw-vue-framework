<script lang="ts" setup>
import { RwBreadcrumb } from 'rw-vue-framework/controls'
import { moduleName } from './langs';
import { ArrowRight } from 'rw-vue-framework/element-plus'

const breadcrumb1 = RwBreadcrumb.init(moduleName, 'breadcrumb1', {
  default:[{value:'<a href="http://www.baidu.com" target="_blank">home</a>',to:'/'},
            {value:'promotion management', to:'/promotion',replace:true},
            {value:'promotion detail', to:'/'},
            {value:'promotion detail', to:'/'}],
  // separatorIcon: ArrowRight,
  separator: '/'
})
</script>
<template>
  <RwBreadcrumb.Template :control="breadcrumb1"/>
</template>
