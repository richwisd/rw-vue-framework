import { type SFCWithInstall, withInstall } from "../../utils";
import { type baseT } from '../../constants'

import Segmented from './segmented.vue'

export const Template: SFCWithInstall<typeof Segmented> = withInstall(Segmented)

import type { SegmentedProps, SegmentedEmits } from "element-plus";

export type OptionT = SegmentedProps & SegmentedEmits & baseT & {
  default: any
  moduleName: string
  name: string
}

export function init(moduleName:string, name: string, options: Partial<OptionT> = {}): OptionT {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
    controlType: 'Segmented'
  } as OptionT
}
