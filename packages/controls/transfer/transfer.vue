<script lang="ts" setup>
import { OptionT } from "./transfer"
import { ElTransfer } from 'element-plus'
import { computed } from "vue";
import { isComponent, isHTML } from '@rw-vue-framework/utils'

const props = defineProps<{ control: Partial<OptionT> }>()

const transferProps = computed(() => {
  const { default:option, leftFooter, rightFooter, leftEmpty, rightEmpty, ...rest } = props.control
  return rest
})
const fieldValue = defineModel<number[]>()
</script>

<template>
  <ElTransfer
    v-model="fieldValue"
    v-bind="transferProps"
    >
    <template #default v-if="control.default">
        <component :is="control.default"  v-if="isComponent(control.default) && !isHTML(control.default)"/>
        <span>{{ control.default }}</span>
    </template>

    <template #leftFooter v-if="control.leftFooter">
      <component :is="control.leftFooter" v-if="isComponent(control.leftFooter) && !isHTML(control.leftFooter)"/>
      <span>{{ control.leftFooter }}</span>
    </template>

    <template #rightFooter v-if="control.rightFooter">
      <component :is="control.rightFooter" v-if="isComponent(control.rightFooter) && !isHTML(control.rightFooter)"/>
      <span>{{ control.rightFooter }}</span>
    </template>

    <template #leftEmpty v-if="control.leftEmpty">
      <component :is="control.leftEmpty" v-if="isComponent(control.leftEmpty) && !isHTML(control.leftEmpty)"/>
      <span>{{ control.leftEmpty }}</span>
    </template>
    <template #rightEmpty v-if="control.rightEmpty">
      <component :is="control.rightEmpty" v-if="isComponent(control.rightEmpty) && !isHTML(control.rightEmpty)"/>
      <span>{{ control.rightEmpty }}</span>
    </template>
  </ElTransfer>
</template>
