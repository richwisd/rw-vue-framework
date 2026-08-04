<script lang="ts" setup>
import { type ExtractPropTypes, ref } from 'vue'
import { RwPageBase } from '../pageBase'
import { RwForm } from '../'
import { type OptionT } from './pageForm'
defineProps<{
  control: Partial<OptionT>,
  inDialog?: boolean
}>()

const formRef = ref<ExtractPropTypes<typeof RwForm.Template>>()

async function submit(reloadData: boolean = false) {
  return await formRef.value!.submit(reloadData)
}

async function reset() {
  return await formRef.value!.reset()
}

async function loadInfo() {
  return await formRef.value!.loadInfo()
}

// 新增：转发 setExternalLoading 方法
const setExternalLoading = (isLoading: boolean, text?: string) => {
  return formRef.value?.setExternalLoading?.(isLoading, text)
}

const submitBefore = async () => {
  return await formRef.value?.submitBefore(formRef.value?.formData)
}

const getFormValue = () => formRef.value?.formValue
const validate = async () => {
  const res = await formRef.value?.validate()
  return res
}

defineExpose({
  validate: validate,
  changed: formRef.value?.changed,
  FormData: formRef.value?.formData,
  getFormValue: getFormValue,
  submit,
  submitBefore,
  reset,
  loadInfo,
  setExternalLoading // 新增暴露此方法
})
</script>

<template>
  <RwPageBase.Template :control="control?.page as RwPageBase.OptionT" :in-dialog="inDialog">
    <RwForm.Template :control="control.form as RwForm.OptionT" ref="formRef" />
    <template #SlotPageBottom>
      <slot name="SlotPageBottom"> </slot>
    </template>
  </RwPageBase.Template>
</template>
