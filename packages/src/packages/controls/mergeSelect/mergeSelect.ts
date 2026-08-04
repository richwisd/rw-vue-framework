import { type baseT } from '../../constants'
import { type SFCWithInstall, withInstall } from '../../utils'

import type { SelectProps, TreeInstance } from 'element-plus'

import { RwSelect } from '../select'

import MergeSelect from './mergeSelect.vue'

export const Template: SFCWithInstall<typeof MergeSelect> = withInstall(MergeSelect)

export type treeSelectT = RwSelect.SelectEmits & SelectProps & TreeInstance["$props"] & baseT

export type OptionT = (treeSelectT | RwSelect.OptionT) & {
  type: 'select'|'radio'|'checkbox'|'switch'|'treeSelect'
  checkBoxType: boolean
  optionFrom: optionFromT
  optionValues: optionValuesT
  url: string
  valueKey: string
  labelKey: string
  editId: string | number
  nodeKey: string
  remoteParamKey: string
  showCheckAll: boolean
  optionTemplate: any
  tagTemplate: any
  labelShow: boolean

  isModel:boolean

  params: any

  showImage: boolean
  showOpsTemplate: boolean
  opsTemplateHeight: string
  opsTemplateWidth: string

  onChange?: (val: any) => any
}
export type optionFromT = "keyValue" | "api" | "variable"

export type optionValuesT = RwSelect.listT[] | (TreeInstance["$props"]["data"] & {
  disabled?: boolean,
  [key: string]: any
})[]

type Ov = optionValuesT | string

// 使用泛型函数
export function init(
  moduleName: string,
  name: string,
  optionFrom: optionFromT,
  optionValues: Ov,
  options: Partial<OptionT> = {},
): Partial<OptionT> {
  let type = options.type, url = ''
  // 当options.type不指定 且 optionValues存在时，根据选项数量自动确定 type
  if (!options.type && typeof optionValues !== 'string' && optionValues?.length > 0) {
    const optionsLength = optionValues.length;

    type = optionsLength === 1
      ? 'switch'
      : optionsLength <= 5
        ? options.multiple ? 'checkbox' : 'radio'
        : 'select';
  } else {
    type = options.type || 'select'
  }
  if(typeof optionValues === 'string') {
    url = optionValues
    optionValues = []
  }
  // 如果设置了全选
  if (options.showCheckAll) {
    type = 'select'
  }

  return {
    moduleName,
    name,
    optionFrom,
    optionValues,
    type,
    url,
    // placeholder: t('controls.pleaseSelect') + t(moduleName ? `${moduleName}.${name}` : name),
    ...options,
    controlType: 'mergeSelect',
  }
}

/**
 *
 * 1、自动更加选项多少展示选择的类型
 * 2、2个选项时，使用switch方式展示
 * 3、3个以上5个以下，单选，使用raido展示
 * 4、3个以上5个以下，多选，使用checkbox展示
 *
 * */
