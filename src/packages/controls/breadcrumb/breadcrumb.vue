<script lang="ts" setup>
  import { type OptionT } from './breadcrumb'
  import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
  import { computed } from 'vue'
  import { isHTML } from '../../utils';

  const props = defineProps<{ control : Partial<OptionT>}>()

  const breadcrumbProps = computed(() => {
    const { default:_default,...rest } = props.control
    return rest
  })
</script>

<template>
  <ElBreadcrumb v-bind="breadcrumbProps">
    <template #default v-if="control.default">
      <ElBreadcrumbItem v-for="(item,index) in control.default" :key="index"  v-bind="{ to: item?.to, replace: item?.replace }">
        <!-- <component :is="item.value" v-if="isComponent(item.value) &&!isHTML(item.value)"/> -->
        <div v-if="typeof item.value === 'string' && isHTML(item.value)" v-html="item.value"></div>
        <span v-else>{{ item.value }}</span>
      </ElBreadcrumbItem>
    </template>
  </ElBreadcrumb>
</template>
