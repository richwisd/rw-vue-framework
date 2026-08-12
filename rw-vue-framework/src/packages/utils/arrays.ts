import { isArray } from './types'

// 数组去重：适合数组元素为基本数据类型
export const unique = <T>(arr: T[]) => [...new Set(arr)]

// 数组去重：根据元素对象的指定属性进行去重
export const uniqueBy = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T
): T[] => {
  const map = new Map<any, T>()
  return arr.filter((item) => !map.has(item[key]) && map.set(item[key], item))
}

// 数组去重：根据自定义比较函数对数组进行去重
export const uniqueByFn = <T extends Record<string, any>>(
  arr: T[],
  compareFn: (item: T) => any
): T[] => {
  const map = new Map<any, T>()
  return arr.filter((item) => {
    const key = compareFn(item)
    return !map.has(key) && map.set(key, item)
  })
}

type Many<T> = T | ReadonlyArray<T>
// TODO: rename to `ensureArray`
/** like `_.castArray`, except falsy value returns empty array. */
export const castArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) return []
  return isArray(arr) ? arr : [arr as T]
}

// TODO: remove import alias
// avoid naming conflicts
export { castArray as ensureArray } from 'lodash-unified'
