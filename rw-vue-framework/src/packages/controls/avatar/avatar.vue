<script lang="ts" setup>
import { type OptionT } from './avatar'
import { ElAvatar } from 'element-plus'
import { computed } from 'vue'
import { isComponent, isHTML } from '../../utils'

const props =defineProps<{ control : Partial<OptionT> }>()

const avatarProps = computed(() => {
  const { default: _default, ...rest } = props.control
  return rest
})

</script>

<template>
  <ElAvatar v-bind="avatarProps" @error="(event) =>control.error?.(event)">
    <span v-if="!control.default">{{ control.name }}</span>
    <template #default v-if="control.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>
  </ElAvatar>
</template>
