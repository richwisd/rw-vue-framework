import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Slider from './slider.vue'

export const Template:SFCWithInstall<typeof Slider> = withInstall(Slider)

import type { SliderProps, SliderEmits } from 'element-plus'
import { baseT } from '@rw-vue-framework/constants'
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
