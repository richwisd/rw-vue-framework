<script lang="ts" setup>
import { RwInfiniteScroll } from 'rw-vue-framework/controls'
import { moduleName } from './langs';

const infiniteScroll1 = RwInfiniteScroll.init(moduleName,'infiniteScroll1', {
})

</script>

<template>
  <RwInfiniteScroll.Template :control = "infiniteScroll1" />
</template>
