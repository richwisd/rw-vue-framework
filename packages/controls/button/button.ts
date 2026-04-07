import { type SFCWithInstall, withInstall, Mutable } from '@rw-vue-framework/utils'

import Button from './button.vue'

export const Template: SFCWithInstall<typeof Button> = withInstall(Button)

import type { ButtonProps } from 'element-plus'
import { baseT } from '@rw-vue-framework/constants'
import { Component } from 'vue'

// 使用更具体的函数类型定义
export type OptionT = Mutable<ButtonProps> & baseT &  {
  default: any,
  loadingSlot: any,
  iconSlot: any,
  moduleName: string,
  name: string,
  customized: boolean, // 是否是自定义的按钮,false表示是适配localSetting的
  suffixIcon: any | string | Component, // 后缀图标
  tag: any
  // 组内分割线
  separator: boolean, // 竖线

  // 添加 click 事件类型定义，支持异步
  click: (e: MouseEvent) => any | Promise<any>
  refreshButton?: (options: any, data?: any) => Partial<OptionT>
}

export function init(moduleName:string, name: string, options?: Partial<OptionT> ): Partial<OptionT> {
  /* 处理复杂的默认值 */
  // 处理多语言，placeholder

  return {
    moduleName: moduleName,
    name: name,
    customized: false,
    separator: false,
    // label: t(`${moduleName}.${name}`),
    ...options,
    controlType: "button",
    text: options?.separator ?? options?.text,
    disabled: options?.separator ?? options?.disabled,
  }
}

