import type { Component } from 'vue'

export type baseT = {
  name: string
  label?: string
  // field?: any
  controlType: string
  moduleName?: string
  show?: boolean
  style?: Record<string, string>
}

/**
 * 渲染型配置项类型：
 * 适用于任何最终走「组件 / v-html / span」渲染路径的字段，
 * 如 default / header / footer / icon / prefix / description / image 等。
 */
export type RenderContentT = Component | string | number | boolean | null | undefined
