import  { type SFCWithInstall, withInstall } from '../../utils'

import { type baseT } from '../../constants'

import Timeline from './timeline.vue'

export const Template: SFCWithInstall<typeof Timeline> = withInstall(Timeline)

import type { TimelineItemProps } from 'element-plus'
import { Component } from 'vue'

export type listT ={
  value:string,
  icon?:string | Component,
  color?:string,
  type?:'primary' | 'success' | 'warning' | 'danger' | 'info',
  size?:'normal' | 'large',
  hollow?:boolean,
}

export type OptionT = TimelineItemProps  & baseT & {
  default :any
  moduleName: string
  name: string
  lists:listT[]
}

export function init(moduleName: string, name:string,lists:listT[]=[], options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName,
    name,
    lists,
    ...options,
  }
}
