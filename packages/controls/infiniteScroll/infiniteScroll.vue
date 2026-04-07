<script lang="ts" setup>
import { OptionT } from './infiniteScroll'
// import { ElInfiniteScroll } from 'element-plus';
import { computed } from 'vue'

const props = defineProps<{ control : Partial<OptionT> }>()

const infiniteScrollProps= computed(() => {
  const { ...rest } = props.control
  return rest
})
</script>

<template>
  <!-- <ElInfiniteScroll v-bind="infiniteScrollProps" /> -->
   <ul v-bind="infiniteScrollProps">
    <li v-for="(item, index) in infiniteScrollProps" :key="index">{{ item }}</li>
   </ul>
</template>
