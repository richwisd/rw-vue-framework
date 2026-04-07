<script lang="ts" setup>
import { computed, markRaw } from "vue";
import { OptionT } from "./button"
import { ElButton, ElDivider } from 'element-plus'
import { isComponent, isHTML } from '@rw-vue-framework/utils'
import { storeToRefs } from 'pinia'
import { useLocalSettingStore } from '@rw-vue-framework/stores'
import { t } from "@rw-vue-framework/locale";
const localSettingStore = useLocalSettingStore()
const { system } = storeToRefs(localSettingStore)

const props = defineProps<{ control: Partial<OptionT> }>()

const buttonProps = computed(() => {
  const { default: _default, iconSlot, loadingSlot, suffixIcon, ...rest } = props.control
  return {
    plain: system.value.button.plain,
    round: system.value.button.round,
    ...rest,
  }
})
const label = computed(()=>{
  const { moduleName, name, label } = props.control
  return label ? t(label) : t(`${moduleName}.${name}`)
})

// 优化：将text逻辑提取到计算属性

const emits = defineEmits(["click"])
function onClick(evt: MouseEvent){
  emits("click", props.control)

  // TODO 删除下一行后，会出现单独调用button组件无效的情况，不删除在表格点击时会出现调用两次click的情况。
  // props.control?.click?.(evt)
}
</script>

<template>
<ElButton
  v-bind="buttonProps"
  :class="{ 'separator-class': control.separator }"
  @click.stop="onClick"
>
  <!-- 优先使用外部插槽 -->
  <template v-if="$slots.default" #default>
    <slot name="default"></slot>
  </template>
  <!-- 其次使用control.default配置 -->
  <template v-else-if="control.default" #default>
    <component :is="markRaw(control.default)" v-if="isComponent(control.default) && !isHTML(control.default)" />
    <div v-else-if="typeof control.default === 'string' && isHTML(control.default)" v-html="control.default"></div>
    <span v-else>{{ control.default }}</span>
  </template>

  <!-- 组合分割 -->
   <template v-else-if="control.separator" #default>
    <ElDivider direction="vertical" content-position="center" />
   </template>
  <!-- 最后使用control.name作为默认内容 -->
  <template v-else #default>
    {{ label }}
    <!-- 后缀图标 -->
    <ElIcon v-if="control.suffixIcon" class="el-icon--right">
      <component :is="markRaw(control.suffixIcon)" />
    </ElIcon>
  </template>

  <!-- loading插槽：外部插槽优先 -->
  <template v-if="$slots.loading" #loading>
    <slot name="loading"></slot>
  </template>
  <template v-else-if="control.loadingSlot" #loading>
    <component :is="markRaw(control.loadingSlot)" v-if="isComponent(control.loadingSlot) && !isHTML(control.loadingSlot)" />
    <div v-else-if="typeof control.loadingSlot === 'string' && isHTML(control.loadingSlot)" v-html="control.loadingSlot"></div>
    <span v-else>{{ control.loadingSlot }}</span>
  </template>

  <!-- icon插槽：外部插槽优先 -->
  <template v-if="$slots.icon" #icon>
    <slot name="icon"></slot>
  </template>
  <template v-else-if="control.iconSlot" #icon>
    <component :is="markRaw(control.iconSlot)" v-if="isComponent(control.iconSlot) && !isHTML(control.iconSlot)" />
    <div v-else-if="typeof control.iconSlot === 'string' && isHTML(control.iconSlot)" v-html="control.iconSlot"></div>
    <span v-else>{{ control.iconSlot }}</span>
  </template>
</ElButton>
</template>

<style scoped>
.separator-class{
  margin:0 1px;
  padding: 0 1px;
}
.el-button.is-text {
  padding: 2px 6px !important;
}
.el-button.is-text+.el-button.is-text {
  margin-left: 0;
}
</style>
