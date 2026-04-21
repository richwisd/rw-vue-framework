<script lang="ts" setup>
import { computed, ref, onMounted, nextTick, watch, onUnmounted } from 'vue'
import {  type OptionT } from './input'
import {
  ElInput,
  ElDialog,
  ElForm,
  ElFormItem,
  ElButton,
  ElPopover,
} from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import { useFormValue } from '../../hooks'
import { t, locale, localeOptions } from '../../locale'
import { useLocalSettingStore } from '../../stores'
import { storeToRefs } from 'pinia'

const localSettingStore = useLocalSettingStore()
// 使用 storeToRefs 解构响应式引用
const { system } = storeToRefs(localSettingStore)
// console.log('locale', locale.value)
// 添加modelValue属性，支持v-model绑定
const props = defineProps<{
  control: OptionT
  modelValue?: any // 添加modelValue属性支持v-model
}>()

const inputProps = computed(() => {
  const { ...rest } = props.control
  return rest
})
const emit = defineEmits(['update:modelValue'])

// 内部 ref 管理
const inputRef = ref<InstanceType<typeof ElInput>>()

const dialogVisible = ref(false)

// 添加用于跟踪输入框焦点状态的响应式变量
const isInputFocused = ref(false)

// Popover 宽度管理
const popoverWidth = ref<number | string>('auto')
let resizeObserver: ResizeObserver | null = null

// 更新 Popover 宽度以匹配输入框宽度
const updatePopoverWidth = async () => {
  await nextTick()
  if (inputRef.value?.$el) {
    const inputWidth = inputRef.value.$el.offsetWidth
    popoverWidth.value = inputWidth + 100
  }
}

// 预先计算并设置 popover 宽度
const preCalculatePopoverWidth = async () => {
  await nextTick()
  updatePopoverWidth()
}

// 监听输入框宽度变化，实时更新 popover 宽度
watch(
  () => inputRef.value?.$el,
  (el) => {
    if (el) {
      // 使用 ResizeObserver 监听元素尺寸变化
      if (resizeObserver) {
        resizeObserver.disconnect()
      }

      resizeObserver = new ResizeObserver(() => {
        if (props.control.mutiLang && props.control.langTip) {
          updatePopoverWidth()
        }
      })

      resizeObserver.observe(el)
    }
  },
  { flush: 'post' },
)

const { fieldValue } = useFormValue<OptionT>(
  'RwInput', // 组件名称
  props.control, // 控件配置
)

// 动态生成多语言对象
const createEmptyLangObject = () => {
  const langObj: Record<string, string> = {}
  localeOptions.forEach((option) => {
    langObj[option.value] = ''
  })
  return langObj
}

const formLangs = computed({
  get: () => {
    if (!fieldValue.value) {
      // 如果没有值，返回空的多语言对象
      return createEmptyLangObject()
    }

    try {
      const parsed = JSON.parse(fieldValue.value)
      // 如果解析成功，确保所有已配置的语言都有值
      const langObj: Record<string, string> = {}
      localeOptions.forEach((option) => {
        langObj[option.value] = parsed[option.value] || ''
      })
      return langObj
    } catch {
      // 如果解析失败，说明是普通字符串，使用它作为所有语言的默认值
      const defaultValue = fieldValue.value
      const langObj: Record<string, string> = {}
      localeOptions.forEach((option) => {
        langObj[option.value] = defaultValue
      })
      return langObj
    }
  },
  set: (value) => {
    // console.log('formLangs set:', value)
    fieldValue.value = JSON.stringify(value)
  },
})

const inputValue = computed({
  get: () => {
    const val = props.control.mutiLang
      ? formLangs.value[locale.value]
      : fieldValue.value
    // console.log('inputValue get:', val, 'locale:', locale.value)
    return val || ''
  },
  set: (value) => {
    // console.log('inputValue set:', value, 'locale:', locale.value)
    if (props.control.mutiLang) {
      // 创建新的对象来触发响应式更新
      const newFormLangs = { ...formLangs.value }
      newFormLangs[locale.value] = value
      // 对象遍历
      Object.keys(newFormLangs).map((key) => {
        if (newFormLangs[key] === '') newFormLangs[key] = value
      })
      formLangs.value = newFormLangs
    } else {
      fieldValue.value = value
    }
  },
})

const placeholder = computed(() => {
  const { placeholder, label, moduleName, name, customPlaceholder } =
    props.control
  if (customPlaceholder && placeholder) return placeholder
  if (placeholder) return t(`${moduleName}.${placeholder}`)

  const fieldName = label ?? t(`${moduleName}.${name}`)
  return t('controls.pleaseInput') + fieldName
})
const label = computed(() => {
  const { label, moduleName, name } = props.control
  const fieldName = label ?? t(`${moduleName}.${name}`)
  return fieldName
})

// 事件
const focusFunc = (event: FocusEvent) => {
  // 设置焦点状态为true
  isInputFocused.value = true

  if (props.control?.focus) {
    console.log(props.control?.focus)
    props.control.focus?.(event)
    inputRef.value?.select()
  }
}

// 失去焦点事件处理
const blurFunc = (event: FocusEvent) => {
  // 设置焦点状态为false
  isInputFocused.value = false

  if (props.control?.blur) {
    props.control.blur?.(event)
  }
}

// 创建实例对象
const instance = {
  inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  clear: () => inputRef.value?.clear(),
}

// 组件挂载后调用回调函数
onMounted(() => {
  if (props.control.onMounted) {
    props.control.onMounted(instance)
  }

  // 组件挂载后预先计算宽度
  preCalculatePopoverWidth()
})

// 组件卸载时清理 ResizeObserver
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

// 多语言相关
const confirm = () => {
  dialogVisible.value = false
  // 赋值
  fieldValue.value = JSON.stringify(formLangs.value)
}

// 动态为每个语言创建独立的计算属性
const langValues = computed(() => {
  const values: Record<string, any> = {}
  localeOptions.forEach((option) => {
    values[option.value] = computed({
      get: () => formLangs.value[option.value] || '',
      set: (value) => {
        const newFormLangs = { ...formLangs.value }
        newFormLangs[option.value] = value
        formLangs.value = newFormLangs
      },
    })
  })
  return values
})

// 暴露组件实例和方法给父组件
defineExpose(instance)
</script>

<template>
  <div class="minput-box" style="width: 100%">
    <ElInput
      v-bind="inputProps"
      :placeholder="placeholder"
      v-model="inputValue"
      :class="{
        langsTextarea: control.type === 'textarea' && control.mutiLang,
      }"
      ref="inputRef"
      @change="(val: string) => control.change?.(val)"
      @focus="(event: FocusEvent) => focusFunc(event)"
      @blur="(event: FocusEvent) => blurFunc(event)"
      @input="(val: string) => control.input?.(val)"
      @clear="(event?: MouseEvent) => control.clear?.(event)"
      @mouseenter="(event: MouseEvent) => control.mouseenter?.(event)"
      @mouseleave="(event: MouseEvent) => control.mouseleave?.(event)"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-else-if="control?.prefix" #prefix>
        <component
          :is="control.prefix"
          v-if="isComponent(control.prefix) && !isHTML(control.prefix)"
        />
        <div
          v-else-if="
            typeof control.prefix === 'string' && isHTML(control.prefix)
          "
          v-html="control.prefix"
        ></div>
        <span v-else>{{ control.prefix }}</span>
      </template>

      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix"></slot>
      </template>
      <template v-else-if="control?.suffix" #suffix>
        <component
          :is="control.suffix"
          v-if="isComponent(control.suffix) && !isHTML(control.suffix)"
        />
        <div
          v-else-if="
            typeof control.suffix === 'string' && isHTML(control.suffix)
          "
          v-html="control.suffix"
        ></div>
        <span v-else>{{ control.suffix }}</span>
      </template>

      <template v-if="$slots.prepend" #prepend>
        <slot name="prepend"></slot>
      </template>
      <template v-else-if="control?.prepend" #prepend>
        <component
          :is="control.prepend"
          v-if="isComponent(control.prepend) && !isHTML(control.prepend)"
        />
        <div
          v-else-if="
            typeof control.prepend === 'string' && isHTML(control.prepend)
          "
          v-html="control.prepend"
        ></div>
        <span v-else>{{ control.prepend }}</span>
      </template>

      <template v-if="control.mutiLang && control.langTip" #append>
        <el-popover
          class="box-item lang-popover"
          placement="bottom-end"
          :width="popoverWidth"
          trigger="click"
          :hide-after="0"
          :transition="'el-fade-in-linear'"
          :popper-options="{
            modifiers: [
              {
                name: 'eventListeners',
                options: {
                  scroll: false,
                  resize: false,
                },
              },
            ],
          }"
        >
          <template #default>
            <div @click.stop>
              <el-form
                class="langs-form"
                label-position="right"
                label-width="auto"
              >
                <el-form-item
                  v-for="option in localeOptions"
                  :key="option.value"
                >
                  <el-input
                    v-bind="inputProps"
                    v-model="langValues[option.value].value"
                    :placeholder="t('controls.pleaseInput') + option.label"
                  >
                    <template
                      v-if="
                        control.langLable === 'text' ||
                        system.langLable === 'text'
                      "
                      #prepend
                      >{{ option.label }}</template
                    >
                    <template v-else #prepend>
                      <img
                        :src="option.image"
                        class="langIcon"
                        :alt="option.label"
                      />
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </template>
          <template #reference>
            <el-button>langs</el-button>
          </template>
        </el-popover>
      </template>
      <template v-else-if="control.mutiLang" #append>
        <el-button @click="dialogVisible = true">langs</el-button>
      </template>
      <template v-else-if="$slots.append" #append>
        <slot name="append"></slot>
      </template>
      <template v-else-if="control?.append" #append>
        <component
          :is="control.append"
          v-if="isComponent(control.append) && !isHTML(control.append)"
        />
        <div
          v-else-if="
            typeof control.append === 'string' && isHTML(control.append)
          "
          v-html="control.append"
        ></div>
        <span v-else>{{ control.append }}</span>
      </template>
    </ElInput>
    <ElButton
      class="showLangsTextarea"
      :class="{ 'input-focused': isInputFocused }"
      v-if="control.type === 'textarea' && control.mutiLang"
      @click="dialogVisible = true"
      >langs</ElButton
    >
  </div>
  <ElDialog
    v-if="control.mutiLang"
    v-model="dialogVisible"
    :title="label + ` （${t('langs.mutilans')}）`"
    width="500"
    class="muti-lang-dialog"
    :append-to-body="true"
    draggable
  >
    <el-form class="langs-form" label-position="right" label-width="auto">
      <el-form-item v-for="option in localeOptions" :key="option.value"
        :label-position="control.type === 'textarea' && control.mutiLang ? 'top' : 'right'"
        :label="control.type === 'textarea' && control.mutiLang ? option.label : ''"
      >
        <template #label v-if="control.type === 'textarea' && control.mutiLang">
          <span v-if="control.langLable === 'text' || system.langLable === 'text'">{{ option.label }}</span>
          <img v-else :src="option.image" class="langIcon" :alt="option.label" />
        </template>
        <div class="lang-form-item">
          <el-input
            v-bind="inputProps"
            :class="{
              langsTextarea: control.type === 'textarea' && control.mutiLang,
            }"
            v-model="langValues[option.value].value"
            :placeholder="t('controls.pleaseInput') + option.label"
          >
            <template
              v-if="control.langLable === 'text' || system.langLable === 'text'"
              #prepend
              >{{ option.label }}</template
            >
            <template v-else #prepend>
              <img :src="option.image" class="langIcon" :alt="option.label" />
            </template>
          </el-input>
        </div>
      </el-form-item>
    </el-form>
    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">{{
          label + ` （${t('langs.mutilans')}）`
        }}</span>
      </div>
    </template>
  </ElDialog>
</template>

<style lang="scss">
.minput-box {
  width: 100%;
  position: relative;
  .showLangsTextarea {
    position: absolute;
    top: 1px;
    right: 1px;
    background-color: #f5f7fa;
    & span {
      color: #909399;
    }

    // 添加焦点状态下的半透明样式
    &.input-focused {
      opacity: 0.3;
    }
  }
}

.muti-lang-dialog {
  .dialog-header {
    display: flex;
    justify-content: space-between;
    .dialog-title {
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.langs-form {
  .lang-form-item {
    width: 100%;
    position: relative;
    .showLangsTextarea {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #f5f7fa;
      & span {
        color: #909399;
      }

    }
  }
  .el-form-item {
    margin-bottom: 18px !important;
  }

  .el-form-item:last-child {
    margin-bottom: 0 !important;
  }
}

// Popover 过渡效果优化
.lang-popover {
  .el-popper {
    transition: width 0.2s ease-in-out !important;
  }
}

.langIcon {
  height: 16px;
  margin-right: 5px;
}

// Element Plus Popover 过渡优化
.el-popper.is-light {
  transition: all 0.2s ease-in-out !important;
}

// 添加全局样式来提高dialog的z-index
:deep(.muti-lang-dialog) {
  .el-dialog__wrapper {
    z-index: 2050 !important;
  }

  .el-dialog {
    z-index: 2051 !important;
  }
}
</style>
