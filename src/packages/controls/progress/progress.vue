<script lang="ts" setup>
import { type OptionT } from "./progress"
import { ElProgress } from "element-plus";
import { isComponent, isHTML } from "../../utils";
import { computed } from "vue";

const props = defineProps<{ control: Partial<OptionT> }>()

const progressProps = computed(() => {
  const {default: _default, ...rest} = props.control
  return rest
})
</script>

<template>
  <ElProgress v-bind="progressProps" >
    <template #default v-if="control.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>
  </ElProgress>
</template>
