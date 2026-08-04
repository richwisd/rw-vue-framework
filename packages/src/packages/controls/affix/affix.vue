<script lang="ts" setup>
import { type OptionT } from './affix'
import { ElAffix, ElButton } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const affixProps = computed(() => {
  const {  ...rest } = props.control
  return rest
})

const handleChange = (fixed: boolean) => {
  props.control.change?.(fixed)
}

const handleScroll = (val: any) => {
  props.control.scroll?.(val)
}
</script>
<template>
  <ElAffix v-bind="affixProps" @change="handleChange" @scroll="handleScroll">
    <ElButton type="primary">{{ control.name }}</ElButton>
    <template #default v-if="control.default">
      <component
        :is="control.default"
        v-if="isComponent(control.default) && isHTML(control.default)"
      />
      <div
        v-else-if="
          typeof control.default === 'string' && isHTML(control.default)
        "
        v-html="control.default"
      ></div>
      <span v-else>{{ control.default }}</span>
    </template>
  </ElAffix>
</template>
