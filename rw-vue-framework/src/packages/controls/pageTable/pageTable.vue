<script lang="ts" setup>
import { RwPageBase } from '../pageBase'

import {
  RwSearch,
  RwTable,
  RwPagination,
  RwButtonGroup,
  RwDropdown,
} from '../'

import { RwPageTable } from '.'

import { ElRow, ElCol, ElNotification, ElMessage } from 'element-plus'

import {
  watch,
  onMounted,
  nextTick,
  markRaw,
  ref,
  computed,
  onUnmounted,

} from 'vue'

import { http, exportExcel } from '../../utils'

import { t } from '../../locale'

import { type infoI } from '../../constants'

import {
  useLocalSettingStore,
  useColumnsSettingStore,
} from '../../stores'

import { ElMessageBox } from 'element-plus'

import { Delete } from '@element-plus/icons-vue'

import { useDevice } from '../../hooks'

const { isMobile } = useDevice()

const localSetting = useLocalSettingStore()

const columnsSetting = useColumnsSettingStore()
console.log('columnsSetting', columnsSetting)
const emits = defineEmits(['click'])

const props = defineProps<{
  control: RwPageTable.OptionT
}>()

const propsControl = props.control

// 移动端滚动加载更多
const isLoadMore = ref(false)
const sentinelRef = ref<HTMLElement | null>(null)
let scrollObserver: IntersectionObserver | null = null

const hasMore = computed(() => {
  if (!propsControl.pagination || !propsControl.table?.data) return false
  if ((propsControl.pagination.total ?? 0) <= 0) return false
  return propsControl.table.data.length < (propsControl.pagination.total ?? 0)
})

/** 是否有可用的数据加载方式 */
const canLoadData = computed(() => {
  if (propsControl.table && typeof propsControl.table.onLoad === 'function') return true
  if (propsControl.struct?.apiURLFront) {
    // 有 HTTP 接口时，仅在数据为空时才允许加载（静态数据场景跳过）
    const hasStaticData = propsControl.table?.data && propsControl.table.data.length > 0
    return !hasStaticData
  }
  return false
})

function loadMore() {
  if (!propsControl.table || propsControl.table.loading) return
  if (!hasMore.value) return
  if (!canLoadData.value) return
  isLoadMore.value = true
  if (propsControl.pagination) {
    propsControl.pagination.page = (propsControl.pagination.page ?? 1) + 1
  }
}

/** 移动端搜索：重置为第一页并替换数据 */
function onSearch() {
  if (isMobile.value) {
    isLoadMore.value = false
    if (propsControl.pagination && propsControl.pagination.page !== 1) {
      propsControl.pagination.page = 1
      return // watch 会触发 getTableData
    }
  }
  getTableData()
}

/** 移动端可见列（受列设置控制） */
const mobileColumns = computed(() => {
  if (!propsControl.table?.columns || !propsControl.struct) return []
  const structName = propsControl.struct.name
  return propsControl.table.columns.filter((col: any) =>
    columnsSetting.isChecked(structName, col.name),
  )
})

function getColumnLabel(column: any) {
  const label = column.label
  if (typeof label === 'string' && label.includes('.')) {
    return t(label)
  }
  return label ?? column.name
}

function setupScrollObserver() {
  if (!isMobile.value) return
  scrollObserver?.disconnect()
  nextTick(() => {
    if (!sentinelRef.value) return
    scrollObserver = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore.value &&
          !propsControl.table?.loading
        ) {
          loadMore()
        }
      },
      { rootMargin: '100px' },
    )
    scrollObserver.observe(sentinelRef.value)
  })
}

watch(isMobile, (val) => {
  if (val) {
    setupScrollObserver()
  } else {
    scrollObserver?.disconnect()
  }
})

// 页面
// 表格
const tableRef = ref<any>(null)

// 搜索
const searchRef = ref<any>(null)
const searchRefTem = ref<InstanceType<typeof RwSearch.Template> | null>(null)
const searchHeight = ref(0)

// 按钮组
const buttonGroupRef = ref<InstanceType<typeof RwButtonGroup.Template> | null>(
  null,
)
const buttonGroupHeight = ref(0)

// 页码
const paginationRef = ref<InstanceType<typeof RwPagination.Template> | null>(
  null,
)
const paginationHeight = ref(32)

// 表格标题高度
const pageTitleHeight = ref(50)

// 浏览器高度
const browserHeight = ref(window.innerHeight)
// fixed:固定高度 follow:跟随内容
const tableHeight = computed(() => {
  return localSetting.pageTable.table.height
})

// 获取表格数据
const getTableData = async (formItemData: any = searchRefTem.value?.formItemData || {}) => {
  // console.log('formItemData', JSON.parse(JSON.stringify(formItemData)))
  if (propsControl.table?.loading) {
    return
  }

  if (propsControl.table) {
    // 没有 onLoad 时，仅在数据为空（首次加载）时才走 HTTP 请求
    // 如果数据已被手动设置（静态数据场景），跳过请求
    if (!propsControl.table.onLoad) {
      const hasStaticData = propsControl.table.data && propsControl.table.data.length > 0
      if (hasStaticData) {
        return
      }
      if (!propsControl.struct?.apiURLFront) {
        return
      }
    }

    propsControl.table.loading = true

    // 如果设置了 onLoad，直接使用自定义加载函数，跳过 HTTP 请求
    if (propsControl.table.onLoad) {
      try {
        const searchList: any = propsControl?.search ? (propsControl.search?.getSearchData(formItemData) ?? []) : []
        let loadData = {
          queryPage: {
            page: propsControl.pagination?.page ?? 1,
            pageSize: propsControl.pagination?.pageSize ?? 10,
          },
          queryOrder: {
            orderBy: propsControl.table?.sortField ?? undefined,
            isDescending: propsControl.table?.sortOrder === 'descending',
          },
          searchList,
        }
        if (props.control.searchBefore) {
          loadData = props.control.searchBefore(loadData)
        }
        const result = await propsControl.table.onLoad(loadData)
        if (result) {
          const newData: any[] = result.data || []
          const currentData = propsControl.table.data ?? []
          propsControl.table.data = isLoadMore.value
            ? [...currentData, ...newData]
            : newData
          if (propsControl.pagination) {
            propsControl.pagination.total = result.total ?? 0
          }
        }
      } catch (error) {
        console.log('onLoad error', error)
      }

      if (propsControl.table?.loadLast) {
        propsControl.table.data = propsControl.table.loadLast(propsControl.table.data ?? []) as any[]
      }

      propsControl.table.loading = false
      isLoadMore.value = false
      refreshButtons()
      return
    }

    const searchList = propsControl?.search ? propsControl.search?.getSearchData(formItemData) : []

    // console.log('searchList', searchList, formItemData)
    let url =
      (propsControl?.struct?.apiURLFront ?? '') +
      (propsControl?.struct?.apis?.index ?? '/index')

    let postData = {
      queryPage: {
        page: propsControl.pagination?.page ?? 1,
        pageSize: propsControl.pagination?.pageSize ?? 10,
      },
      queryOrder: {
        orderBy: propsControl.table?.sortField ?? undefined,
        isDescending: propsControl.table?.sortOrder === 'descending',
      },
      searchList: searchList,
    }
    if (props.control.searchBefore) {
      postData = props.control.searchBefore(postData)
    }
    if (propsControl.table.debug) {
      console.log('列表请求', postData)
    }
    try {
      const res = await http.post(url, postData)

      if (propsControl.table.debug) {
        console.log('列表响应', res)
      }

      if (res.status != 0) {
        ElNotification({
          title: t('apiError.title'),
          message: res.errorMsg || res.errMsg || res.errorMessage,
          type: 'error',
          position: 'top-right',
        })
      } else {
        if (typeof res.data == 'string') {
          ElNotification({
            title: t('apiError.title'),
            message: res.data,
            type: 'error',
            position: 'top-right',
          })
        } else {
          const resultData = res.data
          const newData = resultData.rows || []
          propsControl.table.data = isLoadMore.value
            ? [...(propsControl.table.data ?? []), ...newData]
            : newData
          if (propsControl.pagination) {
            propsControl.pagination.total = resultData.total
          }
        }
        if (propsControl.table?.loadLast) {
          propsControl.table.data = propsControl.table.loadLast(propsControl.table.data ?? []) as any[]
        }
      }
    } catch (error) {
      console.log('error', error)
    }

    propsControl.table.loading = false
    isLoadMore.value = false

    refreshButtons()
  }
}

//监听分页改变，重新加载数据
watch(
  () => [propsControl.pagination?.page, propsControl.pagination?.pageSize],
  () => {
    //分页发生变化 ，不管如何，都加载数据,否则会发生错误
    if (propsControl.table && !propsControl.table.loading) {
      getTableData()
    }
  },
  { deep: true },
)

/** 刷新数据 */
function refreshData() {
  getTableData()
}

/** 刷新按钮状态 */
async function refreshButtons() {
  propsControl.operateButtons.setAttrib(
    'selectAll',
    'disabled',
    (!propsControl.table.data || propsControl.table.data.length == 0) ? true : false,
  )
  propsControl.operateButtons.setAttrib(
    'deleteSelected',
    'disabled',
    !propsControl.table.selectionRows ||
      propsControl.table.selectionRows.length == 0
      ? true
      : false,
  )

  // const dropdown = propsControl.tableButtons.controls.find(control => control.name == "export")
  // if (dropdown) {
  //   dropdown.setItemAttrib('exportSelectedToExcel', 'disabled', propsControl.table.selectionRows.length == 0 ? true : false)
  //   dropdown.setItemAttrib('exportCurrentPageToExcel', 'disabled', propsControl.table.data.length == 0 ? true : false)
  // }
}

/** 打开指定容器，并传入对应ID */
function openDialog(name: string, id: number) {
  // console.log(name, id)
  const params:any = {}
  if(name == 'addForm'){

    params['params'] = {}
  }
  propsControl.page.showDialog(name, id, params)
}

/** 删除数据 */
function deleteDatas(ids: number | number[]) {
  // console.log('deleteDatas ids', ids)
  if (propsControl.struct) {
    let url = propsControl.struct.apiURLFront + propsControl.struct.apis.delete
    const postData = { ids: ids }
    http.post(url, postData).then((res: any) => {
      if (propsControl.table.debug) {
        console.log('删除请求', postData)
        console.log('删除响应', res)
      }
      if (res.status == 0) {
        getTableData()
      } else {
        ElMessage({
          message: res.errorMsg,
          type: 'error',
        })
      }
    })
  }
}

function handleSelectionChange(val: infoI[]) {
  propsControl.table.selectionRows = val
  refreshButtons()
}

function handleClickLineButton(control: any, scope: any) {

  if (propsControl.struct) {
    // console.log('control.name', control.name)
    switch (control.name) {
      case 'edit':
        openDialog('editForm', scope.row[propsControl.struct.tableID ?? 'id'])
        break
      case 'deleteLine':
        const ids: Array<number> = []
        ids.push(scope.row[propsControl.struct.tableID ?? 'id'])
        if (localSetting.pageTable.table.deleteConfirmStyle == 'modal') {
          ElMessageBox.confirm(
            t('messages.confirmDeleteCurrentLine'),
            t(propsControl.struct.name + '.TITLE'),
            {
              autofocus: true,
              type: 'error',
              icon: markRaw(Delete),
              draggable: true,
              closeOnPressEscape: true,
              confirmButtonText: t('buttons.confirmDelete'),
              confirmButtonClass: 'el-button--danger',
              cancelButtonText: t('buttons.cancel'),
            },
          )
            .then(() => {
              deleteDatas(ids)
            })
            .catch(() => { })
        } else {
          deleteDatas(ids)
        }
        break
    }
  }
}

/** 点击操作按钮(按钮组) */
function clickButtons(event: any, command: any) {
  // console.log('clickButtons event', event)
  switch (event.name) {
    case 'selectAll':
      break
    case 'append':
      openDialog('addForm', 0)
      break
    case 'deleteSelected':
      if (
        !propsControl.table.selectionRows ||
        (propsControl.table.selectionRows &&
          propsControl.table.selectionRows.length < 1)
      ) {
        ElMessage({
          message: t('messages.mustSelectLines'),
          type: 'warning',
        })
        return
      }

      if (propsControl.struct) {
        const ids: number[] = []

        propsControl.table.selectionRows.map((row:any) => {
          const id = Number(row[propsControl.struct!.tableID ?? 'id'])
          if (!isNaN(id)) {
            ids.push(id)
          }
        })

        if (localSetting.pageTable.table.deleteConfirmStyle == 'modal') {
          ElMessageBox.confirm(
            t('messages.confirmDeleteLines'),
            t(propsControl.struct.name + '.TITLE'),
            {
              autofocus: true,
              type: 'error',
              icon: markRaw(Delete),
              draggable: true,
              closeOnPressEscape: true,
              confirmButtonText: t('buttons.confirmDelete'),
              confirmButtonClass: 'el-button--danger',
              cancelButtonText: t('buttons.cancel'),
            },
          )
            .then(() => {
              deleteDatas(ids)
            })
            .catch(() => { })
        } else {
          deleteDatas(ids)
        }
      }

      break
    // 导入
    case 'import':
      if (propsControl.struct) {
        if (command.name == 'importing') {
          //必须要从这儿传入上传地址，且就是这个模块下的如
          // let url = propsControl.struct.apiURLFront + propsControl.struct.apis.import;
          //uploadExcel的函数，要将此URL传进去，然后再进行操作，这样些对此模块，以后具体模块，具体管理后台增加相应功能即可
          // uploadExcelByUrl(getTableData, url)
        } else if (command.name == 'downloadTemplate') {
          let downloadApi =
            propsControl.struct.apiURLFront +
            propsControl.struct.apis.downloadURL
          http.post(downloadApi, {}).then((res) => {
            if (propsControl.table.debug) {
              console.log('下载响应', res)
            }
            //标准化返回如，如果不调用接口的话，不同页面模板的模板存放要放到指定路径下
            if (res.status == 0) {
              const downloadURL = res.data
              // console.log(downloadURL);
              window.open(downloadURL)
            }
          })
        }
      }
      break
    // 导出
    case 'export':
      // console.log('command', command)
      switch (command.name) {
        case 'exportSelectedToExcel':
        case 'exportCurrentPageToExcel':
          const data =
            command.name == 'exportSelectedToExcel'
              ? propsControl.table.selectionRows
              : propsControl.table.data
          // console.log('data', data)
          if (propsControl.struct) {
            if (data && data.length > 0) {
              // console.log(
              //   'export',
              //   propsControl.struct.name,
              //   data,
              //   propsControl.table.columns,
              // )
              exportExcel(
                propsControl.struct.name,
                data,
                propsControl.table.columns,
              )
            } else {
              ElMessage({
                message: t('messages.mustSelectLines'),
                type: 'warning',
              })
            }
          }
          break
        default:
          if (command.command != undefined) {
            command.command(event, command)
          }
          break
      }
      break

    // 批量拖拽
    case 'batchDrag':
      propsControl.table.canSort = true
      propsControl.operateButtons.changeButton('saveDrag', { show: true })
      propsControl.operateButtons.changeButton('cancelDrag', { show: true })
      propsControl.operateButtons.changeButton('batchDrag', { show: false })
      break;
    case 'saveDrag':
      const dragState = JSON.parse(JSON.stringify(tableRef.value?.dragState))
      const rowData = dragState.currentRowOrder

      const colData = dragState.currentColumnOrder.map((item: any, index: number) => {
        if (index <= 1 || index === dragState.originalColumnHeader.length - 1) return false
        return item.property
      }).filter((item: any) => item !== false)

      console.log('排序后：', rowData, colData)
      // columnSortChange(colData)
      // 保存列排序
      tableRef.value?.saveColumnDrag()
      propsControl.operateButtons.changeButton('saveDrag', { show: false })
      propsControl.operateButtons.changeButton('cancelDrag', { show: false })
      propsControl.operateButtons.changeButton('batchDrag', { show: true })
      propsControl.table.canSort = false
      break;
    case 'cancelDrag':
      propsControl.table.canSort = false
      propsControl.operateButtons.changeButton('saveDrag', { show: false })
      propsControl.operateButtons.changeButton('cancelDrag', { show: false })
      propsControl.operateButtons.changeButton('batchDrag', { show: true })
      // 刷新表格
      tableRef.value?.resetAllDrag()
      break;
    case 'refresh':
      getTableData()
      break;
    default:
      if (event.click) {
        event.click(propsControl.table?.selectionRows ?? [])
      } else {
        emits('click', event)
      }
      break
  }
}

// 显示列
function showColumns(arr: string[] = []) {
  let showColumnsDropdown = RwDropdown.init('table', 'showColumns', {
    hideOnClick: false,
    type: 'primary',
    maxHeight: 500,
    command: saveColumns,
    icon: 'Finished',
  })
  showColumnsDropdown.addItem('getColumnsFromRemote', {
    label: 'buttons.getFromRemote',
    showCheck: false,
  })
  showColumnsDropdown.addItem('saveColumnsToRemote', {
    label: 'buttons.saveToRemote',
    showCheck: false,
  })
  showColumnsDropdown.addItem('resetDefault', {
    label: 'buttons.resetDefault',
    showCheck: false,
  })
  showColumnsDropdown.addItem('diver', {
    label: '',
    divided: true,
    showCheck: false,
  })

  if (propsControl.struct) {
    let structName = ''
    if (propsControl.struct) {
      structName = propsControl.struct.name
    }

    let fieldsOrder: any = []
    if (columnsSetting.fieldsOrder[propsControl.struct.name]) {
      fieldsOrder = columnsSetting.fieldsOrder[propsControl.struct.name]
      if (fieldsOrder.length > 0) {
        propsControl.table.columns.sort((a: any, b: any) => {
          return fieldsOrder.indexOf(a.name) - fieldsOrder.indexOf(b.name)
        })
      }
    }

    let tmpFieldsOrder: any = []
    propsControl.table.columns.forEach((column) => {
      showColumnsDropdown.addItem(column.name, {
        label: column.label ?? '',
        showCheck: true,
        checked: columnsSetting.isChecked(structName, column.name),
      })
      tmpFieldsOrder.push(column.name)
    })

    if (fieldsOrder.length == 0) {
      columnsSetting.setFieldsOrder(propsControl.struct.name, tmpFieldsOrder)
    }

    propsControl.tableButtons.addDropdown('showColumns', showColumnsDropdown)
    propsControl.tableButtons.controls = {
      ...propsControl.tableButtons.controls,
    }
  }
}

/** 实时保存列表选项信息，此处为系统方法，所以在里面写，如果需要用户干预的，要写在index.vue或者是edit.vue之类的文件中 */
async function saveColumns(item: RwDropdown.DropdownItemOptionT) {
  if (item.name == 'getColumnsFromRemote') {
    await columnsSetting.getFromRemote()
  } else if (item.name == 'saveColumnsToRemote') {
    columnsSetting.saveToRemote()
  } else if (item.name === 'resetDefault') {
    // columnsSetting.resetDefault()
    console.log('columnsSetting', columnsSetting)
  } else {
    if (propsControl.struct) {
      columnsSetting.setItem(
        propsControl.struct.name,
        item.name.toString(),
        item.checked,
      )
    }
  }
}

onMounted(async () => {
  await nextTick()
  showColumns()
  getTableData()
  if (tableHeight.value == 'fixed') {
    updateBrowserHeight()
  }
  setupScrollObserver()
})

// 监听窗口大小变化事件，更新浏览器高度
const resizeObserver = new ResizeObserver(updateBrowserHeight)
resizeObserver.observe(document.documentElement)

// 更新浏览器高度的函数
function updateBrowserHeight() {
  browserHeight.value = window.innerHeight
  nextTick(() => {
    if (searchRef.value) {
      // 获取搜索元素的高度
      if (searchRef.value.$el.offsetHeight > 0) {
        searchHeight.value = searchRef.value.$el.offsetHeight
      }
    }

    if (buttonGroupRef.value) {
      // 获取按钮组元素的高度
      if (buttonGroupRef.value.$el.offsetHeight > 0) {
        buttonGroupHeight.value = buttonGroupRef.value.$el.offsetHeight
      }
    }
  })

  if (tableHeight.value == 'fixed') {
    getTableHeight() // 获取表格高度
  } else {
    propsControl.table.height = 'auto'
  }
}

// 获取表格高度
async function getTableHeight() {
  await nextTick()
  if (localSetting.pageTable.showTitle === false) {
    pageTitleHeight.value = 0
  }

  if (paginationRef.value) {
    paginationHeight.value = paginationRef.value.$el.offsetHeight
  }

  propsControl.table.height =
    browserHeight.value -
    84 -
    10 -
    pageTitleHeight.value -
    searchHeight.value -
    buttonGroupHeight.value -
    paginationHeight.value
}

// 在组件销毁时，停止监听窗口大小变化事件
onUnmounted(() => {
  resizeObserver.disconnect()
  scrollObserver?.disconnect()
})

function rowSortChange() {
  console.log('rowSortChange')
}

defineExpose({
  refreshData
})

</script>

<template>
  <RwPageBase.Template v-if="propsControl.page" :control="propsControl.page" @refresh-data="refreshData">
    <template #SlotTopRight>
      <slot name="SlotTopRight"></slot>
    </template>

    <!-- 搜索 -->
    <ElRow ref="searchRef" v-if="propsControl.search">
      <ElCol>
        <RwSearch.Template ref="searchRefTem" :control="propsControl.search" @onSearch="onSearch">
          <template #SlotSearchAppend v-if="propsControl?.struct?.tableType == 'master'">
            <RwButtonGroup.Template v-if="propsControl.operateButtons" :control="propsControl.operateButtons" />
          </template>
        </RwSearch.Template>
      </ElCol>
    </ElRow>

    <!-- 按钮组 -->
    <ElRow ref="buttonGroupRef">
      <ElCol :span="isMobile ? 24 : (propsControl.operateButtons?.show ? 12 : 24)">
        <RwButtonGroup.Template v-if="propsControl.operateButtons" :control="propsControl.operateButtons"
          @click="clickButtons" />
      </ElCol>
      <ElCol :span="isMobile ? 24 : 12" style="display: flex; justify-content: end" v-if="propsControl.operateButtons?.show">
        <RwButtonGroup.Template v-if="propsControl.tableButtons" :control="propsControl.tableButtons"
          @click="clickButtons" />
      </ElCol>
    </ElRow>

    <!-- 移动端卡片列表 -->
    <div v-if="isMobile && propsControl.table" class="mobile-card-list">
      <div
        v-for="(item, index) in propsControl.table.data"
        :key="index"
        class="mobile-card"
      >
        <div class="mobile-card-body">
          <div
            v-for="column in mobileColumns"
            :key="column.name"
            class="mobile-card-row"
          >
            <span class="mobile-card-label">{{ getColumnLabel(column) }}</span>
            <span class="mobile-card-value">{{ item[column.name] }}</span>
          </div>
        </div>
        <div
          v-if="propsControl.table.lineButtons?.controls?.length"
          class="mobile-card-actions"
        >
          <RwButtonGroup.Template
            :control="propsControl.table.lineButtons"
            :status-data="{ row: item, $index: index }"
            @click="(event: any) => handleClickLineButton(event, { row: item, $index: index })"
          />
        </div>
      </div>
      <div ref="sentinelRef" class="mobile-sentinel"></div>
      <div v-if="propsControl.table.loading" class="mobile-loading">加载中...</div>
      <div v-else-if="!hasMore && (propsControl.table.data?.length ?? 0) > 0" class="mobile-no-more">没有更多了</div>
    </div>

    <!-- 桌面端表格 -->
    <RwTable.Template v-if="!isMobile && propsControl.table" :control="propsControl.table" :default-data="propsControl.table.data ?? []"
      :pageTable="propsControl" @selectionChange="handleSelectionChange" @clickLineButton="handleClickLineButton"
      @row-sort-change="rowSortChange" ref="tableRef" />

    <!-- 页码（桌面端） -->
    <ElRow ref="paginationRef" v-if="!isMobile && propsControl.table && !propsControl.table.loading">
      <ElCol :span="12">
        <RwButtonGroup.Template v-if="propsControl.operateButtons" :control="propsControl.operateButtons"
          @click="clickButtons" />
      </ElCol>
      <ElCol :span="12" v-if="propsControl.pagination && propsControl.pagination.total != 0"
        style="display: flex; justify-content: end">
        <RwPagination.Template v-if="propsControl.pagination" :control="propsControl.pagination"
          @update:currentPage="propsControl.pagination.page = $event"
          @update:pageSize="propsControl.pagination.pageSize = $event" />
      </ElCol>
    </ElRow>
  </RwPageBase.Template>
</template>

<style lang="scss" scoped>
.mobile-card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  width: 100%;
  box-sizing: border-box;
}

.mobile-card {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.mobile-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-card-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
  gap: 12px;
}

.mobile-card-label {
  color: var(--el-text-color-secondary);
  flex-shrink: 0;
  min-width: 80px;
}

.mobile-card-value {
  color: var(--el-text-color-primary);
  text-align: right;
  word-break: break-all;
  flex: 1;
}

.mobile-card-actions {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color-lighter);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.mobile-sentinel {
  height: 1px;
}

.mobile-loading,
.mobile-no-more {
  text-align: center;
  color: var(--el-text-color-secondary);
  font-size: 13px;
  padding: 12px 0;
}
</style>
