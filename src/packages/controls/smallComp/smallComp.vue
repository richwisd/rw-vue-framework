<script lang="ts" setup>
import { useLocalSettingStore } from '../../stores/localSetting';
import screenfull from 'screenfull'
import { computed } from 'vue';
import {localeOptions, t} from "../../locale"
const localSetting = useLocalSettingStore()
const changeSize = (size: any) => {
  localSetting.system.size = size
}
localSetting.layout.fullScreen = false;
screenfull.on("change", () => {
  localSetting.layout.fullScreen = screenfull.isFullscreen
})
const changeLang = (lang: any) => {
  localSetting.system.locale = lang
}
const langTitle = computed(() => {
  return localeOptions.find(item => item.value === localSetting.system.locale)?.label
})
const langImage = computed(() => {
  return localeOptions.find(item => item.value === localSetting.system.locale)?.image
})


</script>
<template>
  <ul class="admin_rightUl">
    <li v-if="localSetting.smallComponents.dark" @click="localSetting.system.dark = !localSetting.system.dark"
      :title="t('buttons.darkMode')">
      <el-icon v-if="localSetting.darkMode">
        <Moon />
      </el-icon>
      <el-icon v-else>
        <Sunny />
      </el-icon>
    </li>
    <li v-if="localSetting.smallComponents.size" style="display: flex;">
      <el-dropdown @command="changeSize" :hide-on-click="false">
        <span class="el-dropdown-link" style="display: flex;">字<el-icon
            class="el-icon--right"><arrow-down /></el-icon></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="large" style="text-align: right;"
              :disabled="localSetting.system.size == 'large'">
              <el-text
                icon="Select">{{ t('buttons.large') }}</el-text><el-icon v-if="localSetting.system.size == 'large'"
                size="large"><Select></Select></el-icon></el-dropdown-item>
            <el-dropdown-item command="default" style="text-align: right;"
              :disabled="localSetting.system.size == 'default'"><el-text align="right"
                size="default">{{ t("buttons.default") }}</el-text><el-icon v-if="localSetting.system.size == 'default'"
                size="default"><Select></Select></el-icon></el-dropdown-item>
            <el-dropdown-item command="small" style="text-align: right;"
              :disabled="localSetting.system.size == 'small'"><el-text align="right"
                size="small">{{ t('buttons.small') }}</el-text><el-icon v-if="localSetting.system.size == 'small'"
                size="small"><Select></Select></el-icon></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </li>
    <li v-if="localSetting.smallComponents.lang" style="display: flex;">
      <el-dropdown @command="changeLang">
       <span class="el-dropdown-link" style="display: flex;"> <img :src="langImage" class="langIcon" /> {{ langTitle }} <el-icon
            class="el-icon--right"><arrow-down /></el-icon></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="locale in localeOptions" :command="locale.value" :key="locale.value" style="text-align: right;"
              :disabled="localSetting.system.locale == locale.value">
              <img :src="locale.image" class="langIcon"/>
              <el-text icon="Select">{{locale.label}}</el-text><el-icon
                v-if="localSetting.system.locale == locale.value"><Select></Select></el-icon>
              </el-dropdown-item>

          </el-dropdown-menu>

        </template>
      </el-dropdown>
    </li>
    <li v-if="localSetting.smallComponents.fullScreen" @click="screenfull.toggle()" :title="t('buttons.fullScreen')">
      <el-icon v-if="localSetting.layout.fullScreen">
        <Connection />
      </el-icon>
      <el-icon v-else>
        <FullScreen />
      </el-icon>
    </li>

  </ul>
</template>
<style scoped>
.langIcon{

  height:16px;
  margin-right: 5px;
}
</style>
