<script lang="ts" setup>
import { ElDatePicker } from 'element-plus'
import { isComponent, isHTML } from '@rw-vue-framework/utils'
import { useFormValue } from "@rw-vue-framework/hooks"
import { OptionT } from './date'
import { computed } from 'vue';

// 添加modelValue属性，支持v-model绑定
const props = defineProps<{
  control: OptionT,
  modelValue?: any  // 添加modelValue属性支持v-model
}>()

const datePickerProps = computed(() => {
  const { default: _defalut, rangeSeparator, prevMonth, nextMonth, prevYear, nextYear, ...rest } = props.control
  return rest
})
const emit = defineEmits(['update:modelValue'])
const { fieldValue } = useFormValue<OptionT>(
  'RwDate', // 组件名称
  props.control,   // 控件配置
)
</script>

<template>
  <ElDatePicker v-bind="datePickerProps" v-model="fieldValue"
    @change="(val: string | number | Date | [Date, Date] | null) => control.change?.(val)"
    @blur="(e: FocusEvent) => control.blur?.(e)"
    @focus="(e: FocusEvent) => control.focus?.(e)"
    @clear="() => control.clear?.()"
    @calendar-change="(val: [Date, null | Date]) => control.calendarChange?.(val)"
    @panel-change="(date: Date | [Date, Date], mode: 'month' | 'year', view?: string) => control.panelChange?.(date, mode, view)"
    @visible-change="(visibility: boolean) => control.visibleChange?.(visibility)"
  >
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
    <template v-else-if="control?.default" #default>
      <component :is="control.default" v-if="isComponent(control.default) && !isHTML(control.default)" />
      <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
      <span v-else>{{ control.default }}</span>
    </template>

    <template v-if="$slots.rangeSeparator" #range-separator>
      <slot name="rangeSeparator"></slot>
    </template>
    <template v-else-if="control?.rangeSeparator" #range-separator>
      <component :is="control.rangeSeparator" v-if="isComponent(control.rangeSeparator) && !isHTML(control.rangeSeparator)" />
      <div v-else-if="typeof control.rangeSeparator === 'string' && isHTML(control.rangeSeparator)" v-html="control.rangeSeparator"></div>
      <span v-else>{{ control.rangeSeparator }}</span>
    </template>

    <template v-if="$slots.prevMonth" #prev-month>
      <slot name="prevMonth"></slot>
    </template>
    <template v-else-if="control?.prevMonth" #prev-month>
      <component :is="control.prevMonth" v-if="isComponent(control.prevMonth) && !isHTML(control.prevMonth)" />
      <div v-else-if="typeof control.prevMonth === 'string' && isHTML(control.prevMonth)" v-html="control.prevMonth"></div>
      <span v-else>{{ control.prevMonth }}</span>
    </template>

    <template v-if="$slots.nextMonth" #next-month>
      <slot name="nextMonth"></slot>
    </template>
    <template v-else-if="control?.nextMonth" #next-month>
      <component :is="control.nextMonth" v-if="isComponent(control.nextMonth) && !isHTML(control.nextMonth)" />
      <div v-else-if="typeof control.nextMonth === 'string' && isHTML(control.nextMonth)" v-html="control.nextMonth"></div>
      <span v-else>{{ control.nextMonth }}</span>
    </template>

    <template v-if="$slots.prevYear" #prev-year>
      <slot name="prevYear"></slot>
    </template>
    <template v-else-if="control?.prevYear" #prev-year>
      <component :is="control.prevYear" v-if="isComponent(control.prevYear) && !isHTML(control.prevYear)" />
      <div v-else-if="typeof control.prevYear === 'string' && isHTML(control.prevYear)" v-html="control.prevYear"></div>
      <span v-else>{{ control.prevYear }}</span>
    </template>

    <template v-if="$slots.nextYear" #next-year>
      <slot name="nextYear"></slot>
    </template>
    <template v-else-if="control?.nextYear" #next-year>
      <component :is="control.nextYear" v-if="isComponent(control.nextYear) && !isHTML(control.nextYear)" />
      <div v-else-if="typeof control.nextYear === 'string' && isHTML(control.nextYear)" v-html="control.nextYear"></div>
      <span v-else>{{ control.nextYear }}</span>
    </template>
  </ElDatePicker>
</template>
