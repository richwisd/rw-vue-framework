import { isArray, isObject, isString } from '@vue/shared'
import { isNil } from 'lodash-unified'

export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol,
  isPlainObject,
} from '@vue/shared'

export const isUndefined = (val: any): val is undefined => val === undefined
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isNumber = (val: any): val is number => typeof val === 'number'

export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

export const isPropAbsent = (prop: unknown): prop is null | undefined =>
  isNil(prop)

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

export const isWindow = (val: unknown): val is Window => val === window

/** 增加 */
// 判断是否是HTML片段
export const isHTML = (val: string): boolean => {
  const reg = /^<[a-z]+(\s[^>]+)?>[\s\S]*<\/[a-z]+>$/
  return reg.test(val)
}

// 判断是否是vue3中的component组件可用的is属性
export const isComponent = (val: any): boolean => {
  // 字符串（组件名）或对象（组件定义）
  if (isString(val) || isObject(val)) return true

  // 函数类型（可能是异步组件或函数式组件）
  if (typeof val === 'function') return true

  // 支持 null 或 undefined（表示不渲染任何组件）
  if (val === null || val === undefined) return true

  return false
}

// 添加一个方法来渲染模板字符串
export const renderTemplate = (template: string, data: any) => {
  // 替换模板中的变量
  const compiledTemplate = template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, key) => {
    const keys = key.trim().split('.')
    let value = data
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) return ''
    }
    return String(value ?? '')
  })

  return compiledTemplate
}


export const stringToArray = (value: string): string[] => {
  if (isEmpty(value)) return []
  return value.split(',')
}
