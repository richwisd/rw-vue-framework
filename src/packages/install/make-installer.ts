import type { App, Plugin } from 'vue'

import { type FrameworkOptions  } from '../constants/'

export const makeInstaller = (components: Plugin[] = []) => {

  const install = (app: App, config?: FrameworkOptions) => {

    const { apiBaseUrl = '/', privateKey= '' } = config || {}

    console.log('Installing Duck Vue Components with config:', { apiBaseUrl, privateKey })

    app.provide('frameworkConfig', { apiBaseUrl, privateKey })

    app.config.globalProperties.$privateKey = privateKey 

    components.forEach((component) => {
      app.use(component)
    })
  }

  return {
    install
  }
}