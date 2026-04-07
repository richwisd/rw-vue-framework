import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import InfiniteScroll from  './infiniteScroll.vue'

export const Template: SFCWithInstall<typeof InfiniteScroll> = withInstall(InfiniteScroll)


import { baseT } from '@rw-vue-framework/constants'

export type OptionT =  baseT & {
  moduleName:string
  name:string
}

export function init( moduleName:string,name:string, options: Partial<OptionT> = {}):Partial<OptionT>{
  return {
    moduleName: moduleName,
    name : name,
   ...options
}
}

