<script lang="ts" setup>
import { struct } from './localSetting'
import { t ,localeOptions, setLanguage} from '../../locale'
import { useLocalSettingStore } from '../../stores'
import { type LocalSettingState } from '../../stores'
import { Finished, RefreshLeft } from '@element-plus/icons-vue'
import * as keyValues from './options'
import { RwPageForm } from '../../controls'
import { RwFormItems, RwTabs } from '../../controls'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { ElAlert } from 'element-plus'
import { markRaw, onMounted, reactive, watch } from 'vue'

const localSetting = useLocalSettingStore() as LocalSettingState

export interface RemoteSettingData {
  system?: Partial<typeof localSetting.system>
  layout?: Partial<typeof localSetting.layout>
  smallComponents?: Partial<typeof localSetting.smallComponents>
  page?: Partial<typeof localSetting.page>
  pageTable?: Partial<typeof localSetting.pageTable>
  pageForm?: Partial<typeof localSetting.pageForm>
  pageFormDialog?: Partial<typeof localSetting.pageFormDialog>
  [key: string]: any
}

export interface OptionT {
  getFromRemoteURL?:string
  saveToRemoteURL?: string
}

const props = defineProps<OptionT>()

// 使用类型断言解决类型不匹配问题
const pageForm = reactive(RwPageForm.init(struct, { form: {  data:localSetting.$state,type: 'form', hideClose:true, hideSubmitClose:true, hideReset:true, hideSubmit:true } })) as unknown as Partial<RwPageForm.OptionT>

if(pageForm.form){

  if(props.saveToRemoteURL){
    const saveSettingFunc = () => {
        if(props.saveToRemoteURL){
          localSetting.saveToRemote(props.saveToRemoteURL)
        }
    }
    pageForm.form.buttons.addButton('saveToRemote',{
      label: 'appConfig.saveToServer',
      type: 'primary',
      click: saveSettingFunc,
      icon: markRaw(Finished),
    })
  }

  pageForm.form.buttons.addButton('resetDefault',{ label: 'buttons.resetDefault', type: 'warning',
    click:()=> {
      localSetting.reset();
      // pageformRef.value!.reset()
      return true
    },
    icon: markRaw(RefreshLeft),
  })

  if(props.getFromRemoteURL){
    const getSettingFun : () => void = () => {
        if(props.getFromRemoteURL){
          localSetting.getFromRemote(props.getFromRemoteURL)
      }
    }
    pageForm.form.buttons.addButton('getFromRemote',{
      label: 'localSetting.getFromServer',
      type: "danger",
      click: getSettingFun,
      icon:'Download'
    })
  }
  //删除原有的四个按钮
  const deleteButton = pageForm.form.buttons.controls.find(
    btn => btn.name === 'submit'
  )
  if(deleteButton){
    const closeIndex = pageForm.form.buttons.controls.indexOf(deleteButton)
    pageForm.form.buttons.controls.splice(closeIndex, 3)
  }

  //基础设置
  const formItems1 = RwFormItems.init(struct) // 创建一个formItems结构，但其下的formItems为空数组

  formItems1.addSwitch('system.dark', {
    activeActionIcon: markRaw(Moon),
    inactiveActionIcon: markRaw(Sunny),
  })
  formItems1.addMergeSelect('system.locale', 'variable', localeOptions, { type: "checkbox" })
  formItems1.addMergeSelect('system.langLable', 'variable', keyValues.langLable, { type: "checkbox" })
  formItems1.addMergeSelect("system.size", "variable", keyValues.size, { type: "checkbox" })
  //消息方案
  formItems1.addDivider("messageTitle")
  formItems1.addSlider("system.message.max",{min:1,max:10,formatTooltip:(value)=>`${value}条` ,"show-stops": true})
  formItems1.addSwitch('system.message.grouping')
  formItems1.addSlider("system.message.duration", {min:1000, max:10000,step:1000,formatTooltip:(value)=>`${Math.round(value/1000)}秒`,"show-stops": true })
  formItems1.addSwitch('system.message.showClose')
  // formItems1.addSlider("system.message.offset", { max:1000,step:10 })
  formItems1.addSwitch('system.message.plain')
  //按钮样式
  formItems1.addDivider("buttonType")
  // formItems1.addMergeSelect("system.button.type", "variable", keyValues.button, { type: "checkbox" })
  formItems1.addSwitch("system.button.autoInsertSpace")
  formItems1.addSwitch("system.button.plain")
  formItems1.addSwitch("system.button.round")
  //单复选框
  formItems1.addDivider("checkBoxTitle")
  formItems1.addMergeSelect("system.checkBox","variable",keyValues.checkBox,{type:"checkbox"})
  //链接配置
  formItems1.addDivider("linkTitle")
  // formItems1.addMergeSelect("system.link.type","variable",keyValues.button,{type:"checkbox"})
  formItems1.addSwitch("system.link.underline")

  //全局页面
  const formItems2 = RwFormItems.init(struct) // 创建一个formItems结构，但其下的formItems为空数组
  formItems2.addSlider("system.maxOpenPage",{min:5,max:50,formatTooltip:(value)=>`${value}个`, step:5, "show-stops": true })
  formItems2.addSwitch("layout.fullScreen")
  formItems2.addSwitch("layout.backTop")
  formItems2.addMergeSelect("layout.layout", "variable", keyValues.layout, { type: "checkbox", span:24, showImage: true })

  //smallComponents
  formItems2.addDivider("widgetsSwitch")
  formItems2.addSwitch("smallComponents.dark")
  formItems2.addSwitch("smallComponents.lang")
  formItems2.addSwitch("smallComponents.fullScreen")
  formItems2.addSwitch("smallComponents.size")
  formItems2.addSwitch("smallComponents.tabs")
  //page
  formItems2.addDivider("pageResult")
  formItems2.addSwitch("page.process",{inactiveValue:false,activeValue:true})
  formItems2.addMergeSelect("page.transition", "variable", keyValues.pageTransition, { type: "checkbox", showOpsTemplate: true })
  formItems2.addMergeSelect("page.waterType", "variable", keyValues.pageWaterType, { type: "checkbox" })
  formItems2.addMergeSelect("page.dialogType", "variable", keyValues.dialogType, { type: "checkbox" })

  //表格设置table
  const formItems3 = RwFormItems.init(struct) // 创建一个formItems结构，但其下的formItems为空数组
  formItems3.addSwitch("pageTable.showTitle",{inactiveValue:false,activeValue:true})
  formItems3.addSlider("pageTable.margin",{min:0,max:100,formatTooltip:(value)=>`${value}px`,showStops:true})
  //search
  formItems3.addDivider("searchTitle")
  formItems3.addSlider("pageTable.search.oneLineControl",{min:1,max:4,formatTooltip:(value)=>`${value}个`})
  formItems3.addSwitch("pageTable.search.mergeStringControl",{inactiveValue:false,activeValue:true ,span:12})
  formItems3.addMergeSelect("pageTable.search.stringControlLocation", "variable", keyValues.stringControlLocation, { type: "checkbox", })
  formItems3.addMergeSelect( "pageTable.search.labelPosition", "variable", keyValues.searchLabelPosition, { type: "checkbox",  })
  formItems3.addMergeSelect( "pageTable.search.buttonStyle", "variable", keyValues.tableButtonStyle, { type: "checkbox",  })
  // table
  formItems3.addDivider("tableTitle")
  formItems3.addMergeSelect("pageTable.table.deleteConfirmStyle","variable",keyValues.deleteConfirmStyle,{type:"checkbox"})
  formItems3.addSwitch("pageTable.table.showHeader",{inactiveValue:false,activeValue:true})
  formItems3.addSwitch("pageTable.table.showHeadBgColor",{inactiveValue:false,activeValue:true})
  formItems3.addSwitch("pageTable.table.verticalLine",{inactiveValue:false,activeValue:true})
  formItems3.addSwitch("pageTable.table.horizontalLine",{inactiveValue:false,activeValue:true})
  formItems3.addSwitch("pageTable.table.stripe",{inactiveValue:false,activeValue:true})
  formItems3.addSwitch("pageTable.table.highlightCurrentRow",{inactiveValue:false,activeValue:true})
  formItems3.addMergeSelect("pageTable.table.height","variable", keyValues.height, { type: "checkbox"})
  formItems3.addMergeSelect("pageTable.table.buttonStyle", "variable", keyValues.tableButtonStyle, { type: "checkbox" })
  formItems3.addSwitch("pageTable.table.showIndex",{inactiveValue:false,activeValue:true})

  formItems3.addSwitch("pageTable.table.fit",{inactiveValue:false,activeValue:true})
  formItems3.addMergeSelect("pageTable.table.fixed","variable", keyValues.tableButtonsFixed ,{type:"checkbox"})
  formItems3.addMergeSelect("pageTable.table.showMenu", "variable", keyValues.tableButtonsShowMenu, { type: "checkbox" })
  formItems3.addSlider("pageTable.table.maxButtons",{min:3,max:5,formatTooltip:(value)=>`${value}个`})
  formItems3.addMergeSelect("pageTable.table.multiLangShowType", "variable", keyValues.multiLangShowType, { type: "checkbox" })

  //buttons
  formItems3.addDivider("buttonTitle")
  formItems3.addSwitch("pageTable.buttons.groupType")
  formItems3.addMergeSelect("pageTable.buttons.location", "variable",keyValues.tableButtonlocation,{type:"checkbox"})
  formItems3.addMergeSelect("pageTable.buttons.buttonStyle","variable",keyValues.tableButtonStyle,{type:"checkbox"})
  //pagination
  formItems3.addDivider("paginationTitle")
  formItems3.addMergeSelect("pageTable.pagination.location", "variable",keyValues.location,{type:"checkbox"})
  formItems3.addMergeSelect("pageTable.pagination.footerFollow",'variable',keyValues.footerFollow,{type:"checkbox"})
  formItems3.addSwitch( "pageTable.pagination.showBgColor",{inactiveValue:false,activeValue:true})

  //表单设置form
  const formItems4 = RwFormItems.init(struct) // 创建一个formItems结构，但其下的formItems为空数组
  //pageForm
  formItems4.addSwitch( "pageForm.showTitle",{inactiveValue:false,activeValue:true})
  formItems4.addSlider("pageForm.margin",{min:0,max:100,formatTooltip:(value)=>`${value}px`})
  //form
  formItems4.addSlider("pageForm.form.gutter",{min:0,max:50,showInput:true,formatTooltip:(value)=>`${value}px`})
  formItems4.addMergeSelect("pageForm.form.labelPosition","variable",keyValues.labelPosition,{type:"checkbox"})
  formItems4.addSlider("pageForm.form.formItemwidth",{min:60,max:300,formatTooltip:(value)=>`${value}px`})
  formItems4.addMergeSelect("pageForm.form.oneLineControl","variable",keyValues.oneLineControl,{type:"checkbox"})
  //buttons
  formItems4.addSwitch("pageForm.buttons.groupType", { inactiveValue: false, activeValue: true })
  formItems4.addMergeSelect( "pageForm.buttons.location", "variable", keyValues.formButtonLocation, { type: "checkbox" })
  formItems4.addMergeSelect( "pageForm.buttons.verticalLocation", "variable", keyValues.location, { type: "checkbox"})
  formItems4.addMergeSelect( "pageForm.buttons.buttonStyle", "variable", keyValues.tableButtonStyle, { type: "checkbox" })
  //临时增加
  formItems4.addSwitch("pageForm.autoSaveLocal",)

  //pageFormDialog
  formItems4.addDivider("pageFormDialogTitle")
  formItems4.addSwitch( "pageFormDialog.showTitle",{inactiveValue:false,activeValue:true})
  formItems4.addSlider("pageFormDialog.margin",{min:0,max:100,formatTooltip:(value)=>`${value}px`})
  //form
  formItems4.addSlider("pageFormDialog.form.gutter",{min:0,max:50,formatTooltip:(value)=>`${value}px`})
  formItems4.addSlider("pageFormDialog.form.formItemwidth",{min:60,max:200,formatTooltip:(value)=>`${value}px` })
  formItems4.addMergeSelect("pageFormDialog.form.labelPosition","variable",keyValues.labelPosition,{type:"checkbox"})
  formItems4.addSlider("pageFormDialog.form.oneLineControl", { min: 1, max: 2 ,formatTooltip:(value)=>`${value}个` })
  //buttons
  formItems4.addMergeSelect( "pageFormDialog.buttons.location", "variable", keyValues.formButtonLocation, { type: "checkbox" })
  formItems4.addMergeSelect( "pageFormDialog.buttons.verticalLocation", "variable", keyValues.location, { type: "checkbox"})
  formItems4.addMergeSelect( "pageFormDialog.buttons.buttonStyle", "variable", keyValues.tableButtonStyle, { type: "checkbox" })


  const tab = RwTabs.init()
  tab.addTabPane(struct.name, 'base', [formItems1])// { contents: [formItems1] })
  tab.addTabPane(struct.name, 'pageTitle', formItems2 )
  tab.addTabPane(struct.name, 'table', formItems3 )
  tab.addTabPane(struct.name, 'form', formItems4 )

  pageForm.form.addTabs(tab)

  watch(()=>localSetting.$state.pageForm.form.labelPosition,(newVal)=>{
    pageForm.form&&pageForm.form.changeItem("pageForm.form.formItemwidth", {
      disabled: (newVal === "top")? true : false,
    })
  }, { immediate: true })
  watch(()=>localSetting.$state.pageForm.form.oneLineControl,(newVal)=>{
    pageForm.form&&pageForm.form.changeItem("pageForm.form.gutter", {
      disabled: (newVal === 1) ? true : false,
  })
  }, { immediate: true })

}
watch(()=>localSetting.system.locale, (newVal)=>{
  setLanguage(newVal)
})

// 字体大小
// 应用字体大小
const applyFontSize = (fontSize: string) => {
  const app = document.getElementById('app') as HTMLElement
  if (!app) {
    return
  }
  // 移除所有字体大小类
  app.classList.remove('font-size-small', 'font-size-default', 'font-size-large', 'font-size-x-large')
  // 添加当前字体大小类
  app.classList.add(`font-size-${fontSize}`)
}

// 监听字体大小变化
watch(() => localSetting.system.size, (newFontSize) => {
  applyFontSize(newFontSize)
}, { immediate: true })

// 组件挂载时应用字体大小
onMounted(() => {
  applyFontSize(localSetting.system.size)
})

</script>

<template>
  <RwPageForm.Template :control="pageForm" ref="pageformRef">
    <template #SlotPageBottom>
      <el-alert
        :center="false"
        :title="t(struct.name + '.TITLE')"
        type="info"
        description="系统绝大部分功能均可以根据自己喜好调整，可以调整全局布局、界面效果、表格效果、弹出框效果、表单效果"
        :closable="false"
        show-icon
      />
      <el-alert
        :title="t(struct.name + '.saveToServer')"
        :closable="false"
        description="点击任何一项操作，将立刻看到效果，直至你退出登录，如果想要在不同的电脑上或者是下次登录还保持相应的效果，一定要记得保存至服务器"
        type="success"
        show-icon
      />

      <el-alert
        :title="t(struct.name + '.getFromServer')"
        :closable="false"
        description="如果想要保持相应的效果，可以从服务器获取之前保存的配置"
        type="success"
        show-icon
      />

      <el-alert
        :title="t(struct.name + '.resetDefault')"
        :closable="false"
        description="恢复至系统默认效果后并不会立刻保存至服务器，如果想恢复，退出登录再重新进入"
        type="warning"
        show-icon
      />
    </template>
  </RwPageForm.Template>
</template>

<style scoped>
.label-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-radio, .el-checkbox {
  height: unset !important;
}
</style>