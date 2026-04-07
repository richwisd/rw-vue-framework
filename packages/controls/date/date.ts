import { baseT } from '@rw-vue-framework/constants'
import { withInstall,type SFCWithInstall } from '@rw-vue-framework/utils'
import { type DatePickerProps } from 'element-plus'
import Date from './date.vue'
import { t } from '@rw-vue-framework/locale'

export const Template: SFCWithInstall<typeof Date> = withInstall(Date)

export type OptionT = baseT & DatePickerProps & {
  // 事件
  change: (val: string | number | Date | [Date, Date] | null) => void
  blur: (e: FocusEvent) => void
  focus: (e: FocusEvent) => void
  clear: () => void
  calendarChange: (val: [Date, null | Date]) => void
  panelChange: (date: Date | [Date, Date], mode: 'month' | 'year', view?: string) => void
  visibleChange: (visibility: boolean) => void

  // 插槽
  default: any
  rangeSeparator: any
  prevMonth: any
  nextMonth: any
  prevYear: any
  nextYear: any
}

export function init(
  moduleName:string, name: string,
  options: Partial<OptionT> = {})
{
  return {
    placeholder: t('controls.pleaseSelect') + t(moduleName ? `${moduleName}.${name}` : name),
    "start-placeholder": t('controls.pleaseSelect') + t('controls.startDate'),
    "end-placeholder": t('controls.pleaseSelect') + t('controls.endDate'),
    // "value-format": 'YYYY-MM-DD',
    ...options,
    moduleName,
    name,
    controlType: 'Date',
  }
}


