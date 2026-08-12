<script lang="ts" setup>
import { Transfer } from 'rw-vue-framework/controls'
import { ref } from 'vue'
import { moduleName } from './langs'


interface Option {
  key: number
  label: string
  // disabled: boolean
}

const generateData = () => {
  const data1: Option[] = []
  for (let i = 1; i <= 15; i++) {
    data1.push({
      key: i,
      label: `Option ${i}`,
      // disabled: i % 4 === 0,
    })
  }
  return data1
}

const data = ref<Option[]>(generateData())
const onChange = (val:any):any =>{
  console.log('val:',val)
}

const value1 = ref([])
const testTransfer1 = Transfer.init(moduleName, 'left',{
  data: data.value,
  change: onChange,
  filterable: true,
  leftFooter: 'Footer1',
  rightEmpty: 'Empty1',
})
</script>

<template>
  <Transfer.Template :control="testTransfer1" v-model="value1"  />
</template>
