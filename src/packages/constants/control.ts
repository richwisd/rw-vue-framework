/** 定义最小单位内容 */
export type controlBaseTypeT =
  | 'text'
  | 'label'
  | 'divider'
  | 'button'
  | 'dropdown'
  | 'popConfirm'
  | 'null'
  | 'content'
  | 'tag'
  | 'card'
  | 'echarts'
  | 'statistic'
  | 'between'

/** 表示需要绑定数据的控件，以后还会再加，包括自定义组件 */
export type controlInputTypeT =
  | 'switch'
  | 'upload'
  | 'tvVodUpload'
  | 'editor'
  | 'videoplayer'
  | 'select'
  | 'virtualizedSelect'
  | 'input'
  | 'inputNumber'
  | 'time'
  | 'date'
  | 'checkboxInput'
  | 'selectIcon'
  | 'map'
  | 'cascader'
  | 'tag'
  | 'between'

/** 定义其下还有子内容的组件 */
export type controlContainerTypeT = 'tabs' | 'form' | 'buttonGroup'

export type areaT = "form" | "search" | "operateButtons" | "tableButtons" | "tableLine" | "inForm" | "custom"

export type modelT = "add" | "edit" | "info"

export type labelPositionI = "left" | "right" | "top"

export type complexT = "like" | "=" | "<>" | "NOT LIKE" | ">" |">="|"<"|"<="| "FINDIN" | "IN" | "BETWEEN" | "RANGE" | "NULL"
