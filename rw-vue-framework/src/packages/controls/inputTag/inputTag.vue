<script lang="ts" setup>
import {  type OptionT } from './inputTag'
import { ElInputTag } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'
import { useFormValue } from '../../hooks'
import { t } from '../../locale'

const props = defineProps<{ control: OptionT; modelValue?: string[] }>()

const tagProps = computed(() => {
  const { prefix, suffix, tag, ...rest } = props.control
  return rest
})

const emit = defineEmits(['update:modelValue'])
const { fieldValue } = useFormValue<OptionT>(
  'RwInputTag', // 组件名称
  props.control, // 控件配置
)

const currentValue = computed({
  get: () => {
    if (
      typeof fieldValue.value === 'string' &&
      fieldValue.value.indexOf(',') !== -1
    ) {
      return fieldValue.value.split(',')
    } else if (typeof fieldValue.value === 'string' && fieldValue.value) {
      return [fieldValue.value]
    }
    return []
  },
  set: (val) => {
    // 过滤重复值，确保标签唯一
    if (props.control.unique) {
      const uniqueValues = Array.from(new Set(val))
      fieldValue.value = uniqueValues.join(',')
    } else {
      fieldValue.value = val.join(',')
    }
  },
})

// 处理添加标签事件，防止重复和空标签
const handleAddTag = (tag: string | string[]) => {
  // 统一转为数组处理
  const tagArr = Array.isArray(tag) ? tag : [tag]
  // 过滤空标签
  const validTags = tagArr.filter((t) => t && t.trim() !== '')
  if (validTags.length === 0) return

  if (props.control.unique) {
    // 检查标签是否已存在，只添加不存在的标签
    const currentTags = currentValue.value
    const newTags = validTags.filter((t) => !currentTags.includes(t))
    if (newTags.length > 0) {
      currentValue.value = [...currentTags, ...newTags]
    }
  }

  // 调用原始的 add-tag 事件处理函数
  props.control['add-tag']?.(tag)
}

const placeholder = computed(() => {
  const { placeholder, label, moduleName, name } = props.control
  if (placeholder) return t(`${moduleName}.${placeholder}`)

  const fieldName = label ?? t(`${moduleName}.${name}`)
  return t('controls.pleaseInput') + fieldName
})
</script>

<template>
  <ElInputTag
    v-model="currentValue"
    v-bind="tagProps"
    :tag-type="control?.tagType ?? 'primary'"
    :placeholder="placeholder"
    @change="(val) => control.change?.(val)"
    @focus="(event) => control.focus?.(event)"
    @blur="(event) => control.blur?.(event)"
    @input="(val) => control.input?.(val)"
    @add-tag="handleAddTag"
    @remove-tag="(tag, index) => control['remove-tag']?.(tag, index)"
    @clear="() => control.clear?.()"
  >
    <template #prefix v-if="control?.prefix">
      <component
        :is="control.prefix"
        v-if="isComponent(control.prefix) && !isHTML(control.prefix)"
      />
      <div
        v-else-if="typeof control.prefix === 'string' && isHTML(control.prefix)"
        v-html="control.prefix"
      ></div>
      <span v-else>{{ control.prefix }}</span>
    </template>

    <template #suffix v-if="control?.suffix">
      <component
        :is="control.suffix"
        v-if="isComponent(control.suffix) && !isHTML(control.suffix)"
      />
      <div
        v-else-if="typeof control.suffix === 'string' && isHTML(control.suffix)"
        v-html="control.suffix"
      ></div>
      <span v-else>{{ control.suffix }}</span>
    </template>

    <template #decrease-icon v-if="control?.tag">
      <component
        :is="control.tag"
        v-if="isComponent(control.tag) && !isHTML(control.tag)"
      />
      <div
        v-else-if="typeof control.tag === 'string' && isHTML(control.tag)"
        v-html="control.tag"
      ></div>
      <span v-else>{{ control.tag }}</span>
    </template>
  </ElInputTag>
</template>
