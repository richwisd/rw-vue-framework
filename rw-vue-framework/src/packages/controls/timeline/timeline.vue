<script lang="ts" setup>
import { type OptionT } from './timeline'
import { ElTimeline, ElTimelineItem } from 'element-plus'
import { isComponent ,isHTML } from '../../utils';
import { computed } from 'vue'

const props=defineProps<{ control: Partial<OptionT> }>()

const lists = computed(() => props.control?.lists || [])

const optionsList = computed(() => lists.value)

const timelineProps = computed(() => {
  const { default: _default, ...rest } = props.control
  return rest
})
</script>

<template>
  <ElTimeline>
    <ElTimelineItem v-bind="timelineProps"  v-for="(item) in optionsList" :timestamp="item.value" :color="item.color" :icon="item.icon" :size="item.size" :hollow="item.hollow" :type="item.type">
    <template #default v-if="control.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>
    </ElTimelineItem>
  </ElTimeline>
</template>
