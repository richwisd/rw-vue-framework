<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { t } from '../../locale'
import DialogVue from './components/dialog.vue'
import ShowPicture from './components/showPicture.vue'
import {
  type OptionT,
  type UploadUserFile,
  initFile,
  isEmpty
} from './upload'
import { Plus } from '@element-plus/icons-vue'
import { useFormValue } from '../../hooks'

import {type FrameworkOptions} from '../../constants'

defineOptions({ name: 'RwUploadNew' })

import { inject } from 'vue'

const config = inject('frameworkConfig') as FrameworkOptions

console.log('upload:Upload component received config:', config)

// 组件属性
interface Props {
  control: OptionT
  modelValue?: any  // 添加modelValue属性支持v-model
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
// 表单值管理
const { fieldValue } = useFormValue<OptionT>(
  'RwUpload',
  props.control
)
// console.log('control', props.control, fieldValue.value)
// 响应式数据
const dialogShow = ref(false)
const fileList = ref<UploadUserFile[]>([])
const isLoading = ref(false)

const canUploadMore = computed(() =>
  fileList.value.length < props.control.limit
)

// 支持的文件类型图标映射
const FILE_TYPE_ICONS: Record<string, string> = {
  doc: '/src/assets/image/doc.png',
  docx: '/src/assets/image/doc.png',
  pdf: '/src/assets/image/pdf.png',
  zip: '/src/assets/image/zip.png',
  rar: '/src/assets/image/rar.png',
  xls: '/src/assets/image/xls.png',
  xlsx: '/src/assets/image/xls.png',
  ppt: '/src/assets/image/ppt.png',
  pptx: '/src/assets/image/ppt.png',
}

// 事件处理函数
const handleOpenDialog = (): void => {
  dialogShow.value = true
}

const handleDeleteFile = (index: number): void => {
  if (index < 0 || index >= fileList.value.length) {
    console.warn('Invalid file index:', index)
    return
  }

  fileList.value.splice(index, 1)
  updateFieldValue()
}

// 初始化文件列表
const initializeFileList = async (value: string | number | string[] | number[]): Promise<void> => {
  if (isEmpty(value)) {
    fileList.value = []
    return
  }

  try {
    isLoading.value = true
    const fileId = Array.isArray(value) ? value.join(',') : String(value)

    const response = await initFile({
      apiParam: 'Files/getInitFile',
      FileID: fileId
    }, config?.apiBaseUrl || '/')

    if (!response?.data || response.data.length === 0) {
      fileList.value = []
      fieldValue.value = isEmpty(fieldValue.value) ? '' : fieldValue.value
      return
    }

    fileList.value = response.data.map((item: any): UploadUserFile => {
      const processedItem: UploadUserFile = {
        ...item,
        name: item.FileTitle || '',
        url: '', // 初始化 url 属性
      }

      // 处理文件图标
      const fileName = item.FileTitle || ''
      const fileExtension = fileName.split('.').pop()?.toLowerCase()

      if (fileExtension && FILE_TYPE_ICONS[fileExtension]) {
        processedItem.url = FILE_TYPE_ICONS[fileExtension]
        processedItem.specType = 1
      } else {
        processedItem.url = item.FileImageDect || item.FileImageSource || ''
      }

      return processedItem
    })
  } catch (error) {
    console.error('Failed to initialize file list:', error)
    fileList.value = []
  } finally {
    isLoading.value = false
  }
}

// 更新字段值
const updateFieldValue = (): void => {
  if (fileList.value.length === 0) {
    fieldValue.value = props.control.limit === 1 ? '' : []
    return
  }

  const fileIds = fileList.value
    .map(item => item.FileID)
    .filter(id => id !== undefined)

  if (props.control.limit === 1) {
    fieldValue.value = fileIds[0] || ''
  } else {
    fieldValue.value = fileIds
  }
}

// 监听字段值变化
watch(
  () => fieldValue.value,
  (newValue) => {
    if (newValue !== undefined && newValue !== null) {
      initializeFileList(newValue)
    }
  },
  { immediate: true }
)

// 组件挂载时初始化
onMounted(() => {
  if (!isEmpty(fieldValue.value)) {
    initializeFileList(fieldValue.value)
  }
})
</script>
<template>
  <div class="rw-upload-container">
    <!-- 文件列表显示 -->
    <ShowPicture
      :list="fileList"
      :file-type="control.type"
      :img-width="control.imgWidth"
      :img-height="control.imgHeight"
      @delete-list="handleDeleteFile"
      v-loading="isLoading"
    />

    <!-- 上传触发器 -->
    <div
      v-if="canUploadMore"
      class="upload-trigger"
      @click="handleOpenDialog"
    >
      <div class="upload_wrapper">
        <span v-if="props.control.type === 'file'" :title="t('buttons.uploadFile')" class="upload-icon">
          {{t('buttons.uploadFile')}}
        </span>
        <el-icon v-else :title="t('buttons.uploadImage')" class="upload-icon">
          <Plus />
        </el-icon>
      </div>
    </div>

    <!-- 上传对话框 -->
    <DialogVue
      :control="control"
      v-model:dialog-show="dialogShow"
      v-model:value="fieldValue"
    />
  </div>
</template>
<style lang="scss" scoped>
.rw-upload-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;

  .upload-trigger {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .upload_wrapper {
    width: v-bind('control.imgWidth ? (control.imgHeight ? control.imgWidth + "px" : control.imgWidth + "px") : "var(--el-upload-list-picture-card-size, 148px)"');
    height: v-bind('control.imgWidth ? (control.imgHeight ? control.imgHeight + "px" : control.imgWidth + "px") : "var(--el-upload-list-picture-card-size, 148px)"');
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    background-color: #fafafa;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      color: #409eff;
      border-color: #409eff;
      background-color: #f5f7fa;
    }

    .upload-icon {
      font-size: 28px;
      color: #8c939d;
      transition: color 0.3s ease;
    }

    &:hover .upload-icon {
      color: #409eff;
    }
  }
}

@media (max-width: 768px) {
  .rw-upload-container {
    .upload_wrapper {
      width: 120px;
      height: 120px;
    }
  }
}

.rw-upload-container[v-loading] {
  .upload-trigger {
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>
