<script lang="ts" setup>
import { RwCheckbox } from 'rw-vue-framework/controls'
import { ref, watch } from 'vue'
import { moduleName } from './langs'
import type { CheckboxValueType } from 'rw-vue-framework/element-plus'

const val1 =<string | number | boolean>''

const value = defineModel<string | number | (string | number)[]>()
// 全选相关
const isAllSelected = ref(false)
const isIndeterminate = ref(false)

const updateCheckAllStatus = () => {
  if (!Array.isArray(value.value)) return

  const allValues = [{value: 'New York', label: 'New York'}, {value: 'London', label: 'London'}, {value: 'Paris', label: 'Paris'}, {value: 'Tokyo', label: 'Tokyo'}]
    .filter((item: any) => !item.disabled)
    .map((item: any) => item.value)
  const selectedCount = value.value.filter((v) => allValues.includes(v)).length

  isAllSelected.value =
    selectedCount === allValues.length && allValues.length > 0
  isIndeterminate.value = selectedCount > 0 && selectedCount < allValues.length
}

const handleCheckAllChange = (val: CheckboxValueType) => {
  const allValues = [{value: 'New York', label: 'New York'}, {value: 'London', label: 'London'}, {value: 'Paris', label: 'Paris'}, {value: 'Tokyo', label: 'Tokyo'}]
    .filter((item: any) => !item.disabled)
    .map((item: any) => item.value)
  value.value = val ? [...allValues] : []
  isIndeterminate.value = false
}

watch(
  () => value.value,
  () => {
    if (isAllSelected.value && Array.isArray(value.value)) {
      console.log('value.value', value.value)
      updateCheckAllStatus()
    }
  },
  { immediate: true, deep: true },
)
const cities = [{value: 'New York', label: 'New York'}, {value: 'London', label: 'London'}, {value: 'Paris', label: 'Paris'}, {value: 'Tokyo', label: 'Tokyo'}]
const value1 = ref()
const testCheckbox1=RwCheckbox.init( moduleName,'testCheckbox1',[{value:'全选'}],{
  indeterminate: isIndeterminate.value,
  label: '全选',
})
const value2 =ref()
const testCheckbox2=RwCheckbox.init( moduleName,'testCheckbox2',cities,{
})
</script>

<template>
  <RwCheckbox.Template :v-model="value1" :control="testCheckbox1" />
  <RwCheckbox.Template v-model="value2" :control="testCheckbox2" @change="handleCheckAllChange"
  />
</template>
