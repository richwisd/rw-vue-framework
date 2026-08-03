---
outline: deep
title: UploadNew 上传
---

# UploadNew 上传

上传组件，扩展自 Element Plus 的 `ElUpload`，支持图片 / 视频 / 音频 / 文件四种媒体类型，可上传到服务器或腾讯云点播（VOD）。

## 引入

```ts
import { RwUpload } from 'rw-vue-framework/controls'
```

## 基础用法

```vue
<script setup>
import { RwUpload } from 'rw-vue-framework/controls'
const upload = RwUpload.init('controls', 'avatar', {
  type: 'image',
  limit: 1
})
</script>

<template>
  <RwUpload.Template :control="upload" />
</template>
```

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  options?: Partial<OptionT>
): OptionT
```

| 参数       | 说明 | 类型 | 默认值 |
| ---------- | ---- | ---- | ------ |
| moduleName | 模块名 | string | - |
| name       | 控件名 | string | - |
| options    | 选项对象 | Partial\<OptionT\> | - |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type MediaTypeT = 'file' | 'image' | 'video' | 'music'
type UploadTypeT = 'server' | 'vos'  // server 上传到服务器，vos 上传到腾讯云点播

interface OptionT extends baseT {
  type: MediaTypeT
  limit: number              // 最大上传数量，默认 1
  width?: number
  debug: boolean             // 是否开启调试
  uploadType: UploadTypeT
  imgHeight?: number
  imgWidth?: number
}
```

### 辅助方法

| 方法名                 | 说明                       |
| ---------------------- | -------------------------- |
| validateUploadLimit    | 校验当前数量是否超限       |
| getUploadAccept        | 根据 MediaTypeT 获取 accept |
| removeUploadedFile     | 删除已上传文件             |

## 注意事项

- `type` 决定 `accept` 与上传行为：`image` → `image/*`，`video` → `video/*`，`music` → `audio/*`，`file` → `*`。
- `uploadType: 'vos'` 时上传至腾讯云点播，需配合相应后端接口。
- `limit` 控制最大可选文件数，超限会自动提示。
