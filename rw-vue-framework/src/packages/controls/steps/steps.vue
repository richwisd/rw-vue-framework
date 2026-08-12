<script lang="ts" setup>
import { type OptionT } from "./steps"
import { ElSteps, ElStep } from 'element-plus'
import { isComponent, isHTML } from "../../utils";
import { computed } from "vue";

const props = defineProps<{ control: Partial<OptionT> }>()

const stepsProps = computed(() => {
  const { default:_default,...rest } = props.control
  return rest
})
</script>

<template>
  <ElSteps v-bind="stepsProps">
    <template #default v-if="control?.default">
      <ElStep v-for="(item, index) in control.default" :key="index" v-bind="{title: item?.title, icon: item?.icon, status: item?.status, description: item?.description}">
        <div v-if="item?.icon">
          <component :is="item?.icon" v-if="isComponent(item?.icon) && !isHTML(item?.icon)" />
          <div v-else-if="typeof item.icon === 'string' && isHTML(item?.icon)" v-html="item?.icon"></div>
          <span v-else>{{ item?.icon }}</span>
        </div>
        <div v-if="item?.description">
          <component :is="item?.description" v-if="isComponent(item?.description) &&!isHTML(item?.description)" />
          <div v-else-if="typeof item.description ==='string' && isHTML(item?.description)" v-html="item?.description"></div>
          <span v-else>{{ item?.description }}</span>
        </div>
        <div v-if="item?.title">
          <component :is="item?.title" v-if="isComponent(item?.title) &&!isHTML(item?.title)" />
          <div v-else-if="typeof item.title ==='string' && isHTML(item?.title)" v-html="item?.title"></div>
          <span v-else>{{ item?.title }}</span>
        </div>
      </ElStep>
    </template>
  </ElSteps>
</template>
