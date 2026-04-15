import { type langInfoI } from "../../../locale"

const lang:langInfoI ={
  "TITLE": "个性化配置",
  "saveToServer": "保存至远端",
  "getFromServer":"从远端获取",
  "resetDefault":"恢复为默认值",

  // 新增的提示语
  "messages": {
    "gettingRemoteConfig": "正在获取远程配置...",
    "savingRemoteConfig": "正在保存配置到远程...",
    "remoteDataEmpty": "远程数据为空",
    "remoteDataInvalid": "远程数据结构无效或为空",
    "configMergeFailed": "配置合并失败",
    "getRemoteConfigSuccess": "远程配置获取成功，已更新 {count} 个配置模块",
    "getRemoteConfigFailed": "获取远程配置失败",
    "saveRemoteConfigSuccess": "远程配置保存成功",
    "saveRemoteConfigFailed": "保存远程配置失败",
    "unknownError": "未知错误"
  },

  //四个分页
  "base":"基础设置",
  "pageTitle":"全局页面",
  "table":"表格设置",
  "form":"表单设置",
  //分隔线
  "searchArea":"搜索区域",
  "tableArea":"表格区",
  "paginationArea":"分页区",
  //以下与stores/localSetting匹配
  "systemTitle":"全局基础",
  "messageTitle":"消息框",
  "buttonType":"按钮样式",
  "checkBoxTitle":"单/复选框样式",
  "linkTitle":"链接样式",

  //系统配置
"system":{
  "dark":"暗黑模式",
    "locale": "显示语言",
    "langLable": "语言显示方式",
    "size": "文字大小",
    "message":{
      "max":"最大数量",
      "grouping":"合并相同消息",
      "duration": "显示时间",
      "showClose": "关闭按钮",
      "offset": "偏移量",
      "plain": "显示底色",
    },
    "button":{
      "type": "样式",
      "autoInsertSpace": "自动间距",
      "plain": "朴素",
      "round": "圆角",
    },
    "checkBox":"单复选框样式",
    "link":{
      "type": "样式",
      "underline": "下划线",
    },
    "maxOpenPage": "最大缓存页面"
},

//全局页面
"widgetsSwitch":"页面小组件",
"pageResult":"页面效果",
"layout": {
  "layout": "布局样式",
  "fullScreen": "开启全屏",
  "backTop":"回到顶部",
},
"smallComponents":{
  "dark":"暗黑模式",
  "lang":"语言选择框",
  "fullScreen":"全屏按钮",
  "size": "大小控件",
  "tabs": "标签页",
},
"page" :{
  "process": "加载进度",
  "transition": "页面切换动画效果",
  "waterType": "水印显示效果",
  "dialogType": "抽屉效果",
},

//表格设置
"pageTableTitle":"表头",
"searchTitle":"搜索区",
"tableTitle":"表格区",
"buttonTitle":"操作区",
"paginationTitle":"分页",
"pageTable":{
  "showTitle":"标题",
  "margin":"页边距",
  "search":{
    "oneLineControl": "一行显示控件",
    "mergeStringControl":"合并字符型搜索框",
    "stringControlLocation": "合并搜索框位置",
    "labelPosition": "搜索标签位置",
    "buttonStyle": "按钮样式",
  },
  "table":{
    "deleteConfirmStyle":"删除确认框样式",
    "showHeader":"显示表头",
    "showHeadBgColor":"显示表头背景",
    "verticalLine":"表格竖线",
    "horizontalLine":"横线",
    "stripe":"班马纹",
    "highlightCurrentRow":"当前行高亮",
    "height":"表格高度",
    "buttonStyle":"按钮样式",
    "showIndex": "显示索引",
    "fit":"列宽自适应",
    "fixed":"固定功能区",
    "showMenu":"功能按钮",
    "multiLangShowType": "多语言显示类型",
    "maxButtons":"按钮显示限制",
  },
  "buttons":{
    "groupType":"按钮分组",
    "location":"按钮位置",
    "buttonStyle":"按钮样式",
  },
  "pagination":{
    "location":"分页位置",
    "footerFollow":"底部跟随",
    "showBgColor":"背景显示",
  },
},

//表单设置
//pageForm
"pageForm":{
  "showTitle":"标题",
  "margin":"页边距",
  "form":{
    "gutter":"控件边距",
    "labelPosition":"标签位置",
    "formItemwidth":"标签宽度",
  "oneLineControl":"一行显示控件",
  },
  "buttons":{
    "groupType":"按钮分组",
    "location":"按钮水平位置",
    "verticalLocation":"按钮垂直位置",
    "buttonStyle":"按钮样式",
  },
  "autoSaveLocal":"自动保存到本地",
},
//pageFormDialog
"pageFormDialogTitle":"弹窗配置",
"pageFormDialog":{
  "showTitle":"标题",
  "margin":"页边距",
  "form":{
    "gutter":"控件边距",
    "formItemwidth":"标签宽度",
    "labelPosition":"标签位置",
  "oneLineControl":"一行显示控件",
  },
  "buttons":{
    "location":"按钮水平位置",
    "verticalLocation":"按钮垂直位置",
    "buttonStyle":"按钮样式",
  },
},

}
export default lang
