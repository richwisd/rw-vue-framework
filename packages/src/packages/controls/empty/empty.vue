<script lang="ts" setup>
import { type OptionT } from './empty'
import { ElEmpty } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const emptyProps = computed(() => {
  const { default: _default, image, description, ...rest } = props.control
  return rest
})
</script>

<template>
  <ElEmpty v-bind="emptyProps">
    <template #default v-if="control.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else style="color: darkgray;">{{ control.default }}</span>
    </template>
    <template #image v-if="control.image">
      <img :src="control.image" />
    </template>
    <template #description v-if="control.description">
      <component :is="control.description" v-if="isComponent(control.description) && !isHTML(control.description)" />
      <div v-else-if="typeof control.description === 'string' && isHTML(control.description)" v-html="control.description"></div>
      <span v-else style="color: darkgray;">{{ control.description }}</span>
    </template>
  </ElEmpty>
</template>
