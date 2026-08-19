<script setup lang="ts">
import { RwInput } from '../input'
import {  type OptionT } from './map'
import { reactive, ref, nextTick } from 'vue'
import { useAppConfigStore } from '../../stores/appConfig'
import { Search } from '@element-plus/icons-vue'
import { loadScript, gcj02ToBd09, bd09ToGcj02 } from '../../utils'
import { useFormValue } from '../../hooks'
// 地图容器
const mapContainer = ref(null)
const appConfig = useAppConfigStore()
const props = defineProps<{ control: OptionT }>()

const { fieldValue } = useFormValue<OptionT>(
  'RwMap', // 组件名称
  props.control,   // 控件配置
)

const currVal = ref(fieldValue.value)

const inputControl = reactive(
  RwInput.init(props.control.moduleName ?? '', props.control.name, {
    readonly: true,
    label: props.control.label,
  }),
)

// 声明百度地图 ：BMap
let BMap: any = null;
const dialogShow = ref(false)
const map = ref<any>(null)

/* 搜索 */
const searchMap = ref(null as any)
const searchText = ref<string | number>('')
const searchRes = ref([])
// 初始化地图
async function initMap() {
  currVal.value = fieldValue.value
  const mapKey = appConfig.map.key || props.control.mapKey
  if (mapKey == '') return false
  await nextTick()
  if (mapContainer.value) {
    // 加载百度地图API
    (window as any).HOST_TYPE = 2
    let src = ''
    if (props.control.mapType == 'bmap') {
      src = `${props.control.src}&ak=${mapKey}&services=&t=20240108120844` // 百度
    }
    loadScript(src).then(()=> {
      if (props.control.mapType == 'bmap') {
        BMap = (window as any).BMap;
        renderBMap()
      }
    }).catch(()=> {
      console.error('地图 JS 文件加载失败')
    })
  }
}

// 渲染百度地图
function renderBMap() {
  map.value = new BMap.Map(mapContainer.value, {
    enableMapClick: false,
    minZoom: props.control.minZoom,
    maxZoom: props.control.maxZoom,
  })
  if (map.value) {
    let lng = props.control.center.lng
    let lat = props.control.center.lat
    let address: string | number = ''
    if (
      fieldValue.value &&
      Array.isArray(fieldValue.value) &&
      fieldValue.value.length > 0
    ) {
      lng = fieldValue.value[1]
      lat = fieldValue.value[2]
      address = fieldValue.value[0]
    } else if (fieldValue.value && typeof fieldValue.value === 'string') {
      const arr = fieldValue.value.split(',')
      if (arr.length === 2) {
        lng = arr[1]
        lat = arr[0]
      } else if (arr.length === 3) {
        lng = arr[1]
        lat = arr[2]
        address = arr[0]
      }
    }
    if (props.control.pointType === 'GCJ-02') {
      ;[lng, lat] = gcj02ToBd09(Number(lng), Number(lat))
    }
    map.value.centerAndZoom(new BMap.Point(lng, lat), props.control.zoom)
    map.value.enableScrollWheelZoom(true)
    let marker = new BMap.Marker(new BMap.Point(lng, lat))
    map.value.addOverlay(marker)
    if (address) openInfo({ lng: lng, lat: lat }, address)
    // 添加其他百度地图组件或事件监听器
    map.value.addEventListener('click', handleClick)
    marker.addEventListener('click', () => {
      console.log(11)
    })
    searchBMap()
  }
}
// 百度地图搜索
function searchBMap() {
  searchMap.value = new BMap.Autocomplete({
    input: 'inputV',
    location: map.value,
    onSearchComplete: (AutocompleteResult: any) => {
      searchRes.value = AutocompleteResult.as.map((item: any) => {
        return (
          item.province +
          item.city +
          item.district +
          item.street +
          item.business
        )
      })
    },
  })
}
function setPlaceBmap(myValue: string) {
  if (map.value) {
    map.value.clearOverlays() //清除地图上所有覆盖物
    function myFun() {
      const pp = local.getResults().getPoi(0)
      map.value?.centerAndZoom(pp.point, 18)
      map.value?.addOverlay(new BMap.Marker(pp.point)) //添加标注
      // 获取到的地址赋值给输入框
      let currentLng = pp.point.lng
      let currentLat = pp.point.lat
      openInfo(pp.point, pp.address)
      if (props.control.pointType === 'GCJ-02') {
        ;[currentLng, currentLat] = bd09ToGcj02(currentLng, currentLat)
      }
      currVal.value = [pp.address, currentLng, currentLat]
    }
    const local = new BMap.LocalSearch(map.value, {
      //智能搜索
      onSearchComplete: myFun,
    })
    local.search(myValue)
  }
  searchRes.value = []
}

// 地图点击事件
function handleClick(e: any) {
  let currentLng: string | number = '' // 当前经度
  let currentLat: string | number = '' // 当前纬度
  if (props.control.mapType == 'bmap') {
    const point = e.point // 点击位置的点
    currentLng = point.lng
    currentLat = point.lat
    // 使用逆地理编码获取地址
    const geocoder = new BMap.Geocoder()
    geocoder.getLocation(new BMap.Point(currentLng, currentLat), (rs: any) => {
      if (map.value) {
        map.value.clearOverlays()
        let marker = new BMap.Marker(new BMap.Point(currentLng, currentLat))
        map.value.addOverlay(marker)
        openInfo({ lng: currentLng, lat: currentLat }, rs.address)
      }
      // 获取到的地址赋值给输入框
      if (props.control.pointType === 'GCJ-02') {
        ;[currentLng, currentLat] = bd09ToGcj02(
          Number(currentLng),
          Number(currentLat),
        )
      }
      currVal.value = [rs.address, currentLng, currentLat] // `${currentLat},${currentLng}`
    })
  }
}
/* 打开地图信息窗口 */
function openInfo(point: any, address: string | number) {
  var point = new BMap.Point(point.lng, point.lat)
  // 创建点标记
  var marker = new BMap.Marker(point)
  map.value.addOverlay(marker)
  // 创建信息窗口
  var opts = {
    width: 200,
    height: 0,
  }
  var infoWindow = new BMap.InfoWindow(address, opts)
  map.value.openInfoWindow(infoWindow, point)
}

// 打开地图弹窗
function openDialog() {
  dialogShow.value = true
  searchText.value = ''
  initMap()
  document.addEventListener('click', handleClickOutside)
}

/* 取消 */
const cancel = () => {
  dialogShow.value = false
  document.removeEventListener('click', handleClickOutside)
}
/* 确认 */
const comfire = () => {
  dialogShow.value = false
  fieldValue.value = currVal.value
  document.removeEventListener('click', handleClickOutside)
}
/* 隐藏搜索结果 */
function handleClickOutside(event: any) {
  const searchBox = document.getElementById('searchBox')
  if (!searchBox?.contains(event.target)) {
    searchRes.value = []
  }
}
</script>

<template>
  <RwInput.Template
    v-if="fieldValue != null && Array.isArray(fieldValue) && fieldValue.length > 0"
    :control="inputControl"
    @click="openDialog"
    v-model:value="fieldValue"
  />
  <RwInput.Template v-else :control="inputControl" @click="openDialog" />
  <ElDialog
    v-model="dialogShow"
    :draggable="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="search-box" id="searchBox">
      <el-col :span="24">
        <el-input
          style="width: 100%; margin-bottom: 2px"
          id="inputV"
          v-model="searchText"
          clearable
          placeholder="请输入地址进行检索"
          :prefix-icon="Search"
          @clear="searchRes = []"
        />
      </el-col>
      <div id="searchResultPanel">
        <div
          class="list"
          v-for="item in searchRes"
          @click.stop="setPlaceBmap(item)"
          :key="item"
        >
          <el-icon class="el-input__icon" style="margin-right: 10px"
            ><search /></el-icon
          >{{ item }}
        </div>
      </div>
    </div>
    <div ref="mapContainer" class="map-container"></div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="comfire">确认</el-button>
      </div>
    </template>
  </ElDialog>
</template>
<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
.search-box {
  width: 100%;
  position: relative;
}
#searchResultPanel {
  position: absolute;
  top: 33px;
  left: 0;
  width: 100%;
  height: auto;
  background-color: #fff;
  z-index: 1000;
  border: 0.5px solid #eee;
}
.list {
  border-bottom: 0.5px solid #eee;
  padding: 5px 30px 5px 10px;
}
</style>
