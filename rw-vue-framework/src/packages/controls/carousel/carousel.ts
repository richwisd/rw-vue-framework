import { type SFCWithInstall, withInstall } from "../../utils"
import { type baseT, type RenderContentT } from '../../constants'
import Carousel from './carousel.vue'
export const Template: SFCWithInstall<typeof Carousel> = withInstall(Carousel)
import type { CarouselProps, CarouselEmits } from "element-plus"

export type OptionT = CarouselProps & CarouselEmits & baseT & {
  default: RenderContentT,
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
