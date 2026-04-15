<script lang="ts" setup>
import { type OptionT } from "./alert"
import { ElAlert } from "element-plus";
import { isComponent, isHTML } from "../../utils";
import { computed } from "vue";

const props = defineProps<{ control: Partial<OptionT> }>()

/**
 * 从 control 对象中提取并返回排除 default、title 和 icon 之外的其他属性
 * @returns 剩余的属性对象
 * */
const AlertProps = computed(() => {
  const { default: _default, title, icon, ...rest } = props.control
  return rest
})
</script>

<template>
  <ElAlert v-bind="AlertProps" @close="(event) => control.close?.(event)">{{ control?.name }}
    <template #default v-if="control?.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>
    <template #title v-if="control?.title">
      <component :is="control.title" v-if="isComponent(control.title) && !isHTML(control.title)" />
      <div v-else-if="typeof control.title === 'string' && isHTML(control.title)" v-html="control.title"></div>
      <span v-else>{{ control.title }}</span>
    </template>
    <template #icon v-if="control?.icon">
      <component :is="control.icon" v-if="isComponent(control.icon) &&!isHTML(control.icon)" />
      <div v-else-if="typeof control.icon ==='string' && isHTML(control.icon)" v-html="control.icon"></div>
      <span v-else>{{ control.icon }}</span>
    </template>
  </ElAlert>
</template>
