<script lang="ts" setup>
import { OptionT } from './popover'
import { ElPopover } from 'element-plus'
import { isComponent, isHTML } from '@rw-vue-framework/utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const popoverProps = computed(() => {
  const { default: _default, reference, ...rest } = props.control
  return rest
})
</script>
<template>
  <ElPopover
    v-bind="popoverProps"
    @beforeEnter="() => control['before-enter']?.()"
    @afterEnter="() => control['after-enter']?.()"
    @beforeLeave="() => control['before-leave']?.()"
    @afterLeave="() => control['after-leave']?.()">

      <template #default>
        <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
        <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
        <span v-else>{{ control.default }}</span>
      </template>
      <template #reference>
        <component :is="control.reference" v-if="isComponent(control.reference) && !isHTML(control.reference)" />
        <div v-else-if="typeof control.reference === 'string' && isHTML(control.reference)" v-html="control.reference"></div>
        <span v-else>{{ control.reference }}</span>
      </template>

  </ElPopover>
</template>
