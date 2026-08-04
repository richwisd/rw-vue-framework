<script lang="ts" setup>

import { ElCol, ElFormItem, ElSelect, ElOption, ElInput } from 'element-plus'

import { useLocalSettingStore } from '../../stores'

import { ref, watch } from 'vue'

import { t } from '../../locale'

const localSetting = useLocalSettingStore()

defineProps<{span:number}>()

const controls = defineModel("controls", {
    type : Array<any>,
    required:true
})

let haveInput = false

for (let i=0;i<controls.value.length;i++){
    if (controls.value[i].controlType=='input'){
        haveInput=true
        break;
    }
}

const searchKeys = ref([])

const searchValue = ref('')

watch (()=>searchKeys.value,()=>{
    changeControls()
})
watch (()=>searchValue.value,()=>{
    changeControls()
})

/** 将合并搜索框的值回传给搜索选项数据 */
const changeControls=()=>{

}

</script>
<template>
  <ElCol :span="span" v-if="localSetting.pageTable.search.mergeStringControl && haveInput"
  >
    <ElFormItem>
      <ElSelect
        v-model="searchKeys"
        :collapse-tags="true"
        multiple
        :collapse-tags-tooltip="true"
        :fit-input-width="true"
        :placeholder="t('prompt.selectOptions')"
        clearable
        style="width: 49%"
      >
        <template v-for="(control, index) in controls" :key="index">
          <ElOption
            v-if="control.controlType == 'input'"
            :value="control.name"
            :label="t('control.label')"
          ></ElOption>
        </template>
      </ElSelect>
      <ElInput
        v-model="searchValue"
        :disabled="searchKeys.length == 0"
        :placeholder="
          searchKeys.length == 0
            ? t('prompt.mustSelectOne')
            : t('prompt.inputKeyword')
        "
        style="width: 49%"
        clearable
      >
      </ElInput>
    </ElFormItem>
  </ElCol>
</template>
