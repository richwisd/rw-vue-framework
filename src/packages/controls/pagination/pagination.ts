
import { type baseT } from '../../constants'

import { withInstall, type SFCWithInstall } from '../../utils'

import type { PaginationProps, PaginationEmits } from 'element-plus'

import Pagination from './pagination.vue'

export const Template: SFCWithInstall<typeof Pagination> = withInstall(Pagination)

export type OptionT = PaginationProps &
  PaginationEmits &
  baseT & {
    total: number
    page: number
    pageSize: number
    currentPage: number
  }

export const init = (
  name: string,
  options: Partial<OptionT> = {},
) : OptionT => {
  options.currentPage = options.currentPage ?? 1
  options.page = options.page ?? 1
  options.pageSize = options.pageSize ?? 10
  options.total = options.total ?? 0
  return <OptionT>{
    name,
    ...options,
  }
}
