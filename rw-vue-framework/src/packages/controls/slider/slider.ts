import { type SFCWithInstall, withInstall } from '../../utils'

import Slider from './slider.vue'

export const Template:SFCWithInstall<typeof Slider> = withInstall(Slider)

import type { SliderProps, SliderEmits } from 'element-plus'
import { type baseT } from '../../constants'
import { reactive } from 'vue'

export type OptionT = SliderProps & SliderEmits & baseT & {
  moduleName:string
  name:string
  changeData?: (control: OptionT, val: any) => void
}

export function init ( moduleName: string,name: string,  options :Partial<OptionT> = {} ):Partial<OptionT>{
  return reactive({
    moduleName:moduleName,
    name:name,
    ...options,
  })
}
