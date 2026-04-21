import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT } from '../../constants'
import Text from './text.vue'
export const Template: SFCWithInstall<typeof Text> = withInstall(Text)
import type { TextProps } from 'element-plus'

export type OptionT = TextProps & baseT & {
  default: any

  multiLang?: boolean  // 在表格中会用到
  lang?: string // 显示哪些语言
  showTips: boolean // 显示提示
}

export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): OptionT {
  /* 处理复杂的默认值 */
  // 处理多语言，placeholder
  return {
    moduleName,
    name: name,
    multiLang: false,
    ...options,
    controlType: 'text'
  } as OptionT
}
