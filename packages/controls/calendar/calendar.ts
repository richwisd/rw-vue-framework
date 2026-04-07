import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Calendar from './calendar.vue'

export const Template: SFCWithInstall<typeof Calendar> = withInstall(Calendar)

import type { CalendarEmits, CalendarProps } from 'element-plus'

import { baseT } from '@rw-vue-framework/constants'

export type OptionT = CalendarProps & CalendarEmits & baseT & {
  dateCell:any
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
