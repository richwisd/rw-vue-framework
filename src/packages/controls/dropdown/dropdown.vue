<script lang="ts" setup>
import { computed, ref } from "vue";
import {  type OptionT } from "./dropdown"
import { RwButton } from "../button"
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, DropdownInstance, ElCheckbox  } from 'element-plus'
import { t } from "../../locale";
// import { useLocalSettingStore } from '../../stores'

// const localSetting = useLocalSettingStore()

const dropdown1 = ref<DropdownInstance>()
const props = defineProps<{ control: OptionT }>()

const dropdownProps = computed(() => {
  const { default: _default, dropdown, items, click, command, visibleChange, addItem, button, ...rest } = props.control
  return rest
})

const showMe = ref(false)
const buttonProps = computed(() => {
  const { button } = props.control
  return { ...button, suffixIcon: showMe.value ? ArrowUp : ArrowDown, text: props.control?.text ?? button?.text ?? false }
})

const items = computed(()=>{
  const { items, moduleName } = props.control
  return items.map(item => {
    return {
      ...item,
      label: item.label ?? `${moduleName}.${item.name}`,
    }
  })
})


/* 方法 */
function handleVisible(visible: any) {
  if (!dropdown1.value) return
  showMe.value = visible
  props.control?.visibleChange?.(visible)
}

const emits = defineEmits(["click"])
function onCommand(command: string | number | object) {
  if (props.control?.command) {
    props.control.command(command)
  } else {
    emits("click", props.control, command)
  }
}
</script>

<template>
<ElDropdown
  class="rw-dropdown"
  ref="dropdown1"
  v-bind="dropdownProps"
  @click="(e) => control?.click?.(e)"
  @command="onCommand"
  @visible-change="handleVisible"
>
  <RwButton.Template :control="buttonProps" />
  <template #dropdown>
    <ElDropdownMenu>
      <ElDropdownItem v-for="item in items" v-bind="item" :key="item.name" :command="item"
       @click="(e) => {
        if(item?.click){
          item?.click(control?.statusData)
          e.stopPropagation()
        }
       }">
        <el-checkbox v-if="item.showCheck" v-model="item.checked" :label="t(item.label)" />
        <template v-else>
          {{ t(item.label) }}
        </template>
      </ElDropdownItem>
    </ElDropdownMenu>
  </template>
</ElDropdown>
</template>
