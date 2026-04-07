import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import ColorPicker from './colorPicker.vue'

export const Template: SFCWithInstall<typeof ColorPicker> = withInstall(ColorPicker)

import type { ColorPickerProps,ColorPickerEmits } from 'element-plus'

import { baseT } from '@rw-vue-framework/constants'

export type OptionT = ColorPickerProps & ColorPickerEmits & baseT & {
  moduleName: string
  name: string
}

export function init (moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
