import { get, set } from 'lodash-unified'
// 修复 type-fest Entries 类型导入问题
// 在 type-fest 0.6.0 版本中没有导出 Entries 类型，所以我们自定义定义它
type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
import type { Arrayable } from '.'
import { merge, isObject, isPlainObject } from 'lodash-es'

export const keysOf = <T extends object>(arr: T) =>
  Object.keys(arr) as Array<keyof T>
export const entriesOf = <T extends object>(arr: T) =>
  Object.entries(arr) as Entries<T>

// 修复 hasOwn 导入问题
// Vue 3 不再直接导出 hasOwn，我们使用 Object.prototype.hasOwnProperty.call 替代
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val =>
  Object.prototype.hasOwnProperty.call(val, key)

// 添加深度合并函数
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  return merge({}, target, ...sources)
}

// 添加原地深度合并函数（直接修改目标对象）
// 修改 deepMergeInPlace 函数的类型定义
export const deepMergeInPlace = <T extends Record<string, any>>(
  target: T,
  source: Partial<T> | Record<string, any> = {}
): T => {
  Object.keys(source).forEach(key => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (
      isPlainObject(targetValue) &&
      isPlainObject(sourceValue)
    ) {
      // 递归合并嵌套对象
      deepMergeInPlace(targetValue, sourceValue)
    } else if (sourceValue !== undefined) {
      // 直接赋值（包括基本类型、数组、null 等）
      (target as Record<string, any>)[key] = sourceValue
    }
  })
  return target
}

// 添加数据验证函数
export const validateObjectStructure = (
  data: any,
  requiredKeys: string[] = []
): boolean => {
  if (!isPlainObject(data)) return false

  // 如果指定了必需的键，检查是否至少包含其中一个
  if (requiredKeys.length > 0) {
    return requiredKeys.some(key => key in data)
  }

  return true
}

// 添加安全的属性设置函数
export const safeSet = (
  obj: Record<string, any>,
  path: string,
  value: any
): boolean => {
  try {
    const keys = path.split('.')
    let current = obj

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!isPlainObject(current[key])) {
        current[key] = {}
      }
      current = current[key]
    }

    current[keys[keys.length - 1]] = value
    return true
  } catch {
    return false
  }
}

// 添加安全的属性获取函数
export const safeGet = (
  obj: Record<string, any>,
  path: string,
  defaultValue?: any
): any => {
  try {
    const keys = path.split('.')
    let current = obj

    for (const key of keys) {
      if (current == null || !isObject(current)) {
        return defaultValue
      }
      current = current[key]
    }

    return current !== undefined ? current : defaultValue
  } catch {
    return defaultValue
  }
}

export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any
): { value: T } => {
  const pathStr = Array.isArray(path) ? path.join('.') : path
  return {
    get value() {
      return safeGet(obj, pathStr, defaultValue)
    },
    set value(val: any) {
      safeSet(obj, pathStr, val)
    },
  }
}


// 赋值嵌套数据
export function assignmentData(initial, current) {
  const result = {};

  // 先处理 initialData 中的属性
  for (const key in initial) {
    const initialValue = initial[key];
    const currentValue = current[key];

    if (typeof initialValue === 'object' && initialValue !== null && !Array.isArray(initialValue)) {
      // 如果 initialData 中的属性是对象，递归处理
      result[key] = assignmentData(initialValue, currentValue || {});
    } else if (Array.isArray(initialValue)) {
      // 如果 initialData 中的属性是数组
      if (!currentValue) {
        result[key] = [];
      } else if (Array.isArray(currentValue)) {
        result[key] = [...currentValue];
      } else if (typeof currentValue === 'number') {
        result[key] = [currentValue];
      } else if (typeof currentValue === 'string') {
        result[key] = currentValue.split(',').map(item => item.trim());
      } else {
        console.warn(`Warning: Unsupported type for key "${key}". Expected string, number, or array.`);
        result[key] = [];
      }
    } else {
      // 如果 initialData 中的属性不是数组或对象，直接赋值
      result[key] = currentValue !== undefined ? currentValue : initialValue;
    }
  }

  return result;
}

// 赋值嵌套数据
export function transDataToString(initial) {
  const result = {};

  // 先处理 initialData 中的属性
  for (const key in initial) {
    const initialValue = initial[key];

    if (typeof initialValue === 'object' && initialValue !== null && !Array.isArray(initialValue)) {
      // 如果 initialData 中的属性是对象，递归处理
      result[key] = transDataToString(initialValue);
    } else if (Array.isArray(initialValue)) {
      result[key] = initialValue.join(',')
    } else {
      // 如果 initialData 中的属性不是数组或对象，直接赋值
      result[key] =  initialValue;
    }
  }

  return result;
}
