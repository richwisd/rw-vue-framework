import { tableStruct } from "@rw-vue-framework/pages"

import { baseT } from '@rw-vue-framework/constants'

import { TableColumnCtx } from "element-plus"

import { Component } from 'vue'

import { ExtendedControlOptionT } from './table'

export type OptionT = baseT & TableColumnCtx<any> & {
  moduleName: string,
  name: string,
  Template: Component,
  init: ExtendedControlOptionT,

  isModel: boolean, // 是否是需要变化的表单组件 【Input，switch等】；展示组件【text、image】
}

export function init(
  struct: tableStruct.OptionT,
  options: Partial<OptionT> = {},
) {
  return {
    ...struct,
    ...options,
  } as OptionT
}
