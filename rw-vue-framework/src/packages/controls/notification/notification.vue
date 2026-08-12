<script lang="ts" setup>
import { type OptionT } from './notification'
import { ElNotification, ElButton } from 'element-plus'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const NotificationProps = computed(() => {
  const { ...rest } = props.control
  return rest
})

const open = () => {
  ElNotification(NotificationProps.value)
}
</script>
<template>
  <ElButton @click="open">{{ control.name }}</ElButton>
</template>
