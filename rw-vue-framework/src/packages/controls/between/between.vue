<script lang="ts" setup>
import { RwBetween } from './'

import { ElRow, ElCol, ElInput } from 'element-plus'

defineOptions({
  name: 'RwBetween',
})

const props = defineProps<{ control: RwBetween.OptionT }>()
</script>
<template>
  <ElRow>
    <ElCol :span="11">
      <ElInput>
      </ElInput>
    </ElCol>
    <ElCol :span="2" align="middle">
      <span>-</span>
    </ElCol>

    <ElCol :span="11">
      <ElInput>
      </ElInput>
    </ElCol>
  </ElRow>
</template>
