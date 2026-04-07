<script lang="ts" setup>
import { OptionT } from "./switch"
import { ElSwitch } from 'element-plus'
import { computed } from "vue";
import { isComponent, isHTML } from '@rw-vue-framework/utils'
import { useFormValue } from "@rw-vue-framework/hooks";

// 添加modelValue属性，支持v-model绑定
const props = defineProps<{
  control: OptionT,
  modelValue?: any  // 添加modelValue属性支持v-model
}>()

const switchProps = computed(() => {
  const { activeAction, inactiveAction , ...rest } = props.control
  return rest
})

const emit = defineEmits(['update:modelValue'])

const { fieldValue } = useFormValue<OptionT>(
  'RwSwitch', // 组件名称
  props.control,   // 控件配置
)

// console.log('fieldValue: <switch>', fieldValue.value)
</script>

<template>
  <ElSwitch
    v-bind="switchProps"
    v-model="fieldValue"
    :active-value="control.activeValue ?? typeof fieldValue === 'number' ? 1 : true"
    :inactive-value="control.inactiveValue ??  typeof fieldValue === 'number' ? 0 : false"
    @change="(val) =>{  control.change?.(val); control.changeData?.(control, val) }"
    @click.stop
  >
    <template #activeAction v-if="control.activeAction">
      <component :is="control.activeAction"  v-if="isComponent(control.activeAction) && !isHTML(control.activeAction)"/>
      <span v-if="fieldValue">{{ control.activeAction }}</span>

    </template>
    <template #inactiveAction v-if="control.inactiveAction">
      <component :is="control.inactiveAction"  v-if="isComponent(control.inactiveAction) && !isHTML(control.inactiveAction)"/>
      <span v-if="!fieldValue">{{ control.inactiveAction }}</span>
    </template>
  </ElSwitch>

</template>
