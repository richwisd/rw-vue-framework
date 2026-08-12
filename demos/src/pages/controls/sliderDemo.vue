<script lang="ts" setup>
import { RwSlider } from 'rw-vue-framework/controls'
import { markRaw, reactive, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { moduleName } from './langs'
interface Mark {
  style: CSSProperties
  label: string
}
type Marks = Record<number, Mark | string>
const marks = reactive<Marks>({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA',
    },
    label: '50%',
  },
})

const value1=ref(0)
const testSlider1 = RwSlider.init(moduleName,'slider1',{
    min: 0,
    max: 100,
    step: 1,
    size: 'large',
    marks: marks,
    // range:true,
    // vertical:true,
    // height: '200px',
})
const value2 = ref(0)
const testSlider2 = RwSlider.init(moduleName,'slider2',{
  min: 0,
  max:100,
  showInput: true,
  showStops: true,
})
</script>


<template>
  <RwSlider.Template v-model="value1" :control="testSlider1" style="width: 500px;"/>
  <div style="height: 100px;"></div>
  <RwSlider.Template v-model="value2" :control="testSlider2" style="width: 500px;"/>
</template>


