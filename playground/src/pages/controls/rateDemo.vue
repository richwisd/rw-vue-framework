<script lang="ts" setup>
  import { RwRate } from 'rw-vue-framework/controls'

  import { ref } from 'vue'

  import { moduleName } from './langs';

  const value1=ref(0)
  const testRate1 =RwRate.init(moduleName,'testRate1',{
      texts: ['oops', 'disappointed', 'normal', 'good', 'great'],
      showText: true,
      size: 'large',
  })
</script>
<template>
  <RwRate.Template v-model="value1" :control="testRate1" style="float: left;"/>
</template>
