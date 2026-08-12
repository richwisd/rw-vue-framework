<script lang="ts" setup>
import { type OptionT } from './popconfirm'
import { ElPopconfirm } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'
import { RwButton } from "../button"
import { t } from '../../locale'

const props = defineProps<{ control: OptionT }>()

const popconfrimProps = computed(() => {
  const { reference, actions, label, confirmButtonText, cancelButtonText, ...rest } = props.control
  return {...rest,
    title: t('AreYouSure') + t(label) + t('Doubt'),
    confirmButtonText: confirmButtonText? t(confirmButtonText) : t('Yes'),
    cancelButtonText: cancelButtonText? t(cancelButtonText) : t('No'),
  }
})

const buttonProps = computed(() => {
  const { button, disabled, label } = props.control
  return {
    type: props.control.confirmButtonType,
    ...button,
    disabled,
    label: t(label),
    text: props.control.text ?? button.text ?? false
   }
})

const emits = defineEmits(["click"])

function onConfirm(e: MouseEvent) {
  if (props.control?.confirm) {
    props.control.confirm(e)
  } else {
    emits("click", props.control.button)
  }
}
</script>
<template>
  <ElPopconfirm
    v-bind="popconfrimProps"
    @confirm="onConfirm"
    @cancel="(e) => props.control?.cancel?.(e)">

    <template #reference v-if="control.reference">
      <component :is="control.reference" v-if="isComponent(control.reference) && !isHTML(control.reference)" />
      <div v-else-if="typeof control.reference === 'string' && isHTML(control.reference)" v-html="control.reference"></div>
      <RwButton.Template v-else :control="buttonProps" />
    </template>

    <template #reference v-else-if="buttonProps">
      <RwButton.Template :control="buttonProps" />
    </template>

    <template #actions>
      <component :is="control.actions" v-if="isComponent(control.actions) && !isHTML(control.actions)" />
      <div v-else-if="typeof control.actions === 'string' && isHTML(control.actions)" v-html="control.actions"></div>
      <span v-else>{{ control.actions }}</span>
    </template>
  </ElPopconfirm>
</template>
