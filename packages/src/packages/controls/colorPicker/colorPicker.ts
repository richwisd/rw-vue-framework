import { type SFCWithInstall, withInstall } from '../../utils'

import ColorPicker from './colorPicker.vue'

export const Template: SFCWithInstall<typeof ColorPicker> = withInstall(ColorPicker)

import type { ColorPickerProps,ColorPickerEmits } from 'element-plus'

import { type baseT } from '../../constants'

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
