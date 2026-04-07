import { defineStore } from 'pinia'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
import { reactive } from 'vue'
import { http as request, rwDecode, rwEncode } from '@rw-vue-framework/utils'
import { ElMessage } from 'element-plus'

interface columnsI {
  [key: string]: Array<string>
}
export const useColumnsSettingStore = defineStore(
  'columnsSetting',
  () => {
    let columns = reactive<columnsI>({})

     // 表格排序
     let tableOrderColumns = reactive<any>({})

     // 字段顺序
     let fieldsOrder = reactive<any>({})

     // 设置字段顺序
     function setFieldsOrder(moduleName:string,fieldsOrderArr:any){
         fieldsOrder[moduleName] = fieldsOrderArr
     }

     function setOrderColumns(moduleName:string,orderColumns:any[]){
         tableOrderColumns[moduleName] = orderColumns;
     }

     function clearColumns(moduleName:string){
         columns[moduleName]=[]
     }

     function getColumns() : columnsI{
         return columns;
     }

    function isChecked(moduleName: string, fieldName: string): boolean {
      if (columns[moduleName] == undefined) return true
      if (columns[moduleName].includes(fieldName)) {
        return false
      } else {
        return true
      }
    }
    function setItem(
      moduleName: string,
      fieldName: string,
      checked: boolean
    ) {
      if (checked) {
        if (columns[moduleName] == undefined) {
          columns[moduleName] = []
        }
        const findIndex = columns[moduleName].findIndex(
          (model) => model == fieldName
        )
        if (findIndex == -1) {
          columns[moduleName].push(fieldName)
        }
      } else {
        if (columns[moduleName] == undefined) return false
        const findIndex = columns[moduleName].findIndex(
          (model) => model == fieldName
        )
        columns[moduleName].splice(findIndex, 1)
      }
      return true;
    }
    async function getFromRemote() {
      // 为 conf 对象添加 field 属性的类型定义
      const conf: { field: string } = {
        field: '',
      }
      conf.field = 'showcolumns'
      return request
        .post('?p=index&a=index&apiName=System/getLocalsetting', conf)
        .then((res) => {
          if (res.status == 0) {
            if (res.data) {
              for (const index in res.data) {
                const element = res.data[index]
                columns[index].splice(0, columns[index].length)
                columns[index].push(...element)
              }
            } else {
              columns = {}
            }
            ElMessage.success(res.errorMsg)
            return true
          } else {
            ElMessage.error(res.errorMsg)
            return false
          }
        })
    }
    function saveToRemote() {
      // 为 conf 对象添加 field 属性的类型定义
      const conf: { conf: { [x: string]: string[]; }; field: string } = {
        conf: { ...columns },
        field: 'showcolumns'
      };
      request
        .post('?p=index&a=index&apiName=System/saveLocalsetting', conf)
        .then((res) => {
          if (res.status == 0) {
            ElMessage.success(res.errorMsg);
            return true;
          } else {
            ElMessage.error(res.errorMsg);
            return false;
          }
        });
    }

    return {columns,isChecked,setItem,getFromRemote,saveToRemote,clearColumns,getColumns, tableOrderColumns, setOrderColumns, fieldsOrder, setFieldsOrder}
  },
  {
    persist: {
      key: 'columnsSetting',
      storage: localStorage,
      pick:["columns", "fieldsOrder"],
      serializer: {
        serialize: (state:any) => rwEncode(state),
        deserialize: (data: any) => rwDecode(data),
      },
    } as PersistenceOptions
  }
)
