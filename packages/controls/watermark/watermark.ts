import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'
import { baseT } from '@rw-vue-framework/constants'
import Watermark from './watermark.vue'
export const Template: SFCWithInstall<typeof Watermark> = withInstall(Watermark)
import type { WatermarkProps } from 'element-plus'

export type OptionT = WatermarkProps & baseT & {
  modularName: string
  name: string
}

export function init(modularName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    modularName: modularName,
    name: name,
    ...options,
  }
}
