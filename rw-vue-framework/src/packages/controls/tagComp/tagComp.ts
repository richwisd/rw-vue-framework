import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT } from '../../constants'
import TagComp from './tagComp.vue'
export const Template: SFCWithInstall<typeof TagComp> = withInstall(TagComp)
import type { TagProps, TagEmits } from 'element-plus'
import { Component } from 'vue'

export type optionValueI = TagProps &
  TagEmits & {
    label: string
    value: any
  }

export type optionFromT = 'keyValue' | 'api' | 'variable' | ''

export type OptionT = TagProps &
  TagEmits &
  baseT & {
    collapseNum: number
    optionValues: optionValueI[]
    optionFrom: optionFromT
    buttonIcon: string | Component
    buttonLabel: string
    popoverWidth: number
    labelKey: string
    valueKey: string
    placeholder: string
    showAddNewTag: boolean
  }

export function init(
  moduleName: string,
  name: string,
  options: Partial<OptionT> = {},
): Partial<OptionT> {
  /* 处理复杂的默认值 */
  // 处理多语言，placeholder
  return {
    moduleName: moduleName,
    name: name,
    ...options,
    controlType: 'tagComp',
  } as OptionT
}
