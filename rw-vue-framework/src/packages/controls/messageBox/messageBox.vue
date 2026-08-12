<script lang="ts" setup>
import { type OptionT } from './messageBox'
import { ElMessageBox, ElButton } from 'element-plus'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const messageBoxProps = computed(() => {
  const { ...rest } = props.control
  return rest
})

const open = () => {
  ElMessageBox(messageBoxProps.value)
}
</script>
<template>
  <ElButton @click="open">
    {{ control.name }}
  </ElButton>
</template>
