<script lang="ts" setup generic="T extends InputTypeT">
import { OptionT, InputTypeT, InputValueType } from "./mergeInput"
import { computed, markRaw } from 'vue'

// 导入各种组件
import { RwInputNumber } from '../inputNumber'
import { RwInput} from '../input'
import { RwAutocomplete } from '../autocomplete'
import { RwInputTag } from '../inputTag'
import { useFormValue } from "@rw-vue-framework/hooks";

// 组件映射 - 使用 markRaw 包装组件
const componentMap = markRaw({
  'input': RwInput.Template,
  'inputNumber': RwInputNumber.Template,
  'autocomplete': RwAutocomplete.Template,
  'inputTag': RwInputTag.Template
});

const props = defineProps<{
  control: Partial<OptionT<any>>,
  modelValue?: InputValueType<T>  // 添加modelValue属性支持v-model
}>()

// 根据泛型参数确定组件类型
const currentComponent = computed(() => {
  const type = (props.control.inputType || 'input') as T;
  return componentMap[type as keyof typeof componentMap];
});

const emit = defineEmits(['update:modelValue'])
const { fieldValue } = useFormValue<OptionT<T>>(
  'RwMergeInput', // 组件名称
  props.control as OptionT<T>,   // 控件配置
)
</script>

<template>
  <component
    :is="currentComponent"
    v-model="fieldValue"
    :control="control"
  />
</template>
