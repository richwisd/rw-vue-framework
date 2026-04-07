<script lang="ts" setup>
import { ElTableColumn, TableInstance } from 'element-plus'
import Sortable from 'sortablejs'
import { RwTable } from './index'
import { getFormContent } from './table'
import { RwButtonGroup } from '../buttonGroup'
import { RwDropdown } from '../dropdown'
import { RwText } from '../text'

import { infoI } from '@rw-vue-framework/constants'
import {
  useLocalSettingStore,
  useColumnsSettingStore,
} from '@rw-vue-framework/stores'
import { t } from '@rw-vue-framework/locale'
import { onBeforeUnmount, onMounted, ref, watch, reactive, computed, nextTick } from 'vue'
import { RwPageTable } from '@rw-vue-framework/pages'
import { useFormValue } from '@rw-vue-framework/hooks'
import type { DragState } from './table'
import { markRaw } from 'vue'

defineOptions({
  name: 'RwTable',
})

const localSetting = useLocalSettingStore()
const columnsSetting = useColumnsSettingStore()

const tableRef = ref<TableInstance>()
const sortableRow = ref(null as any)
const sortableColumn = ref(null as any)

// 拖拽状态管理的响应式数据结构
const dragState = reactive<DragState>({
  originalRowOrder: [],
  currentRowOrder: [],

  originalColumnHeader: [],
  currentColumnHeader: [],

  currentColumnOrder:[],
  originalColumnOrder: [],
  hasRowDragHistory: false,
  hasColumnDragHistory: false,
})

function getColumnWidth(width: number | string | undefined) {
  const localSetting = useLocalSettingStore()
  if (!width) return
  switch (localSetting.system.size) {
    case 'default':
      break
    case 'large':
      width = parseInt(width.toString()) + 8
      break
    case 'small':
    default:
      width = (parseInt(width.toString()) * 85) / 100
  }

  return width
}

const props = defineProps<{
  control: RwTable.OptionT
  defaultData?: any
  pageTable?: Partial<RwPageTable.OptionT>
}>()

const formObj = getFormContent(props.control.columns)
const { fieldValue } = useFormValue<RwTable.OptionT>(
  'RwTable', // 组件名称
  props.control, // 控件配置
  'defaultData',
)
// console.log('fieldValue', fieldValue.value)
const emits = defineEmits([
  'clickLineButton',
  'selectionChange',
  'reloadData',
  'row-sort-change',
  'column-sort-change',
  'update:defaultData',
])

function checkRow(row: any) {
  // console.log('checkRow', row)
  props.control.clickRow = row

  tableRef.value!.toggleRowSelection(row, undefined)
}

// 更新表单数据
const updateFormItem = (val, scope) => {
  scope.row[scope.column.property] = val

  // 这里可以加入changeForm
  if(props.control?.changeForm)
    props.control.changeForm(val, scope.column.property, scope.row)
}

watch(
  () => fieldValue.value,
  async (val) => {
    if (val?.length === 0) {
      // 等待DOM更新后再执行
      await nextTick()
      // 获取el-table__empty-block
      const emptyBlock = tableRef.value?.$el.querySelector('.el-table__empty-block')
      if (emptyBlock) {
        emptyBlock.style.height = '60px'
      }
    }
  }
)

watch(
  () => props.control.canSort,
  (val) => {
    if (val) {
      initSortable()
      initColumnDrop()
    } else {
      initSortable()
      initColumnDrop()
    }
  },
)

function handleSelectionChange(val: infoI[]) {
  emits('selectionChange', val)
}

function clickButtons(event: any, scope: any) {
  if (!props.control?.allForm) {
    if (event.click) {
      event.click(scope)
    } else {
      emits('clickLineButton', event, scope)
    }
  } else {
    if (event.name === 'deleteLine') {
      const item = JSON.parse(JSON.stringify(fieldValue.value))
      item.splice(scope.$index, 1)
      fieldValue.value = item
      // console.log(1, item, fieldValue.value)
    }
  }
}
function clickHeaderButtons() {
  // console.log(event, scope)
  const item = JSON.parse(JSON.stringify(fieldValue.value))

  if (Array.isArray(item)) {
    item.push({ ...formObj })
    fieldValue.value = item
  } else {
    fieldValue.value = [{ ...formObj }]
  }
}

// 拖拽相关
// 重置行拖拽状态的方法
function resetRowDrag(): boolean {
  try {
    // 验证是否存在行拖拽历史
    if (!dragState.hasRowDragHistory) {
      console.warn('No row drag history found to reset')
      return false
    }

    // 验证是否有保存的原始状态
    if (
      !dragState.originalRowOrder ||
      dragState.originalRowOrder.length === 0
    ) {
      console.warn('No original row order found to reset')
      return false
    }
    // 重置
    sortableRow.value.sort(dragState.originalRowOrder)

    // 清除行拖拽历史标记
    dragState.hasRowDragHistory = false
    dragState.originalRowOrder = []
    dragState.currentRowOrder = []

    console.log('Row drag state reset successfully')
    return true
  } catch (error) {
    console.error('Failed to reset row drag state:', error)
    return false
  }
}

// 重置列拖拽状态的方法
function resetColumnDrag(): boolean {
  try {
    // 验证是否存在列拖拽历史
    if (!dragState.hasColumnDragHistory) {
      console.warn('No column drag history found to reset')
      return false
    }

    // 验证是否有保存的原始状态
    if (
      !dragState.originalColumnOrder ||
      dragState.originalColumnOrder.length === 0
    ) {
      console.warn('No original column order found to reset')
      return false
    }

    const table = tableRef.value
    if (!table || !table.store || !table.store.states) {
      console.error('Table store not available for column reset')
      return false
    }

    try {
      // 1. 恢复 Element Plus 表格的列顺序
      table.store.states.columns.value = [...dragState.originalColumnOrder]

      sortableColumn.value.sort(dragState.originalColumnHeader)

      // 4. 清除列拖拽历史标记
      dragState.hasColumnDragHistory = false
      dragState.originalColumnOrder = []
      dragState.currentColumnOrder = []
      dragState.originalColumnHeader = []
      dragState.currentColumnHeader = []

      console.log('Column drag state reset successfully')
      return true
    } catch (resetError) {
      console.error('Failed to reset column order:', resetError)
      return false
    }
  } catch (error) {
    console.error('Failed to reset column drag state:', error)
    return false
  }
}

// 清理拖拽历史状态记录的方法
function clearDragHistory(): void {
  try {
    // 重置拖拽历史标记
    dragState.hasRowDragHistory = false
    dragState.hasColumnDragHistory = false

    // 清除历史状态记录
    dragState.originalRowOrder = []
    dragState.currentRowOrder = []
    dragState.originalColumnOrder = []
    dragState.currentColumnOrder = []

    console.log('Drag history cleared successfully')
  } catch (error) {
    console.error('Failed to clear drag history:', error)
  }
}

// 重置所有拖拽状态的方法
function resetAllDrag(): boolean {
  try {
    // 调用行和列的重置方法
    const rowResetResult = resetRowDrag()
    const columnResetResult = resetColumnDrag()

    // 返回重置操作的综合结果
    const overallResult = rowResetResult || columnResetResult

    if (overallResult) {
      console.log(
        `Reset all drag completed - Row: ${rowResetResult}, Column: ${columnResetResult}`,
      )

      // 重置完成后清除历史状态记录
      // 注意：个别重置方法已经清理了各自的状态，这里确保完全清理
      clearDragHistory()
    } else {
      console.warn('No drag history found to reset for either rows or columns')
    }

    return overallResult
  } catch (error) {
    console.error('Failed to reset all drag states:', error)
    return false
  }
}

function saveColumnDrag() {
  // 保存列排序
  if(dragState.originalColumnHeader.length !== 0){
    const structName = props.control.struct ? props.control.struct.name : ''
    columnsSetting.clearColumns(structName)

    const table = tableRef.value
    const newColumns = table.store.states.columns.value

    let fieldsOrder: any = []
    newColumns.map((column) => {
      if (column.property != undefined) {
        if (props.pageTable && props.pageTable.tableButtons) {
          const controls = Object.values(
            props.pageTable.tableButtons.controls,
          )

          controls.map((control: any) => {
            if (control.name == 'showColumns') {
              control.config.items.find((item: any) => {
                if (item.name == column.property) {
                  if (structName) {
                    columnsSetting.setItem(
                      structName,
                      column.property,
                      !item.checked,
                    )
                  }

                  fieldsOrder.push(column.property)
                }
              })
            }
          })
        }
      }
    })

    if (fieldsOrder.length > 0) {
      columnsSetting.setFieldsOrder(structName, fieldsOrder)
    }
  }

}


function initSortable() {
  if (!props.control.canSort) {
    sortableRow.value?.destroy()
    sortableRow.value = null
    dragState.hasRowDragHistory = false
    dragState.originalRowOrder = []
    dragState.currentRowOrder = []
    // 移除css
    const tbody = tableRef.value?.$el.querySelector('.el-table__body tbody')
    if (!tbody) return
    const children = tbody.children
    if (!children || children.length === 0 || children.length === 1) return
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('move')
    }
    return
  }
  const tbody = tableRef.value?.$el.querySelector('.el-table__body tbody')
  if (!tbody || sortableRow.value) return
  const children = tbody.children
  if (!children || children.length === 0 || children.length === 1) return
  for (let i = 0; i < children.length; i++) {
    children[i].setAttribute('data-id', fieldValue.value[i].id)
    children[i].classList.add('move')
  }
  sortableRow.value = new Sortable(tbody, {
    handle: 'tr>td:not(:nth-child(1)):not(:nth-last-child(1))', // 整行可拖动
    animation: 150,
    ghostClass: 'sortable-ghost', // 拖动时的样式类
    onStart() {
      // 保存行拖拽前的状态
      if (dragState.originalRowOrder.length === 0) {
        dragState.originalRowOrder = sortableRow.value.toArray()
        console.log('sortableRow.value', sortableRow.value)
      }
    },
    onEnd({ newIndex, oldIndex }) {
      if (newIndex === undefined || oldIndex === undefined) return
      // 标记有行拖拽历史
      dragState.hasRowDragHistory = true
      dragState.currentRowOrder = sortableRow.value.toArray()
    },
  })
}

function initColumnDrop() {
  if (!props.control.canSort) {
    sortableColumn.value?.destroy()
    sortableColumn.value = null
    dragState.hasRowDragHistory = false
    dragState.originalColumnOrder = []
    dragState.currentColumnOrder = []
    dragState.originalColumnHeader = []
    dragState.currentColumnHeader = []
    // 移除css
    const thead = tableRef.value?.$el.querySelector(
      '.el-table__header thead tr',
    )
    if (!thead) return
    const children = thead.children

    if (!children || children.length === 0 || children.length === 1) return
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('move')
      if(!children[i].classList.contains('is-left')){
        children[i].classList.remove('notmove')
      }
    }
    return
  }
  const thead = tableRef.value?.$el.querySelector('.el-table__header thead tr')
  if (!thead || sortableColumn.value) return
  const children = thead.children
  console.log('children', children)
  if (!children || children.length === 0 || children.length === 1) return
  for (let i = 0; i < children.length; i++) {
    children[i].classList.add('move')
    if(!children[i].classList.contains('is-left')){ // i <= 1 || i === children.length - 1){
      children[i].classList.add('notmove')
    }
    children[i].setAttribute('data-id', `${children[i].children[0].textContent}-${i}`)
  }

  const table = tableRef.value?.$el
  if (!table) return

  sortableColumn.value = new Sortable(table.querySelector('thead tr'), {
    draggable: 'th.move', //'th:not(:nth-child(1)):not(:nth-child(2)):not(:last-child)',
    filter:'.notmove',
    direction: 'horizontal',
    animation: 150,
    ghostClass: 'sortable-ghost',
    onStart() {
      // 保存列拖拽前的状态
      if (dragState.originalColumnOrder.length === 0 && tableRef.value) {
        const table = tableRef.value
        dragState.originalColumnOrder = [...table.store.states.columns.value]
        dragState.originalColumnHeader = sortableColumn.value.toArray()
      }
    },
    onEnd(evt) {
      const { newIndex, oldIndex } = evt
      if (newIndex === undefined || oldIndex === undefined) return
      console.log(newIndex, oldIndex)
      // 标记有列拖拽历史
      dragState.hasColumnDragHistory = true
      dragState.currentColumnHeader = sortableColumn.value.toArray()

      // 计算真实索引(跳过选择框和序号列)
      const offset =
        (props.control.showCheckAll ? 1 : 0) + (props.control.showIndex ? 1 : 0)
      const realOldIndex = oldIndex - offset
      const realNewIndex = newIndex - offset

      if (realOldIndex < 0 || realNewIndex < 0) return

      // 1.获取表格列
      const table = tableRef.value
      if (table) {
        const oldColumns = table.store.states.columns

        // 2. 重新排列列的顺序
        const newColumns = [...oldColumns.value]
        const movedColumn = newColumns.splice(oldIndex, 1)[0]
        newColumns.splice(newIndex, 0, movedColumn)
        oldColumns.value = newColumns
      }

      dragState.currentColumnOrder = [...table.store.states.columns.value]
    },
  })
}

onBeforeUnmount(() => {
  sortableRow.value?.destroy()
  sortableRow.value = null
  sortableColumn.value?.destroy()
  sortableColumn.value = null
})

const lineButtonsShowCount = ref(0)

props.control.lineButtons.controls.forEach((item: any) => {
  if (item.config.show !== false) {
    lineButtonsShowCount.value++
  }
})

const lineButtons = computed(() => {
  const num = localSetting.pageTable.table.maxButtons
  if(localSetting.pageTable.table.showMenu && num < props.control.lineButtons.controls.length){ // 显示更多按钮
    const { controls, ...propertys } = props.control.lineButtons
    const buttons = { ...propertys, controls: [] }
    const dropdown = {
      disabled: false,
      moduleName: propertys.moduleName,
      name: 'more',
      controlType:'dropdown',
      Template: markRaw(RwDropdown.Template),
      config: RwDropdown.init(propertys.moduleName, 'more', { label:t('buttons.more'), text: controls[0].config.text  }),
    }
    let accumulate = 0
    controls.map((item, index) => {
      if(!item.show || !item.config.show) accumulate++
      if(accumulate <= num){
        buttons.controls.push(item)
      } else {
        dropdown.config.addItem(item.name, item.config)
      }
    })
    buttons.controls.push(dropdown)
    return buttons
  }
  return props.control.lineButtons
})

// 转换函数，确保ExtendedControlOptionT可以安全地用作RwText.OptionT
function getTextControlOption(itemInit: any): RwText.OptionT {
  // 确保必要的属性存在
  return {
    ...itemInit,
    tag: itemInit.tag || 'span',
    truncated: itemInit.truncated || false
  } as RwText.OptionT
}

// 暴露组件方法供外部调用
defineExpose({
  resetRowDrag,
  resetColumnDrag,
  resetAllDrag,
  dragState,
  saveColumnDrag
})
</script>

<template>
  <slot name="SlotTableTop"></slot>
  <ElTable
    v-bind="control"
    :data="fieldValue"
    ref="tableRef"
    style="cursor: pointer"
    :stripe="!!localSetting.pageTable.table.stripe"
    :border="!!localSetting.pageTable.table.verticalLine"
    default-expand-all
    v-loading="control.loading"
    :highlight-current-row="localSetting.pageTable.table.highlightCurrentRow"
    :element-loading-text="t('table.loading')"
    @row-click="checkRow"
    @selection-change="handleSelectionChange"
    :class="{ 'height-limit': control.allForm }"
  >
    <ElTableColumn
      type="selection"
      v-if="control.showCheckAll"
      :width="control.selectionWidth"
    />
    <ElTableColumn
      label=" "
      type="index"
      v-if="control.showIndex ?? localSetting.pageTable.table.showIndex"
      :width="control.indexWidth"
    />
    <template v-for="(item, index) in control.columns" :key="item?.id">
      <ElTableColumn
        v-bind="item"
        :prop="item.name"
        :label="t(item.label)"
        :width="getColumnWidth(item.width)"
        v-if="columnsSetting.isChecked(control.struct?.name ?? '', item.name)"
      >
        <template #default="scope">
          <!-- <div v-if="item.init.controlType === 'Html'">
            <div v-html="item.init?.formatter(scope.row[scope.column.property]) ?? scope.row[scope.column.property]"></div>
          </div> -->
          <div v-if="item.init.controlType === 'text' && item.init.multiLang">
            <RwText.Template :control="getTextControlOption(item.init)" :modelValue="scope.row[scope.column.property]" />
          </div>
          <component
            v-else-if="item.init.controlType !== 'text'"
            :is="item.Template"
            :control="item.init"
            v-bind="
              item.isModel
                ? {
                    modelValue: scope.row[scope.column.property],
                    'onUpdate:modelValue': (val: any) => {
                      updateFormItem(val, scope)
                    },
                  }
                : {}
            "
            :index="index"
            :src="
              item.init.controlType === 'image'
                ? scope.row[scope.column.property]
                : ''
            "
            :preview-src-list="
              item.init.controlType === 'image'
                ? [scope.row[scope.column.property]]
                : ''
            "
          />
        </template>
      </ElTableColumn>
    </template>

    <ElTableColumn
      v-if="lineButtonsShowCount > 0 && control.lineButtons.controls.length > 0"
      :label="t('table.operate')"
      :width="control.lineButtonWidth"
      :fixed="localSetting.pageTable.table.fixed"
      align="center"
    >
      <template v-if="control.allForm" #header="scope">
        <RwButtonGroup.Template
          v-bind="control.headerLineButtons"
          :control="control.headerLineButtons"
          :status-data="scope"
          @click="(event) => clickHeaderButtons()"
        />
      </template>
      <template #default="scope">
        <RwButtonGroup.Template
          v-if="control.lineButtons"
          v-bind="control.lineButtons"
          :control="lineButtons"
          :status-data="scope"
          @click="(event) => clickButtons(event, scope)"
        />
      </template>
    </ElTableColumn>
  </ElTable>
  <slot></slot>
</template>

<style lang="scss" scoped>
.height-limit {
  max-height: 500px;
  overflow-y: auto;
}

.dropdown {
  vertical-align: baseline;
}

/* 修改拖动样式 */
.sortable-ghost {
  opacity: 0.8;
  background: #e6f1fc !important;
}

.dragging {
  background: #e6f1fc;
}

::v-deep(
  .el-table__header
    th.move.is-left
) {
  cursor: move !important;
}

::v-deep(
  .el-table__body tr.move > td:not(:nth-child(1)):not(:nth-last-child(1))
) {
  cursor: move !important;
}

</style>
