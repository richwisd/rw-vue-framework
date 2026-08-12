import { type baseT } from '../../constants'

import { pageStruct } from '../../controls'

import { withInstall,type SFCWithInstall } from '../../utils'

import Between from './between.vue'

export const Template: SFCWithInstall<typeof Between> = withInstall(Between)

export type OptionT = baseT & {

}

export function init(
  struct: pageStruct.OptionT,
  options: Partial<OptionT> = {})
{
  return { ...options }
}


