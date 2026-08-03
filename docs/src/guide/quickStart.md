---
outline: deep
---
快速开始
===
通过包管理器安装
```bash
npm install rw-vue-framework
```
配置接口前缀,根据你项目的配置，配置.env.development，或者是.env.production
```
VITE_API_URL=http://yourdomain:yourPort/youapiPath/
```

在相应 ts 中加入以下代码
```ts
import { useAppConfigStore } from 'rw-vue-framework/stores'
async getAppConfigFromRemote() {
    const appConfig = useAppConfigStore()
    const getFromRemoteURL = import.meta.env.VITE_API_URL + '获取全局配置接口路径'
    appConfig.getFromRemote(getFromRemoteURL)
}
```
在你的路由中加入以下代码
```ts
getAppConfigFromRemote()
```

在 app.vue 中加入以下代码
```ts
import { useLocalSettingStore } from 'rw-vue-framework/stores'
import { useI18n } from 'vue-i18n'
import { useToggle } from '@vueuse/core'
import Cookies from 'js-cookie'

const localSetting = useLocalSettingStore()
const { locale } = useI18n();
const isDark = localSetting.isDark()
watch(() => localSetting.system.dark, (newValue) => {
  isDark.value = newValue
  useToggle(isDark)
})
// 监听语言变化并同步到 Cookies 和 i18n
if (localSetting.system.locale != Cookies.get("ClientLang")) {
  Cookies.set("ClientLang", localSetting.system.locale)
}

watch(() => localSetting.system.locale, (newLocale) => {
  Cookies.set("ClientLang", newLocale)
  // 更新 Element Plus 语言包
    locale.value=newLocale
})
localSetting.init()
```

```vue
<ElConfigProvider :locale="localSetting.elementPlusLocale()" :size="localSetting.system.size">
</ElConfigProvider>
```

让我们尽情地享用 rw-vue-framework 带给我们的快乐吧
