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
```json
VITE_API_URL=http://yourdomain:yourPort/youapiPath/
```

在相应ts中加入以下代码
```typescript
import { useAppConfigStore } from '@rw-vue-framework/stores'
async getAppConfigFromRemote() {
    const appConfig = useAppConfigStore()
    const getFromRemoteURL = import.meta.env.VITE_API_URL + '获取全局配置接口路径'
    appConfig.getFromRemote(getFromRemoteURL)
}
```
在你的路由中加入以下代码
```typescript
getAppConfigFromRemote()
```

在app.vue中加入以下代码
```typescript
import { useLocalSettingStore } from '@rw-vue-framework/stores'
const localSetting = useLocalSettingStore()
const { locale } = useI18n();
const localSetting = useLocalSettingStore()
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

让我们尽情地享用rw-vue-framework带给我们的快乐吧
