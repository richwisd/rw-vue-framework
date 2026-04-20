import type { App, Plugin } from 'vue'

import { type FrameworkOptions  } from '../constants/'

const isI18n = (p: any) => p?.global && typeof p.install === 'function'

export const makeInstaller = (components: Plugin[] = []) => {

  const install = (app: App, config?: FrameworkOptions) => {

    const { apiBaseUrl = '/', privateKey= '' } = config || {}

    app.provide('frameworkConfig', { apiBaseUrl, privateKey }) 

    components.forEach((component) => {

      if(isI18n(component) && config?.i18n){
        component = config.i18n  
      }

      app.use(component)

    })
  }

  return {
    install
  }
}