<script lang="ts" setup>
import { type OptionT } from './descriptions'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const descriptionsProps = computed(() => {
  const { default: _default, title, extra, ...rest } = props.control
  return {
    ...rest,
  }
})
</script>
<template>
  <ElDescriptions v-bind="descriptionsProps">
    <template #default>
    <ElDescriptionsItem
      v-for="(item, index) in control.default"
      :key="index" v-bind="{ label:item?.label, span:item?.span, rowspan:item?.rowspan, width:item?.width, minWidth:item?.minWidth, labelWidth: item?.labelWidth, align:item?.align, labeAlign:item.labeAlign, className: item?.className, labelClassName: item?.labelClassName }">
      <div v-if="typeof item?.value === 'string' && isHTML(item?.value)" v-html="item?.value"></div>
      <span v-else>{{ item?.value }}</span>
    </ElDescriptionsItem>
  </template>
  <template #title v-if="control.title">
    <component :is="control.title" v-if="isComponent(control.title) &&!isHTML(control.title)" />
    <div v-else-if="typeof control.title ==='string' && isHTML(control.title)" v-html="control.title"></div>
    <span v-else>{{ control.title }}</span>
  </template>
  <template #extra v-if="control.extra">
    <component :is="control.extra" v-if="isComponent(control.extra) && !isHTML(control.extra)" />
    <div v-else-if="typeof control.extra ==='string' && isHTML(control.extra)" v-html="control.extra"></div>
    <span v-else>{{ control.extra }}</span>
  </template>
  </ElDescriptions>
</template>
