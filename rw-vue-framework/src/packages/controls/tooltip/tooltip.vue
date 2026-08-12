<script lang="ts" setup>
import { type OptionT } from './tooltip'
import { ElTooltip } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const tooltipProps = computed(() => {
  const { default: _default, content, ...rest } = props.control
  return rest
})
</script>
<template>
  <ElTooltip v-bind="tooltipProps">
      <template #default>
        <component :is="control.default" v-if="isComponent(control.default) &&!isHTML(control.default)" />
        <div v-else-if="typeof control.default ==='string' && isHTML(control.default)" v-html="control.default"></div>
        <span v-else>{{ control.default }}</span>
      </template>
      <template #content>
        <div v-if="typeof control.content ==='string' && isHTML(control.content)" v-html="control.content"></div>
        <span v-else>{{ control.content }}</span>
      </template>
  </ElTooltip>
</template>
