import  'element-plus/dist/index.css'

import "element-plus/theme-chalk/dark/css-vars.css"

export * from 'element-plus'

export * from "pinia"

export * from 'vue-i18n'

export * as controls from "./packages/controls"

import installer from './packages/install'

export const install = installer.install

