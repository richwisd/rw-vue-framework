
import { type baseT } from '../../constants'

import { withInstall, type SFCWithInstall } from '../../utils'

import { pageStruct } from '../'

import { reactive } from 'vue'

import Search from './search.vue'

import SearchKey from './searchKeys.vue'

import { markRaw } from 'vue'

import {Search as SearchIcon , Refresh } from '@element-plus/icons-vue'

import { type complexT } from '../../constants'

export const SearchKeyTemplate: SFCWithInstall<typeof SearchKey> = withInstall(SearchKey)

export const Template: SFCWithInstall<typeof Search> = withInstall(Search)

import { RwButtonGroup } from '../buttonGroup'
import { RwFormItems } from '../formItems'
import { RwMergeSelect } from '../mergeSelect'

export type OptionT =
  baseT & {
    struct?: pageStruct.OptionT
    labelWidth?: string | number
    formItems: RwFormItems.OptionT
    buttons?: RwButtonGroup.OptionT
    complex: complexT

    defaultData: Record<string, any>
    getSearchData: (data: any) => Record<string, any>
    // 添加控件
    add: (
      type: string,
      name: string,
      complex: complexT,
      options?: Partial<RwFormItems.ExtendedControlOptionT>,
    ) => RwFormItems.OptionT | null

    addInput: (name: string, complex: complexT, options?: Partial<RwFormItems.ExtendedControlOptionT>) => RwFormItems.OptionT | null
    addSelect: (name: string, complex: complexT, options?: Partial<RwFormItems.ExtendedControlOptionT>) => RwFormItems.OptionT | null
    addDate: (name: string, complex: complexT, options?: Partial<RwFormItems.ExtendedControlOptionT>) => RwFormItems.OptionT | null
    addSwitch: (name: string, complex: complexT, options?: Partial<RwFormItems.ExtendedControlOptionT>) => RwFormItems.OptionT | null
    addBetween: (name: string, complex: complexT, options?: Partial<RwFormItems.ExtendedControlOptionT>) => RwFormItems.OptionT | null
    addMergeSelect: (
      name: string,
      complex:complexT,
      optionFrom: RwMergeSelect.optionFromT,
      optionValues: RwMergeSelect.optionValuesT | string,
      options?: Partial<RwFormItems.MergeSelectExtendedOptionT>,
    ) => RwFormItems.OptionT | null
  }

export const init = (
  struct: pageStruct.OptionT,
  options: Partial<OptionT> = {},
) : OptionT => {

  const buttons = RwButtonGroup.init(struct.name, { isGroup: false, buttonsArea: 'search' })

  const searchData:Record<string, any>[] = []

  buttons.addButton('search', { label: "buttons.search", icon: markRaw(SearchIcon), type: 'primary' })
  buttons.addButton('reset', { label: "buttons.reset", icon: markRaw(Refresh) })

  const formItems = RwFormItems.init(struct,{ type: 'search', rowProps:{ gutter: 0 }})

  const instance = {
    labelWidth: '120px',
    formItems,
    searchData,
    buttons,
    struct,
    ...options,
    getSearchData: (data: any) => getSearchData(data, formItems),
    add: (type, name, complex, options) => createComponent(type, name, options, formItems, complex),
    addInput: (name,complex, options) => createComponent('Input', name, options, formItems, complex),
    addSelect: (name,complex, options) => createComponent('Select', name, options, formItems, complex),
    addDate: (name,complex, options) => createComponent('Date', name, options, formItems, complex),
    addSwitch: (name,complex, options) => createComponent('Switch', name, options, formItems, complex),
    addBetween: (name,complex, options) => createComponent('Between', name, options, formItems, complex),
    addMergeSelect: (name, complex, optionFrom, optionValues, options = {}) =>
      createMergeSelectComponent(name, optionFrom, optionValues, {...options, isModel: true}, formItems, complex)
  } as OptionT

  const res = reactive(instance)
  return Object.assign({
    ...res
  })
}

const ranges = ['datetimerange', 'daterange', 'monthrange', 'yearrange']

function getSearchData(searchData:Record<string, any>[], formItems:  RwFormItems.OptionT){
  const arr = []
  for(let i = 0, n = formItems.formItems.length; i < n; i++ ){
    const item = formItems.formItems[i]
    const name = item.name
    const value = searchData[name as keyof typeof searchData]
    // 修复类型错误：确保 init 是日期控件选项并且有 type 属性
    if(item.controlType?.toLowerCase() === 'date' &&
       item.init &&
       typeof item.init === 'object' &&
       'type' in item.init &&
       item.init.type &&
       ranges.includes(item.init.type as string) &&
       Array.isArray(value)){
      arr.push({ key: name, value: value[0], option: ">=", checked: true })
      arr.push({ key: name, value: value[1], option: "<", checked: true })
    }else{
      arr.push({ key: name, value: value, option: item.complex, checked: true })
    }
  }
  return arr
}


// 创建通用组件的函数
function createComponent(
  controlType: string,
  name: string,
  options: Partial<RwFormItems.ExtendedControlOptionT> = {},
  formItems:  RwFormItems.OptionT,
  complex: complexT = "like"
): RwFormItems.OptionT | null {
  formItems.add(controlType, name, {
    ...options,
    isModel: controlType === 'Select'? true : undefined,
    complex, clearable: true, formItemProps:{ labelWidth: 'auto' }
  })

  return formItems
}

function createMergeSelectComponent(
  name: string,
  optionFrom: RwMergeSelect.optionFromT,
  optionValues: RwMergeSelect.optionValuesT | string,
  options: Partial<RwFormItems.MergeSelectExtendedOptionT>,
  formItems:  RwFormItems.OptionT,
  complex:complexT = 'like'
) : RwFormItems.OptionT | null {
  formItems.addMergeSelect(name, optionFrom, optionValues, {...options, complex, formItemProps:{ labelWidth: 'auto' }})
  return formItems
}
