---
title: 自带国际化
---
本框架已经自带国际化支持，由于防止开发人员不按照规范来写，所以在整个项目中，出现语言的地方，基本都已经限定使用 `struct.name+name` 的方式来限制，但一些特殊下的时候，也可以使用 `label` 来处理一些特例。

你的项目使用国际化的时候，请使用以下代码，在你的项目根目录下创建 `i18n` 或者 `locales` 文件夹，在文件夹下创建 index.ts 文件，输入以下内容：

```ts
import { i18n, mergeLocaleMessages, type langInfoI, type langsI } from "rw-vue-framework/locale"
import cn from "./langs/cn"
import en from "./langs/en"
import tw from "./langs/tw"
i18n.global.mergeLocaleMessage("cn", cn)
i18n.global.mergeLocaleMessage("en", en)
i18n.global.mergeLocaleMessage("tw", tw)
export { i18n, mergeLocaleMessage, langInfoI, langsI }
```

然后在该目录下再创建 `langs` 目录创建 `en.json` 和 `zh.json` 文件，然后按照以下代码来使用：

```json
/** 此文件只存放公共部分的文字内容，不存放页面中具体内容，与页面中具体内容不兼用 */
export default {
    APP_TITLE: "项目名称",
    "indexTitle": "控制台首页"
}
```

`APP_TITLE` 为项目名称，请修改成你自己的项目名称，`indexTitle` 为控制台首页的标题，你可以根据自己项目修改成你自己的标题。

在 `pages` 目录中，每个项目下均要求有 `langs` 目录，且每个目录下的 `index.ts` 均为相同的内容：

```ts
import cn from "./cn"
import en from "./en"
import tw from "./tw"
/** 设置语言 */
import { mergeLocaleMessage } from 'rw-vue-framework/locale'
import type { langsI } from 'rw-vue-framework/locale'
const langs: langsI = {
    cn: cn,
    en: en,
    tw: tw
}
import { getModuleNameFromPath } from "@/utils/moduleName"
const moduleName = getModuleNameFromPath(import.meta.url);
mergeLocaleMessage(moduleName, langs)
export { moduleName }
```

`langs` 目录下每一个文件大概是这样：

```ts
import { type langInfoI } from "@/i18n"

const lang: langInfoI = {
    "TITLE": "功能模块标题", // 此处可以为插件名称、菜单项名称、功能模块名称
    "你要加的其他名称": "显示的文字",
}
export default lang
```
