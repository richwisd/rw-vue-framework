import { ref, Ref, onUnmounted } from 'vue';
import { loadScript } from '@rw-vue-framework/utils';

interface MapOptions {
  mapType: "bmap" | "amap" | "google-map";
  containerId: string; // 地图容器的 ID
  src: string;        // 地图脚本的 URL
  initOptions?: any;   // 地图初始化选项
}

interface MapInstance {
  map: Ref<any>;
  loaded: Ref<boolean>;
}

export function useMap(options: MapOptions): MapInstance {
  const { containerId, src, initOptions } = options;
  const map = ref<any>(null);
  const loaded = ref<boolean>(false);

  // 初始化地图
  const initMap = () => {
    if (!map.value && document.getElementById(containerId)) {
      map.value = new (window as any).BMap.Map(containerId, initOptions);
      loaded.value = true;
    }
  };

  // 加载脚本并初始化地图
  loadScript(src).then(initMap).catch(() => {
    loaded.value = false;
    console.log('地图加载失败');
  });

  // 组件销毁时移除地图实例
  onUnmounted(() => {
    if (map.value) {
      map.value.clearOverlays();
      map.value = null;
    }
  });

  return { map, loaded };
}
