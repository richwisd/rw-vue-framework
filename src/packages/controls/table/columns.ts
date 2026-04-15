import { tableStruct } from "../"

import { type baseT } from '../../constants'

import type { TableColumnCtx } from "element-plus"

import type { Component } from 'vue'

import type { ExtendedControlOptionT } from './table'

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
