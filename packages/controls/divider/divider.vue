<script lang="ts" setup>
import { OptionT } from './divider'
import { ElDivider } from 'element-plus'
import { isComponent, isHTML } from '@rw-vue-framework/utils'
import { computed } from 'vue'
import { t } from '@rw-vue-framework/locale'

const props = defineProps<{ control: Partial<OptionT> }>()

const dividerProps = computed(() => {
  const { default: _default, ...rest } = props.control
  return rest
})
</script>

<template>
  <ElDivider v-bind="dividerProps">
    <template #default>
      <template v-if="control?.default">
        <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
        <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
        <span v-else>{{ control.default }}</span>
      </template>
      <template v-else>
        {{ control?.text ?? t(`${control.moduleName}.${control.name}`) }}
      </template>
    </template>
  </ElDivider>
</template>
