import { baseT } from '@rw-vue-framework/constants'

import { pageStruct } from '@rw-vue-framework/pages'

import { withInstall,type SFCWithInstall } from '@rw-vue-framework/utils'

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


