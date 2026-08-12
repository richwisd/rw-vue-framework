<script lang="ts" setup>
import { type OptionT } from './watermark'
import { ElWatermark } from 'element-plus'
import { computed }  from 'vue'

const props = defineProps<{ control: Partial<OptionT>}>()

const watermarkProps = computed(() => {
  const { ...rest } = props.control
  return rest
})
</script>
<template>
  <ElWatermark v-bind="watermarkProps" style="width: 100%; height: 100%;">
  </ElWatermark>
</template>
