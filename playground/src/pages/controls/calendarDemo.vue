<script lang="ts" setup>
import { RwCalendar } from 'rw-vue-framework/controls'
import { moduleName } from './langs';
import { ref } from 'vue';

const value1 = ref(new Date())
const calendar1 = RwCalendar.init(moduleName, 'calendar1', {
  // dateCell:`<span :class="data.isSelected ? 'is-selected' : ''">{{ data.day.split('-').slice(1).join('-') }}{{ data.isSelected ? '✔️' : '' }}</span>`,
  header:'<span> Custom header content </span>',
  // range:[new Date(2022, 0, 1), new Date(2022, 1, 1)]
})
</script>
<template>
  <RwCalendar.Template v-model="value1"  :control="calendar1" />
</template>
