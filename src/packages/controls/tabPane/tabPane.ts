import { t } from '../../locale'
import { type SFCWithInstall, withInstall } from '../../utils'
import TabPane from './tabPane.vue'

import { RwFormItems } from '../formItems'
import { RwTabs } from '../tabs'

import type { TabPaneProps } from 'element-plus'
import { type baseT } from '../../constants'
import { pageStruct } from '../'
import { reactive } from 'vue'

export const Template: SFCWithInstall<typeof TabPane> = withInstall(TabPane)

export type OptionT = TabPaneProps & baseT & {

  id: string

  inDialog: boolean

  contents: Array<RwFormItems.OptionT | RwTabs.OptionT>,
  tabPaneProps: Partial<TabPaneProps>,
  addFormItems: (struct: pageStruct.OptionT, options?: Partial<RwFormItems.OptionT>) => void
  addTabs: (options?: Partial<RwTabs.OptionT>) => void
}

export const init = (moduleName:string, name:string, options?:Partial<OptionT>): OptionT => {
  const contents: Array<RwFormItems.OptionT | RwTabs.OptionT> = reactive([])


  const tabPaneProps:Partial<TabPaneProps> = reactive({
    name: name,
    ...options?.tabPaneProps,
  })
  const inDialog = options?.inDialog ?? false;
  return {
    id: `fromTab-${name}-${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    moduleName,
    name,
    contents,
    inDialog,
    tabPaneProps,
    addFormItems: (struct: pageStruct.OptionT, options: Partial<RwFormItems.OptionT> = {},) => {
      contents.push(RwFormItems.init(struct, {...options, inDialog }))
    },
    addTabs: (options: Partial<RwTabs.OptionT> = {}) => {
      contents.push(RwTabs.init(options))
    },
    ...options,
    controlType: 'tabPane',
  } as OptionT
}
