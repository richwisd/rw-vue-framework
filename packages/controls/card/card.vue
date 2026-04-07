<script lang="ts" setup>
import { OptionT } from './card'
import { ElCard } from 'element-plus'
import { isComponent, isHTML } from '@rw-vue-framework/utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()


const cardProps = computed(() => {
  const { default: _default, header, footer, ...rest } = props.control
  return rest
})
</script>


<template>
  <ElCard v-bind="cardProps">
    <!-- 中间内容 -->
    <template #default v-if="props.control.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
      </template>
    <!-- 头部标题 -->
    <template #header v-if="control.header">
      <component :is="control.header" v-if="isComponent(control.header) && !isHTML(control.header)" />
      <div v-else-if="typeof control.header === 'string' && isHTML(control.header)" v-html="control.header"></div>
      <span v-else>{{ control.header }}</span>
    </template>
    <!-- 底部内容 -->
    <template #footer v-if="control.footer">
      <component :is="control.footer" v-if="isComponent(control.footer) && !isHTML(control.footer)" />
      <div v-else-if="typeof control.footer === 'string' && isHTML(control.footer)" v-html="control.footer"></div>
      <span v-else>{{ control.footer }}</span>
    </template>
  </ElCard>
</template>
