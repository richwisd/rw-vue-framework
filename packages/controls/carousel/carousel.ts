import { type SFCWithInstall, withInstall } from "@rw-vue-framework/utils"
import { baseT } from '@rw-vue-framework/constants'
import Carousel from './carousel.vue'
export const Template: SFCWithInstall<typeof Carousel> = withInstall(Carousel)
import type { CarouselProps, CarouselEmits } from "element-plus"

export type OptionT = CarouselProps & CarouselEmits & baseT & {
  default: any,
  moduleName: string,
  name: string,
}

export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
