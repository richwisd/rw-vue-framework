import { http as request, rwDecode, rwEncode } from '../utils/'
import { defineStore } from 'pinia'
export type layoutT = 'ltb' | 'tlr' | 'tb' | 'tlmb' | 'ltmb' | 'lr'
export type chalkT = 'blue' | 'red' | 'yellow' | 'green'
export type mapTypeT = 'baidu' | 'tencent' | 'amap' | 'google' | ''
export interface mapI {
  type: mapTypeT
  key: string
}
export interface expiresI {
  /** 管理后台keyword过期时间，如果修改了关键词，可以让用户退出登录重新进入，或者调低这儿的配置 */
  keyword: number //单位秒
  options: number //单位秒
  //重复提交时间，界于5-60之间，默认10，单位秒
  postTime: number
}
export interface loginT {
  /** 保存多少天登录状态,单位为天,为false的进修，0表示关闭浏览器就退出登录 */
  saveLoginDate: number
  /**  单位为分钟,第过多时间检查登录状态，单位为分钟,默认5,如果修改了登录状态，则用户需要重新登录 */
  checkLoginStatus: number
  /** 显示登录验证码 */
  ShowLoginAuthCode: boolean
  /** 退出时是否清理缓存 */
  clearCacheOnExit:boolean

}
export interface layoutI {
  /** 平台初始布局样式，以后有新的效果再加 */
  layout: layoutT
  /** 用户是否允许修改平台布局 */
  userCanChange: boolean
  /** 是否显示灰色主题，主要用于特殊节日时 */
  paleTheme: boolean
  // 主界面颜色
  chalk: chalkT
}
export interface appConfigI {
  /** 平台标题 */
  title: string
  /** 平台logo */
  logo: string
  /** 背景图片 */
  bgImg: string
  support: string
  coopyRight: string
  /** 是否显示水印，如果显示水印的时候，用户只能选择显示图标或者文字，如果不显示，则全部不显示 */
  showWater: boolean
  developerMode: boolean
  /** 是否企业切换框 */
  showChoiceSites: boolean
  layout: layoutI
  login: loginT
  expires: expiresI
  map: mapI
}
export const useAppConfigStore = defineStore('appConfig', {
  state: (): appConfigI => ({
        /** 平台标题 */
    title: '',
    /** 平台logo */
    logo: '',
    bgImg: '',

    /** 是否显示水印，如果显示水印的时候，用户只能选择显示图标或者文字，如果不显示，则全部不显示 */
    showWater: true,
    /** 是否企业切换框 */
    showChoiceSites: false,

    // /** 保存多少天登录状态,单位为天 */
    // saveLoginDate: 14,
    /**  单位为分钟 */
    // checkLoginStatus: 5,


    support: '广州召隆信息技术有限公司',
    coopyRight: 'Copyright 2025',
    developerMode: true, //开发者模式
    /** 平台初始布局样式，以后有新的效果再加 */

    layout: {
      layout: 'ltb',
      /** 用户是否允许修改平台布局 */
      userCanChange: false,
      /** 是否显示灰色主题，主要用于特殊节日时 */
      paleTheme: false,
      // 主界面颜色
      /** 先加上来，后续再加到界面上，用于全局颜色替换，对应https://element-plus.org/zh-CN/guide/theming.html，这里的主题颜色  */
      chalk: 'blue', // 主界面颜色
    },
    login: {
      saveLoginDate: 14,
      /**  单位为分钟 */
      checkLoginStatus: 5,
      /** 显示登录验证码 */
      ShowLoginAuthCode: true,
      /** 重复提交时间，界于5-60之间，默认10，单位秒 */

      clearCacheOnExit:false

    },
    expires: {
      postTime: 10,
      keyword: 5,
      options: 60,
    },


    map: {
      type: "",
      key: ""
    }

    // }
  }),
  getters: {},
  actions: {
    async getFromRemote(url: string) {
      //'?p=index&a=index&apiName=System/getAppconfig'
      return await request
        .post(url, {})
        .then((res) => {
          if (res.status == 0) {
            // this.$state = res.data
            this.$patch({ ...res.data })
            // console.log(this.$state)
            // console.log('获取成功', res.data)
            // retdata = res.data
            return true
          } else {
            return false
          }
        })
    },
    saveToRemote(url: string) {

      request
        .post(url, this.$state)
        .then((res) => {
          if (res.status == 0) {
            return true
          } else {
            return false
          }
        })
    },
    reset() {
      this.$reset()
    },
  },
  persist: {
    key: 'appConfig',
    serializer: {
      serialize: (state) => rwEncode(state),
      deserialize: (data) => rwDecode(data),
    },
    storage: localStorage,
  },
})
