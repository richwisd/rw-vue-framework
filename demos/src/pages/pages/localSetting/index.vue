<script lang="ts" setup>
  import { RwLocalSetting } from 'rw-vue-framework/pages'
  import type { RemoteSettingData } from 'rw-vue-framework/pages'

  const getSetting = (): Promise<RemoteSettingData> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模拟网络延迟
        const mockData = {
          system: {
            dark: true,
            locale: 'en',
            size: 'default',
            message: {
              max: 5,
              grouping: true,
              duration: 3000,
              showClose: true,
              offset: 20,
              plain: false
            }
          }
        } as RemoteSettingData

        // 模拟随机成功/失败
        const shouldSucceed = Math.random() > 0.1 // 90% 成功率

        if (shouldSucceed) {
          console.log('模拟获取远程配置成功:', mockData)
          resolve(mockData)
        } else {
          console.log('模拟获取远程配置失败')
          reject(new Error('模拟网络错误：无法连接到配置服务器'))
        }
      }, 1000 + Math.random() * 2000) // 1-3秒随机延迟
    })
  }

  const saveSetting = (data: RemoteSettingData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模拟保存操作
        const shouldSucceed = Math.random() > 0.15 // 85% 成功率

        if (shouldSucceed) {
          console.log('模拟保存配置成功:', data)
          resolve({
            success: true,
            message: '配置保存成功',
            timestamp: new Date().toISOString(),
            savedModules: Object.keys(data)
          })
        } else {
          console.log('模拟保存配置失败')
          reject(new Error('模拟保存错误：服务器暂时不可用'))
        }
      }, 800 + Math.random() * 1200) // 0.8-2秒随机延迟
    })
  }
</script>

<template>
  <RwLocalSetting.Template />
</template>

<style lang="scss" scoped>

</style>
