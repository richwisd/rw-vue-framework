<script lang="ts" setup>
import {  type OptionT } from "./slider"
import { ElSlider} from 'element-plus'
import { computed, inject } from "vue";
import { FormDataKey, type FormData } from "../../utils";

const props = defineProps<{
  control: OptionT,
  modelValue?: number,// 添加modelValue属性支持v-model
  }>()

const sliderProps = computed(() => {
  const { ...rest } = props.control
    return rest
})



// 添加update:modelValue事件，支持v-model双向绑定
const emit = defineEmits(['update:modelValue'])

// 注入表单上下文（使用null作为默认值，避免警告）
const data = inject<FormData | null>(FormDataKey, null)

// 使用计算属性实现双向绑定，优先使用v-model，其次使用表单上下文
const fieldValue = computed({
  get: () => {
    // 1. 优先使用v-model绑定的值
    if (props.modelValue !== undefined) {
      return props.modelValue
    }
    // 2. 其次使用表单上下文中的值
    if (data) {
      return data.getFieldValue(props.control.name)
    }
    // 3. 如果都没有，返回undefined并在开发环境给出提示
    if (process?.env?.NODE_ENV !== 'production') {
      console.warn(`[RwSlider] 组件 '${props.control.name}' 没有绑定数据源。请使用v-model或确保在RwForm内使用。`)
    }
    return undefined
  },
  set: (value) => {
    // 1. 如果使用v-model，触发update事件
    if (props.modelValue !== undefined) {
      emit('update:modelValue', value)
    }
    // 2. 如果有表单上下文，更新上下文数据
    if (data) {
      data.setFieldValue(props.control.name, value)
    }
    // 如果两者都没有，只在开发环境给出提示
    if (props.modelValue === undefined && !data && process?.env?.NODE_ENV !== 'production') {
      console.warn(`[RwSlider] 组件 '${props.control.name}' 没有数据接收器。值的变更不会被保存。`)
    }
  }
})
</script>

<template>
  <ElSlider
    v-bind="sliderProps"
    v-model="fieldValue"
    @change="(val) =>  {control.change?.(val); control.changeData?.(control, val) }"
    @input="(val) => {control.input?.(val); control.changeData?.(control, val) }"

    >
  </ElSlider>
</template>

