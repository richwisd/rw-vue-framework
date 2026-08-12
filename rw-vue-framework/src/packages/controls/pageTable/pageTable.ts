import { type SFCWithInstall, withInstall } from '../../utils'

import PageTable from './pageTable.vue'

import { pageStruct } from '../pageStruct'

import { RwButtonGroup, RwTable, RwPagination, RwSearch, RwDropdown } from '../'

import { RwPageBase } from '../pageBase'

import { useLocalSettingStore } from '../../stores'

import { Delete, Plus, Close, Memo, Refresh } from '@element-plus/icons-vue'

import { markRaw, reactive } from 'vue'

export const Template: SFCWithInstall<typeof PageTable> = withInstall(PageTable)

export type OptionT = {
  struct: pageStruct.OptionT
  operateButtons: RwButtonGroup.OptionT
  tableButtons: RwButtonGroup.OptionT
  table: RwTable.OptionT
  pagination: RwPagination.OptionT
  search: RwSearch.OptionT | false
  page: RwPageBase.OptionT

  editName: object
  searchBefore: ( data:any ) => any

  //
  showRefresh: boolean
}

export function init(
  struct: pageStruct.OptionT,
  options: Partial<OptionT> = {},
) {

  const showRefresh = options?.showRefresh ?? true
  const localSetting = useLocalSettingStore()

  // page
  const page = reactive(RwPageBase.init(struct?.name, 'table'))
  // 操作按钮组 start
  const operateButtons = RwButtonGroup.init(struct.name, {
    isGroup: false,
    buttonsArea: 'operate',
    show: true
  })

  if(options.editName){
    page.pushDialog("addForm",options.editName)
    page.pushDialog("editForm",options.editName)

    operateButtons.addButton('append', {
      label: 'buttons.append',
      type: 'primary',
      icon: markRaw(Plus),
      // click: () => {
      //   console.log('showForm')
      //   page.showDialog("addForm")
      // }
    })
  }

  // 搜索
  const search =  reactive(RwSearch.init(struct, {}))

  if (localSetting.pageTable.table.deleteConfirmStyle == 'modal') {
    operateButtons.addButton('deleteSelected', {
      label: 'buttons.deleteSelected',
      type: 'danger',
      icon: markRaw(Delete),
    })
  } else {
    operateButtons.addPopconfirm('deleteSelected', {
      label: 'buttons.deleteSelected',
      confirmButtonText: 'buttons.confirmDelete',
      confirmButtonType: 'danger',
      icon: markRaw(Delete),
      hideAfter: 50,
      width: 180
    })
  }

  if(showRefresh)
    operateButtons.addButton('refresh', {
      label: 'buttons.refresh',
      type: 'default',
      icon: markRaw(Refresh)
    })

  operateButtons.addButton('batchDrag', {
    show: true,
    label: 'buttons.batchDrag',
    type: 'default',
    icon: markRaw(Memo),
  })

  operateButtons.addButton('saveDrag', {
    show: false,
    label: 'buttons.saveDrag',
    type: 'primary',
    icon: markRaw(Plus),
  })

  operateButtons.addButton('cancelDrag', {
    show: false,
    label: 'buttons.cancelDrag',
    type: 'danger',
    icon: markRaw(Close),
  })

  // 操作按钮组 end

  // 表格按钮组 start
  const tableButtons = RwButtonGroup.init(struct.name, {
    isGroup: false,
    buttonsArea: 'table',
  })

  const importDropDown = RwDropdown.init('buttons', 'import', {icon:"Files"})
  importDropDown.addItem('importing', {icon:"Files"})
  importDropDown.addItem('downloadTemplate', {icon:"Download"})
  tableButtons.addDropdown('import', importDropDown)

  const exportDropDown =  RwDropdown.init('buttons', 'export', {icon:"Document"})
  exportDropDown.addItem("exportSelectedToExcel",{ label: 'buttons.exportSelected', icon:"Select"})
  exportDropDown.addItem("exportCurrentPageToExcel",{ label: 'buttons.exportCurrentPage', icon:"Document"})

  tableButtons.addDropdown('export', exportDropDown)
  // 表格按钮组 end

  // table
  const table = RwTable.init(struct, { showEdit: !!options.editName })

  // 页码
  const pagination = RwPagination.init(struct?.name, {})

  const res = reactive({
    page,
    search,
    operateButtons,
    tableButtons,
    table,
    pagination,
    struct,
    showRefresh,
    ...options,
  })

  return Object.assign({...res})

}
