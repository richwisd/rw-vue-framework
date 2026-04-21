<script lang="ts" setup>
import { type OptionT } from './drawer'
import { ElDrawer } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const DrawerProps = computed(() => {
  const { default: _default, header, footer, ...rest } = props.control
  return rest
})

const fieldValue = defineModel<boolean>()
</script>

<template>
  <ElDrawer v-model="fieldValue" v-bind="DrawerProps"
    @open="()=> control.open?.()"
    @opened="()=> control.opened?.()"
    @close="()=> control.close?.()"
    @closed="()=> control.closed?.()"
    @open-auto-focus="()=> control.openAutoFocus?.()"
    @close-auto-focus="()=> control.closeAutoFocus?.()">
      <template #default v-if="control?.default">
        <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
        <div v-else-if="typeof control.default ==='string' && isHTML(control.default)" v-html="control.default"></div>
        <span v-else>{{ control.default }}</span>
      </template>
      <template #header v-if="control?.header">
        <component :is="control.header" v-if="isComponent(control.header) &&!isHTML(control.header)" />
        <div v-else-if="typeof control.header ==='string' && isHTML(control.header)" v-html="control.header"></div>
        <span v-else>{{ control.header }}</span>
      </template>
      <template #footer v-if="control?.footer">
        <component :is="control.footer" v-if="isComponent(control.footer) && !isHTML(control.footer)" />
        <div v-else-if="typeof control.footer ==='string' && isHTML(control.footer)" v-html="control.footer"></div>
        <span v-else>{{ control.footer }}</span>
      </template>
      {{ control.name }}
  </ElDrawer>
</template>
