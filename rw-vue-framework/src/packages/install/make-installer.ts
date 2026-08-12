import type { App, Plugin } from 'vue'

import { type FrameworkOptions } from '../constants/'

import { elementPlus, pinia, i18n as defaultI18n } from './component'

export const makeInstaller = (components: Plugin[] = []) => {

  const install = (app: App, config?: FrameworkOptions) => {

    const {
      apiBaseUrl = '/',
      privateKey = '',
      installPinia = true,
      installI18n = true,
      installElementPlus = true,
      i18n: customI18n,
    } = config || {}

    app.provide('frameworkConfig', { apiBaseUrl, privateKey })

    if (installElementPlus) {
      app.use(elementPlus)
    }

    if (installPinia) {
      app.use(pinia)
    }

    if (installI18n) {
      app.use(customI18n || defaultI18n)
    }

    components.forEach((component) => {
      app.use(component)
    })
  }

  return {
    install
  }
}
