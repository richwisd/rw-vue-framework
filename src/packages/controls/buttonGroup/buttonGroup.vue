<script lang="ts" setup>
import { computed, markRaw } from 'vue'
import { type OptionT } from './buttonGroup'
import { ElButtonGroup } from 'element-plus'


const props = defineProps<{ control: OptionT, statusData?:any }>()
const ButtonGroupProps = computed(() => {
  const { default: _default, controls, addButton, addDropdown, addPopconfirm, ...rest } = props.control
  return rest
})

const controls = computed(()=> {
  const arr = Object.values(props.control.controls)
  return arr.map((item) => {

    const newOptions = item.config?.refreshButton ? item.config.refreshButton(item.config, props?.statusData ?? 0) : {}

    return {
      ...item,
      show: item.show ?? true,
      disabled: item.disabled ?? false,
      ...newOptions,
      config: {
        ...item.config,
        show: item.show ?? item.config.show ?? true,
        disabled: item.disabled ?? item.config.disabled ?? false,
        ...newOptions,
        statusData: props?.statusData
      }
    }
  })
})

const emits = defineEmits(["click","command"])
const onclick = (e:any, command?:any) => {
  emits("click",e, command)
}

// 辅助函数
function getFarComponent(isGroup: boolean) {
  if(props.control.customized){
    return isGroup ? ElButtonGroup : 'div'
  }
  return isGroup ? ElButtonGroup : 'div' // TODO 添加localSetting个性化
}
</script>

<template>
  <component :is="getFarComponent(control.isGroup)" v-bind="ButtonGroupProps">
    <template
      v-for="item in controls"
      :key="item.name"
    >
      <component :is="markRaw(item.Template)" :control="item.config" @click="onclick" v-if="item.show !== false && item.config.show !== false" />
    </template>
  </component>
</template>
<style>
  .el-button+.rw-dropdown, .rw-dropdown+.el-button {
    margin-left: 12px;
  }
  .el-button-group>.el-button+.rw-dropdown,.el-button-group>.rw-dropdown+.el-button  {
    margin-left: 1px;
  }
</style>
