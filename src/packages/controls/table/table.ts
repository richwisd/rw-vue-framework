import type { baseT, infoI } from '../../constants'
import { pageStruct } from '../'
import { withInstall, type SFCWithInstall } from '../../utils'
import { type TableProps } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import * as columns from './columns'
import * as controls from '../index'
import { useLocalSettingStore } from '../../stores'
import Table from './table.vue'
export const Template: SFCWithInstall<typeof Table> = withInstall(Table)

import { RwButtonGroup } from '../buttonGroup'
import { RwInput } from '../input'
import { RwSelect } from '../select'
import { RwInputTag } from '../inputTag'
import { RwAutocomplete } from '../autocomplete'
import { RwInputNumber } from '../inputNumber'
import { RwRadio } from '../radio'
import { RwMergeInput } from '../mergeInput'
import { RwMergeSelect } from '../mergeSelect'
import { RwSwitch } from '../switch'
import { RwImage } from '../image'
import { RwTag } from '../tag'
import { RwTagComp } from '../tagComp'
import { RwText } from '../text'
import { RwUpload } from '../uploadNew'

import { markRaw, reactive } from 'vue'

// 定义控件类型联合
export type ControlOptionT =
  | RwInput.OptionT
  | RwSelect.OptionT
  | RwInputTag.OptionT
  | RwAutocomplete.OptionT
  | RwInputNumber.OptionT
  | RwRadio.OptionT
  | RwMergeInput.OptionT
  | RwMergeSelect.OptionT
  | RwSwitch.OptionT
  | RwImage.OptionT
  | RwTag.OptionT
  | RwTagComp.OptionT
  | RwText.OptionT
  | RwUpload.OptionT

// 扩展控件选项类型
export type ExtendedControlOptionT = ControlOptionT & columns.OptionT & {
  /** 隐藏手机号 */
  display?: 'hide'
  /** 数字保留小数位 */
  decimalPlaces?: number

  multiLang?: boolean  // 在表格中text会用到
  lang?: string // 显示哪些语言
  imgWidth?: number // 图片宽度
}

// 拖拽状态接口
export type DragState = {
  /** 原始行数据顺序 */
  originalRowOrder: any[]
  /** 当前行数据顺序 */
  currentRowOrder: any[]

  /** 原始列头顺序 */
  originalColumnHeader: [],
  /** 当前列头顺序 */
  currentColumnHeader: [],

  /** 当前列数据顺序 */
  currentColumnOrder: any[]
  /** 原始列配置顺序 */
  originalColumnOrder: any[]

  /** 是否有行拖拽历史 */
  hasRowDragHistory: boolean
  /** 是否有列拖拽历史 */
  hasColumnDragHistory: boolean
}

// 表格组件暴露的方法接口
export interface TableMethods {
  /** 重置行拖拽状态 */
  resetRowDrag(): boolean
  /** 重置列拖拽状态 */
  resetColumnDrag(): boolean
  /** 重置所有拖拽状态 */
  resetAllDrag(): boolean
}

export type OptionT = baseT &
  TableProps<any> & {
    /** 序号宽度 */
    indexWidth: number
    /** 选择框宽度 */
    selectionWidth: number
    /** 显示索引 */
    showIndex: boolean
    /** 显示全选 */
    showCheckAll: boolean
    /** 表格内容操作区按钮 */
    lineButtons: RwButtonGroup.OptionT
    headerLineButtons: RwButtonGroup.OptionT
    allForm: boolean
    changeForm?: (val:any, name:string, scope) => void

    otherButtons: RwButtonGroup.OptionT

    lineButtonWidth?: string | number

    columns: columns.OptionT[]

    clickRow: infoI

    selectionRows: infoI[]

    loading: boolean

    struct: pageStruct.OptionT

    showEdit: boolean

    /** Debug */
    debug: boolean

    canSort: boolean

    /** 当前排序字段 */
    sortField: string
    /** 当前排序方式 ascending / descending / null */
    sortOrder: string

    loadLast: (data: infoI[]) => infoI[]

    onLoad: (loadData: {
      queryPage: { page: number; pageSize: number }
      queryOrder: { orderBy?: string; isDescending: boolean }
      searchList: any[]
      [key: string]: any
    }) => any


    /** 列配置 */
    add: (
      type: string,
      name: string,
      options?: Partial<ExtendedControlOptionT>,
      isModel?: boolean,
    ) => columns.OptionT | null

    addInput: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null
    addMobile: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null
    addText: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null
    addImage: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null
    addDate: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null
    addTag: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null
    addNumber: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null
    addSwitch: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null
    addTextMultiLang: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null

    // addHtml: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null
    /* 新增 */
    addSelect: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null,
    addUpload: (name: string, options?: Partial<ExtendedControlOptionT>) => columns.OptionT | null,
    addMergeSelect: (
      name: string,
      optionFrom: RwMergeSelect.optionFromT,
      optionValues: RwMergeSelect.optionValuesT | string,
      options?: Partial<ExtendedControlOptionT>,
    ) => columns.OptionT | null,
  }

export function init(
  struct: pageStruct.OptionT,
  options: Partial<OptionT> = {},
) {
  const showEdit = options?.showEdit ?? true
  const allForm = options?.allForm ?? false


  
  const columns: columns.OptionT[] = []

  const lineButtons =  reactive(RwButtonGroup.init(struct.name, { isGroup: true, buttonsArea: 'tableLine'}))
  const headerLineButtons =  reactive(RwButtonGroup.init(struct.name, { isGroup: false, buttonsArea: 'tableLine'}))
  const otherButtons = reactive(RwButtonGroup.init(struct.name, { isGroup: false, buttonsArea: 'tableLine'}))

  // 初始化行按钮 start
  if(!allForm) {
    if(showEdit)
      lineButtons.addButton('edit',{ label: 'buttons.edit', icon: markRaw(Edit), type: 'primary' })
  } else {
    headerLineButtons.addButton('edit',{ label: 'buttons.append', icon: markRaw(Plus), type: 'primary' })
  }


  const localSetting = useLocalSettingStore()

  if (localSetting.pageTable.table.deleteConfirmStyle == "modal"){
    lineButtons.addButton("deleteLine", { label: "buttons.delete", icon: markRaw(Delete),type:"default"})
  }else{
    lineButtons.addPopconfirm("deleteLine", {
      label: "buttons.delete" ,
      confirmButtonText: "buttons.confirmDelete",
      confirmButtonType: "danger",
      icon: markRaw(Delete),
      hideAfter:50,
      width: 180
    })
  }

  // 初始化行按钮 end

  // 计算操作按钮宽度 start

  let lineButtonWidth = 0

  switch(localSetting.system.size){
    case "small":
      lineButtonWidth = 36
    break
    case "large":
      lineButtonWidth = 72
    break
    default:
      lineButtonWidth = 54
  }

  let totalLineString = 0

  let totalLineLength = 0

  if (lineButtons.controls.length > 3){

    lineButtons.controls= lineButtons.controls.slice(0,2)

    otherButtons.controls = lineButtons.controls.slice(2)

    totalLineLength = lineButtons.controls.length + 1

  }else{
    totalLineLength = lineButtons.controls.length
  }
  if(!localSetting.pageTable.table.showMenu)
    lineButtons.controls.forEach((control:any)=>{
      totalLineString += control.config.label.length + 1
    })
  else totalLineString = 4

  lineButtonWidth += (totalLineString + totalLineLength + 2) * (localSetting.system.size == "small" ? 14 : 18) + (totalLineLength - 1) * (localSetting.system.size == "small" ? 14 : 18)

  if (otherButtons.controls && otherButtons.controls.length > 0){
    lineButtonWidth += localSetting.system.size=="small" ? 54 : 64
  }
  // 计算操作按钮宽度 end
  if(allForm) {
    lineButtonWidth = 90
  }

  // 初始化列配置
  const defaultOptions = {
    loading: false,
    rowKey: '',
    height: 'auto',
    showHeader: true,
    showIndex: false,
    showCheckAll: true,
    indexWidth: getWidth(options?.indexWidth ?? (localSetting.system.size=="small" ? 42 : 54)),
    selectionWidth: getWidth(options?.selectionWidth ?? 38),
    debug: false,
    lineButtonWidth
  }

  const instance = {
    columns,
    struct,
    ...defaultOptions,
    ...options,
    showEdit,
    allForm,
    lineButtons,
    headerLineButtons,
    add: (type, name, options, isModel = false) => createComponent(type, struct, name, {isModel, ...options}, columns),
    addInput: (name, options) => createComponent('Input', struct, name,  { isModel: true, ...options }, columns),
    addMobile: (name, options) => createComponent('Text', struct, name, {...options, formatter:  ((row: any, column: any, cellValue: any, index: any) => mobileFormatter(row, column, cellValue, index, options)) as any,  width: (options && options.display && options.display == 'hide') ?110 : 150}, columns),
    addText: (name, options) => createComponent('Text', struct, name, options, columns),
    addDate: (name, options) => createComponent('Date', struct, name, {type:'date',...options}, columns),
    addTag: (name, options) => createComponent('TagComp', struct, name, {...options,isModel: true }, columns),
    addNumber: (name, options) => createComponent('Number', struct, name, {...options, formatter: ((row: any, column: any, cellValue: any, index: any) => numberFormatter(row, column, cellValue, index,  options)) as any}, columns),
    addImage: (name, options) => createComponent('Image', struct, name, { width: 140, ...options}, columns),
    addSwitch: (name, options) => createComponent('Switch', struct, name, {...options,isModel: true, width: 80}, columns),
    addTextMultiLang: (name, options) => createComponent('Text', struct, name, {...options, multiLang: true}, columns),
    // addHtml: (name, options) => createComponent('Html', struct, name, options, columns),
    /* 新增 */
    addSelect: (name, options) => createComponent('Select', struct, name, { isModel: true, ...options }, columns),
    addUpload: (name, options) => createComponent('Upload', struct, name, { isModel: true, imgWidth: 60, ...options }, columns),
    addMergeSelect: (name, optionFrom, optionValues, options) => createMergeSelectComponent(struct, name, optionFrom, optionValues, { isModel: true, ...options }, columns),
    controlType: 'Table',
    canSort: false,
    sortField: '',
    sortOrder: '',
  } as OptionT

  return instance
}

// 手机号码格式化
function mobileFormatter(row: any, column: any, cellValue: any, index: any, options: any):any{
  if(options && options.display && options.display == 'hide'){
    return row[column.property].slice(0, 3) + "****" + row[column.property].slice(-4)
  }
  return row[column.property]
}

// 数字格式化
function numberFormatter(row: any, column: any, cellValue: any, index: any, options: any):any{
  if(options && options.decimalPlaces){
    return parseFloat(cellValue).toFixed(options.decimalPlaces)
  }
  return cellValue
}

// 创建通用组件的函数
function createComponent(
  controlType: string,
  struct: pageStruct.OptionT,
  name: string,
  options: Partial<ExtendedControlOptionT> = {},
  columns?: columns.OptionT[],
): columns.OptionT | null {

  let width = options.width

  switch (controlType) {
    case 'Switch':
      width = ""
      break;
    case 'Date':
      controlType = 'Text'
      if(options.type == 'date' || options.type == 'daterange'){
        options.width = 103
      }else if(options.type == 'datetime' || options.type == 'datetimerange'){
        options.width = 170
      }
      break;
    case 'Number':
      controlType = 'Text'
      options.width = options.width ?? 80
      break;
    default:
      break;
  }

  const ctrl = controlType === 'Html' ? 'Html' : (controls as any)[`Rw${controlType}`]
  if ( controlType !== 'Html' && (!ctrl || typeof ctrl.init !== 'function')) {
    console.warn(`Control "${controlType}" not found or invalid`)
    return null
  }

  // 配置表格列默认值
  const controlConfig = {
    moduleName: struct.name,
    name,
    Template: controlType === 'Html' ? null : markRaw(ctrl.Template),
    init: controlType === 'Html' ? {...options, controlType} : ctrl.init(struct.name, name, {...options, width}),
    width: getWidth(options.width),
    label:  options.label ?? `${struct.name}.${name}`,// t(`${struct.name}.${name}`),
    align: options.align ?? 'center',
    sortable: options.sortable ?? false,
    formatter: options.formatter?? undefined,
    showOverflowTooltip: options.showOverflowTooltip ?? false,
    isModel: options.isModel ?? false,
    controlType
  } as columns.OptionT

  if (columns) {
    columns.push(controlConfig)
  }

  return controlConfig
}

// 创建 MergeSelect 组件的专用函数
function createMergeSelectComponent(
  struct: pageStruct.OptionT,
  name: string,
  optionFrom: RwMergeSelect.optionFromT,
  optionValues: RwMergeSelect.optionValuesT | string,
  options: Partial<ExtendedControlOptionT> = {},
  columns?: columns.OptionT[],
): columns.OptionT | null {
  const ctrl = (controls as any)[`RwMergeSelect`]
  if (!ctrl || typeof ctrl.init !== 'function') {
    console.warn(`Control "MergeSelect" not found or invalid`)
    return null
  }

  // 配置表格列默认值
  const controlConfig = {
    moduleName: struct.name,
    name,
    Template: markRaw(ctrl.Template),
    init: ctrl.init(
      struct.name,
      name,
      optionFrom,
      optionValues,
      options,
    ),
    width: getWidth(options.width),
    label:  options.label ?? `${struct.name}.${name}`,
    align: options.align ?? 'center',
    sortable: options.sortable ?? false,
    formatter: options.formatter?? undefined,
    showOverflowTooltip: options.showOverflowTooltip ?? false,
    isModel: options.isModel ?? false,
    controlType: 'MergeSelect',
  } as columns.OptionT

  if (columns) {
    columns.push(controlConfig)
  }

  return controlConfig
}

function getWidth(width: string | number | undefined) {
  if (!width) return undefined;
  if (typeof width === 'string') {
    return parseInt(width.replace('px', ''))
  }
  return width
}


export function getFormContent(columns: columns.OptionT[]){
  const obj = {}
  for(let i = 0; i < columns.length; i++){
    const item = columns[i]
    obj[item.name] = ''
  }
  return obj
}
