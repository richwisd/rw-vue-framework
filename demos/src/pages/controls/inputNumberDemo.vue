
<script lang="ts" setup>
import { RwInputNumber } from 'rw-vue-framework/controls'
import { markRaw, ref } from 'vue'
import { Search } from 'rw-vue-framework/element-plus'

import { moduleName } from './langs'

const value1 = ref(0)
const testInput1 = RwInputNumber.init(moduleName, 'username',{
  prefix:'<span>￥</span>',
  increaseIcon: markRaw(Search),
  change: (val) => {
    console.log('change',val)
    return !!val
  },
})

const value2 = ref(0)
const testInput2 = RwInputNumber.init(moduleName, 'password')

</script>

<template>
  <RwInputNumber.Template :control="testInput1" v-model="value1" />
  <RwInputNumber.Template :control="testInput2" v-model="value2" />
</template>
