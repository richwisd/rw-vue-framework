import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'
import { baseT } from '@rw-vue-framework/constants'
import type { TreeInstance, TreeNodeData } from 'element-plus'
import Tree from './tree.vue'

export const Template: SFCWithInstall<typeof Tree> = withInstall(Tree)

// 树节点数据类型
export type TreeNode = TreeNodeData & {
  id?: string | number
  [key: string]: any
}

// 事件回调类型
export interface TreeEventCallbacks {
  onNodeClick?: (data: TreeNodeData, node: any, instance: TreeInstance) => void
  onCheckChange?: (data: TreeNodeData, checked: boolean, indeterminate: boolean) => void
  onCurrentChange?: (data: TreeNodeData, node: any) => void
  onNodeExpand?: (data: TreeNodeData, node: any, instance: TreeInstance) => void
  onNodeCollapse?: (data: TreeNodeData, node: any, instance: TreeInstance) => void
  onNodeContextmenu?: (event: Event, data: TreeNodeData, node: any, instance: TreeInstance) => void
  onNodeDragStart?: (node: any, event: DragEvent) => void
  onNodeDragEnter?: (draggingNode: any, dropNode: any, event: DragEvent) => void
  onNodeDragLeave?: (draggingNode: any, dropNode: any, event: DragEvent) => void
  onNodeDragOver?: (draggingNode: any, dropNode: any, event: DragEvent) => void
  onNodeDragEnd?: (draggingNode: any, dropNode: any, dropType: string, event: DragEvent) => void
  onNodeDrop?: (draggingNode: any, dropNode: any, dropType: string, event: DragEvent) => void
}

// 过滤方法类型
export type FilterNodeMethod = (value: any, data: TreeNodeData, node: any) => boolean

// 允许拖拽方法类型
export type AllowDragMethod = (node: any) => boolean

// 允许放置方法类型
export type AllowDropMethod = (draggingNode: any, dropNode: any, type: string) => boolean

// 组件配置类型 - 继承 Element Plus Tree 的所有属性
export interface OptionT extends baseT, TreeEventCallbacks {
  // === 数据源配置 ===
  url?: string // 接口地址
  params?: Record<string, any> // 接口参数
  data?: TreeNode[] // 直接提供的数据
  optionsKey?: string // 返回数据中的数据属性名，默认为 'rows'
  checkKey?: string // 返回数据中的默认选中项属性名

  // === 节点属性映射 ===
  children?: string // 子节点属性名，默认 'children'
  label?: string // 节点标签属性名，默认 'label'
  value?: string // 节点值属性名，默认 'value'
  disabled?: string // 节点禁用属性名，默认 'disabled'

  // === 功能配置 ===
  multiple?: boolean // 是否支持多选（我们扩展的属性）

  // === Element Plus Tree 原生属性 ===
  // 基础属性
  showCheckbox?: boolean // 是否显示复选框
  nodeKey?: string // 节点唯一标识属性名
  props?: {
    children?: string
    label?: string | ((data: any, node: any) => string)
    disabled?: string | ((data: any, node: any) => boolean)
    isLeaf?: string | ((data: any, node: any) => boolean)
    class?: string | ((data: any, node: any) => string)
  }

  // 展开/收缩相关
  highlightCurrent?: boolean // 是否高亮当前选中节点
  expandOnClickNode?: boolean // 是否在点击节点时展开或收缩节点
  checkOnClickNode?: boolean // 是否在点击节点时选中节点
  autoExpandParent?: boolean // 展开子节点时是否自动展开父节点
  defaultExpandAll?: boolean // 是否默认展开所有节点
  defaultExpandedKeys?: (string | number)[] // 默认展开的节点的 key 的数组
  defaultCheckedKeys?: (string | number)[] // 默认勾选的节点的 key 的数组

  // 选择相关
  checkStrictly?: boolean // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
  currentNodeKey?: string | number // 当前选中的节点

  // 交互相关
  accordion?: boolean // 是否每次只打开一个同级树节点展开
  indent?: number // 相邻级节点间的水平缩进，单位为像素
  iconClass?: string // 自定义树节点的图标

  // 拖拽相关
  draggable?: boolean // 是否开启拖拽功能
  allowDrag?: AllowDragMethod // 判断节点能否被拖拽
  allowDrop?: AllowDropMethod // 拖拽时判定目标节点能否被放置

  // 过滤相关
  filterNodeMethod?: FilterNodeMethod // 对树节点进行筛选时执行的方法

  // 懒加载相关
  lazy?: boolean // 是否懒加载子节点，需与 load 方法结合使用
  load?: (node: any, resolve: (data: TreeNodeData[]) => void) => void // 加载子树数据的方法，仅当 lazy 属性为true 时生效

  // 样式相关
  emptyText?: string // 内容为空的时候展示的文本
  renderAfterExpand?: boolean // 是否在第一次展开某个树节点后才渲染其子节点
  renderContent?: (h: any) => any // 树节点的内容区的渲染 Function

  // 插槽内容
  empty?: any // 空状态插槽内容
  default?: any // 默认节点内容插槽
}

// 初始化函数
export function init(
  moduleName: string,
  name: string,
  options: Partial<OptionT> = {},
): OptionT {
  const defaultOptions: Partial<OptionT> = {
    // 基础配置
    moduleName,
    name,
    controlType: 'tree',

    // 数据配置
    optionsKey: 'rows',

    // 节点属性映射
    children: 'children',
    label: 'label',
    value: 'value',
    disabled: 'disabled',

    // 功能配置
    showCheckbox: false,
    multiple: false,

    // Element Plus Tree 默认配置
    highlightCurrent: true,
    expandOnClickNode: false,
    checkOnClickNode: false,
    autoExpandParent: true,
    defaultExpandAll: false,
    checkStrictly: false,
    accordion: false,
    indent: 18,

    // 样式配置
    emptyText: '暂无数据',
  }

  return {
    ...defaultOptions,
    ...options,
  } as OptionT
}

// 导出树节点数据类型
export type { TreeNodeData } from 'element-plus'
