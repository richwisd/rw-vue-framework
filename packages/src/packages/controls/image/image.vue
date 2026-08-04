
<script lang="ts" setup>
import { ElImage } from 'element-plus'
import { type OptionT } from './image'
import { computed } from 'vue'
import { isComponent, isHTML } from '../../utils'

defineOptions({
  name: 'RwImage',
})

const props = defineProps<{ control: OptionT }>()
const imagePorps = computed(() => {
  const { placeholder, error, viewer, progress, toolbar, ...rest } = props.control
  return rest
})
const previewSrcList = computed(() => {
  if (props.control.isPreview) {
    return [props.control.src]
  }
  return props.control.previewSrcList ?? []
})

</script>

<template>
  <ElImage v-bind="imagePorps" :preview-src-list="previewSrcList">
    <template v-if="$slots.placeholder" #placeholder>
      <slot name="placeholder"></slot>
    </template>
    <template v-else-if="control?.placeholder" #placeholder>
      <component :is="control.placeholder" v-if="isComponent(control.placeholder) && !isHTML(control.placeholder)" />
      <div v-else-if="typeof control.placeholder === 'string' && isHTML(control.placeholder)" v-html="control.placeholder"></div>
      <span v-else>{{ control.placeholder }}</span>
    </template>

    <template v-if="$slots.error" #error>
      <slot name="error"></slot>
    </template>
    <template v-else-if="control?.error" #error>
      <component :is="control.error" v-if="isComponent(control.error) && !isHTML(control.error)" />
      <div v-else-if="typeof control.error === 'string' && isHTML(control.error)" v-html="control.error"></div>
      <span v-else>{{ control.error }}</span>
    </template>

    <template v-if="$slots.viewer" #viewer>
      <slot name="viewer"></slot>
    </template>
    <template v-else-if="control?.viewer" #viewer>
      <component :is="control.viewer" v-if="isComponent(control.viewer) && !isHTML(control.viewer)" />
      <div v-else-if="typeof control.viewer === 'string' && isHTML(control.viewer)" v-html="control.viewer"></div>
      <span v-else>{{ control.viewer }}</span>
    </template>

    <template v-if="$slots.progress" #progress>
      <slot name="progress"></slot>
    </template>
    <template v-else-if="control?.progress" #progress>
      <component :is="control.progress" v-if="isComponent(control.progress) && !isHTML(control.progress)" />
      <div v-else-if="typeof control.progress === 'string' && isHTML(control.progress)" v-html="control.progress"></div>
      <span v-else>{{ control.progress }}</span>
    </template>

    <template v-if="$slots.toolbar" #toolbar>
      <slot name="toolbar"></slot>
    </template>
    <template v-else-if="control?.toolbar" #toolbar>
      <component :is="control.toolbar" v-if="isComponent(control.toolbar) && !isHTML(control.toolbar)" />
      <div v-else-if="typeof control.toolbar === 'string' && isHTML(control.toolbar)" v-html="control.toolbar"></div>
      <span v-else>{{ control.toolbar }}</span>
    </template>
  </ElImage>
</template>
