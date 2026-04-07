<script lang="ts" setup>
import { OptionT } from './backtop'
import { ElBacktop } from 'element-plus';
import { isComponent,isHTML } from '@rw-vue-framework/utils';
import { computed } from 'vue';

const props = defineProps<{ control :Partial<OptionT> }>();

const backtopProps = computed(() => {
  const { default:_default, ...rest} = props.control;
  return rest;
});
</script>

<template>
  <ElBacktop v-bind="backtopProps" @click="(val) => control.click?.(val)">
    <template #default v-if="control?.default">
      <component :is="control.default" v-if="isComponent(control.default) &&!isHTML(control.default)"/>
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>
  </ElBacktop>
</template>
