<script lang="ts" setup>
import { RwSegmented } from 'rw-vue-framework/controls'
import { moduleName } from './langs'
import { ref } from 'vue'
import {
  Apple,
  Cherry,
  Grape,
  Orange,
  Pear,
  Watermelon,
} from 'rw-vue-framework/element-plus'

const value = ref('Apple')

const options = [
  {
    label: 'Apple',
    value: 'Apple',
    icon: Apple,
  },
  {
    label: 'Cherry',
    value: 'Cherry',
    icon: Cherry,
  },
  {
    label: 'Grape',
    value: 'Grape',
    icon: Grape,
  },
  {
    label: 'Orange',
    value: 'Orange',
    icon: Orange,
  },
  {
    label: 'Pear',
    value: 'Pear',
    icon: Pear,
  },
  {
    label: 'Watermelon',
    value: 'Watermelon',
    icon: Watermelon,
  },
]

const valueSegmented = RwSegmented.init(moduleName, 'valueSegmented', {
  options: options,
})
</script>

<template>
  <RwSegmented.Template v-model="value" :control="valueSegmented">
    <template #default="{ item }">
      <div class="flex flex-col items-center gap-2 p-2">
        <el-icon size="20">
          <component :is="item.icon" />
        </el-icon>
        <div>{{ item.label }}</div>
      </div>
    </template>
  </RwSegmented.Template>
</template>
