<script lang="ts" setup>
import {  type OptionT } from "./autocomplete"
import { ElAutocomplete } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from "vue";

const props = defineProps<{ control: Partial<OptionT> }>()

const autocompleteProps = computed(() => {
  const { prefix, suffix, prepend, append, default: defaultSlot, loadingSlot, ...rest } = props.control
  return rest
})

const fieldValue = defineModel<string>()
</script>

<template>
  <ElAutocomplete v-model="fieldValue" v-bind="autocompleteProps"
    @change="(val) => control.change?.(val)"
    @focus="(event) => control.focus?.(event)"
    @blur="(event) => control.blur?.(event)"
    @input="(val) => control.input?.(val)"
    @clear="() => control.clear?.()"
    @select="(item) => control.select?.(item)">

    <template #default v-if="control?.default">
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>

    <template #loading v-if="control?.loadingSlot">
      <component :is="control.loadingSlot" v-if="isComponent(control.loadingSlot) && !isHTML(control.loadingSlot)" />
      <div v-else-if="typeof control.loadingSlot === 'string' && isHTML(control.loadingSlot)" v-html="control.loadingSlot"></div>
      <span v-else>{{ control.loadingSlot }}</span>
    </template>

    <template #prefix v-if="control?.prefix">
      <component :is="control.prefix" v-if="isComponent(control.prefix) && !isHTML(control.prefix)" />
      <div v-else-if="typeof control.prefix === 'string' && isHTML(control.prefix)" v-html="control.prefix"></div>
      <span v-else>{{ control.prefix }}</span>
    </template>

    <template #suffix v-if="control?.suffix">
      <component :is="control.suffix" v-if="isComponent(control.suffix) && !isHTML(control.suffix)" />
      <div v-else-if="typeof control.suffix === 'string' && isHTML(control.suffix)" v-html="control.suffix"></div>
      <span v-else>{{ control.suffix }}</span>
    </template>

    <template #prepend v-if="control?.prepend">
      <component :is="control.prepend" v-if="isComponent(control.prepend) && !isHTML(control.prepend)" />
      <div v-else-if="typeof control.prepend === 'string' && isHTML(control.prepend)" v-html="control.prepend"></div>
      <span v-else>{{ control.prepend }}</span>
    </template>

    <template #append v-if="control?.append">
      <component :is="control.append" v-if="isComponent(control.append) && !isHTML(control.append)" />
      <div v-else-if="typeof control.append === 'string' && isHTML(control.append)" v-html="control.append"></div>
      <span v-else>{{ control.append }}</span>
    </template>
  </ElAutocomplete>
</template>
