<script lang="ts" setup>
import {  type OptionT } from "./inputNumber"
import { ElInputNumber } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'
import { useFormValue } from "../../hooks"
import { t } from "../../locale"

const props = defineProps<{ control: OptionT, modelValue:number }>()

// 分离插槽相关属性
const inputNumberProps = computed(() => {
  const { prefix, suffix, decreaseIcon, increaseIcon, ...rest } = props.control
  return rest
})

const emit = defineEmits(['update:modelValue'])
// 初始化表单值绑定（核心代码）
const { fieldValue } = useFormValue<OptionT>(
  'RwInputNumber', // 组件名称
  props.control,   // 控件配置
)

const placeholder = computed(() => {
  const { placeholder, label, moduleName, name } = props.control
  if (placeholder) return t(`${moduleName}.${placeholder}`)

  const fieldName = label ?? t(`${moduleName}.${name}`)
  return t('controls.pleaseInput') + fieldName
})
</script>

<template>
  <ElInputNumber
    v-model="fieldValue"
    v-bind="inputNumberProps"
    :placeholder="placeholder"
    @change="(val,old) => control.change?.(val,old)"
    @focus="(event) => control.focus?.(event)"
    @blur="(event) => control.blur?.(event)"
    @input="(val) => control.input?.(val)">

    <template #prefix v-if="control?.prefix">
      <component :is="control.prefix" v-if="isComponent(control.prefix) && !isHTML(control.prefix)" />
      <div v-else-if="typeof control.prefix === 'string' && isHTML(control.prefix)" v-html="control.prefix"></div>
      <span v-else>{{ control.prefix }}</span>
    </template>

    <template #suffix v-if="control?.suffix">
      <component :is="control.suffix" v-if="isComponent(control.suffix) && !isHTML(control.suffix)" />
      <div v-else-if="typeof control.suffix === 'string' && isHTML(control.suffix)" v-html="control.suffix"></div>
      <span v-else>{{ control.suffix }}</span>
    </template>

    <template #decrease-icon v-if="control?.decreaseIcon">
      <component :is="control.decreaseIcon" v-if="isComponent(control.decreaseIcon) && !isHTML(control.decreaseIcon)" />
      <div v-else-if="typeof control.decreaseIcon === 'string' && isHTML(control.decreaseIcon)" v-html="control.decreaseIcon"></div>
      <span v-else>{{ control.decreaseIcon }}</span>
    </template>

    <template #increase-icon v-if="control?.increaseIcon">
      <component :is="control.increaseIcon" v-if="isComponent(control.increaseIcon) && !isHTML(control.increaseIcon)" />
      <div v-else-if="typeof control.increaseIcon === 'string' && isHTML(control.increaseIcon)" v-html="control.increaseIcon"></div>
      <span v-else>{{ control.increaseIcon }}</span>
    </template>
  </ElInputNumber>
</template>
