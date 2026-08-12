import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 路由配置（扁平结构，菜单通过 meta.group 分组）
// 使用动态 import() 实现路由懒加载，无需单独声明变量
// 路由路径与文件名保持一致
export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('../pages/home/index.vue'), meta: { title: '首页' } },
  // 页面组件
  { path: '/pages/localSetting', name: 'localSetting', component: () => import('../pages/pages/localSetting/index.vue'), meta: { title: 'localSetting 组件演示', group: '页面组件' } },
  { path: '/pages/appConfig', name: 'appConfig', component: () => import('../pages/pages/appConfig/index.vue'), meta: { title: 'appConfig 组件演示', group: '页面组件' } },
  { path: '/pages/pageBase', name: 'basePage', component: () => import('../pages/pages/pageBase/index.vue'), meta: { title: 'BasePage 组件演示', group: '页面组件' } },
  { path: '/pages/pageTable', name: 'pageTable', component: () => import('../pages/pages/pageTable/index.vue'), meta: { title: 'pageTable 演示', group: '页面组件' } },
  // 接口演示
  // { path: '/query/index', name: 'query', component: () => import('../pages/query/index.vue'), meta: { title: 'query 接口演示', group: '接口演示' } },
  // { path: '/query/table', name: 'queryTable', component: () => import('../pages/query/table.vue'), meta: { title: 'RTable 演示', group: '接口演示' } },
  // { path: '/query/http', name: 'http', component: () => import('../pages/query/http.vue'), meta: { title: '接口调试工具演示', group: '接口演示' } },
  // Basic 基础组件
  { path: '/controls/buttonDemo', name: 'button', component: () => import('../pages/controls/buttonDemo.vue'), meta: { title: 'Button 组件演示', group: 'Basic基础组件' } },
  { path: '/controls/buttonGroupDemo', name: 'buttonGroup', component: () => import('../pages/controls/buttonGroupDemo.vue'), meta: { title: 'ButtonGroup 组件演示', group: 'Basic基础组件' } },
  { path: '/controls/textDemo', name: 'text', component: () => import('../pages/controls/textDemo.vue'), meta: { title: 'Text 组件演示', group: 'Basic基础组件' } },
  { path: '/controls/comInputDemo', name: 'comInput', component: () => import('../pages/controls/comInputDemo.vue'), meta: { title: 'comInputTag 组件演示', group: 'Basic基础组件' } },
  // Form 表单组件
  { path: '/controls/checkbox', name: 'checkbox', component: () => import('../pages/controls/checkbox.vue'), meta: { title: 'Checkbox 组件演示', group: 'Form表单组件' } },
  { path: '/controls/colorPickerDemo', name: 'colorPicker', component: () => import('../pages/controls/colorPickerDemo.vue'), meta: { title: 'ColorPicker 组件演示', group: 'Form表单组件' } },
  { path: '/controls/formDemo', name: 'form', component: () => import('../pages/controls/formDemo.vue'), meta: { title: 'Form 组件演示', group: 'Form表单组件' } },
  { path: '/controls/pageFormDialog', name: 'pageFormDialog', component: () => import('../pages/controls/pageFormDialog.vue'), meta: { title: 'pageFormDialog 组件演示', group: 'Form表单组件' } },
  { path: '/controls/inputDemo', name: 'input', component: () => import('../pages/controls/inputDemo.vue'), meta: { title: 'input 组件演示', group: 'Form表单组件' } },
  { path: '/controls/inputNumberDemo', name: 'inputNumber', component: () => import('../pages/controls/inputNumberDemo.vue'), meta: { title: 'inputNumber 组件演示', group: 'Form表单组件' } },
  { path: '/controls/inputTagDemo', name: 'inputTag', component: () => import('../pages/controls/inputTagDemo.vue'), meta: { title: 'inputTag 组件演示', group: 'Form表单组件' } },
  { path: '/controls/radioDemo', name: 'radio', component: () => import('../pages/controls/radioDemo.vue'), meta: { title: 'Radio 组件演示', group: 'Form表单组件' } },
  { path: '/controls/rateDemo', name: 'rate', component: () => import('../pages/controls/rateDemo.vue'), meta: { title: 'Rate 组件演示', group: 'Form表单组件' } },
  { path: '/controls/selectDemo', name: 'select', component: () => import('../pages/controls/selectDemo.vue'), meta: { title: 'Select 组件演示', group: 'Form表单组件' } },
  { path: '/controls/mergeSelectDemo', name: 'mergeSelect', component: () => import('../pages/controls/mergeSelectDemo.vue'), meta: { title: 'mergeSelect 组件演示', group: 'Form表单组件' } },
  { path: '/controls/sliderDemo', name: 'slider', component: () => import('../pages/controls/sliderDemo.vue'), meta: { title: 'Slider 组件演示', group: 'Form表单组件' } },
  { path: '/controls/switchDemo', name: 'switch', component: () => import('../pages/controls/switchDemo.vue'), meta: { title: 'Switch 组件演示', group: 'Form表单组件' } },
  { path: '/controls/transferDemo', name: 'transfer', component: () => import('../pages/controls/transferDemo.vue'), meta: { title: 'Transfer 组件演示', group: 'Form表单组件' } },
  // Data 数据组件
  { path: '/controls/avatarDemo', name: 'avatar', component: () => import('../pages/controls/avatarDemo.vue'), meta: { title: 'Avatar 组件演示', group: 'Data数据组件' } },
  { path: '/controls/badgeDemo', name: 'badge', component: () => import('../pages/controls/badgeDemo.vue'), meta: { title: 'Badge 组件演示', group: 'Data数据组件' } },
  { path: '/controls/calendarDemo', name: 'calendar', component: () => import('../pages/controls/calendarDemo.vue'), meta: { title: 'Calendar 组件演示', group: 'Data数据组件' } },
  { path: '/controls/cardDemo', name: 'card', component: () => import('../pages/controls/cardDemo.vue'), meta: { title: 'Card 组件演示', group: 'Data数据组件' } },
  { path: '/controls/carouselDemo', name: 'carousel', component: () => import('../pages/controls/carouselDemo.vue'), meta: { title: 'Carousel 组件演示', group: 'Data数据组件' } },
  { path: '/controls/collapseDemo', name: 'collapse', component: () => import('../pages/controls/collapseDemo.vue'), meta: { title: 'Collapse 组件演示', group: 'Data数据组件' } },
  { path: '/controls/descriptionsDemo', name: 'descriptions', component: () => import('../pages/controls/descriptionsDemo.vue'), meta: { title: 'Descriptions 组件演示', group: 'Data数据组件' } },
  { path: '/controls/emptyDemo', name: 'empty', component: () => import('../pages/controls/emptyDemo.vue'), meta: { title: '空白页面', group: 'Data数据组件' } },
  { path: '/controls/infiniteScrollDemo', name: 'infiniteScroll', component: () => import('../pages/controls/infiniteScrollDemo.vue'), meta: { title: 'InfiniteScroll 组件演示', group: 'Data数据组件' } },
  { path: '/controls/progressDemo', name: 'progress', component: () => import('../pages/controls/progressDemo.vue'), meta: { title: 'Progress 组件演示', group: 'Data数据组件' } },
  { path: '/controls/resultDemo', name: 'result', component: () => import('../pages/controls/resultDemo.vue'), meta: { title: 'Result 组件演示', group: 'Data数据组件' } },
  { path: '/controls/dropdownDemo', name: 'dropDown', component: () => import('../pages/controls/dropdownDemo.vue'), meta: { title: 'DropDown 组件演示', group: 'Data数据组件' } },
  { path: '/controls/timelineDemo', name: 'timeline', component: () => import('../pages/controls/timelineDemo.vue'), meta: { title: 'Timeline 组件演示', group: 'Data数据组件' } },
  { path: '/controls/seletonDemo', name: 'seleton', component: () => import('../pages/controls/seletonDemo.vue'), meta: { title: 'Seleton 组件演示', group: 'Data数据组件' } },
  { path: '/controls/segmentedDemo', name: 'segmented', component: () => import('../pages/controls/segmentedDemo.vue'), meta: { title: 'Segmented 组件演示', group: 'Data数据组件' } },
  { path: '/controls/tableDemo', name: 'table', component: () => import('../pages/controls/tableDemo.vue'), meta: { title: 'table 表格演示', group: 'Data数据组件' } },
  { path: '/controls/searchDemo', name: 'search', component: () => import('../pages/controls/searchDemo.vue'), meta: { title: 'search搜索演示', group: 'Data数据组件' } },
  { path: '/controls/tableFormDemo', name: 'tableForm', component: () => import('../pages/controls/tableFormDemo.vue'), meta: { title: 'tableForm 组件演示', group: 'Data数据组件' } },
  // Navigation 导航组件
  { path: '/controls/affixDemo', name: 'affix', component: () => import('../pages/controls/affixDemo.vue'), meta: { title: 'Affix 组件演示', group: 'Navigation导航组件' } },
  { path: '/controls/backtopDemo', name: 'backtop', component: () => import('../pages/controls/backtopDemo.vue'), meta: { title: 'Backtop 组件演示', group: 'Navigation导航组件' } },
  { path: '/controls/breadcrumbDemo', name: 'breadcrumb', component: () => import('../pages/controls/breadcrumbDemo.vue'), meta: { title: 'Breadcrumb 组件演示', group: 'Navigation导航组件' } },
  { path: '/controls/stepsDemo', name: 'steps', component: () => import('../pages/controls/stepsDemo.vue'), meta: { title: 'Steps 组件演示', group: 'Navigation导航组件' } },
  // 反馈组件
  { path: '/controls/alertDemo', name: 'alert', component: () => import('../pages/controls/alertDemo.vue'), meta: { title: 'Alert 组件演示', group: '反馈组件' } },
  { path: '/controls/drawerDemo', name: 'drawer', component: () => import('../pages/controls/drawerDemo.vue'), meta: { title: 'Drawer 组件演示', group: '反馈组件' } },
  { path: '/controls/messageDemo', name: 'message', component: () => import('../pages/controls/messageDemo.vue'), meta: { title: 'Message 组件演示', group: '反馈组件' } },
  { path: '/controls/messageBoxDemo', name: 'messageBox', component: () => import('../pages/controls/messageBoxDemo.vue'), meta: { title: 'MessageBox 组件演示', group: '反馈组件' } },
  { path: '/controls/notificationDemo', name: 'notification', component: () => import('../pages/controls/notificationDemo.vue'), meta: { title: 'Notification 组件演示', group: '反馈组件' } },
  { path: '/controls/popconfirmDemo', name: 'popconfirm', component: () => import('../pages/controls/popconfirmDemo.vue'), meta: { title: 'Popconfirm 组件演示', group: '反馈组件' } },
  { path: '/controls/popoverDemo', name: 'popover', component: () => import('../pages/controls/popoverDemo.vue'), meta: { title: 'Popover 组件演示', group: '反馈组件' } },
  { path: '/controls/tooltipDemo', name: 'tooltip', component: () => import('../pages/controls/tooltipDemo.vue'), meta: { title: 'Tooltip 组件演示', group: '反馈组件' } },
  // 其他组件
  { path: '/controls/dividerDemo', name: 'divider', component: () => import('../pages/controls/dividerDemo.vue'), meta: { title: 'Divider 组件演示', group: '其他组件' } },
  { path: '/controls/watermarkDemo', name: 'watermark', component: () => import('../pages/controls/watermarkDemo.vue'), meta: { title: 'Watermark 组件演示', group: '其他组件' } },
]

// 构建目录树数据（按 group 分组）
export function buildMenuTree() {
  const tree: { key: string; label: string; children: { key: string; path: string; title: string }[] }[] = []
  const groupMap = new Map<string, { key: string; path: string; title: string }[]>()

  for (const route of routes) {
    if (route.path === '/') continue
    const group = route.meta?.group as string
    if (!group) continue
    if (!groupMap.has(group)) {
      groupMap.set(group, [])
      tree.push({ key: `group-${group}`, label: group, children: groupMap.get(group)! })
    }
    groupMap.get(group)!.push({
      key: route.path,
      path: route.path,
      title: route.meta?.title as string
    })
  }

  return tree
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
