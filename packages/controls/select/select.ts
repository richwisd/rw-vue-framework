import { baseT } from '@rw-vue-framework/constants'
import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import { SelectProps, selectEmits } from 'element-plus'

import { i18n } from '@rw-vue-framework/locale'
const { t } = i18n.global

import Select from './select.vue'

export const Template: SFCWithInstall<typeof Select> = withInstall(Select)

export type SelectEmits = typeof selectEmits
// slect组件中optionsList的类型
export type listT = {
  value: string | number | boolean | object,
  label?: string | number,
  disabled?: boolean,
  [key: string]: any
}

export type OptionT  = SelectProps & SelectEmits & baseT & {
  lists: listT[] // | { label: string options: listT[] [key: string]: any }[]
  showCheckAll: boolean
  groupBy: string
  remoteUrl: string
  // 参数名
  paramName: string

  isModel: boolean
  // 插槽
  optionTemplate: any
  tagTemplate: any
  empty: any
  prefix: any
}

// 使用泛型函数
export function init(
  moduleName:string,
  name: string,
  options: Partial<OptionT> = {},
) {
  return {
    moduleName,
    name,
    lists: [],
    // 参数名
    paramName: 'query',
    ...options,
    controlType: 'Select',
  } as OptionT
}


/**
 * 注意事项：
 * 1. 当使用远程接口时，需要在options中添加remoteUrl属性，
 * 2. 当使用分组时，需要在options中添加groupBy属性，
 * 3. 当使用多选时，需要在options中添加multiple属性，
 * 4. 当使用全选时，需要在options中添加showCheckAll属性，同时multiple属性必须为true，
 *
 * */
