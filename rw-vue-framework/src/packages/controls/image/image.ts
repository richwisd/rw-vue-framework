import { type baseT, type RenderContentT } from '../../constants'

import { withInstall,type SFCWithInstall } from '../../utils'

import Image from './image.vue'
import type { ImageProps, ImageEmits } from 'element-plus'


export const Template: SFCWithInstall<typeof Image> = withInstall(Image)

export type OptionT = baseT & ImageProps & ImageEmits & {
  isPreview: boolean // 是否开启大图预览 ：当preview-src-list为空数组时，自动将当前src加入其中开启预览，当preview-src-list不为空数组时，则不添加

  // 插槽
  placeholder: RenderContentT
  error: RenderContentT
  viewer: RenderContentT
  progress: RenderContentT
  toolbar: RenderContentT
}

export function init(
  modularName: string,
  name: string,
  options: Partial<OptionT> = {})
{
  return { modularName, name, isPreview: true, "preview-teleported": true, ...options, controlType: 'image' } as OptionT

}

