<script lang="ts" setup>
import { RwCarousel } from 'rw-vue-framework/controls'
import { moduleName } from './langs'

const Carousel1 = RwCarousel.init(moduleName, 'Carousel1', {
  default: [{value:'<span style="margin: 80px"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMzAwIDE4MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQwOWVmZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzY3YzIzYSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSIzMDAiIGhlaWdodD0iMTgwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCI+56S65L6L5Zu+54mHPC90ZXh0Pjwvc3ZnPg=="></img></span>'},
            {value:'<span style="font-size: 30px; color: #409eff;display: flex;align-items: center;justify-content: center;">2</span>'}],
})

const Carousel2 = RwCarousel.init(moduleName, 'Carousel2', {
  type: 'card',
  motionBlur: true,
  default: [{ value: '<span style="font-size: 30px; color: #409eff;display: flex;align-items: center;justify-content: center;">1</span>'},
            { value: '<span style="text-align: center; font-size: 30px; color: #409eff;display: flex;align-items: center;justify-content: center;">2</span>'},
            { value: '<span style="text-align: center; font-size: 30px; color: #409eff;display: flex;align-items: center;justify-content: center;">3</span>'}],
  autoplay: false,
})
</script>

<template>
  <RwCarousel.Template :control="Carousel1" />
  <RwCarousel.Template :control="Carousel2" />
</template>
