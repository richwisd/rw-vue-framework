import { type baseT } from '../../constants'
import { withInstall,type SFCWithInstall } from '../../utils'
import Map from './map.vue'

export const Template: SFCWithInstall<typeof Map> = withInstall(Map)

export type mapTypeT = "bmap" | "amap" | "google-map" // 地图类型：百度地图|高德地图|谷歌地图

export type pointTypeT = "WGS-84" | "GCJ-02" | "BD-09"

export type OptionT = baseT  & {
  mapType: mapTypeT,
  src: string, // script地址
  zoom: number | string, // 缩放大小
  center: { lng: string | number, lat: string | number } // 地图打开中心点
  pointType: pointTypeT
  minZoom: number | string
  maxZoom: number | string
  mapKey: string
}

// 地图源地址枚举
enum MapSource {
  "bmap" = 'https://api.map.baidu.com/getscript?v=2.0',
  "amap" = 'https://webapi.amap.com/maps?v=1.4.15',
  "google-map" = '//api.map.baidu.com/getscript?v=2.0'
}

export function init(
  moduleName: string,
  name: string,
  options: Partial<OptionT> = {})
{
  options.mapType = options.mapType ?? "bmap"
  options.src = MapSource[options.mapType]

  return {
    moduleName,
    name,
    center: { lng: 116.404, lat: 39.915 },
    zoom: 18,
    mapKey: options?.mapKey ?? '3a1lICj6TgDC7hhl2GAGELEfy7s5jWVu',
    ...options,
    controlType: 'map'
  }
}


