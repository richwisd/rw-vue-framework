import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Transfer from './transfer.vue'

export const Template: SFCWithInstall<typeof Transfer> = withInstall(Transfer)

import type { TransferProps,TransferEmits } from 'element-plus'
import { baseT } from '@rw-vue-framework/constants'

export type OptionT = TransferProps & TransferEmits & baseT & {
  moduleName: string
  name: string
  default:any
  leftFooter:string
  rightFooter:string
  leftEmpty:string
  rightEmpty:string
}

export function init (moduleName: string, name: string, options: Partial<OptionT> = {}):Partial<OptionT> {
  return {
   moduleName : moduleName,
    name: name,
    ...options,
  }
}
