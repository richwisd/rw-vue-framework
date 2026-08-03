<script lang="ts" setup>
import { RwPopconfirm } from 'rw-vue-framework/controls';
import { moduleName } from './langs';
import { ElButton,ElDivider,ElButtonGroup } from 'rw-vue-framework/element-plus';


const popconfirm1 = RwPopconfirm.init(moduleName, 'deletetime', { width: 300 })
console.log('popconfirm1', popconfirm1)
</script>
<template>
  <el-button-group>

<RwPopconfirm.Template :control="popconfirm1" />
<el-button
    style="margin:0 1px; padding: 0 1px;"
    :disabled="true" text>
    <el-divider
    direction="vertical"
    content-position="center"
    >{{ 'yiylr' }}</el-divider>
    </el-button>
    <el-button>Default</el-button>
    <el-divider
    direction="vertical"

    content-position="center"
    >{{ 'yiylr' }}</el-divider>
    <el-button>Default</el-button>
    <el-button>Default</el-button>
<RwPopconfirm.Template :control="popconfirm1" />
</el-button-group>
</template>
