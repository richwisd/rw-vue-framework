import {pageStruct} from "rw-vue-framework/controls"
import {moduleName} from "./langs"
/**
 * moduleName,用于调用接口前缀，后面的具体操作需要具体给出相应名称如Add，del，edit，info等
 */

const apiURLFront="?p=index&a=index&apiName=common.site.Users"
/** tableID,表唯一键值，用于列表、修改等操作 */
const tableID = "siteuserid";
// const mTableID="depid";
/** 表ID的值，在运行时需要进行赋值，添加时为0，修改时为行ID，或者调用其他页面的时候，需要带上此值 */
/**
 * 对应表中用到的所有的字段，仅该接口中所用到的表字段，与实际表有所区别，用到的各个接口中的数据结构
 */
const struct=pageStruct.init(moduleName,tableID,apiURLFront);

struct.apis.edit = "/editDirect";

///对应表中用到的所有的字段，仅该接口中所用到的表字段，与实际表有所区别，用到的各个接口中的数据结构
  struct.addField("siteuserid", "int",{})
  struct.addField("siteid", "int", { default: 0 })
  struct.addField("depid", "int", { default: 0 })
  struct.addField("roleid", "int", { default: 0 })
  struct.addField("nickname", "varchar",{length:300})
  struct.addField("realname", "varchar",{length:300})
  struct.addField("userInfo.nickname", "varchar",{length:300})
  struct.addField("userInfo__nickname", "varchar",{length:300})
  struct.addField("depname", "varchar",{length:300})
  struct.addField(["issued_number"],"int",{length:100})
  struct.addField("userInfo__username", "varchar")
  struct.addField("username","varchar", { not_null: true })
  struct.addField("password", "varchar")
  struct.addField("userInfo__usermobile", "varchar", { length: 500 })
  struct.addField("usermobile", "varchar",{length:500})
  struct.addField("userpass", "varchar",{length:500})
  struct.addField("userstatus","varchar")

export default struct
