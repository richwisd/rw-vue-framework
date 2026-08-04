
import { pageStruct } from '../../controls'
import { moduleName } from './langs'

import { type SFCWithInstall, withInstall } from "../../utils"
import LocalSetting from './localSetting.vue'

const tableID = 'UserID'
// API接口
const apiURLParam = ''
/** 与数据库表字段一致，或者虚拟表一致即可 */
const struct = pageStruct.init(moduleName, tableID, apiURLParam)
//基础设置
struct.addField("system.dark","tinyint",  { default: false })
struct.addField("system.locale", "varchar",{default:"cn"})
struct.addField("system.size","varchar",{default:"default"})
//消息message
struct.addField("system.message.max","tinyint")
struct.addField("system.message.grouping","tinyint")
struct.addField("system.message.duration","int", {default :3000 })
struct.addField("system.message.showClose","tinyint")
struct.addField("system.message.offset","int",{default: false })
struct.addField("system.message.plain","tinyint")
//按钮button
struct.addField("system.button.type",  "varchar",{default:'default'})
struct.addField("system.button.autoInsertSpace","tinyint")
struct.addField("system.button.plain","tinyint")
struct.addField("system.button.round","tinyint")
//checkbox
struct.addField("system.checkBox","varchar")
//链接link
struct.addField("system.link.type","varchar",{default:"default"})
struct.addField("system.link.underline","tinyint")

//全局页面
struct.addField("system.maxOpenPage","int",{default:10})
struct.addField("layout.layout","varchar", { default: "ltb" })
struct.addField("layout.fullScreen", "tinyint")
struct.addField("layout.backTop", "tinyint",{ default: true })
//smallComponents


struct.addField("smallComponents.dark",  "tinyint",{ default: true })
struct.addField("smallComponents.lang",  "tinyint",{ default: false })
struct.addField("smallComponents.fullScreen",  "tinyint",{ default: true })
struct.addField("smallComponents.size", "tinyint",{ default: true })
struct.addField("smallComponents.tabs", "tinyint",{ default: true })
//page
struct.addField("page.process", "tinyint",{ default: true })
struct.addField("page.transition",  "varchar",{default:'el-fade-in'})
struct.addField("page.waterType",  "varchar",{default:'text'})
struct.addField("page.dialogType",  "varchar",{default:'center'})

//表格设置table
struct.addField("pageTable.showTitle",  "tinyint", {default: true})
struct.addField("pageTable.margin",  "tinyint",{default: 5})
//search
struct.addField("pageTable.search.oneLineControl",  "tinyint")
struct.addField("pageTable.search.mergeStringControl","tinyint")
struct.addField("pageTable.search.stringControlLocation", "varchar", {default:'front'})
struct.addField("pageTable.search.labelPosition",  "varchar", {default:'left'})
struct.addField("pageTable.search.buttonStyle", "varchar",{ default: 'text'})
//table
struct.addField("pageTable.table.deleteConfirmStyle", "varchar", {default: 'bubble'})
struct.addField("pageTable.table.showHeader", "tinyint", {default: true })
struct.addField("pageTable.table.showHeadBgColor", "tinyint", {default: false })
struct.addField("pageTable.table.verticalLine", "tinyint", {default: false })
struct.addField("pageTable.table.horizontalLine",  "tinyint",{ default: true })
struct.addField("pageTable.table.stripe",  "tinyint", {default: true })
struct.addField("pageTable.table.highlightCurrentRow","tinyint", {default: true })
struct.addField("pageTable.table.height",  "varchar",{default:'follow'})
struct.addField("pageTable.table.buttonStyle","varchar",{default: 'text'})
struct.addField("pageTable.table.fit", "tinyint", {default: true })
struct.addField("pageTable.table.fixed",  "varchar",{ default: 'right'})
struct.addField("pageTable.table.showMenu",  "tinyint",{ default: true })
struct.addField("pageTable.table.maxButtons",  "tinyint",{ default: 3 })
//buttons
struct.addField("pageTable.buttons.groupType",  "tinyint",{ default: false })
struct.addField("pageTable.buttons.location",  "varchar", { default: "top" })
struct.addField("pageTable.buttons.buttonStyle",  "varchar",{ default: 'text'})
//pagination
struct.addField("pageTable.pagination.location",  "varchar",{default: 'bottom'})
struct.addField("pageTable.pagination.footerFollow", "varchar",{default:"bottom"})
struct.addField("pageTable.pagination.showBgColor",  "tinyint",{ default: true })

//表单设置form
//pageForm
struct.addField("pageForm.showTitle",  "tinyint", {default: true })
struct.addField("pageForm.margin",  "tinyint",{default: 50})
//form
struct.addField("pageForm.form.gutter",  "tinyint",{ default: 5})
struct.addField("pageForm.form.labelPosition",  "varchar",{ default: 'right'})
struct.addField("pageForm.form.formItemwidth",  "tinyint",{ default: 200})
struct.addField("pageForm.form.oneLineControl",  "tinyint", {default: 4})
//buttons
struct.addField("pageForm.buttons.groupType", "tinyint",{default: false })
struct.addField("pageForm.buttons.location",  "varchar", {default:'center'})
struct.addField("pageForm.buttons.verticalLocation",  "varchar",{ default: 'bottom'})
struct.addField("pageForm.buttons.buttonStyle",  "varchar",{ default: 'button'})
//临时增加
struct.addField("pageForm.autoSaveLocal",  "tinyint",{ default: true })

//pageFormDialog
struct.addField("pageFormDialog.showTitle" , "tinyint", {default: false })
struct.addField("pageFormDialog.margin", "tinyint",{default: 20})
//form
struct.addField("pageFormDialog.form.gutter",  "tinyint",{ default: 5})
struct.addField("pageFormDialog.form.formItemwidth",  "tinyint",{ default: 125})
struct.addField("pageFormDialog.form.labelPosition",  "varchar",{ default: 'right'})
struct.addField("pageFormDialog.form.oneLineControl",  "tinyint",{default: 2 })
//buttons
struct.addField("pageFormDialog.buttons.location",  "varchar", {default:'end'})
struct.addField("pageFormDialog.buttons.verticalLocation",  "varchar",{ default: 'buttom'})
struct.addField("pageFormDialog.buttons.buttonStyle",  "varchar",{ default: 'button'})



export {struct}
export const Template: SFCWithInstall<typeof LocalSetting> = withInstall(LocalSetting)
