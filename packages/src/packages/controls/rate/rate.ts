import { type SFCWithInstall, withInstall } from '../../utils'

import Rate from './rate.vue'

export const Template: SFCWithInstall<typeof Rate> = withInstall(Rate)

import type { RateProps, RateEmits } from 'element-plus'
import { type baseT } from '../../constants'

export type OptionT = RateProps & RateEmits & baseT & {
  moduleName: string
  name: string
}

export function init (moduleName: string,name: string, options: Partial<OptionT>= {}):Partial<OptionT>{
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
