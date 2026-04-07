<script lang="ts" setup>
import { OptionT } from "./badge"
import { ElBadge } from 'element-plus'
import { isComponent, isHTML } from '@rw-vue-framework/utils'
import { computed } from "vue";

const props = defineProps<{ control: Partial<OptionT> }>()

const badgeProps = computed(() => {
  const { default:string, content,...rest} = props.control
  return rest
})

const fieldValue = defineModel<string>()
</script>

<template>
  <ElBadge :value="fieldValue" v-bind="badgeProps">
    {{ control.name }}
    <template #default v-if="control.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>
    <template #content="{value}" v-if="control.content">
      <component :is="control.content" v-if="isComponent(control.content) && !isHTML(control.content)" />
      <div v-else-if="typeof control.content === 'string' && isHTML(control.content)" v-html="control.content"></div>
      <span v-else>{{ control.content }}</span>
      <span>{{ value }}</span>
    </template>
  </ElBadge>
</template>
