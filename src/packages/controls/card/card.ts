import { type SFCWithInstall, withInstall } from '../../utils'

import Card from './card.vue'

export const Template: SFCWithInstall<typeof Card> = withInstall(Card)

import type { CardProps } from 'element-plus'

import { type baseT } from '../../constants'


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
