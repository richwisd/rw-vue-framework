import  { type Plugin } from 'vue'

export interface FrameworkOptions {
  i18n?: Plugin,
  apiBaseUrl?: string
  privateKey?: string
  /** 是否安装 Pinia（含持久化插件），默认 true */
  installPinia?: boolean
  /** 是否安装 vue-i18n，默认 true；若提供 i18n 则安装传入的实例，否则安装内置实例 */
  installI18n?: boolean
  /** 是否安装 Element Plus，默认 true */
  installElementPlus?: boolean
}