<script lang="ts" setup>
import { RwButtonGroup, RwDropdown } from 'rw-vue-framework/controls'
import { moduleName } from './langs';
import { reactive } from 'vue';


const buttonGroup1 = reactive(RwButtonGroup.init(moduleName, { isGroup: true }))

buttonGroup1.addButton('inputA')
buttonGroup1.addButton('inputA', { separator: true })
buttonGroup1.addPopconfirm('inputB')
const dropdown1 = RwDropdown.init(moduleName, 'inputC')
dropdown1.addItem('inputD')
dropdown1.addItem('inputE')
buttonGroup1.addDropdown('inputC', dropdown1)




/**/
const buttonGroup2 = reactive(RwButtonGroup.init(moduleName, { isGroup: false }))

buttonGroup2.addButton('inputA', {  click: () => {
  const item = buttonGroup1.controls.find((item) => item.name === 'inputA')
  item!.disabled = true
}})

const dropdown2 = RwDropdown.init(moduleName, 'inputC')
dropdown2.addItem('inputD')
dropdown2.addItem('inputE')
buttonGroup2.addDropdown('inputC', dropdown2)
buttonGroup2.addPopconfirm('inputB')



</script>
<template>
<div>
  <RwButtonGroup.Template  :control="buttonGroup1" />
</div>
<br />
<br />
<br />
<div>
  <RwButtonGroup.Template  :control="buttonGroup2" />
</div>
</template>
