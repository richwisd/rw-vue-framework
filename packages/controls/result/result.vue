<script lang="ts" setup>
import { OptionT } from "./result"
import { ElResult } from "element-plus"
import { isComponent, isHTML } from "@rw-vue-framework/utils";
import { computed } from "vue";

const props = defineProps<{ control: Partial<OptionT>}>()

const resultProps = computed(() => {
  const { icon, title, subTitle, extra, ...rest} = props.control
  return rest
})
</script>

<template>
  <ElResult v-bind="resultProps">
      <template #icon v-if="control.icon">
        <component :is="control.icon" v-if="isComponent(control.icon) && !isHTML(control.icon)" />
        <div v-else-if="typeof control.icon === 'string' && isHTML(control.icon)" v-html="control.icon"></div>
        <span v-else>{{ control.icon }}</span>
      </template>
      <template #title v-if="control.title">
        <component :is="control.title" v-if="isComponent(control.title) && !isHTML(control.title)" />
        <div v-else-if="typeof control.title === 'string' && isHTML(control.title)" v-html="control.title"></div>
        <span v-else>{{ control.title }}</span>
      </template>
      <template #sub-title v-if="control.subTitle">
        <component :is="control.subTitle" v-if="isComponent(control.subTitle) && !isHTML(control.subTitle)" />
        <div v-else-if="typeof control.subTitle === 'string' && isHTML(control.subTitle)" v-html="control.subTitle"></div>
        <span v-else>{{ control.subTitle }}</span>
      </template>
      <template #extra v-if="control.extra">
        <component :is="control.extra" v-if="isComponent(control.extra) && !isHTML(control.extra)" />
        <div v-else-if="typeof control.extra === 'string' && isHTML(control.extra)" v-html="control.extra"></div>
        <span v-else>{{ control.extra }}</span>
      </template>
  </ElResult>
</template>
