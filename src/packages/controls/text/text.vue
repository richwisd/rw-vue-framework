<script lang="ts" setup>
import {  type OptionT } from './text'
import { ElText, ElTooltip } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { computed } from 'vue'
import { useFormValue } from '../../hooks'
import { t, locale, localeOptions } from '../../locale'
import { useLocalSettingStore } from '../../stores'
import { storeToRefs } from 'pinia'

const localSetting = useLocalSettingStore()
const { pageTable, system } = storeToRefs(localSetting)

const props = defineProps<{ control: OptionT; modelValue?: any }>()

const { fieldValue } = useFormValue<OptionT>(
  'RwIext', // 组件名称
  props.control, // 控件配置
)

const showTextValue = computed(() => {
  if (props.control.multiLang) {
    try {
      const val = JSON.parse(fieldValue.value)
      return val
    } catch (error) {
      return fieldValue.value
    }
  }

  return fieldValue.value
})

const textProps = computed(() => {
  const { default: _default, type, ...rest } = props.control
  const typeArr = ['primary', 'success', 'warning', 'danger', 'info']
  let newType = type
  if(type && typeArr.includes(type)) {
    newType = type
  }else{
    newType = 'info'
  }
  return {...rest, type: newType}
})
</script>
<template>
  <ElText v-bind="textProps">
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
    <template #default v-else-if="control.default">
      <!-- <component
        :is="control.default"
        v-if="isComponent(control.default) && !isHTML(control.default)"
      />
       -->
      <div v-if="control.default==='null'">&nbsp;</div>
      <div
        v-else-if="typeof control.default === 'string' && isHTML(control.default)"
        v-html="control.default"
      />
      <span v-else>{{ control.default }}</span>
    </template>
    <template
      #default
      v-else-if="control.multiLang && showTextValue instanceof Object"
    >
      <ElTooltip :disabled="control.showTips === false || (pageTable.table.multiLangShowType === 'all' && !control.lang && !control.showTips)">
        <template #default>
          <span :class="{'limit-hide': pageTable.table.multiLangShowType === 'hover' || control.showTips }">
            <div class="multiLangShow" v-if="control.showTips === false || (pageTable.table.multiLangShowType === 'all' && !control.lang && !control.showTips)">
              <div class="multiLangShowItem" v-for="item in localeOptions" :key="item.label">
                <div class="multiLangShowLabel">
                  <div class="tipBox">
                    <div v-if="system.langLable ==='text'">{{ item.label }}</div>
                    <img v-else class="langIcon" :src="item.image" alt="">
                  </div>
                </div>
                <div class="multiLangShowText">{{ showTextValue[item.value] }}</div>
              </div>
            </div>
            <span v-else class="tipsSpan">
              {{ showTextValue[control.lang ?? locale] }}
            </span>
          </span>
        </template>
        <template #content>
          <div class="multiLangShow">
            <div class="multiLangShowItem" v-for="item in localeOptions" :key="item.label">
              <span class="multiLangShowLabel">
                <div v-if="system.langLable ==='text'">{{ item.label }}</div>
                <img v-else class="langIcon" :src="item.image" alt="">
              </span>
              <span class="multiLangShowText">{{ showTextValue[item.value] }}</span>
            </div>
          </div>
        </template>
      </ElTooltip>
    </template>
    <template #default v-else>{{ showTextValue }}</template>
  </ElText>
</template>

<style scoped lang="scss">
.limit-hide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.tipsSpan {
  padding: 0 5px;
}
.multiLangShow {
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  .multiLangShowItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0;
    }
    .multiLangShowLabel {
      padding-right: 10px;
      display: flex;
      align-items: center;
      text-align: right;
      min-width: 50px;
      .tipBox{
        display: flex;
        align-items: center;
        .langIcon {
          height:16px;
          margin-right: 5px;
        }
      }
    }
    .multiLangShowText {
      flex: 1;
      text-align: left;
      word-break: break-all;
    }
  }
}
</style>
