<script lang="ts" setup>
import { computed } from 'vue'
import { type OptionT } from './tabs'
import { ElTabs } from 'element-plus'
import { RwTabPane } from '../tabPane'

const props = defineProps<{ control: OptionT }>()
const tapProps = computed(() => {
  const { tabPanes, addTabPane, ...rest } = props.control
  return rest
})

// const first = ref(props.control.tabPanes?.[0].tabPaneProps.name)

const first = computed(()=>{
  if(props.control?.defaultValue){
    const defaultValue = props.control.defaultValue
    if(typeof defaultValue === 'string'){
      return defaultValue
    }else if(typeof defaultValue === 'number'){
      return props.control.tabPanes?.[defaultValue].tabPaneProps.name
    }
  }

  return props.control.tabPanes?.[0].tabPaneProps.name
})

</script>

<template>
  <ElTabs v-bind="tapProps" v-model="first">
    <template v-for="tabPane in control.tabPanes" :key="tabPane.id">
      <RwTabPane.Template :control="tabPane" />
    </template>
  </ElTabs>
</template>
