import { type SFCWithInstall, withInstall } from '../../utils'

import Switch from './switch.vue'

export const Template: SFCWithInstall<typeof Switch> = withInstall(Switch)

import type { SwitchProps, SwitchEmits } from 'element-plus'
import { type baseT, type RenderContentT } from '../../constants'
import { reactive } from 'vue'

export type OptionT = SwitchProps & SwitchEmits & baseT & {
  moduleName:string
  name:string
  activeAction: RenderContentT
  inactiveAction: RenderContentT
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

