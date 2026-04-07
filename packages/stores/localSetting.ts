import { useDark, useToggle } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { type StateTree } from 'pinia';
import { type labelPositionI } from '@rw-vue-framework/constants'
import { http as request, rwDecode, rwEncode } from '@rw-vue-framework/utils'

import { type layoutT } from './appConfig'
import { RwButtonGroup } from '@rw-vue-framework/controls'
import elCn from 'element-plus/es/locale/lang/zh-cn'
import elTw from "element-plus/es/locale/lang/zh-tw"
import elEn from "element-plus/es/locale/lang/en"
// 类型
// 定义系统配置相关类型
interface SystemConfig {
  dark: boolean;
  locale: 'cn' | 'en' | 'tw';
  langLable: 'text' | 'icon';
  emptyValues: string;
  valueOnClear: string;
  size: 'default' | 'large' | 'small';
  message: {
    max: number;
    grouping: boolean;
    duration: number;
    showClose: boolean;
    offset: number;
    plain: boolean;
  };
  button: {
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
    autoInsertSpace: boolean;
    plain: boolean;
    round: boolean;
  };
  checkBox: 'default' | 'button';
  link: {
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
    underline: 'always' | 'hover' | 'never' | boolean;
  };
  maxOpenPage: number
}
interface LayoutConfig {
  layout: layoutT;
  fullScreen: boolean;
  backTop: boolean;
}

// 定义完整的 State 接口
export interface LocalSettingState extends StateTree {
  system: SystemConfig;
  layout: LayoutConfig;
  smallComponents: {
    dark: boolean;
    lang: boolean;
    fullScreen: boolean;
    size: boolean;
    tabs: boolean;
  };
  page: {
    process: boolean;
    transition: string;
    waterType: 'text' | 'img';
    dialogType: 'leftToRight' | 'rightToLeft' | 'topToBottom' | 'bottomToTop' | 'center'; // 修正拼写（buttom → bottom）
  };
  pageTable: {
    showTitle: boolean;
    margin: number;
    search: {
      oneLineControl: 4 | 3 | 2 | 1;
      mergeStringControl: boolean;
      stringControlLocation: 'front' | 'end';
      labelPosition: 'left' | 'top'; // 若 labelPositionI 是此类型，可直接用 labelPositionI
      buttonStyle: 'button' | 'text';
    };
    table: {
      deleteConfirmStyle: 'modal' | 'bubble';
      showHeader: boolean;
      showHeadBgColor: boolean;
      verticalLine: boolean;
      horizontalLine: boolean;
      stripe: boolean;
      highlightCurrentRow: boolean;
      height: 'follow' | 'fixed';
      buttonStyle: 'text' | 'button';
      showIndex: boolean;
      fit: boolean;
      fixed: false | 'left' | 'right';
      showMenu: true | false;
      maxButtons: number;
      multiLangShowType: 'all' | 'hover'
    };
    buttons: {
      groupType: false;
      location: 'top' | 'bottom' | 'both';
      buttonStyle: 'text' | 'button';
    };
    pagination: {
      location: 'top' | 'bottom' | 'both';
      footerFollow: 'follow' | 'bottom';
      showBgColor: boolean;
    };
  };
  pageForm: {
    showTitle: boolean;
    margin: number;
    form: {
      gutter: number;
      labelPosition: labelPositionI; // 确保 labelPositionI 类型匹配
      formItemwidth: number;
      oneLineControl: 4 | 3 | 2 | 1;
    };
    buttons: {
      groupType: false;
      location: 'start' | 'center' | 'end';
      verticalLocation: 'top' | 'bottom' | 'both';
      buttonStyle: 'text' | 'button';
    };
    autoSaveLocal: boolean;
  };
  pageFormDialog: {
    showTitle: boolean;
    margin: number;
    form: {
      gutter: number;
      formItemwidth: number;
      labelPosition: labelPositionI;
      oneLineControl: 1 | 2;
    };
    buttons: {
      location: 'start' | 'center' | 'end';
      verticalLocation: 'top' | 'bottom' | 'both';
      buttonStyle: 'text' | 'button';
    };
  };
}


export const useLocalSettingStore = defineStore('localSetting', {
  state: () :LocalSettingState => ({
    system: {
      /** 颜色方案
       * @可选值 `'light'` 明亮模式
       * @可选值 `'dark'` 暗黑模式
       */

      dark: false,
      /**
       * https://element-plus.org/zh-CN/component/config-provider.html，与这个里面的属性相对应，能够加上的，全部加上 */

      /** 系统当前使用的语言 */
      locale: 'cn',
      langLable: 'icon',
      emptyValues: '',
      valueOnClear: '',
      /**
       * Element Plus 组件默认尺寸
       * @默认值 `'default'` 默认
       * @可选值 `'large'` 大号
       * @可选值 `'small'` 小号
       */
      size: 'default',
      message: {
        /**	可同时显示的消息最大数量 */
        max: 1,
        /** 合并内容相同的消息，不支持 VNode 类型的消息*/
        grouping: false,
        /**	显示时间，单位为毫秒。 设为 0 则不会自动关闭 */
        duration: 3000,
        /**是否显示关闭按钮 */
        showClose: true,
        /**Message 距离窗口顶部的偏移量 */
        offset: 0,
        /**是否纯色 */
        plain: false,
      },
      button: {
        /** 'primary' | 'success' | 'warning' | 'danger' | 'info'
         */
        type: 'default',

        /**两个中文字符之间自动插入空格(仅当文本长度为 2 且所有字符均为中文时才生效) */
        autoInsertSpace: false,
        /**是否为朴素按钮 */
        plain: true,

        /**
         * 是否为圆角按钮
         */

        round: false,
      },
      checkBox: 'default',
      link: {
        /** 样式  'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'*/
        type: 'default',
        /**  是否下划线 'always' | 'hover' | 'never' | boolean */
        underline: false,
      },

      // 缓存标签
      maxOpenPage: 10
    },

    /** 全局布局设置 */
    layout: {
      //全局布局
      /**
       * 布局
       * @param ltb 左上下
       * @param tlr 上左右
       * @param tb 上下
       * @param tlmb 上左中下
       * @param ltmb 左上中下
       * @param lr 左右
       */
      layout: 'tlr', //ltb

      /** 开启全屏 */
      fullScreen: false,
      /** 回到顶部按钮显示 */
      backTop: true,
    },
    /** 小组件显示 */
    smallComponents: {
      // /** LOGO显示与不显示 */
      dark: true,
      /** 语言下拉框是否在右上角显示 */
      lang: false,
      /** 全屏按钮是否显示 */
      fullScreen: true,
      // darkMode: true,
      /** 控制大小按钮是否显示 */
      size: true,
      /** 是否显示标签页 */
      tabs: true,
    },
    page: {
      /** 显示加载进度条 */
      process: true,
      /** 加载动画效果，default时可以不显示 ,与https://element-plus.org/zh-CN/guide/transitions.html相同*/
      transition: 'el-fade-in',
      /** 背景显示效果，显示文本或者图片 */
      waterType: 'text',
      dialogType: "center"// center时是dialog

    },
    pageTable: {
      /** 显示表格标题 */
      showTitle: true,
      margin: 5, //后面要加px
      search: {
        /** 一行显示多少列控件,使用滑块 */
        oneLineControl: 4,
        /** 是否合并字符型搜索框 */
        mergeStringControl: true,
        /** 字符型搜索框显示在最前面还是显示在最后面 */
        stringControlLocation:'front',
        /** 搜索标签显示在控件的哪个位置 */
        labelPosition: 'left',
        /** 按钮样式,如果没有使用，使用全局的  */
        buttonStyle: 'button',
      },
      /* 表格页配置信息 */
      table: {
        /** 删除确认框样式 */
        deleteConfirmStyle: 'bubble',
        /** 是否显示表头 */
        showHeader: true,
        /** 显示表头背景 */

        showHeadBgColor: false, //显示表头背景

        /** 表格竖线是否显示 */

        verticalLine: false, //表格的竖线是否显示
        horizontalLine: true, //横线是否显示
        /**  显示班马纹效果 */
        stripe: true, //班马纹

        /** 高亮显示当前行 */
        highlightCurrentRow: true,
        /** 表格高度
         * @param follow 跟随内容
         * @param fixed 固定高度
         */
        height: 'follow',
        /** 右侧按钮样式  */
        buttonStyle: 'text',
        showIndex: true,
        /**  列的宽度是否自撑开,与element plus 中属性相同  */
        fit: true,
        /** 横向表格宽度，
         * @param true 固定功能区至右侧
         * @param false 跟谁内容，可以横向拖动表格
         * 列是否固定在左侧或者右侧。 true 表示固定在左侧
         */
        fixed: 'right', //固定功能区，跟随表格,false，跟随表格，固定左侧侧，固定右侧
        showMenu: true, //如果showMenu等于true则最多显示两个按钮，后面的就显示更多...，在菜单中显示其他项。如果showMenu等于false,则全部使用button
        maxButtons: 3,
        multiLangShowType: 'all'
      },
      buttons: {
        /** 按钮分组 */
        groupType: false,
        /** 功能按钮位置 */
        location: 'top',
        /** 按钮样式  */
        buttonStyle: 'button',
      },
      pagination: {
        /** 分页位置 ,在表格上面、下面、或者是上下都显示*/
        location: 'bottom',
        /** 底部分页跟随表格 */
        footerFollow: 'bottom',
        /** 分页背景 */
        showBgColor: true,
      },
    },
    pageForm: {
      /** 是否显示表单标题 */
      showTitle: true,
      margin: 50, //后面要加px
      form: {
        gutter:5, //formitem 两边留多少空
                /**
         * 表单标签位置，不包括用户自定义的部分
         */
        labelPosition: 'right',
        formItemwidth: 200 ,    // 60-300之间,是foirmItem中的label在formItem里占用的宽度
        /** 一行显示多少列控件,使用滑块 */
        oneLineControl: 2,
      },
      buttons: {
        /** 按钮分组 */
        groupType: false,
        /** 表单按钮位置 */
        location: 'center',
        /**表单提交按钮垂直位置 */
        verticalLocation: 'bottom',
        /** 表单提交按钮效果 */
        buttonStyle: 'button',
      },
      /* 临时增加 */
      autoSaveLocal: true  // 自动保存到本地
    },
    pageFormDialog: {
      /** 是否显示表单标题 */
      showTitle: false,
      margin: 20, //后面要加px
      form: {
        gutter: 5, //formitem 两边留多少空
        formItemwidth: 125 ,     // 60-200之间,是foirmItem中的label在formItem里占用的宽度
        /**
         * 表单标签位置，不包括用户自定义的部分
         */
        labelPosition: 'right',
        /** 一行显示多少列控件,使用滑块 */
        oneLineControl: 2,
      },
      buttons: {
        // /** 按钮分组 */
        // groupType: true,
        /** 表单按钮位置 */
        location: 'end',
        /**表单提交按钮垂直位置 */
        verticalLocation: 'bottom',
        /** 表单提交按钮效果 */
        buttonStyle: 'button',
      },
    },
    isCollapse: false
  }),
  getters: {
    getButtonStyle: (state) => (area: RwButtonGroup.ButtonsAreaT) => {
      switch (area) {
        case 'form':
          return state.pageForm.buttons.buttonStyle
        case 'table':
        case 'operate':
          return state.pageTable.buttons.buttonStyle
        case 'search':
          return state.pageTable.search.buttonStyle
        case 'tableLine':
          return state.pageTable.table.buttonStyle
        default:
          return 'button'
      }
    },
    getPaginationLocation: (state) => (location: string) => {
      if (
        (state.pageTable.pagination.location != 'bottom' &&
          location == 'top') ||
        (state.pageTable.pagination.location != 'top' && location == 'bottom')
      ) {
        return true
      } else {
        return false
      }
    },
    elementPlusLocale:(state)=>()=>{
      switch (state.system.locale){
        case "en":
          return elEn
        case "tw":
          return elTw
        default:
          return elCn
      }
    }
  },
  actions: {

    showTitle(pageModel: string): boolean {
      switch (pageModel) {
        case 'form':
          return this.pageForm.showTitle
        case 'table':
        default:
          return this.pageTable.showTitle
      }
    },
    setValue(key: string, value: any): void {
      // 使用路径设置，避免整个 store 更新
      const keys = key.split('.')
      let current = this as any

      // 导航到父对象
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      // 设置最终值
      current[keys[keys.length - 1]] = value
    },

    isDark() {
      //初始化暗黑模式
      const storeDark = useDark()
      if (storeDark.value != this.system.dark) {
        storeDark.value = this.system.dark
        useToggle(storeDark)
      }
      return storeDark
    },
    reset(){
      this.$reset()
    },
    async getFromRemote(url:string) {
     // '?p=index&a=index&apiName=System/getLocalsetting'
      return await request
        .post(url, {})
        .then((res) => {

          if (res.status == 0) {
            // this.$state = res.data
              this.$patch({
            ...res.data
          });
            ElMessage.success(res.errorMsg)
            return true
          } else {
            ElMessage.error(res.errorMsg)
            return false
          }
        })
    },
    saveToRemote(url:string) {
      const conf = { conf: { ...this.$state } }
      //'?p=index&a=index&apiName=System/saveLocalsetting'
      request
        .post(url, conf)
        .then((res) => {
          if (res.status == 0) {
            ElMessage.success(res.errorMsg)
            return true
          } else {
            ElMessage.error(res.errorMsg)
            return false
          }
        })
    },
    //打开关闭菜单
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
  persist: {
    key: 'localSetting',
    serializer:{
      serialize: (state) => rwEncode(state),
      deserialize: (data) => rwDecode(data),
    },
    storage: localStorage,
  },
})
