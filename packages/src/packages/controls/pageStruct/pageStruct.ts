/*** 原系统StructsC的类 */
import * as tableStruct from './tableStruct'
export type subModuleT={
  name:string, //名称，
  title:string,//标题
  rule:string,
  isRouter:boolean
  needRole:boolean
  apiLast: string
}
export type OptionT = {
  name: string
  tableID?: string
  tableType?: tableTypeT,
  apiURLFront?: string
  apis: ApisOPtions
  fields?: tableStruct.OptionT[]
  fieldsMap?: Map<string, tableStruct.OptionT>
  subModules?:subModuleT[]
  menus:string[]   // 菜单
  routers:RouterT[] // 路由
  mTableID?: number|undefined
  mTableIDValue?: number|string
  // 添加菜单
  addMenu:(name:string, children?:string[])=>void
  // 添加路由
  addRouter:(name:string, path:string, component:()=>{}, meta?:string)=>void
  addField: (
    fieldName: string | string[],
    type: tableStruct.mysqlFieldTypeT,
    options?: Partial<tableStruct.OptionT>,
  ) => void
  addSubModule?:(name:string,
    rule:string,
    options:Partial<subModuleT>
  )=>void
  deleteSubModule?:(name:string)=>boolean
}

export type RouterT = {
  name:string,
  path:string,
  component:()=>{},
  meta?:string,
}

export type ApisOPtions = {
  index: string
  info: string
  import: string
  export: string
  downloadURL: string
  add: string
  edit: string
  delete: string
  [key: string]: string
}
export type tableTypeT = 'single' | 'master' | 'slave'

export const init = (
  name: string,
  tableID: string,
  apiURLFront: string,
  options: Partial<OptionT> = {},
): OptionT => {
  const fields: tableStruct.OptionT[] = []
  const fieldsMap: Map<string, tableStruct.OptionT> = new Map()
  const defaultSubModules:subModuleT[]= [
    {name:"add",rule:"edit",title:"buttons.add", apiLast: '',isRouter:true,needRole:true},
    {name:"deleteSelected",rule:"deleteSelected",title:"buttons.deleteSelected", apiLast: '/del',isRouter:false,needRole:true},
    {name:"edit",rule:"edit",title:"buttons.edit" , apiLast: '/info',isRouter:true,needRole:true},
    {name:"delete",rule:"delete",title:"buttons.delete", apiLast: '/del',isRouter:false,needRole:true},
    {name:"import",rule:"import",title:"buttons.import", apiLast: '/import',isRouter:false,needRole:true},
    {name:"export",rule:"export",title:"buttons.export", apiLast: '/export',isRouter:false,needRole:true},
    {name:"getDownloadURL",rule:"export",title:"buttons.getDownloadURL", apiLast: '/getDownloadURL',isRouter:false,needRole:true}, //下载模板
  ]

  const getFieldFN = (fieldName: string): tableStruct.OptionT | undefined => {
    return fields.find((item: tableStruct.OptionT) => item.name == fieldName)
  }
  const self = {
    name,
    tableID,
    apiURLFront,
    fields,
    fieldsMap,
    subModules:defaultSubModules,
    menus:[],   // 菜单
    routers:[], // 路由
    apis: {
      index: '/index',
      info: '/info',
      import: '/import',
      export: '/export',
      downloadURL: '/getDownloadURL',
      add: '/add',
      edit: '/edit',
      delete: '/del',
      ...options.apis,
    },
    tableType: 'single',
    addMenu:(name:string, children?:string[])=>{
      self.menus.push(name)
      if(children !== undefined && children.length > 0){
        self.menus.push(...children)
      }
    },
    addRouter:(name:string, path:string, component:()=>{}, meta?:string)=>{
      self.routers.push({
        name,
        path,
        component,
        meta,
      })
    },
    addField: (
      fieldName: string | string[],
      type: tableStruct.mysqlFieldTypeT,
      fieldOptions: Partial<tableStruct.OptionT> = {},
    ): void => {
      if (Array.isArray(fieldName)) {
        fieldName.forEach((_fileName) => {
          self.addField(_fileName, type, fieldOptions)
        })
      } else {
        let newOptions = { ...fieldOptions }
        if (newOptions.title == undefined) {
          newOptions = { ...newOptions, title: `${name}.${fieldName}` }
        }
        const field = tableStruct.init(fieldName, type, newOptions)
        fields.push(field)
        fieldsMap.set(fieldName, field)
      }
    },
    addSubModule(subModuleName:string,rule:string,options:Partial<subModuleT>={}){
      //上一级的name
      const name=self.name+"_"+subModuleName//这儿还要加上上一级的name
      const title=name+".TITLE"
      self.subModules?.push({
        name,
        title,
        rule,
        apiLast:'',
        isRouter:false,
        needRole:true,
        ...options
      })
    },
    deleteSubModule(name:string):boolean{
      // 通过字段name 删除 值
      const index=self.subModules?.findIndex(item=>item.name==name)
      if(index !== undefined && index > -1){
        self.subModules?.splice(index,1)
        return true
      }
      return false
    },
    getField: getFieldFN,
    findField: getFieldFN,
  } as OptionT
  return self
}
