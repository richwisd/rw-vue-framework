import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Switch from './switch.vue'

export const Template: SFCWithInstall<typeof Switch> = withInstall(Switch)

import type { SwitchProps, SwitchEmits } from 'element-plus'
import { baseT } from '@rw-vue-framework/constants'
import { reactive } from 'vue'

export type OptionT = SwitchProps & SwitchEmits & baseT & {
  moduleName:string
  name:string
  activeAction: any
  inactiveAction: any
  loading?: boolean
  changeData?: (control: OptionT, val: any) => void
}

export function init(moduleName:string,name:string ,options: Partial<OptionT> = {}):Partial<OptionT> {
  return reactive({
    moduleName:moduleName,
    name:name,
    ...options,
    controlType: 'switch',
  })
}

