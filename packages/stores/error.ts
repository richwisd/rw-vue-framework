import { defineStore } from 'pinia'
import { ComponentPublicInstance } from 'vue'
 interface errorStateI{
  err:unknown
  instance:ComponentPublicInstance | null,
  info:string
  

}
export const useErrorStore = defineStore('error', {
  state: ():errorStateI  => ({
    err:"",
    instance:null,
    info:""
  })
})
