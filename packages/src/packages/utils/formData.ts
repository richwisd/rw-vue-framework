// formContext.ts
import { type InjectionKey, inject, reactive, ref, computed, isReactive } from 'vue'

// 增强类型定义
export type NestedKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends Record<string, any>
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`
}[keyof T & (string | number)]

export type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never

export interface FormData<T = Record<string, any>> {
  formId: string
  data: T
  setFieldValue: <P extends string>(field: P, value: PathValue<T, P>) => void
  getFieldValue: <P extends string>(field: P) => PathValue<T, P> | undefined
  setFieldsValue: (values: Partial<T>) => void
  getFieldsValue: () => T
  deleteField: (field: string) => void
  hasField: (field: string) => boolean
  // mergeData: (data: Partial<T>) => void
  validate: () => Promise<boolean>
}

// 路径工具函数
export class PathUtils {
  private static cache = new Map<string, string[]>()

  static parsePath(path: string): string[] {
    if (this.cache.has(path)) {
      return this.cache.get(path)!
    }

    // 支持数组索引：user.addresses[0].street
    const keys = path
      .replace(/\[(\d+)\]/g, '.$1')
      .split('.')
      .filter(key => key !== '')

    this.cache.set(path, keys)
    return keys
  }

  static getValue(obj: any, path: string): any {
    const keys = this.parsePath(path)
    let current = obj

    for (const key of keys) {
      if (current === null || current === undefined) {
        return undefined
      }
      current = current[key]
    }

    return current
  }

  static setValue(obj: any, path: string, value: any): void {
    const keys = this.parsePath(path)
    let current = obj

    // 创建嵌套路径
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      const nextKey = keys[i + 1]

      if (current[key] === null || current[key] === undefined) {
        // 如果下一个key是数字，创建数组，否则创建对象
        current[key] = /^\d+$/.test(nextKey) ? [] : {}
      }

      current = current[key]
    }
    current[keys[keys.length - 1]] = value
  }

  static deleteValue(obj: any, path: string): boolean {
    const keys = this.parsePath(path)
    let current = obj

    // 找到父对象
    for (let i = 0; i < keys.length - 1; i++) {
      if (current === null || current === undefined) {
        return false
      }
      current = current[keys[i]]
    }

    if (current && keys.length > 0) {
      const lastKey = keys[keys.length - 1]
      if (Array.isArray(current)) {
        current.splice(parseInt(lastKey), 1)
      } else {
        delete current[lastKey]
      }
      return true
    }

    return false
  }

  static hasValue(obj: any, path: string): boolean {
    const keys = this.parsePath(path)
    let current = obj

    for (const key of keys) {
      if (current === null || current === undefined || !(key in current)) {
        return false
      }
      current = current[key]
    }

    return true
  }
}

export function createFormData<T extends Record<string, any>>(
  formId: string,
  initialData: T = {} as T
) {
  // 检测 initialData 是否已经是响应式的
  const isReactiveData = isReactive(initialData)
  const state = isReactiveData
    ? { data: initialData } // 直接使用响应式数据
    : reactive({ data: { ...initialData } }) // 创建新的响应式对象

  const context: FormData<T> = {
    formId,
    data: state.data as T,

    setFieldValue: (field, value) => {
      try {
        PathUtils.setValue(state.data, field, value)
      } catch (error) {
        console.error(`[FormData] 设置字段 '${field}' 失败:`, error)
      }
    },

    getFieldValue: (field) => {
      try {
        return PathUtils.getValue(state.data, field)
      } catch (error) {
        console.error(`[FormData] 获取字段 '${field}' 失败:`, error)
        return undefined
      }
    },

    setFieldsValue: (values) => {
      Object.entries(values).forEach(([field, value]) => {
        context.setFieldValue(field, value)
      })
    },

    getFieldsValue: () => state.data as T,

    deleteField: (field) => {
      PathUtils.deleteValue(state.data, field)
    },

    hasField: (field) => {
      return PathUtils.hasValue(state.data, field)
    },

    // mergeData: (data) => {
    //   Object.assign(state.data, data)
    // },

    validate: async () => {
      return true
    }
  }

  return context
}

// 增强的useFormField Hook
export function useFormField<T = any>(fieldName: string) {
  const formContext = inject<FormData>(FormDataKey)

  if (!formContext) {
    if (process?.env?.NODE_ENV !== 'production') {
      console.warn(`[useFormField] FormData not found for field '${fieldName}'. Make sure this component is used within a RwForm component.`)
    }
    return {
      value: ref<T | undefined>(undefined),
      hasValue: ref(false),
      deleteField: () => {},
      setField: (value: T) => {}
    }
  }

  return {
    value: computed<T | undefined>({
      get: () => formContext.getFieldValue(fieldName),
      set: (value) => formContext.setFieldValue(fieldName, value)
    }),
    hasValue: computed(() => formContext.hasField(fieldName)),
    deleteField: () => formContext.deleteField(fieldName),
    setField: (value: T) => formContext.setFieldValue(fieldName, value)
  }
}

export const FormDataKey: InjectionKey<FormData> = Symbol('formData')
