import { markRaw } from 'vue'
import FadeInLinear from "./components/FadeInLinear.vue"
import FadeIn from "./components/FadeIn.vue"
import ZoomInLeft from "./components/ZoomInLeft.vue"
import ZoomInCenter from "./components/ZoomInCenter.vue"
import ZoomInTop from "./components/ZoomInTop.vue"
import ZoomInBottom from "./components/ZoomInBottom.vue"
import tmImage from "./imgs/layouts/tm.png"
import tmbImage from "./imgs/layouts/tmb.png"
import tlmImage from "./imgs/layouts/tlm.png"
import tlbmImage from "./imgs/layouts/tlbm.png"
import tlmbImage from "./imgs/layouts/tlmb.png"
import lmImage from "./imgs/layouts/lm.png"
import ltmImage from "./imgs/layouts/ltm.png"
import ltmbImage from "./imgs/layouts/ltmb.png"
import ltbmImage from "./imgs/layouts/ltbm.png"

export const colorScheme = [
  { label: '蓝', value: 'blue' },
  { label: '红', value: 'red' },
  { label: '绿', value: 'green' },
  { label: '黄', value: 'yellow' },
]

export const langLable = [
  { label: '文本', value: 'text' },
  { label: '图标', value: 'icon' },
]
export const size = [
  { label: '大', value: 'large' },
  { label: '默认', value: 'default' },
  { label: '小', value: 'small' },
]

export const button = [
  { label: '素色', value: 'default' },
  { label: '纯色', value: 'primary' },
  { label: '成功', value:'success' },
  { label: '警告', value: 'warning' },
  { label: '危险', value: 'danger' },
  { label: '信息', value: 'info'},
]

export const checkBox = [
  { label: '原始样式', value: 'default' },
  { label: '按钮样式', value: 'button' },
]

export const layout = [
  {label:"tm",  value: 'tm',image:tmImage },
  {label:"tmb",  value: 'tmb',image:tmbImage  },
  {label:"tlm",  value: 'tlm',image:tlmImage  },
  {label:"tlbm", value: 'tlbm',image:tlbmImage },
  {label:"tlmb", value: 'tlmb',image:tlmbImage  },
  {label:"tlmb",value: 'lm',image:lmImage  },
  {label:"ltm",value: 'ltm',image:ltmImage  },
  {label:"ltmb",value: 'ltmb',image:ltmbImage  },
  {label:"ltbm",value: 'ltbm',image:ltbmImage  },
]

export const pageTransition = [
  { label: '线性淡入淡出', value: 'el-fade-in-linear', template: markRaw(FadeInLinear) },
  { label: '淡入淡出', value: 'el-fade-in' , template: markRaw(FadeIn) },
  { label: '左侧缩放' , value: 'el-zoom-in-left' , template: markRaw(ZoomInLeft) },
  { label: '中心缩放', value: 'el-zoom-in-center', template: markRaw(ZoomInCenter) },
  { label: '顶部缩放', value: 'el-zoom-in-top', template: markRaw(ZoomInTop) },
  { label: '底部缩放', value: 'el-zoom-in-bottom', template: markRaw(ZoomInBottom) }
]
export const buttonType = [
  { label: '默认', value: 'default' },
  { label: '扁平', value: 'plain' },
  { label: '圆角', value: 'round' },
  { label: '图标', value: 'circle' },
  { label: '文本', value: 'text' },
  { label: '灰背景文本', value: 'bg' },
]

export const pageWaterType = [
  { label: '文本', value: 'text' },
  { label: '图片', value: 'img' },
]

export const stringControlLocation = [
  { label: '所有控件之前', value: 'front' },
  { label: '搜索按钮之前', value: 'end' },
]
export const searchLabelPosition = [
  { label: '左', value: 'left' },
  { label: '上', value: 'top' },
]

export const deleteConfirmStyle = [
  { label: '模态确认框', value: 'modal' },
  { label: '气泡确认框', value: 'bubble' },
]
export const height = [
  { label: '跟随内容', value: 'follow' },
  { label: '固定高度', value: 'fixed' },
]
export const tableButtonsFixed = [
  { label: '跟随表格', value: false },
  { label: '固定左侧', value: 'left' },
  { label: '固定右侧', value: 'right' },
]

export const tableButtonStyle = [
  { label: '文本', value: 'text' },
  { label: '按钮', value: 'button' },
]

export const paginationLStyle = [
  { label: '极简', value: 'min' },
  { label: '默认', value: 'default' },
  { label: '复杂', value: 'max' },
]
export const footerFollow = [
  { label: '跟随表格', value: 'follow' },
  { label: '绝对底部', value: 'bottom' },
]
export const labelPosition = [
  { label: '左对齐', value: 'left' },
  { label: '右对齐', value: 'right' },
  { label: '控件上方', value: 'top' },
]

export const formButtonLocation = [
  { label: '靠左', value: 'start' },
  { label: '居中', value: 'center' },
  { label: '靠右', value: 'end' },
]

export const location = [
  { label: '表单上面', value: 'top' },
  { label: '表单下面', value: 'bottom' },
  { label: '上下都有', value: 'both' },
]
export const tableButtonlocation = [
  { label: '表格上面', value: 'top' },
  { label: '表格下面', value: 'bottom' },
  { label: '上下都有', value: 'both' },
]

export const tableButtonsShowMenu = [
  { label:"显示更多菜单", value:true},
  { label:"全部显示", value:false},
]
export const multiLangShowType = [
  { label:"鼠标悬停显示", value:'hover'},
  { label:"全部显示", value:'all'},
]

export const dialogType = [
  { label:'从左至右', value:'leftToRight'},
  { label:'从右至左', value:'rightToLeft'},
  { label:'从上至下', value:'topToBottom'},
  { label:'从下至上', value:'bottomToTop'},
  { label:'默认弹窗', value:'center'},
]

export const oneLineControl = [
  { label: '一列', value: 1 },
  { label: '两列', value: 2 },
  { label: '三列', value: 3 },
  { label: '四列', value: 4 },
]
