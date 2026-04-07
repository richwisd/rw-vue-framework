<script lang="ts" setup>
import { OptionT } from './collapse'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { isComponent, isHTML } from '@rw-vue-framework/utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const collapseProps = computed(() => {
  const { default: _default, ...rest } = props.control
  return rest
})

const fieldValue = defineModel<string | string[]>()
</script>

<template>
  <ElCollapse v-model="fieldValue" v-bind="collapseProps" @change="(val)=> control.change?.(val)">

    <template #default v-if="control.default">
      <ElCollapseItem v-for="item in control.default" v-bind="{ name: item?.name, title: item?.title, icon: item?.icon, disabled: item?.disabled }">
      <component :is="item?.value" v-if="isComponent(item?.value) && !isHTML(item?.value)" />
      <div v-else-if="typeof item?.value === 'string' && isHTML(item?.value)" v-html="item?.value"></div>
      <span v-else>{{ item?.value }}</span>
      </ElCollapseItem>
    </template>

  </ElCollapse>
</template>
