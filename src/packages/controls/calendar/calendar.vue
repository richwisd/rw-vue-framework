<script lang="ts" setup>
import { type OptionT } from './calendar'
import { ElCalendar } from 'element-plus';
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const calendarProps = computed(() => {
  const { dateCell, header, ...rest }= props.control
  return rest
})

const fieldValue =defineModel<Date>()
</script>

<template>
  <ElCalendar v-model="fieldValue" v-bind="calendarProps">
    <template #dateCell v-if="control.dateCell">
      <component :is="control.dateCell" v-if="isComponent(control.dateCell) && !isHTML(control.dateCell)" />
      <div v-else-if="typeof control.dateCell === 'string' && isHTML(control.dateCell)" v-html="control.dateCell"></div>
      <span v-else>{{ control.dateCell }}</span>
    </template>
    <template #header v-if="control.header">
      <component :is="control.header" v-if="isComponent(control.header) && !isHTML(control.header)" />
      <div v-else-if="typeof control.header === 'string' && isHTML(control.header)" v-html="control.header"></div>
      <span v-else>{{ control.header }}</span>
    </template>
  </ElCalendar>
</template>
<style>
.is-selected {
  color: #1989fa;
}
</style>
