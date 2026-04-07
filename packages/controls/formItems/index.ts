import FormItems from './formItems.vue'
import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'
import type * as RwFormItemsNS from './formItems'
import * as RwFormItemsBase from './formItems'
const Template: SFCWithInstall<typeof FormItems> = withInstall(FormItems)

export const RwFormItems = Object.assign({}, RwFormItemsBase, { Template }) as typeof RwFormItemsBase & { Template: SFCWithInstall<typeof FormItems> }
export namespace RwFormItems {
  export type OptionT = RwFormItemsNS.OptionT
  export type ExtendedControlOptionT = RwFormItemsNS.ExtendedControlOptionT
  export type MergeSelectExtendedOptionT = RwFormItemsNS.MergeSelectExtendedOptionT
}
