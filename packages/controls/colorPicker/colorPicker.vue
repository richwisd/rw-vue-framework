<script lang="ts" setup>
import { OptionT } from "./colorPicker"
import { ElColorPicker } from 'element-plus'
import { computed } from "vue";

const props = defineProps<{ control: Partial<OptionT> }>()

const colorPickerProps = computed(() => {
  const { ...rest } = props.control
  return rest
})

const fieldValue = defineModel<string>()
</script>

<template>
  <ElColorPicker v-model="fieldValue" v-bind="colorPickerProps" @change="(val) => control.change?.(val)" />
</template>
