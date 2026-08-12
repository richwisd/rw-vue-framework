<script setup lang="ts">

import { RwSearch } from './index'

import { RwButtonGroup } from '../buttonGroup'

import {
  ElForm
} from 'element-plus'

import { RwFormItems } from '../formItems'
import { ref, toRaw } from 'vue'
const formItemsRef = ref()

defineOptions({
  name: 'RwSearch',
})

const props = defineProps<{ control: Partial<RwSearch.OptionT> }>()

const emit = defineEmits(['onSearch'])

const onClickbtn = (e:any) => {
  switch(e.name){
    case 'search':
      emit('onSearch', toRaw(model.value))
      break;
    case 'reset':
      reset()
      // emit('onSearch', toRaw(formItemsRef.value?.formItemData.value))
      break;
  }
}

const modelData = props.control.formItems?.formItems.reduce((accumulator: any, item: any) => {
  // 处理 item.name 中的特殊字符
  return Object.assign(accumulator, { [item.name]: props.control.defaultData?.[item.name] ?? item?.defaultValue ?? '' });
}, {})

// console.log('modelData', modelData)
const model = ref({...modelData})
const reset = () => {
  model.value = { ...modelData }
  formItemsRef.value?.initSearchKeysAndValue()
}

defineExpose({
  formItemData: model
})
</script>

<template>
  <slot name="SlotSearchTop"></slot>
  <ElForm :inline="true" class="form-inline">
    <RwFormItems.Template
      v-if="control.formItems"
      :control="control.formItems"
      :model="model"
      ref="formItemsRef"
    >
      <template #extra>
        <RwButtonGroup.Template
          v-if="control.buttons"
          :control="control.buttons"
          @click="onClickbtn"
        ></RwButtonGroup.Template>
      </template>
    </RwFormItems.Template>
  </ElForm>

  <slot name="SlotSearchButtom"></slot>
</template>

<style lang="scss" scoped>
.form-inline{
  padding-bottom: 20px;
}
.form-inline::v-deep(.el-select) {
  --el-select-width: 220px;
}
</style>
