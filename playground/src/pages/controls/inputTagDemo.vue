<script lang="ts" setup>
import { RwInputTag } from 'rw-vue-framework/controls'
import { reactive,ref } from 'vue'
import { moduleName } from './langs'

const value1 = ref([])
const testInput1 = reactive(RwInputTag.init(moduleName, 'username',{
  change: (val) => {
    console.log('change',val)
    return !!val
  }
}))

const value2 = ref([])
const testInput2 = reactive(RwInputTag.init(moduleName, 'password'))

</script>

<template>
  <RwInputTag.Template :control="testInput1" v-model="value1" />
  <RwInputTag.Template :control="testInput2" v-model="value2" />
</template>
