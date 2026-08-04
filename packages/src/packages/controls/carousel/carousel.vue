<script lang="ts" setup>
import { type OptionT } from './carousel'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'

const props = defineProps<{ control: Partial<OptionT> }>()

const carouselProps = computed(() => {
  const { default:_default, ...rest } = props.control
  return rest
})
</script>

<template>
  <ElCarousel
      v-bind="carouselProps"
      @change="(val, oldVal) => control.change?.(val, oldVal)">

      <template #default v-if="control.default">
        <ElCarouselItem v-for="(item, index) in control.default" :key="index" v-bind="{ name: item?.name, label: item?.label }">
        <component :is="item?.value" v-if="isComponent(item?.value) &&!isHTML(item?.value)" />
        <div v-else-if="typeof item?.value ==='string' && isHTML(item?.value)" v-html="item?.value"></div>
        <span v-else>{{ item?.value }}</span>
        </ElCarouselItem>
      </template>

  </ElCarousel>
</template>
