<script lang="ts" setup>
import { type OptionT } from './tabPane'
import { RwTabs } from '../tabs'
import { RwFormItems } from '../formItems'
import { ElTabPane } from 'element-plus'
import { computed } from 'vue';
import { t } from '../../locale';

const props = defineProps<{ control: OptionT }>()
const tabPaneProps = computed(()=>{
  const { moduleName, name, tabPaneProps } = props.control
  return {
    label: t(`${moduleName}.${name}`),
    ...tabPaneProps,
  }
})
</script>

<template>
  <ElTabPane v-bind="tabPaneProps" >
    <template v-for="(item, index) in control.contents" :key="`${control.id}-${index}`">
      <RwTabs.Template v-if="item.controlType ==='tab'" :control="item as RwTabs.OptionT" />
      <RwFormItems.Template v-else-if="item.controlType ==='formItems'" :control="item as RwFormItems.OptionT" />
    </template>
  </ElTabPane>
</template>
