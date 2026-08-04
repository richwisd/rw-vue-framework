import  * as  XLSX from "xlsx"
import { saveAs } from 'file-saver'
import type { ColInfo } from "xlsx"
import { http as request } from './http'
import dayjs from "dayjs";

import { t } from '../locale'

export function exportExcel(structName:string,data:Record<string,any>[],columns:any[]){
    const excelData:any[]=[]
    let newLine:string[] = []
    const exportFields = columns.map((item) => {
      return item[Object.keys(item)[1]]
    })

    exportFields.forEach(field=>{
        newLine.push(t(structName+"."+field))
    })
    excelData.push(newLine)
    data.forEach(dataInfo=>{
        newLine=[]
        exportFields.forEach(field=>{
            newLine.push(dataInfo[field])
        })
        excelData.push(newLine)
    })
    const worksheet = XLSX.utils.aoa_to_sheet(excelData); // dataArray是要导出的数据数组
    const workbook = XLSX.utils.book_new();
    worksheet["!cols"]=[]
    exportFields.forEach(field=>{
        const columnInfo=columns.find(columnInfo=>columnInfo.name==field)
        let width=10
        if (columnInfo!=undefined){
            if (columnInfo.width!=undefined){
                width=parseInt(columnInfo.width.toString())
            }
        }
        const colsInfo:ColInfo={wpx:width}
        worksheet["!cols"]&&worksheet["!cols"].push(colsInfo)
    })
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // 'Sheet1'是工作表的名称
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    // XLSX.writeFile(excelBuffer, 'data.xlsx');
    saveAs(dataBlob,t(structName+".TITLE")+"-"+dayjs().format("YYYY-MM-DD")+".xlsx")
}


//处理导出
export const exportExcelAll = (url:string,postData:any,config:any) => {

    request.post(url, postData,config).then(async (res) => {

        const blob = new Blob([res]);
        const fileName = config.title;

        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          // @ts-ignore
        if((navigator as any).msSaveBlob){
          (navigator as any).msSaveBlob(blob, fileName);
        }
        // @ts-ignore
        }


    });

};


