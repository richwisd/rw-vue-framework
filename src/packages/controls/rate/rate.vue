<script lang="ts" setup>
import { type OptionT } from "./rate"
import { ElRate } from 'element-plus'
import { computed } from "vue";


const props = defineProps<{ control: Partial<OptionT> }>()

const rateProps = computed(() => {
  const { ...rest} =props.control
  return rest
})
const fieldValue = defineModel<number>()
</script>

<template>
  <ElRate
    v-model="fieldValue"
    v-bind="rateProps"
    @change="(val) => control.change?.(val)">
    </ElRate>
</template>
