<script lang="ts" setup>
import { RwCarousel } from 'rw-vue-framework/controls'
import { moduleName } from './langs'

const Carousel1 = RwCarousel.init(moduleName, 'Carousel1', {
  default: [{value:'<span style="margin: 80px"><img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></img></span>'},
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
