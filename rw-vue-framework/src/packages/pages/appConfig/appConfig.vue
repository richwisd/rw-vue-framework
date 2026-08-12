<script setup lang="ts">
import { useAppConfigStore } from '../../stores'
import { RwFormItems, RwTabs , RwPageForm} from '../../controls'
import { struct } from './appConfig'
import { type ExtractPropTypes, markRaw, ref } from 'vue'
import { t } from '../../locale'
import { ElAlert, ElMessage } from 'element-plus'
import { Finished, RefreshLeft } from '@element-plus/icons-vue'
import * as keyValues from "../localSetting/options"
const appConfig = useAppConfigStore()

export interface OptionT {
  getFromRemoteURL?: string
  saveToRemoteURL?: string
}

const pageFormRef = ref<ExtractPropTypes<typeof RwPageForm.Template>>()
const props = defineProps<OptionT>()
const pageForm = RwPageForm.init(struct, { form: { data: appConfig.$state } })
if (props.saveToRemoteURL) {
  const saveToRemote = async () => {
    const ischecked = await pageFormRef.value!.validate()
    if (!ischecked) return
    if (props.saveToRemoteURL) {
      const data = appConfig.saveToRemote(props.saveToRemoteURL)
      if (data !== null) {

        ElMessage({ message: '保存成功', type: 'success', duration: 3000 })
      } else {
        ElMessage({ message: '保存失败', type: 'error', duration: 3000 })
      }
    }
  }
  pageForm.form.buttons.addButton('saveToRemote', {
    label: 'appConfig.saveToServer',
    type: 'primary',
    click: saveToRemote,
    icon: markRaw(Finished),
  })
}
pageForm.form.buttons.addButton('resetDefault', {
  label: 'buttons.resetDefault',
  type: 'warning',
  click: () => {
    appConfig.reset()
  },
  icon: markRaw(RefreshLeft),
})

if (props.getFromRemoteURL) {
  const getFromRemote = () => {
    if (props.getFromRemoteURL) {
      const data = appConfig.getFromRemote(props.getFromRemoteURL)
      if (data !== null) {
        ElMessage({ message: '获取成功', type: 'success', duration: 3000 })
      } else {
        ElMessage({ message: '获取失败', type: 'error', duration: 3000 })
      }
    }
    //     pageformRef.value?.setExternalLoading?.(false)
  }
  pageForm.form.buttons.addButton('getFromRemote', {
    label: 'localSetting.getFromServer',
    type: 'danger',
    click: getFromRemote,
    icon: 'Download',
  })
}

pageForm.form.buttons.changeButton("submit",{show:false})

const closeButton = pageForm.form.buttons.controls.find(
  (btn) => btn.name === 'close',
)

//  如果存在 close 按钮，则移动到 getFromRemote 后面
if (closeButton) {
  // 移除原位置的 close 按钮
  const closeIndex = pageForm.form.buttons.controls.indexOf(closeButton)
  pageForm.form.buttons.controls.splice(closeIndex, 1)

  // 插入到 getFromRemote 后面
  const getFromRemoteIndex = pageForm.form.buttons.controls.findIndex(
    (btn) => btn.name === 'getFromRemote',
  )
  pageForm.form.buttons.controls.splice(getFromRemoteIndex + 1, 0, closeButton)
}

const formItem1 = RwFormItems.init(struct)
formItem1.addInput('title', { required: true, span: 24 })
formItem1.addInput('support', { required: true,span:12 })
formItem1.addInput('coopyRitht', { required: true,span:12 })
formItem1.addUpload('logo', { required: true,span:12 })
formItem1.addUpload('bgImg', { required: true ,span:12})
formItem1.addSwitch('showWater', { span: 12 })
formItem1.addSwitch('developerMode',{span:12})


const formLayout=RwFormItems.init(struct)
formLayout.addSwitch("layout.paleTheme")
formLayout.addSwitch("layout.userCanChange")
formLayout.addMergeSelect("layout.layout", "variable", keyValues.layout, { type: "checkbox", span:24, showImage: true })

const formItem2 = RwFormItems.init(struct)
formItem2.addSwitch('showAuthCodeLogin')
formItem2.addSlider('saveLoginDate', { required: true, append: '天' })
formItem2.addSwitch('wxLogin')
const formItem3 = RwFormItems.init(struct)
formItem3.addInput('mapKey')

const tab = RwTabs.init()
tab.addTabPane(struct.name, 'base', formItem1)
tab.addTabPane(struct.name, 'layoutStyle', formLayout)
tab.addTabPane(struct.name, 'login', formItem2)
tab.addTabPane(struct.name, 'map', formItem3 )

pageForm.form.addTabs(tab)
</script>
<template>
  <RwPageForm.Template :control="pageForm" ref="pageFormRef">
    <template #SlotPageBottom>
      <el-alert
        :title="t(struct.name + '.TITLE')"
        type="info"
        description="系统绝大部分功能均可以根据需要调整，可以调整企业名称，logo等全局配置"
        :closable="false"
        show-icon
      />
      <el-alert
        :closable="false"
        :title="t(struct.name + '.saveToServer')"
        description="保存至服务器后需要退出重新登录才生效"
        type="success"
        show-icon
      />
      <el-alert
        :title="t(struct.name + '.resetDefault')"
        :closable="false"
        description="重置后并不会立刻保存至服务器，需要点击保存按钮才会保存到服务端"
        type="warning"
        show-icon
      />
    </template>
  </RwPageForm.Template>
</template>
