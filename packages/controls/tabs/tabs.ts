import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import { RwTabPane } from '../tabPane'
import { RwTabs } from '../tabs'
import { RwFormItems } from '../formItems'


import Tabs from './tabs.vue'

export const Template: SFCWithInstall<typeof Tabs> = withInstall(Tabs)

import type { TabsProps, TabsEmits } from 'element-plus'
import { baseT } from '@rw-vue-framework/constants'


// 使用更具体的函数类型定义
export type OptionT = TabsProps & TabsEmits & baseT &  {
  id: string
  inDialog: boolean,
  tabPanes: RwTabPane.OptionT[],
  defaultValue: string | number
  addTabPaneSimple: (moduleName:string, name:string, options?: Partial<RwTabPane.OptionT>) => any,
  addTabPane: (moduleName:string, name:string, contents: Array<RwFormItems.OptionT | RwTabs.OptionT> | RwFormItems.OptionT | RwTabs.OptionT, options?: Partial<RwTabPane.OptionT>) => any,
}


export function init( options: Partial<OptionT> = {} ): OptionT {
  const id = `tabs--${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  const tabPanes:Partial<RwTabPane.OptionT>[] = []
  const inDialog = options?.inDialog ?? false;
  const self = {
    id,
    tabPanes,
    inDialog,
    addTabPaneSimple: (moduleName:string, name:string, options:Partial<RwTabPane.OptionT>) => {
      tabPanes.push(RwTabPane.init(moduleName, name, {...options, inDialog }))
      return self
    },
    addTabPane: (moduleName:string, name:string, contents: Array<RwFormItems.OptionT | RwTabs.OptionT> | RwFormItems.OptionT | RwTabs.OptionT, options?: Partial<RwTabPane.OptionT>) => {
      tabPanes.push(RwTabPane.init(moduleName, name, {...options, inDialog, contents: Array.isArray(contents) ? contents : [contents] }))
      return self
    },
    ...options,
    controlType: 'tab',
  } as OptionT
  return self
}

