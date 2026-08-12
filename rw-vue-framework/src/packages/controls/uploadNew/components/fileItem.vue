<script setup lang="ts">
import {
  Picture as IconPicture,
  Document,
  ZoomIn,
  Select
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, computed, watch, onMounted } from 'vue'
import { type FileData, type MediaTypeT } from '../upload'

// 定义选中文件的接口
interface SelectedFileItem {
  FileID: string | number
  url?: string
  FileImageSource?: string
  name?: string
}

// 组件属性接口
interface Props {
  fileList: FileData[]
  fileType: MediaTypeT
  loading: boolean
  limit: number
}

const props = defineProps<Props>()

// 双向绑定选中的文件
const selectedFile = defineModel<SelectedFileItem[]>('selectedFile', {
  default: () => [],
})

// 响应式数据
const selectedFileIds = ref<(string | number)[]>([])
const visibleShade = ref<string>('')
const dialogVisible = ref<boolean>(false)
const dialogImageUrl = ref<string>('')

// 计算属性
const isImageType = computed(() => props.fileType === 'image')
const isFileType = computed(() => props.fileType === 'file')

const canSelectMore = computed(() => {
  return selectedFile.value.length < props.limit
})

const selectedCount = computed(() => selectedFile.value.length)

// 初始化选中的文件ID列表
const initializeSelectedIds = (): void => {
  if (selectedFile.value && Array.isArray(selectedFile.value)) {
    selectedFileIds.value = selectedFile.value.map((item) => item.FileID)
  }
}

// 检查文件是否已选中
const isFileSelected = (fileId: string | number): boolean => {
  return selectedFileIds.value.includes(fileId)
}

// 点击选择文件
const handleSelectFile = (fileItem: FileData): void => {
  const fileId = fileItem.FileID
  if (!fileId) {
    console.warn('File ID is missing')
    return
  }

  const isSelected = isFileSelected(fileId)

  if (!isSelected) {
    // 添加选择
    // 如果是单选模式（limit为1），直接替换当前选择
    if (props.limit === 1) {
      const newSelectedItem: SelectedFileItem = {
        FileID: fileId,
        url: fileItem.FileImageSource || fileItem.FileImageDect,
        FileImageSource: fileItem.FileImageSource,
        name: fileItem.FileTitle,
      }

      // 清空现有选择，添加新选择
      selectedFile.value = [newSelectedItem]
      selectedFileIds.value = [fileId]
    } else {
      // 多选模式保持原有逻辑
      if (!canSelectMore.value) {
        ElMessage.warning(
          `选择失败，最多可选择${props.limit}个文件，如需选择其他文件，请先删除已选文件`,
        )
        return
      }

      const newSelectedItem: SelectedFileItem = {
        FileID: fileId,
        url: fileItem.FileImageSource || fileItem.FileImageDect,
        FileImageSource: fileItem.FileImageSource,
        name: fileItem.FileTitle,
      }

      selectedFile.value.push(newSelectedItem)
      selectedFileIds.value.push(fileId)
    }
  } else {
    // 移除选择
    const index = selectedFileIds.value.findIndex((id) => id === fileId)
    if (index > -1) {
      selectedFile.value.splice(index, 1)
      selectedFileIds.value.splice(index, 1)
    }
  }
}

// 鼠标悬浮事件
const handleMouseEnter = (item: FileData): void => {
  if (isImageType.value) {
    visibleShade.value = item.FileImageSource || item.FileImageDect || ''
  }
}

const handleMouseLeave = (): void => {
  visibleShade.value = ''
}

// 预览文件
const handlePreviewFile = (item: FileData): void => {
  if (isImageType.value) {
    dialogVisible.value = true
    dialogImageUrl.value = item.FileImageSource || item.FileImageDect || ''
  }
}

// 监听选中文件变化，同步ID列表
watch(
  () => selectedFile.value,
  (newValue) => {
    if (Array.isArray(newValue)) {
      selectedFileIds.value = newValue.map((item) => item.FileID)
    }
  },
  { deep: true },
)

// 组件挂载时初始化
onMounted(() => {
  initializeSelectedIds()
})
</script>
<template>
  <div class="file-item-container" v-if="fileList.length > 0">
    <!-- 图片类型文件展示 -->
    <div v-if="isImageType" class="image-grid">
      <el-row :gutter="20" style="width: 100%">
        <el-col
          :span="4"
          v-for="fileItem in fileList"
          :key="fileItem.FileID"
          class="mb-16px"
        >
          <el-card
            class="file-card"
            :class="{ 'file-card--selected': isFileSelected(fileItem.FileID) }"
            v-loading="loading"
            body-style="padding:2px;position: relative"
            @click="handleSelectFile(fileItem)"
            @mouseenter="handleMouseEnter(fileItem)"
            @mouseleave="handleMouseLeave"
            shadow="hover"
            :title="fileItem.FileTitle"
          >
            <el-image
              :src="fileItem.FileImageDect || fileItem.FileImageSource"
              fit="contain"
              lazy
              class="file-image"
            >
              <template #placeholder>
                <div class="image-placeholder">
                  <el-icon class="loading-icon">
                    <IconPicture />
                  </el-icon>
                </div>
              </template>
              <template #error>
                <div class="image-slot">
                  <el-icon><IconPicture /></el-icon>
                </div>
              </template>
            </el-image>

            <!-- 悬浮预览层 -->
            <div
              class="image-shade"
              v-if="
                visibleShade ===
                (fileItem.FileImageSource || fileItem.FileImageDect)
              "
            >
              <el-icon
                :size="40"
                class="preview-icon"
                @click.stop="handlePreviewFile(fileItem)"
                title="预览"
              >
                <ZoomIn />
              </el-icon>
            </div>

            <!-- 文件名 -->
            <div class="file-name">
              {{ fileItem.FileTitle || '未命名文件' }}
            </div>

            <!-- 选中状态指示器 -->
            <div
              v-if="isFileSelected(fileItem.FileID)"
              class="selected-indicator"
            >
              <el-icon class="check-icon">
                <Select />
              </el-icon>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 文件类型文件展示 -->
    <div v-else class="file-list">
      <div
        v-for="item in fileList"
        :key="item.FileID"
        class="document-item"
        :class="{ 'document-item--selected': isFileSelected(item.FileID) }"
        @click="handleSelectFile(item)"
      >
        <el-icon class="document-icon">
          <Document />
        </el-icon>
        <span class="document-name">
          {{ item.FileTitle || '未命名文件' }}
        </span>
        <div v-if="isFileSelected(item.FileID)" class="document-selected">
          <el-icon class="check-icon">
            <ZoomIn />
          </el-icon>
        </div>
      </div>
    </div>

    <!-- 预览对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :width="'60%'"
      center
      :destroy-on-close="true"
    >
      <div class="preview-container">
        <el-image
          :src="dialogImageUrl"
          alt="预览图片"
          fit="contain"
          class="preview-image"
        />
      </div>
    </el-dialog>

    <!-- 选择状态提示 -->
    <div v-if="selectedCount > 0" class="selection-info">
      已选择 {{ selectedCount }} / {{ limit }} 个文件
    </div>
  </div>
</template>
<style scoped lang="scss">
.file-item-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
}

.image-grid {
  width: 100%;

  .mb-16px {
    margin-bottom: 16px;
  }
}

.file-card {
  width: 100%;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #409eff;
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
    transform: translateY(-2px);
  }

  &--selected {
    border-color: #409eff;
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.25);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(64, 158, 255, 0.1);
      pointer-events: none;
      z-index: 1;
    }
  }
}

.file-image {
  width: 100%;
  height: 120px;
  display: block;
  object-fit: contain;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  background: var(--el-fill-color-lighter);

  .loading-icon {
    font-size: 24px;
    color: var(--el-text-color-placeholder);
    animation: pulse 1.5s ease-in-out infinite;
  }
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);

  .el-icon {
    font-size: 32px;
  }
}

.image-shade {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  .preview-icon {
    color: #fff;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
  }
}

.file-name {
  font-size: 12px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--el-text-color-primary);
  font-weight: 500;
}

.selected-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: #409eff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .check-icon {
    color: #fff;
    font-size: 14px;
  }
}

.file-list {
  width: 100%;
}

.document-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  position: relative;

  &:hover {
    background-color: #f5f7fa;
    border-color: #409eff;

    .document-name {
      color: #409eff;
    }
  }

  &--selected {
    background-color: #ecf5ff;
    border-color: #409eff;

    .document-name {
      color: #409eff;
      font-weight: 500;
    }
  }

  .document-icon {
    margin-right: 12px;
    font-size: 18px;
    color: var(--el-text-color-regular);
  }

  .document-name {
    flex: 1;
    font-size: 14px;
    color: var(--el-text-color-primary);
    transition: color 0.2s ease;
  }

  .document-selected {
    width: 20px;
    height: 20px;
    background: #409eff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .check-icon {
      color: #fff;
      font-size: 12px;
    }
  }
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;

  .preview-image {
    max-width: 100%;
    max-height: 70vh;
    border-radius: 8px;
  }
}

.selection-info {
  margin-top: 16px;
  padding: 8px 12px;
  background: #f0f9ff;
  border: 1px solid #409eff;
  border-radius: 6px;
  color: #409eff;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}


@media (max-width: 768px) {
  .image-grid {
    .el-col {
      width: 50% !important;
      flex: 0 0 50% !important;
      max-width: 50% !important;
    }
  }

  .file-image {
    height: 100px;
  }

  .image-placeholder,
  .image-slot {
    height: 100px;
  }
}

@media (max-width: 480px) {
  .image-grid {
    .el-col {
      width: 100% !important;
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
}

.file-item-container {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a8a8a8;
    }
  }
}
</style>
