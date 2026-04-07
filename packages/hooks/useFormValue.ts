// useFormValue.ts
import { computed, inject, getCurrentInstance, onUnmounted } from 'vue'
import { FormData, FormDataKey } from '@rw-vue-framework/utils'

/**
 * 表单组件值绑定 Hook
 * 支持 v-model 与 FormData 上下文的双向绑定，优先使用 v-model
 * @param componentName 组件名称（用于警告信息）
 * @param control 表单控件配置（必须包含 name 属性）
 * @param modelPropName v-model 绑定的属性名（默认 "modelValue"）
 * @returns 包含计算属性 fieldValue 的对象
 */
export function useFormValue<T extends { name: string }>(
  componentName: string,
  control: T,
  modelPropName: string = 'modelValue',
) {
  // 获取当前组件实例（严格模式下确保在组件内使用）
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error(`[${componentName}] useFormValue 必须在组件实例中调用`)
  }

  // 1. 处理表单上下文与命名空间
  const formData = inject<FormData | null>(FormDataKey, null)

  // 2. 性能追踪（仅开发环境）
  if (
    typeof process !== 'undefined' &&
    process.env?.NODE_ENV !== 'production' &&
    formData
  ) {
    const trackId = `[${formData.formId}] ${control.name}`
    console.time(`useFormValue:${trackId}`)
    onUnmounted(() => console.timeEnd(`useFormValue:${trackId}`))
  }

  // 3. 核心计算属性（实现双向绑定）
  const fieldValue = computed({
    get: () => {
      // 优先使用 v-model 绑定的值
      if (instance.props[modelPropName] !== undefined) {
        return instance.props[modelPropName]
      }

      // 其次使用表单上下文的值
      if (formData) {
        return formData.getFieldValue(control.name)
      }

      // 开发环境警告：无数据源
      if (
        typeof process !== 'undefined' &&
        process.env?.NODE_ENV !== 'production'
      ) {
        console.warn(
          `[${componentName}] 字段 '${control.name}' 未绑定数据源。请使用 v-model 或在 RwForm 组件内使用`,
        )
      }
      return undefined
    },

    set: (value) => {
      // 1. 优先更新 v-model
      const props = instance.props as Record<string, any>;
      if (props[modelPropName] !== undefined || (props.control && typeof props.control === 'object' && 'isModel' in props.control && props.control.isModel)) {
        instance.emit(`update:${modelPropName}`, value)
        return
      }

      // 2. 其次更新表单上下文
      if (formData) {
        try {
          formData.setFieldValue(control.name, value)
        } catch (error) {
          if (
            typeof process !== 'undefined' &&
            process.env?.NODE_ENV !== 'production'
          ) {
            console.error(
              `[${componentName}] 更新字段 '${control.name}' 失败:`,
              error,
            )
          }
        }
        return
      }

      // 开发环境警告：无数据接收器
      if (
        typeof process !== 'undefined' &&
        process.env?.NODE_ENV !== 'production'
      ) {
        console.warn(
          `[${componentName}] 字段 '${control.name}' 无数据接收器，值变更将丢失。`,
        )
      }
    },
  })

  // 4. 大型表单性能优化：卸载时清理可能的内存引用
  onUnmounted(() => {
    // 对于复杂嵌套对象，主动解除引用（可选，视内存情况而定）
    if (
      typeof process !== 'undefined' &&
      process.env?.NODE_ENV === 'development'
    ) {
      // 无实际操作，仅作为调试标记
    }
  })

  return {
    fieldValue,
  }
}
