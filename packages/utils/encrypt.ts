import CryptoJS from 'crypto-js'
// import { useAppConfigStore } from '@rw-vue-framework/stores/appConfig';
import { ElMessageBox } from 'element-plus';

import type { JSONValue } from '@rw-vue-framework/constants'

export function rwEncode(data: JSONValue, privateKey = (import.meta as any).env.VITE_PRIVATE_KEY) {
    // console.log(data)
    const dataString = JSON.stringify(data);
    const keyHex = CryptoJS.enc.Utf8.parse(privateKey)
    const options = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
    const Result = CryptoJS.DES.encrypt(dataString, keyHex, options)
    const ResultString = CryptoJS.enc.Base64.stringify(Result.ciphertext)
    return ResultString
}
//解密，与rwFramework对应加解密
export function rwDecode(data: string, privateKey=(import.meta as any).env.VITE_PRIVATE_KEY, showError = true) {
    const keyHex = CryptoJS.enc.Utf8.parse(privateKey)
    const options = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }

    try {
        const Result = CryptoJS.DES.decrypt(data, keyHex, options)
        const ResultString = CryptoJS.enc.Utf8.stringify(Result)
        return JSON.parse(ResultString)
    } catch {
        // useAppConfigStore()
        if (process?.env?.NODE_ENV != 'production' && showError){
            ElMessageBox.alert(data,"返回数据解决出错，原文如下",{
              dangerouslyUseHTMLString:true,
            })
        }
        if(!showError) return data
        return false
    }
}

export const md5 = (sourceString: string | object): string => {
    if (typeof sourceString !== "string") {
      sourceString = JSON.stringify(sourceString);
    }
    const destString = CryptoJS.MD5(sourceString).toString().toUpperCase();
    return destString;
  };
