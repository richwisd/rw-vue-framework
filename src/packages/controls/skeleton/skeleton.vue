<script lang="ts" setup>
import { type OptionT } from "./skeleton"
import { ElSkeleton, ElSkeletonItem } from "element-plus"
import { isComponent, isHTML } from "../../utils";
import { computed } from "vue";

const props = defineProps<{ control: Partial<OptionT> }>()

const skeletonProps = computed(() => {
  const { default: _default, template,...rest } = props.control
  return rest
})
</script>

<template>
  <ElSkeleton v-bind="skeletonProps">
    <template #default v-if="control.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>
    <template #template v-if="control.template">
      <ElSkeletonItem v-if="Array.isArray(control.template)" v-for="(item, index) in control.template" :key="index" v-bind="{variant:item?.variant,style:item?.style}" />
      <div v-else>
        <component :is="control.template" v-if="isComponent(control.template) && !isHTML(control.template)" />
        <div v-else-if="typeof control.template === 'string' && isHTML(control.template)" v-html="control.template"></div>
        <span v-else>{{ control.template }}</span>
      </div>
    </template>
  </ElSkeleton>
</template>
