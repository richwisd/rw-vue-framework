<template>
  <div class="container">
      <h2>RW Framework 演示</h2>
      <ul>
        <li><h2>Basic基础组件</h2></li>
        <li v-for="route in routes.slice(0,6)" :key="route.path">
          <a
            :href="'#' + route.path"
            :class="{ active: currentPath === route.path }"
            @click="navigateTo(route.path)"
          >
            {{ route.name }}
          </a>
        </li>
        <li><h2>Form表单组件</h2></li>
        <li v-for="route in routes.slice(6,20)" :key="route.path">
          <a
            :href="'#' + route.path"
            :class="{ active: currentPath === route.path }"
            @click="navigateTo(route.path)"
          >
            {{ route.name }}
          </a>
        </li>
        <li><h2>Data数据组件</h2></li>
        <li v-for="route in routes.slice(20,34)" :key="route.path">
          <a
            :href="'#' + route.path"
            :class="{ active: currentPath === route.path }"
            @click="navigateTo(route.path)"
          >
            {{ route.name }}
          </a>
        </li>
        <li><h2>Navigation导航组件</h2></li>
        <li v-for="route in routes.slice(34,39)" :key="route.path">
          <a
            :href="'#' + route.path"
            :class="{ active: currentPath === route.path }"
            @click="navigateTo(route.path)"
          >
            {{ route.name }}
          </a>
        </li>
        <li><h2>反馈组件</h2></li>
        <li v-for="route in routes.slice(39,47)" :key="route.path">
          <a
            :href="'#' + route.path"
            :class="{ active: currentPath === route.path }"
            @click="navigateTo(route.path)"
          >
            {{ route.name }}
          </a>
        </li>
        <li><h2>其他组件</h2></li>
        <li v-for="route in routes.slice(47,49)" :key="route.path">
          <a
            :href="'#' + route.path"
            :class="{ active: currentPath === route.path }"
            @click="navigateTo(route.path)"
          >
            {{ route.name }}
          </a>
        </li>

        <li><h2>表格组件</h2></li>
        <li v-for="route in routes.slice(53,56)" :key="route.path">
          <a
            :href="'#' + route.path"
            :class="{ active: currentPath === route.path }"
            @click="navigateTo(route.path)"
          >
            {{ route.name }}
          </a>
        </li>

      </ul>
  </div>
  <div class="content-container">
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, watch } from 'vue'
import { useLocalSettingStore } from 'rw-vue-framework/stores'
import { useToggle } from '@vueuse/core'
const localSettingData = useLocalSettingStore()

// 导入页面组件
import InputDemo from './pages/controls/inputDemo.vue'
import tableFormDemo from './pages/controls/tableFormDemo.vue'
import InputNumberDemo from './pages/controls/inputNumberDemo.vue'
import InputTagDemo from './pages/controls/inputTagDemo.vue'
import ComInputDemo from './pages/controls/comInputDemo.vue'
import Switch from './pages/controls/switchDemo.vue'
import Slider from './pages/controls/sliderDemo.vue'
import Transfer from './pages/controls/transferDemo.vue'
import Rate from './pages/controls/rateDemo.vue'
import Radio from './pages/controls/radioDemo.vue'
import Select from './pages/controls/selectDemo.vue'
import Checkbox from './pages/controls/checkbox.vue'
import ColorPicker from './pages/controls/colorPickerDemo.vue'
import Avatar from './pages/controls/avatarDemo.vue'
import Badge from './pages/controls/badgeDemo.vue'
import Card from './pages/controls/cardDemo.vue'
import Calendar from './pages/controls/calendarDemo.vue'
import mergeSelect from './pages/controls/mergeSelectDemo.vue'
import Form from './pages/controls/formDemo.vue'
import pageFormDialog from './pages/controls/pageFormDialog.vue'
import BasePage from './pages/pages/pageBase/index.vue'
import Empty from './pages/controls/emptyDemo.vue'
import InfiniteScroll from './pages/controls/infiniteScrollDemo.vue'
import Progress from './pages/controls/progressDemo.vue'
import Result from './pages/controls/resultDemo.vue'
import PageBase from './pages/pages/pageBase/index.vue'
import RQuery from './pages/query/index.vue'
import RTable from './pages/query/table.vue'
import RHttp from './pages/query/http.vue'

import Button from './pages/controls/buttonDemo.vue'
import DropDown from './pages/controls/dropdownDemo.vue'
import Timeline from './pages/controls/timelineDemo.vue'
import Seleton from './pages/controls/seletonDemo.vue'
import Segmented from './pages/controls/segmentedDemo.vue'
import Backtop from './pages/controls/backtopDemo.vue'
import Breadcrumb from './pages/controls/breadcrumbDemo.vue'
import Steps from './pages/controls/stepsDemo.vue'
import Alert from './pages/controls/alertDemo.vue'
import ButtonGroup from './pages/controls/buttonGroupDemo.vue'
import Drawer from './pages/controls/drawerDemo.vue'
import Message from './pages/controls/messageDemo.vue'
import Popconfirm from './pages/controls/popconfirmDemo.vue'
import Popover from './pages/controls/popoverDemo.vue'
import Tooltip from './pages/controls/tooltipDemo.vue'
import localSetting from './pages/pages/localSetting/index.vue'
import appConfig from './pages/pages/appConfig/index.vue'
import Divider from './pages/controls/dividerDemo.vue'
import Watermark from './pages/controls/watermarkDemo.vue'
import MessageBox from './pages/controls/messageBoxDemo.vue'
import Notification from './pages/controls/notificationDemo.vue'
import Affix from './pages/controls/affixDemo.vue'
import Carousel from './pages/controls/carouselDemo.vue'
import Collapse from './pages/controls/collapseDemo.vue'
import Descriptions from './pages/controls/descriptionsDemo.vue'
import Text from './pages/controls/textDemo.vue'

import TableDemo from './pages/controls/tableDemo.vue'
import SearchDemo from './pages/controls/searchDemo.vue'
import pageTableDemo from './pages/pages/pageTable/index.vue'
// 定义路由
const routes = [
  { path: '/pages/local-setting', name: 'localSetting 组件演示', component: localSetting },
  { path: '/pages/app-config', name: 'appConfig 组件演示', component: appConfig },
  { path: '/pages/base-page', name: 'BasePage 组件演示', component: BasePage },
  { path: '/query/index', name: 'query 接口演示', component: RQuery },
  { path: '/query/table', name: 'RTable 演示', component: RTable },
  { path: '/query/http', name: '接口调试工具演示', component: RHttp },
  { path: '/controls/button-demo', name: 'Button 组件演示', component: Button },
  { path: '/controls/button-group-demo', name: 'ButtonGroup 组件演示', component: ButtonGroup },
  { path: '/constrols/text-demo', name: 'Text 组件演示', component: Text },
  { path: '/constrols/table-form-demo', name: 'tableForm 组件演示', component: tableFormDemo },

  { path: '/controls/com-input-demo', name: 'comInputTag 组件演示', component: ComInputDemo },
  { path: '/controls/checkbox-demo', name: 'Checkbox 组件演示', component: Checkbox },
  { path: '/controls/color-picker-demo', name: 'ColorPicker 组件演示', component: ColorPicker },
  { path: '/controls/form-demo', name: 'Form 组件演示', component: Form }, // pageFormDialog
  { path: '/controls/page-form-dialog', name: 'pageFormDialog 组件演示', component: pageFormDialog }, // pageFormDialog
  { path: '/controls/input-demo', name: 'input 组件演示', component: InputDemo },
  { path: '/controls/input-number-demo', name: 'inputNumber 组件演示', component: InputNumberDemo },
  { path: '/controls/input-tag-demo', name: 'inputTag 组件演示', component: InputTagDemo },
  { path: '/controls/radio-demo', name: 'Radio 组件演示', component: Radio },
  { path: '/controls/rate-demo', name: 'Rate 组件演示', component: Rate },
  { path: '/controls/select-demo', name: 'Select 组件演示', component: Select },
  { path: '/controls/merge-select-controls', name: 'mergeSelect 组件演示', component: mergeSelect },
  { path: '/controls/slider-demo', name: 'Slider 组件演示', component: Slider },
  { path: '/controls/switch-demo', name: 'Switch 组件演示', component: Switch },
  { path: '/controls/transfer-demo', name: 'Transfer 组件演示', component: Transfer },

  { path: '/controls/avatar-demo', name: 'Avatar 组件演示', component: Avatar },
  { path: '/controls/badge-demo', name: 'Badge 组件演示', component: Badge },
  { path: '/controls/calendar-demo', name: 'Calendar 组件演示', component: Calendar },
  { path: '/controls/card-demo', name: 'Card 组件演示', component: Card },
  { path: '/control/carousel-demo', name: 'Carousel 组件演示', component: Carousel },
  { path: '/controls/collapse-demo', name: 'Collapse 组件演示', component: Collapse },
  { path: '/controls/descriptions-demo', name: 'Descriptions 组件演示', component: Descriptions },
  { path: '/controls/empty', name: '空白页面', component: Empty },
  { path: '/controls/infinite-scroll', name: 'InfiniteScroll 组件演示', component: InfiniteScroll.infiniteScroll },
  { path: '/controls/progress-demo', name: 'Progress 组件演示', component: Progress },
  { path: '/controls/result-demo', name: 'Result 组件演示', component: Result },
  { path: '/pages/base-page', name: 'Page 组件演示', component: PageBase },
  { path: '/controls/button-demo', name: 'Button 组件演示', component: Button },
  { path: '/controls/drop-down-demo', name: 'DropDown 组件演示', component: DropDown },
  { path: '/controls/timeline-demo', name: 'Timeline 组件演示', component: Timeline },
  { path: '/controls/seleton-demo', name: 'Seleton 组件演示', component: Seleton },
  { path: '/controls/timeline-demo', name: 'Timeline 组件演示', component: Timeline },
  { path: '/controls/segmented', name: 'Segmented 组件演示', component: Segmented },

  { path: '/controls/affix-demo', name: 'Affix 组件演示', component: Affix },
  { path: '/controls/backtop-demo', name: 'Backtop 组件演示', component: Backtop },
  { path: '/controls/breadcrumb-demo', name: 'Breadcrumb 组件演示', component: Breadcrumb },
  { path: '/controls/dropdown-demo', name: 'Dropdown 组件演示', component: DropDown},
  { path: '/controls/steps-demo', name: 'Steps 组件演示', component: Steps },

  { path: '/controls/alert-demo', name: 'Alert 组件演示', component: Alert },
  { path: '/controls/drawer-demo', name: 'Drawer 组件演示', component: Drawer },
  { path: '/controls/message-demo', name: 'Message 组件演示', component: Message },
  { path: '/controls/message-box-demo', name: 'MessageBox 组件演示', component: MessageBox },
  { path: '/controls/notification-demo', name: 'Notification 组件演示', component: Notification },
  { path: '/controls/popconfirm-demo', name: 'Popconfirm 组件演示', component: Popconfirm },
  { path: '/controls/popover-demo', name: 'Popover 组件演示', component: Popover },
  { path: '/controls/tooltip-demo', name: 'Tooltip 组件演示', component: Tooltip },

  { path: '/controls/divider-demo', name: 'Divider 组件演示', component: Divider},
  { path: '/controls/watermark-demo', name: 'Watermark 组件演示', component: Watermark},


  { path: '/controls/table-demo', name: 'table 表格演示', component: TableDemo },
  { path: '/controls/search-demo', name: 'search搜索演示', component: SearchDemo },
  { path: '/pages/page-table-demo', name: 'pageTable演示', component: pageTableDemo },
]

// 当前路径和组件
const currentPath = ref('/')
const currentComponent = shallowRef(routes[0].component)

// 导航方法
const navigateTo = (path: string) => {
  currentPath.value = path
  window.location.hash = path
  updateCurrentComponent()
}

// 更新当前组件
const updateCurrentComponent = () => {
  const route = routes.find(r => r.path === currentPath.value) || routes[0]
  currentComponent.value = route.component
}

// 监听 hash 变化
const handleHashChange = () => {
  const hash = window.location.hash.slice(1) || '/'
  currentPath.value = hash
  updateCurrentComponent()
}

// 初始化
onMounted(() => {
  handleHashChange()
  window.addEventListener('hashchange', handleHashChange)
})

// 卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

const isDark = localSettingData.isDark()

watch(() => localSettingData.system.dark, (newValue) => {
  isDark.value = newValue
  useToggle(isDark)
})

</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  overflow-y: auto;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #409eff;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;

      a {
        display: block;
        padding: 10px;
        color: #606266;
        text-decoration: none;
        border-radius: 4px;
        transition: all 0.3s;
        text-align: center;

        &:hover {
          background-color: #ecf5ff;
          color: #409eff;
        }

        &.active {
          background-color: #409eff;
          color: white;
        }
      }
    }
  }
}

.content-container {
  flex: 1;
  padding: 50px;
  overflow-y: auto;
  height: 100vh;
}

*:focus,
*:active {
  outline: none !important;
}
:deep(.el-button:focus) {
    outline: none !important;
}
</style>
