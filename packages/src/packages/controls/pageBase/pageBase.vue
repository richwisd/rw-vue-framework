<script setup lang="ts">
import { onMounted, onBeforeMount, reactive,  computed } from 'vue'
import { useLocalSettingStore } from '../../stores';
import { ElWatermark, ElRow, ElCol, ElConfigProvider } from 'element-plus'
import {type OptionT} from "./pageBase"
import {useAppConfigStore} from "../../stores/appConfig"
import { RwDialog } from '../../controls'
import { t } from '../../locale'

// const { pageForm, pageFormDialog } = storeToRefs(localSettingStore)

const setting: ReturnType<typeof useLocalSettingStore> = useLocalSettingStore();
const appConfig=useAppConfigStore();
const props=defineProps<{ control:Partial<OptionT>, inDialog?: boolean }>()
const emits=defineEmits(["refreshData"])
const refreshData = () => {
  emits("refreshData")
}

onMounted(() => {
  console.timeEnd(props.control?.name + " page Load Time")
})

onBeforeMount(() => {
  console.time(props.control?.name + " page Load Time")
})


const pageStyle = computed(() => {
  const type = props.control.type;
  const margin = type === 'form'
    ? props.inDialog
      ? setting.pageFormDialog.margin
      : setting.pageForm.margin
    : type === 'table'
      ? setting.pageTable.margin
      : 0;

  return `padding: 0 ${margin}px;`
})

const font = reactive({
  color: 'rgba(0, 0, 0, .10)',
  fontSize: 18
})

const waterText = computed(()=>{
  const text=<string[]>[]
  if (appConfig.showWater==true){
    text.push(appConfig.title)
    text.push("")
    text.push(appConfig.support)
    text.push(appConfig.coopyRight)
  }else{
    text.push("")
  }

  return text;
})

// function refreshData(){
//   emits("refreshData")
// }
/**
 * 本页需要完成，当页面加载的时候，显示加载中...，且全屏显示
 * 加载完成之后，显示渲染区，这样可以在网速慢的时候，或者是渲染慢的时候，页面会产生跳动的效果
 * :name="setting.animation"
 */
</script>

<template>
  <div :style="pageStyle">
    <el-config-provider :button="setting.system.button">
      <ElWatermark :font="font" :content="waterText">
        <ElRow v-if="!inDialog && setting.showTitle(control?.type as string)" style="line-height: 48px;">
          <ElCol :span="16"><h3>{{ t(`${control.name}.TITLE`) }}</h3></ElCol>
          <ElCol :span="8" style="float: right;">
            <slot name="SlotTopRight"></slot>
          </ElCol>
        </ElRow>
        <slot></slot>
        <slot name="SlotPageBottom"></slot>
      </ElWatermark>
    </el-config-provider>
    <RwDialog.Template v-for="dialog in control.dialogs" :key="dialog.name" :control="dialog" @refresh-data="refreshData" />
  </div>
</template>
