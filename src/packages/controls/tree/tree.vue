<script lang="ts" setup>
import {  type OptionT } from './tree'
import {
  ElTree,
  ElButton,
  ElIcon,
  type TreeInstance,
  type TreeNodeData,
} from 'element-plus'
import { Loading, Warning } from '@element-plus/icons-vue'
import { isComponent, isHTML, http } from '../../utils'
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import { useFormValue } from '../../hooks'

defineOptions({ name: 'RwTree' })

// 组件属性
type Props = {
  control: OptionT
}

const props = defineProps<Props>()

// 树形组件引用
const treeRef = ref<TreeInstance>()

// 表单值管理
const { fieldValue } = useFormValue<OptionT>('RwTree', props.control)

// 响应式数据
const optionsData = ref<TreeNodeData[]>([])
const isLoading = ref(false)
const error = ref<string>('')

// 计算属性 - 过滤掉自定义属性，只传递 Element Plus Tree 支持的属性
const treeProps = computed(() => {
  const {
    // 过滤掉自定义属性
    default: _default,
    empty,
    url,
    params,
    optionsKey,
    checkKey,
    multiple,
    onNodeClick,
    onCheckChange,
    onCurrentChange,
    onNodeExpand,
    onNodeCollapse,
    onNodeContextmenu,
    onNodeDragStart,
    onNodeDragEnter,
    onNodeDragLeave,
    onNodeDragOver,
    onNodeDragEnd,
    onNodeDrop,
    // 基础属性也要过滤掉，因为我们单独处理
    moduleName,
    name,
    ...elementPlusProps
  } = props.control

  return elementPlusProps
})

const customNodeClass = ({ isPenultimate }: TreeNodeData) =>
  isPenultimate ? 'is-penultimate' : ''

const defaultProps = computed(() => ({
  children: props.control.children || 'children',
  label: props.control.label || 'label',
  value: props.control.value || 'value',
  disabled: props.control.disabled || 'disabled',
  class: customNodeClass,
}))

// 获取节点的唯一标识值（优先使用 ID，其次使用配置的 value，最后使用 label）
const getNodeId = (node: any): string | number => {
  // 1. 优先使用节点的 id 属性
  if (node.id !== undefined && node.id !== null) {
    return node.id
  }

  // 2. 如果配置了 nodeKey，使用 nodeKey 对应的值
  if (props.control.nodeKey && node[props.control.nodeKey] !== undefined) {
    return node[props.control.nodeKey]
  }

  // 3. 使用配置的 value 属性
  const valueKey = props.control.value || defaultProps.value.value
  if (node[valueKey] !== undefined && node[valueKey] !== null) {
    return node[valueKey]
  }

  // 4. 最后使用 label 属性
  const labelKey = props.control.label || defaultProps.value.label
  return node[labelKey] || ''
}

// 获取节点显示标签
const getNodeLabel = (node: any): string => {
  const labelKey = props.control.label || defaultProps.value.label
  return node[labelKey] || ''
}

const isCheckable = computed(
  () => props.control.showCheckbox || props.control['show-checkbox'] || false,
)

const isMultiple = computed(
  () => isCheckable.value || props.control.multiple || false,
)

// 获取当前选中的值
const getCurrentValue = (): any => {
  if (!treeRef.value) return isMultiple.value ? [] : null

  if (isCheckable.value) {
    // 复选框模式：返回选中的节点
    const checkedNodes = treeRef.value.getCheckedNodes()
    const checkedKeys = treeRef.value.getCheckedKeys()

    if (props.control.nodeKey) {
      return checkedKeys
    } else {
      return checkedNodes.map((node: any) => getNodeId(node))
    }
  } else {
    // 单选模式：返回当前选中节点
    const currentNode = treeRef.value.getCurrentNode()
    if (currentNode) {
      return getNodeId(currentNode)
    }
    return null
  }
}

// 设置选中的值
const setCurrentValue = (value: any): void => {
  if (!treeRef.value || !optionsData.value.length) return

  nextTick(() => {
    if (isCheckable.value) {
      // 复选框模式
      if (Array.isArray(value)) {
        if (props.control.nodeKey) {
          treeRef.value!.setCheckedKeys(value)
        } else {
          // 根据值查找对应的节点并设置选中状态
          const findAndCheckNodes = (nodes: TreeNodeData[], values: any[]) => {
            nodes.forEach((node: any) => {
              const nodeValue = getNodeId(node)
              if (values.includes(nodeValue)) {
                treeRef.value!.setChecked(node, true, true)
              }
              if (node[defaultProps.value.children]) {
                findAndCheckNodes(node[defaultProps.value.children], values)
              }
            })
          }
          findAndCheckNodes(optionsData.value, value)
        }
      }
    } else {
      // 单选模式
      const findAndSetCurrentNode = (
        nodes: TreeNodeData[],
        targetValue: any,
      ): boolean => {
        for (const node of nodes) {
          const nodeValue = getNodeId(node as any)
          if (nodeValue === targetValue) {
            treeRef.value!.setCurrentNode(node as any)
            return true
          }
          if ((node as any)[defaultProps.value.children]) {
            if (
              findAndSetCurrentNode(
                (node as any)[defaultProps.value.children],
                targetValue,
              )
            ) {
              return true
            }
          }
        }
        return false
      }

      if (value !== null && value !== undefined) {
        findAndSetCurrentNode(optionsData.value, value)
      }
    }
  })
}

// 加载选项数据
const loadOptions = async (): Promise<void> => {
  const { url, params, optionsKey, checkKey } = props.control

  if (!url) {
    console.warn('RwTree: url is required for loading options')
    return
  }

  try {
    isLoading.value = true
    error.value = ''

    const result = await http.post(url, params || {})

    if (result.status === 0 || result.data) {
      optionsData.value =
        result.data?.[optionsKey] ?? result.data?.rows ?? result.data ?? []

      // 如果有初始选中值，设置选中状态
      if (fieldValue.value !== undefined && fieldValue.value !== null) {
        await nextTick()
        setCurrentValue(fieldValue.value)
      }

      // 如果接口返回了默认选中的数据
      if (checkKey && result.data?.[checkKey]) {
        const defaultChecked = result.data[checkKey]
        if (Array.isArray(defaultChecked) && defaultChecked.length > 0) {
          await nextTick()
          setCurrentValue(defaultChecked)
          // 同步到 fieldValue
          fieldValue.value = defaultChecked
        }
      }
    } else {
      error.value = result.message || '加载数据失败'
      optionsData.value = []
    }
  } catch (e) {
    console.error('RwTree loadOptions error:', e)
    error.value = e instanceof Error ? e.message : '网络请求失败'
    optionsData.value = []
  } finally {
    isLoading.value = false
  }
}

// 事件处理
const handleNodeClick = (data: TreeNodeData, node: any): void => {
  if (!isCheckable.value) {
    // 单选模式下点击节点时更新值
    const nodeValue = getNodeId(data as any)
    fieldValue.value = nodeValue
  }

  // 触发自定义事件
  if (props.control.onNodeClick) {
    props.control.onNodeClick(data, node, treeRef.value!)
  }
}

const handleCheckChange = (
  data: TreeNodeData,
  checked: boolean,
  indeterminate: boolean,
): void => {
  // 复选框状态改变时更新值
  if (isCheckable.value) {
    fieldValue.value = getCurrentValue()
  }

  // 触发自定义事件
  if (props.control.onCheckChange) {
    props.control.onCheckChange(data, checked, indeterminate)
  }
}

const handleCurrentChange = (data: TreeNodeData, node: any): void => {
  if (!isCheckable.value) {
    // 单选模式下当前节点改变时更新值
    const nodeValue = data ? getNodeId(data as any) : null
    fieldValue.value = nodeValue
  }

  // 触发自定义事件
  if (props.control.onCurrentChange) {
    props.control.onCurrentChange(data, node)
  }
}

// 其他事件处理函数
const handleNodeExpand = (data: TreeNodeData, node: any): void => {
  if (props.control.onNodeExpand) {
    props.control.onNodeExpand(data, node, treeRef.value!)
  }
}

const handleNodeCollapse = (data: TreeNodeData, node: any): void => {
  if (props.control.onNodeCollapse) {
    props.control.onNodeCollapse(data, node, treeRef.value!)
  }
}

const handleNodeContextmenu = (
  event: Event,
  data: TreeNodeData,
  node: any,
): void => {
  if (props.control.onNodeContextmenu) {
    props.control.onNodeContextmenu(event, data, node, treeRef.value!)
  }
}

const handleNodeDragStart = (node: any, event: DragEvent): void => {
  if (props.control.onNodeDragStart) {
    props.control.onNodeDragStart(node, event)
  }
}

const handleNodeDragEnter = (
  draggingNode: any,
  dropNode: any,
  event: DragEvent,
): void => {
  if (props.control.onNodeDragEnter) {
    props.control.onNodeDragEnter(draggingNode, dropNode, event)
  }
}

const handleNodeDragLeave = (
  draggingNode: any,
  dropNode: any,
  event: DragEvent,
): void => {
  if (props.control.onNodeDragLeave) {
    props.control.onNodeDragLeave(draggingNode, dropNode, event)
  }
}

const handleNodeDragOver = (
  draggingNode: any,
  dropNode: any,
  event: DragEvent,
): void => {
  if (props.control.onNodeDragOver) {
    props.control.onNodeDragOver(draggingNode, dropNode, event)
  }
}

const handleNodeDragEnd = (
  draggingNode: any,
  dropNode: any,
  dropType: string,
  event: DragEvent,
): void => {
  if (props.control.onNodeDragEnd) {
    props.control.onNodeDragEnd(draggingNode, dropNode, dropType, event)
  }
}

const handleNodeDrop = (
  draggingNode: any,
  dropNode: any,
  dropType: string,
  event: DragEvent,
): void => {
  if (props.control.onNodeDrop) {
    props.control.onNodeDrop(draggingNode, dropNode, dropType, event)
  }
}

// 监听 fieldValue 变化
watch(
  () => fieldValue.value,
  (newValue) => {
    if (optionsData.value.length > 0) {
      setCurrentValue(newValue)
    }
  },
  { deep: true },
)

// 监听控件配置变化，重新加载数据
watch(
  () => [props.control.url, props.control.params],
  () => {
    if (props.control.url) {
      loadOptions()
    }
  },
  { deep: true },
)

// 组件挂载时加载数据
onMounted(() => {
  if (props.control.url) {
    loadOptions()
  } else if (props.control.data) {
    // 如果直接提供了数据
    optionsData.value = props.control.data
    if (fieldValue.value !== undefined && fieldValue.value !== null) {
      nextTick(() => setCurrentValue(fieldValue.value))
    }
  }
})

// 暴露方法给父组件
defineExpose({
  // 组件引用
  treeRef,

  // 数据操作
  loadOptions,
  getCurrentValue,
  setCurrentValue,

  // Element Plus Tree 原生方法
  getCheckedNodes: () => treeRef.value?.getCheckedNodes(),
  getCheckedKeys: () => treeRef.value?.getCheckedKeys(),
  getHalfCheckedNodes: () => treeRef.value?.getHalfCheckedNodes(),
  getHalfCheckedKeys: () => treeRef.value?.getHalfCheckedKeys(),
  setCheckedKeys: (keys: any[]) => treeRef.value?.setCheckedKeys(keys),
  setChecked: (data: any, checked: boolean, deep: boolean) =>
    treeRef.value?.setChecked(data, checked, deep),
  getCurrentNode: () => treeRef.value?.getCurrentNode(),
  getCurrentKey: () => treeRef.value?.getCurrentKey(),
  setCurrentNode: (node: TreeNodeData) =>
    treeRef.value?.setCurrentNode(node as any),
  setCurrentKey: (key: string | number) => treeRef.value?.setCurrentKey(key),
  getNode: (data: any) => treeRef.value?.getNode(data),
  remove: (data: any) => treeRef.value?.remove(data),
  append: (data: any, parentNode: any) =>
    treeRef.value?.append(data, parentNode),
  insertBefore: (data: any, refNode: any) =>
    treeRef.value?.insertBefore(data, refNode),
  insertAfter: (data: any, refNode: any) =>
    treeRef.value?.insertAfter(data, refNode),
  filter: (value: any) => treeRef.value?.filter(value),
  updateKeyChildren: (key: string | number, data: TreeNodeData[]) =>
    treeRef.value?.updateKeyChildren(key, data),

  // 工具方法
  getNodeId,
  getNodeLabel,
})
</script>
<template>
  <div class="rw-tree-container">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="rw-tree-loading">
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
      <span>加载中...</span>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="rw-tree-error">
      <el-icon>
        <Warning />
      </el-icon>
      <span>{{ error }}</span>
      <el-button size="small" type="primary" @click="loadOptions"
        >重试</el-button
      >
    </div>

    <!-- 树形组件 -->
    <ElTree
      v-else
      ref="treeRef"
      v-bind="treeProps"
      :data="optionsData"
      :props="defaultProps"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      @current-change="handleCurrentChange"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
      @node-contextmenu="handleNodeContextmenu"
      @node-drag-start="handleNodeDragStart"
      @node-drag-enter="handleNodeDragEnter"
      @node-drag-leave="handleNodeDragLeave"
      @node-drag-over="handleNodeDragOver"
      @node-drag-end="handleNodeDragEnd"
      @node-drop="handleNodeDrop"
      v-loading="isLoading"
    >
      <!-- 自定义节点内容 -->
      <template v-if="$slots.default" #default="{ node, data }">
        <slot name="default" :node="node" :data="data"></slot>
      </template>
      <template v-else-if="control.default" #default="{ node, data }">
        <component
          :is="control.default"
          v-if="isComponent(control.default) && !isHTML(control.default)"
          :node="node"
          :data="data"
        />
        <div
          v-else-if="
            typeof control.default === 'string' && isHTML(control.default)
          "
          v-html="control.default"
        ></div>
        <span v-else>{{ control.default }}</span>
      </template>

      <!-- 空状态 -->
      <template v-if="$slots.empty" #empty>
        <slot name="empty"></slot>
      </template>
      <template v-else-if="control.empty" #empty>
        <component
          :is="control.empty"
          v-if="isComponent(control.empty) && !isHTML(control.empty)"
        />
        <div
          v-else-if="typeof control.empty === 'string' && isHTML(control.empty)"
          v-html="control.empty"
        ></div>
        <span v-else>{{ control.empty }}</span>
      </template>
    </ElTree>
  </div>
</template>

<style lang="scss" scoped>
.rw-tree-container {
  width: 100%;

  .rw-tree-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: #909399;

    .el-icon {
      margin-right: 8px;
      font-size: 16px;
    }
  }

  .rw-tree-error {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    color: #f56c6c;

    .el-icon {
      margin-bottom: 8px;
      font-size: 24px;
    }

    span {
      margin-bottom: 12px;
    }
  }
}
.is-penultimate > .el-tree-node__children > div {
  display: inline-block;
  margin-right: 4px;

  &:not(:first-child) .el-tree-node__content {
    padding-left: 0px !important;
  }
  .el-tree-node__content {
    padding-right: 16px;
  }
}
</style>
