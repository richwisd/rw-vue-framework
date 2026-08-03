<script lang="ts" setup>
import { RwProgress } from 'rw-vue-framework/controls'
import { moduleName } from './langs';

const format = (percentage:number) => (percentage === 100 ? 'Full' : `${percentage}%`)
const increase = (percentage:number) => {
  percentage += 10
  if (percentage > 100) {
    percentage = 100
  }
}
const decrease = (percentage:number) => {
  percentage -= 10
  if (percentage < 0) {
    percentage = 0
  }
}


const progress1 = RwProgress.init(moduleName, 'progress1', {
  percentage :50,
  format: format,
  textInside: true,
  strokeWidth: 40,
  type: 'circle',

})

const progress2 = RwProgress.init(moduleName, 'progress2', {
  percentage :50,
  indeterminate: true,
  // default:'<button style="width: 40px;height: 40px;border-radius: 50%; background: #ff4757;color: white;border: none;text-align: center;padding:0;" @click="increase(progress2.percentage)">+</button><p/><button style="width: 40px;height: 40px;border-radius: 50%; background: #ff4757;color: white;border: none;text-align: center;padding:0;" @click="decrease(progress2.percentage)">-</button>',
})


</script>
<template>
  <RwProgress.Template :control="progress1" />
  <RwProgress.Template :control="progress2" />
</template>
