// 侧边栏配置 — 组件按 7 个分组组织，共 67 个组件

export const sidebar = {
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '什么是 rw-vue-framework', link: '/guide/' },
        { text: '快速开始', link: '/guide/quickStart' },
        { text: '自带国际化', link: '/guide/locale' },
        { text: '项目约束', link: '/guide/constraint' }
      ]
    }
  ],
  '/components/': [
    {
      text: '基础组件',
      collapsed: false,
      items: [
        { text: 'Button 按钮', link: '/components/basic/button' },
        { text: 'ButtonGroup 按钮组', link: '/components/basic/buttonGroup' },
        { text: 'Text 文本', link: '/components/basic/text' },
        { text: 'Divider 分割线', link: '/components/basic/divider' },
        { text: 'Tag 标签', link: '/components/basic/tag' },
        { text: 'TagComp 标签组件', link: '/components/basic/tagComp' },
        { text: 'SmallComp 小组件', link: '/components/basic/smallComp' }
      ]
    },
    {
      text: '表单输入',
      collapsed: false,
      items: [
        { text: 'Input 输入框', link: '/components/form/input' },
        { text: 'InputNumber 数字输入', link: '/components/form/inputNumber' },
        { text: 'InputTag 输入标签', link: '/components/form/inputTag' },
        { text: 'Autocomplete 自动补全', link: '/components/form/autocomplete' },
        { text: 'Select 选择器', link: '/components/form/select' },
        { text: 'MergeSelect 合并选择器', link: '/components/form/mergeSelect' },
        { text: 'MergeInput 合并输入', link: '/components/form/mergeInput' },
        { text: 'Checkbox 多选框', link: '/components/form/checkbox' },
        { text: 'Radio 单选框', link: '/components/form/radio' },
        { text: 'Switch 开关', link: '/components/form/switch' },
        { text: 'ColorPicker 颜色选择器', link: '/components/form/colorPicker' },
        { text: 'DatePicker 日期选择', link: '/components/form/date' },
        { text: 'Between 范围选择', link: '/components/form/between' },
        { text: 'Slider 滑块', link: '/components/form/slider' },
        { text: 'Rate 评分', link: '/components/form/rate' },
        { text: 'Transfer 穿梭框', link: '/components/form/transfer' },
        { text: 'UploadNew 上传', link: '/components/form/uploadNew' },
        { text: 'Map 地图', link: '/components/form/map' }
      ]
    },
    {
      text: '表单容器',
      collapsed: false,
      items: [
        { text: 'Form 表单', link: '/components/form-container/form' },
        { text: 'FormItems 表单项', link: '/components/form-container/formItems' },
        { text: 'Search 搜索区', link: '/components/form-container/search' }
      ]
    },
    {
      text: '反馈组件',
      collapsed: false,
      items: [
        { text: 'Alert 警告', link: '/components/feedback/alert' },
        { text: 'Message 消息提示', link: '/components/feedback/message' },
        { text: 'MessageBox 弹框', link: '/components/feedback/messageBox' },
        { text: 'Notification 通知', link: '/components/feedback/notification' },
        { text: 'Drawer 抽屉', link: '/components/feedback/drawer' },
        { text: 'Dialog 对话框', link: '/components/feedback/dialog' },
        { text: 'Popconfirm 气泡确认框', link: '/components/feedback/popconfirm' },
        { text: 'Popover 气泡卡片', link: '/components/feedback/popover' },
        { text: 'Tooltip 文字提示', link: '/components/feedback/tooltip' },
        { text: 'Progress 进度条', link: '/components/feedback/progress' },
        { text: 'Result 结果', link: '/components/feedback/result' },
        { text: 'Empty 空状态', link: '/components/feedback/empty' },
        { text: 'Skeleton 骨架屏', link: '/components/feedback/skeleton' }
      ]
    },
    {
      text: '导航组件',
      collapsed: false,
      items: [
        { text: 'Breadcrumb 面包屑', link: '/components/navigation/breadcrumb' },
        { text: 'Dropdown 下拉菜单', link: '/components/navigation/dropdown' },
        { text: 'Tabs 标签页', link: '/components/navigation/tabs' },
        { text: 'TabPane 标签面板', link: '/components/navigation/tabPane' },
        { text: 'Steps 步骤条', link: '/components/navigation/steps' },
        { text: 'Backtop 回到顶部', link: '/components/navigation/backtop' },
        { text: 'Affix 固钉', link: '/components/navigation/affix' },
        { text: 'Pagination 分页', link: '/components/navigation/pagination' }
      ]
    },
    {
      text: '数据展示',
      collapsed: false,
      items: [
        { text: 'Table 表格', link: '/components/data-display/table' },
        { text: 'Descriptions 描述列表', link: '/components/data-display/descriptions' },
        { text: 'Badge 徽章', link: '/components/data-display/badge' },
        { text: 'Avatar 头像', link: '/components/data-display/avatar' },
        { text: 'Card 卡片', link: '/components/data-display/card' },
        { text: 'Carousel 走马灯', link: '/components/data-display/carousel' },
        { text: 'Collapse 折叠面板', link: '/components/data-display/collapse' },
        { text: 'Image 图片', link: '/components/data-display/image' },
        { text: 'Timeline 时间线', link: '/components/data-display/timeline' },
        { text: 'Watermark 水印', link: '/components/data-display/watermark' },
        { text: 'Tree 树形控件', link: '/components/data-display/tree' },
        { text: 'Calendar 日历', link: '/components/data-display/calendar' },
        { text: 'Segmented 分段控制器', link: '/components/data-display/segmented' },
        { text: 'InfiniteScroll 无限滚动', link: '/components/data-display/infiniteScroll' }
      ]
    },
    {
      text: '页面组件',
      collapsed: false,
      items: [
        { text: 'PageStruct 页面结构', link: '/components/page/pageStruct' },
        { text: 'PageBase 页面基础', link: '/components/page/pageBase' },
        { text: 'PageForm 页面表单', link: '/components/page/pageForm' },
        { text: 'PageTable 页面表格', link: '/components/page/pageTable' }
      ]
    }
  ],
  '/demos/': [
    {
      text: '页面示例',
      collapsed: false,
      items: [
        { text: '页面示例总览', link: '/demos/' }
      ]
    }
  ]
}
