<script lang="ts" setup>
import { RwSteps } from 'rw-vue-framework/controls'
import { moduleName } from './langs';
import { Edit, Picture, Upload } from 'rw-vue-framework/element-plus'
import { ElButton } from 'rw-vue-framework/element-plus';
import { ref } from 'vue';

const active = ref(1)
const next = () => {
  if (active.value++ > 2) active.value = 0
}

const steps1 = RwSteps.init(moduleName, 'steps1', {
  alignCenter: true,
  // active: 1,
  finishStatus: 'success',
 default: [{ title:'steps1', description:'step1 description', icon: Edit },{ title:'steps2', description:'step2 description',icon: Picture },{ title:'steps3', description:'step3 description',icon: Upload}]
})
</script>
<template>
  <RwSteps.Template :control="steps1" :active="active" />
  <p/>
  <ElButton @click="next">NEXT</ElButton>
</template>
