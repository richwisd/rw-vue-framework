import installer from './defaults'
export * from '@rw-vue-framework/controls'
export * from '@rw-vue-framework/pages'
export * from '@rw-vue-framework/constants'
export * from '@rw-vue-framework/directives'
export * from '@rw-vue-framework/hooks'
export * from '@rw-vue-framework/tool-comp'
export * from '@rw-vue-framework/layout'
export * from '@rw-vue-framework/locale'
export * from '@rw-vue-framework/stores'
export * from '@rw-vue-framework/utils'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
