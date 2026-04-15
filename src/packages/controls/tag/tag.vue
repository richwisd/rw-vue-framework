<script lang="ts" setup>
import { type OptionT } from "./tag"
import { ElTag } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const tagProps = computed(() => {
  const { default: _default, ...rest } = props.control
  return rest
})
</script>
<template>
  <ElTag v-bind="tagProps" @click="(e) => control?.click?.(e)" @close="(e) => control?.close?.(e)">
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
    <template #default v-else-if="control.default">
      <component :is="control.default" v-if="isComponent(control.default) &&!isHTML(control.default)" />
      <div v-else-if="typeof control.default ==='string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>
  </ElTag>
</template>
