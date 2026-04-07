import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Card from './card.vue'

export const Template: SFCWithInstall<typeof Card> = withInstall(Card)

import type { CardProps } from 'element-plus'

import { baseT } from '@rw-vue-framework/constants'


export type OptionT = CardProps & baseT & {
  default:any,
  header:any
  footer:any
  moduleName:string
  name:string
}

export function init(moduleName:string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName:moduleName,
    name:name,
    ...options
  }
}
