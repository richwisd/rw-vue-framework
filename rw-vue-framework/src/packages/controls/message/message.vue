<script lang="ts" setup>
import { computed } from 'vue';
import { type OptionT } from './message'
import { ElMessage, ElButton } from 'element-plus'

const props = defineProps<{ control: Partial<OptionT> }>()

const MessageProps= computed(() => {
  const {...rest } = props.control
  return rest
})

const open=()=> {
  ElMessage(MessageProps.value)
}
</script>

<template>
  <ElButton @click=open>
    {{ control.name }}
  </ElButton>
</template>
