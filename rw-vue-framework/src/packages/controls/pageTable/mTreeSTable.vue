<script lang="ts" setup>
import { ElContainer, ElAside, ElMain } from 'element-plus'

import { RwPageTable, RwMTreeSTable } from '.';

import { RwButtonGroup } from '../';
import { watch } from 'vue';

const emits = defineEmits(["click"])

const props = defineProps<{
  control: RwMTreeSTable.OptionT
}>()

props.control.mTablePage.table.showCheckAll = false

props.control.mTablePage.table.showIndex = false

props.control.mTablePage.operateButtons.show = false

const deleteButtonIndex = props.control.mTablePage.operateButtons.controls.findIndex(control=>(control.name=="deleteSelected"))

if (deleteButtonIndex!=-1){
  props.control.mTablePage.operateButtons.controls.splice(deleteButtonIndex,1)
}

const clickButtons = (event: RwButtonGroup.OptionT, command: RwButtonGroup.OptionT) => {
    emits("click",event,command,props.control.tablePage.struct.mTableIDValue)
}

watch(()=>props.control.mTablePage.table.clickRow,(newValue)=>{
  props.control.tablePage.struct.mTableIDValue = newValue[props.control.mTablePage.struct.mTableID ?? 'id'] as string
})

</script>
<template>
   <ElContainer style="padding: 0px; margin: 0px;">
        <ElAside>
          <RwPageTable.Template :control="control.mTablePage" @click="clickButtons"></RwPageTable.Template>
        </ElAside>
        <ElMain style="padding: 0px; margin: 0px;">
          <RwPageTable.Template :control="control.mTablePage" @click="clickButtons"></RwPageTable.Template>
        </ElMain>
    </ElContainer>
</template>
<style lang="sass" scoped>

</style>
