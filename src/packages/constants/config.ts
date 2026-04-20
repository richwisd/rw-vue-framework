import  { type Plugin } from 'vue'

export interface FrameworkOptions {
  i18n?: Plugin,
  apiBaseUrl?: string
  privateKey?: string
}