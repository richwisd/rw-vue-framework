<script lang="ts" setup>
import {  type OptionT } from "./segmented"
import { ElSegmented } from "element-plus";
import { isComponent, isHTML } from "../../utils";
import { computed } from "vue";
import { useFormValue } from "../../hooks"

const props = defineProps<{ control: Partial<OptionT>, modelValue?: any }>()

const segmentedProps = computed(() => {
  const {  ...rest} = props.control
  return rest
})
const emit = defineEmits(['update:modelValue'])
const { fieldValue } = useFormValue<OptionT>(
  'RwSegmented', // 组件名称
  props.control as OptionT,   // 控件配置
)
</script>

<template>
  <ElSegmented
    v-model="fieldValue"
    v-bind="segmentedProps"
    @change="(val) => control.change?.(val)">
    <template v-if="$slots.default" #default="scope">
      <slot name="default" v-bind="scope"></slot>
    </template>
    <template #default v-else-if="control?.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>
  </ElSegmented>
</template>
