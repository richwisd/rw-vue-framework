import { type SFCWithInstall, withInstall } from '../../utils'

import Calendar from './calendar.vue'

export const Template: SFCWithInstall<typeof Calendar> = withInstall(Calendar)

import type { CalendarEmits, CalendarProps } from 'element-plus'

import { type baseT, type RenderContentT } from '../../constants'

export type OptionT = CalendarProps & CalendarEmits & baseT & {
  dateCell:RenderContentT
  header: string
  moduleName:string
  name: string
}

export function init(moduleName: string, name: string, options:Partial<OptionT> ={}):Partial<OptionT> {
  return {
    moduleName,
    name,
    ...options,
  }
}
