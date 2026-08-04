import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT } from '../../constants'
import Tag from './tag.vue'
export const Template: SFCWithInstall<typeof Tag> = withInstall(Tag)
import type { TagProps, TagEmits } from 'element-plus'

export type OptionT = TagProps & TagEmits & baseT & {
  default: any
}

export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  /* 处理复杂的默认值 */
  // 处理多语言，placeholder
  return {
    moduleName: moduleName,
    name: name,
    ...options,
    controlType: 'tag'
  }
}
