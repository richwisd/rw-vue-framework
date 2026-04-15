<script lang="ts" setup>
import { ElRow, ElCol, ElFormItem, ElOption, ElSelect } from 'element-plus'
import {  type OptionT } from './formItems'
import { computed, ref, watch, markRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useLocalSettingStore } from '../../stores'
import { t } from '../../locale'

const localSettingStore = useLocalSettingStore()
// 使用 storeToRefs 解构响应式引用
const { pageForm, pageFormDialog, system } = storeToRefs(localSettingStore)

// 扩展 props 定义，添加可选的 model 属性
const props = defineProps<{
  control: OptionT
  model?: Record<string, any>  // 新增：可选的数据绑定对象
}>()
// console.log('model', props?.model)
const emit = defineEmits(['update:model'])

const formItemData = computed(() => {
  return props.model
})

// 根据 type 选择配置源
const currentPageConfig = computed(() => {
  return props.control.inDialog ? pageFormDialog.value : pageForm.value
})

const rowProps = computed(() => {
  const { rowProps } = props.control
  // TODO 这里可以加上search组件特定的
  return {
    gutter: currentPageConfig.value.form?.gutter || 10,
    ...rowProps
  }
})

// 是否有input
const haveInput = ref(false)

const formItems = computed(() => {
  const length = props.control.formItems.length
  return props.control.formItems.map((item) => {
    if(item.controlType === "Input" && haveInput.value == false){
      haveInput.value = true
    }
    // 基础配置对象
    const baseConfig = {
      ...item,
      formItemProps: {
        labelPosition: currentPageConfig.value.form.labelPosition,
        labelWidth: currentPageConfig.value.form.formItemwidth,
        label: (item.labelShow === false || item.hideLabel) ? '' : ( item?.label ?? t(`${item.moduleName}.${item.name}`)),
        ...item.formItemProps,
        required: item.required,
      },
      init: {
        ...item.init,
        disabled: item.disabled,
      },
      colProps:{
        ...item.colProps,
        span: item.colProps?.span || (
          item.init?.controlType === 'divider' ||
          (props.control.inDialog && length <= 6)
            ? 24
            : Math.floor(24 / currentPageConfig.value.form.oneLineControl)
        ),
      }
    }
    // 如果是 mergeSelect 类型,添加额外配置
    if (item.init.controlType === 'MergeSelect') {
      const config = {
        ...baseConfig,
        init: {
          checkBoxType: system.value.checkBox === 'button',
          ...item.init
        }
      }
      return config
    }
    return baseConfig
  })
})
// console.log('formItems', formItems.value)

const getWrapperComponent = (item: any) => {
  return (item.labelShow || item.labelShow === undefined) ? markRaw(ElFormItem) : 'div'
}

const getWrapperProps = (item: any) => {
  return (item.labelShow || item.labelShow === undefined) ? item.formItemProps : ''
}

const getColDiv = (type: 'form' | 'search' | 'formDialog') => {
  return type === 'search' ? 'div' : ElCol
}

const searchKeys = ref<Array<string>>([]);
const searchValue = ref('');
watch (()=>searchKeys.value,()=>{
  changeControls()
})
watch (()=>searchValue.value,()=>{
  changeControls()
})

/** 将合并搜索框的值回传给搜索选项数据 */
const changeControls=()=>{
  for ( let i=0; i< props.control.formItems.length;i++ ){
    if (Object.values(props.control.formItems[i].Template)[0]=='input'){
      let name:string = props.control.formItems[i].name
      if(searchKeys.value.includes(name)){
        formItemData.value![name] = searchValue.value
      }else{
        formItemData.value![name] = ''
      }
    }
  }
}

function getLabelWidth(label: string) {
  const localSetting = useLocalSettingStore()
  return (label.length + 1) * (localSetting.system.size == "small" ? 12 : 14)
}

const initSearchKeysAndValue = ()=>{
  searchKeys.value = []
  searchValue.value = ''
}


// 暴露 formData 给父组件（如果需要）
defineExpose({
  formItemData,
  initSearchKeysAndValue
})
</script>

<template>
  <ElRow :justify="control?.type == 'search' ? 'end' : 'start'" v-bind="rowProps">
    <!-- 如果是search 并且 有input -->
    <template v-if="control?.type == 'search' && localSettingStore.pageTable.search.mergeStringControl && haveInput">
      <div v-if="localSettingStore.pageTable.search.stringControlLocation == 'front'" style="padding-right: 32px; box-sizing: border-box;">
        <ElSelect
          v-model="searchKeys"
          :collapse-tags="true"
          multiple
          :collapse-tags-tooltip ="true"
          :fit-input-width="true"
          :placeholder="t('prompt.selectOptions')" clearable style="width: 140px;">
          <template v-for="item in formItems" :key="item.name">
            <ElOption v-if="item.controlType === 'Input'" :value="item.name" :label="item.formItemProps?.label"></ElOption>
          </template>
        </ElSelect>
        <ElInput
          v-model="searchValue"
          :disabled="searchKeys.length==0"
          :placeholder="searchKeys.length==0 ? t('prompt.mustSelectOne') : t('prompt.inputKeyword')"
          style="width: 150px" clearable>
        </ElInput>
      </div>
      <template v-for="(item, index) in formItems" :key="item.vid">
        <div :index="index" v-if="item.controlType !== 'Input' && !item.hide">
          <component
            :is="getWrapperComponent(item)"
            v-bind="getWrapperProps(item)"
            :label-width="item.formItemProps?.labelWidth === 'auto' ? getLabelWidth(item.formItemProps.label??'') : item.formItemProps?.labelWidth"
          >
            <component
              :is="markRaw(item.Template)"
              :control="item.init"
              v-bind="model ? {
                modelValue: formItemData![item.name],
                'onUpdate:modelValue': (val: any) => { formItemData![item.name] = val }
              } : {}"
            ></component>
          </component>
        </div>
      </template>

      <div v-if="localSettingStore.pageTable.search.stringControlLocation == 'end'" style="padding-right: 32px; box-sizing: border-box;">
        <ElSelect
        v-model="searchKeys"
        :collapse-tags="true"
        multiple
        :collapse-tags-tooltip ="true"
        :fit-input-width="true"
        :placeholder="t('prompt.selectOptions')" clearable style="width: 140px;">
          <template v-for="(item, index) in formItems" :key="item.vid">
            <ElOption :index="index" v-if="Object.values(item.Template as Record<string, string>)[0] === 'input'" :value="item.name" :label="item.formItemProps?.label"></ElOption>
          </template>
        </ElSelect>
        <ElInput
        v-model="searchValue"
        :disabled="searchKeys.length==0"
        :placeholder="searchKeys.length==0 ? t('prompt.mustSelectOne') : t('prompt.inputKeyword')"
        style="width: 150px" clearable>
        </ElInput>
      </div>

    </template>
    <template v-else>
      <template v-for="(item, index) in formItems" :key="item.vid">
        <component v-if="!item.hide" :is="getColDiv(control?.type ?? 'form')" v-bind="item.colProps" :index="index">
          <component
            :is="getWrapperComponent(item)"
            v-bind="getWrapperProps(item)"
            :label-width="item.formItemProps?.labelWidth === 'auto' ? getLabelWidth(item.formItemProps.label ?? '') : item.formItemProps?.labelWidth"
          >
            <component
              :is="markRaw(item.Template)"
              :control="item.init"
              v-bind="model ? {
                modelValue: formItemData![item.name],
                'onUpdate:modelValue': (val: any) => { formItemData![item.name] = val }
              } : {}"
            ></component>
          </component>
        </component>
      </template>
    </template>
    <slot name="extra"></slot>
  </ElRow>
</template>


