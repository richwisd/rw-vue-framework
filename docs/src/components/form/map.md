---
outline: deep
title: Map 地图
---

# Map 地图

地图组件，用于地理位置选择，支持百度地图、高德地图、谷歌地图三种类型，可配置中心点、缩放级别与坐标系。

## 引入

```ts
import { RwMap } from 'rw-vue-framework/controls'
```

## 基础用法

```vue
<script setup>
import { RwMap } from 'rw-vue-framework/controls'
const map = RwMap.init('controls', 'location', {
  mapType: 'bmap',
  mapKey: '你的地图密钥'
})
</script>

<template>
  <RwMap.Template :control="map" />
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
type mapTypeT = "bmap" | "amap" | "google-map"  // 百度 | 高德 | 谷歌
type pointTypeT = "WGS-84" | "GCJ-02" | "BD-09"

type OptionT = baseT & {
  mapType: mapTypeT
  src: string                   // script 地址（根据 mapType 自动设置）
  zoom: number | string         // 缩放大小，默认 18
  center: { lng: string | number, lat: string | number }  // 默认北京天安门
  pointType: pointTypeT
  minZoom: number | string
  maxZoom: number | string
  mapKey: string
}
```

## 注意事项

- `mapType` 决定加载的地图 SDK，`src` 会自动设置为对应地图源的脚本地址。
- `mapKey` 必填，需在各地图开放平台申请。
- 默认中心点为北京天安门（116.404, 39.915），缩放级别 18。
