import { type SFCWithInstall, withInstall } from '../../utils'

import InfiniteScroll from  './infiniteScroll.vue'

export const Template: SFCWithInstall<typeof InfiniteScroll> = withInstall(InfiniteScroll)


import { type baseT } from '../../constants'

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

