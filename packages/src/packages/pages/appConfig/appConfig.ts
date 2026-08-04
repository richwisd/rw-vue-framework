import { moduleName } from './langs/index'
import { pageStruct } from '../../controls'
import { type SFCWithInstall, withInstall } from "../../utils"
import AppConfig from "./appConfig.vue";
/**
 * moduleName,用于调用接口前缀，后面的具体操作需要具体给出相应名称如Add，del，edit，info等
 */
// const moduleName = "Info"; //仅用于模块标注，在系统中最好唯一，否则语言包会有冲突
// mergeLocaleMessage(moduleName,langs)
const apiURLParam="?p=index&a=index&apiName=System"
/** tableID,表唯一键值，用于列表、修改等操作 */
const tableID = "SiteID";
/** 表ID的值，在运行时需要进行赋值，添加时为0，修改时为行ID，或者调用其他页面的时候，需要带上此值 */
/**
 * 对应表中用到的所有的字段，仅该接口中所用到的表字段，与实际表有所区别，用到的各个接口中的数据结构
 */
const struct=pageStruct.init(moduleName,tableID,apiURLParam);

// struct.apis.add = "/saveAppconfig";

///对应表中用到的所有的字段，仅该接口中所用到的表字段，与实际表有所区别，用到的各个接口中的数据结构
  struct.addField("infoid", "int",)
  struct.addField("title", "varchar",)
  struct.addField("logo", "int",)
  struct.addField("bgImg", "int",)
  struct.addField("showWater", "tinyint",)
  struct.addField("layout.layout", "varchar",)
  struct.addField("layout.paleTheme", "tinyint",)
  struct.addField("layout.userCanChange", "tinyint",)
  struct.addField("showChoiceSites", "tinyint",)
  struct.addField("showAuthCodeLogin", "tinyint",)
  struct.addField("wxLogin", "tinyint",)
  struct.addField("mapKey", "varchar",)

  struct.addField("expiresPostTime", "int",)
  struct.addField("saveLoginDate", "int",)
  struct.addField("checkLoginStatus", "int",)

  struct.addField("support", "varchar",)
  struct.addField("coopyRitht", "varchar",)

  struct.addField("address", "varchar",)
  struct.addField("cascader", "varchar",)

  //
//此行可要可不要，


export  {struct}
 export const Template: SFCWithInstall<typeof AppConfig> = withInstall(AppConfig)
