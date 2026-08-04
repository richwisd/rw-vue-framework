import { type langInfoI } from "../../../locale";

const lang: langInfoI = {
  "TITLE": "個人化設定",
  "saveToServer": "保存至遠端",
  "getFromServer": "從遠端獲取",
  "resetDefault": "恢復為預設值",

  // 新增的提示語
  "messages": {
    "gettingRemoteConfig": "正在獲取遠端設定...",
    "savingRemoteConfig": "正在保存設定到遠端...",
    "remoteDataEmpty": "遠端數據為空",
    "remoteDataInvalid": "遠端數據結構無效或為空",
    "configMergeFailed": "設定合併失敗",
    "getRemoteConfigSuccess": "遠端設定獲取成功，已更新 {count} 個設定模組",
    "getRemoteConfigFailed": "獲取遠端設定失敗",
    "saveRemoteConfigSuccess": "遠端設定保存成功",
    "saveRemoteConfigFailed": "保存遠端設定失敗",
    "unknownError": "未知錯誤"
  },

  // 四個分頁
  "base": "基礎設定",
  "pageTitle": "全局頁面",
  "table": "表格設定",
  "form": "表單設定",
  // 分隔線
  "searchArea": "搜索區域",
  "tableArea": "表格區",
  "paginationArea": "分頁區",
  // 以下與stores/localSetting匹配
  "systemTitle": "全局基礎",
  "messageTitle": "消息框",
  "buttonType": "按鈕樣式",
  "checkBoxTitle": "單/複選框樣式",
  "linkTitle": "連結樣式",

  // 系统配置
  "system": {
    "dark": "暗黑模式",
    "locale": "顯示語言",
    "langLable": "語言顯示方式",
    "size": "文字大小",
    "message": {
      "max": "最大數量",
      "grouping": "合併相同消息",
      "duration": "顯示時間",
      "showClose": "關閉按鈕",
      "offset": "偏移量",
      "plain": "顯示底色"
    },
    "button": {
      "type": "樣式",
      "autoInsertSpace": "自動間距",
      "plain": "樸素",
      "round": "圓角"
    },
    "checkBox": "單複選框樣式",
    "link": {
      "type": "樣式",
      "underline": "下劃線"
    },
    "maxOpenPage": "最大緩存頁面"
  },

  // 全局页面
  "widgetsSwitch": "頁面小組件",
  "pageResult": "頁面效果",
  "layout": {
    "layout": "布局樣式",
    "fullScreen": "開啟全屏",
    "backTop": "回到頂部"
  },
  "smallComponents": {
    "dark": "暗黑模式",
    "lang": "語言選擇框",
    "fullScreen": "全屏按鈕",
    "size": "大小控件",
    "tabs": "標籤頁"
  },
  "page": {
    "process": "加載進度",
    "transition": "頁面切換動畫效果",
    "waterType": "水印顯示效果",
    "dialogType": "抽屜效果"
  },

  // 表格设置
  "pageTableTitle": "表頭",
  "searchTitle": "搜索區",
  "tableTitle": "表格區",
  "buttonTitle": "操作區",
  "paginationTitle": "分頁",
  "pageTable": {
    "showTitle": "標題",
    "margin": "頁邊距",
    "search": {
      "oneLineControl": "一行顯示控件",
      "mergeStringControl": "合併字符型搜索框",
      "stringControlLocation": "合併搜索框位置",
      "labelPosition": "搜索標籤位置",
      "buttonStyle": "按鈕樣式"
    },
    "table": {
      "deleteConfirmStyle": "刪除確認框樣式",
      "showHeader": "顯示表頭",
      "showHeadBgColor": "顯示表頭背景",
      "verticalLine": "表格豎線",
      "horizontalLine": "橫線",
      "stripe": "斑馬紋",
      "highlightCurrentRow": "當前行高亮",
      "height": "表格高度",
      "buttonStyle": "按鈕樣式",
      "showIndex":"顯示索引",
      "fit": "列寬自適應",
      "fixed": "固定功能區",
      "showMenu": "功能按鈕",
      "multiLangShowType": "多語言顯示類型",
      "maxButtons": "按鈕顯示限制"
    },
    "buttons": {
      "groupType": "按鈕分組",
      "location": "按鈕位置",
      "buttonStyle": "按鈕樣式"
    },
    "pagination": {
      "location": "分頁位置",
      "footerFollow": "底部跟隨",
      "showBgColor": "背景顯示"
    }
  },

  // 表单设置
  "pageForm": {
    "showTitle": "標題",
    "margin": "頁邊距",
    "form": {
      "gutter": "控件邊距",
      "labelPosition": "標籤位置",
      "formItemwidth": "標籤寬度",
      "oneLineControl": "一行顯示控件"
    },
    "buttons": {
      "groupType": "按鈕分組",
      "location": "水平按鈕位置",
      "verticalLocation": "垂直按鈕位置",
      "buttonStyle": "按鈕樣式"
    },
    "autoSaveLocal": "自動保存到本地"
  },
  "pageFormDialog": {
    "showTitle": "標題",
    "margin": "頁邊距",
    "form": {
      "gutter": "控件邊距",
      "formItemwidth": "標籤寬度",
      "labelPosition": "標籤位置",
      "oneLineControl": "一行顯示控件"
    },
    "buttons": {
      "location": "水平按鈕位置",
      "verticalLocation": "垂直按鈕位置",
      "buttonStyle": "按鈕樣式"
    }
  }
};

export default lang;
