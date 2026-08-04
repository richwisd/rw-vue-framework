<script setup lang="ts">
import { ElPagination } from 'element-plus'

import { useLocalSettingStore } from '../../stores/localSetting'

import { RwPagination } from './index'

const localSetting = useLocalSettingStore()

defineProps<{ control: Partial<RwPagination.OptionT> }>()

const emits = defineEmits(['update:currentPage', 'update:pageSize'])

const handleSizeChange = () => {
  emits('update:currentPage', 1)
}

const onChange = (currentPage:number, pageSize:number) => {
  emits('update:currentPage', currentPage)
  emits('update:pageSize', pageSize)
}
</script>
<template>
  <slot name="SlotPaginationTop"></slot>
  <ElPagination
    v-bind="control"
    :background="!!localSetting.pageTable.pagination.showBgColor"
    hide-on-single-page
    style="padding: 0"
    v-model:current-page="control.currentPage"
    v-model:page-size="control.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="control.total"
    @change="onChange"
    @size-change="handleSizeChange"
  >
  </ElPagination>
  <slot name="SlotPaginationBottom"></slot>
</template>
