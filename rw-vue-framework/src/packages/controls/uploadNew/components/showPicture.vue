<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { ZoomIn, Delete, Document } from '@element-plus/icons-vue'

// 定义文件类型
type FileType = 'image' | 'video' | 'file' | 'music'

// 定义文件项接口
interface FileItem {
  url?: string
  FileTitle?: string
  FileImageSource?: string
  specType?: boolean | number
  name?: string
  FileID?: string | number
  FileImageDect?: string
  [key: string]: any
}

// 定义组件属性
interface Props {
  fileType?: FileType
  list?: FileItem[]
  imgWidth?: number
  imgHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  fileType: 'image',
  list: () => [],
})

const emits = defineEmits(['deleteList'])

// 计算图片尺寸
const imageSize = computed(() => {
  // 如果没有指定宽度，则使用默认值
  if (!props.imgWidth) {
    return {
      width: 'var(--el-upload-list-picture-card-size, 146px)',
      height: 'var(--el-upload-list-picture-card-size, 146px)'
    }
  }

  // 如果只指定了宽度，高度也使用相同值
  if (props.imgWidth && !props.imgHeight) {
    return {
      width: `${props.imgWidth}px`,
      height: `${props.imgWidth}px`
    }
  }

  // 如果两个都指定了，分别使用
  return {
    width: `${props.imgWidth}px`,
    height: `${props.imgHeight}px`
  }
})

// 响应式数据
const fileList = computed(() => props.list || [])
const visibleShade: Ref<string> = ref('')
const dialogVisible: Ref<boolean> = ref(false)
const dialogImageUrl: Ref<string> = ref('')
const isMounted = ref(false)

// 事件处理函数
const handleMouseEnter = (item: FileItem): void => {
  visibleShade.value = item.url || ''
}

const handleMouseLeave = (): void => {
  visibleShade.value = ''
}

const handlePreviewFile = (item: FileItem): void => {
  dialogVisible.value = true
  dialogImageUrl.value = item.FileImageSource || item.url || ''
}

const handleDeleteFile = (index: number): void => {
  emits('deleteList', index)
  dialogImageUrl.value = ''
}

// 计算属性
const isImageType = computed(() => props.fileType === 'image')
const isVideoType = computed(() => props.fileType === 'video')
const isFileType = computed(
  () => props.fileType === 'file' || props.fileType === 'music',
)

// 工具函数
const getFileExtension = (fileName?: string): string => {
  if (!fileName) return ''
  const parts = fileName.split('.')
  return parts.length > 1 ? parts[parts.length - 1] : ''
}

// 组件挂载后设置标志
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <div class="show-picture-container">
    <ul class="card upload_list" v-if="fileList.length > 0 && isMounted">
      <li
        v-for="(item, index) in fileList"
        :key="item.FileID || item.url"
        class="list_item upload_list_item"
        @mouseenter="handleMouseEnter(item)"
        @mouseleave="handleMouseLeave"
      >
        <!-- 图片显示 -->
        <img
          v-if="isImageType"
          :src="item.url"
          :alt="item.FileTitle || '图片'"
          class="file-preview"
        />

        <!-- 视频显示 -->
        <video
          v-else-if="isVideoType"
          controls
          width="146"
          height="146"
          class="file-preview"
        >
          <source :src="item.url" type="video/mp4" />
          您的浏览器不支持视频播放
        </video>

        <!-- 文件显示 -->
        <div v-else class="file-display">
          <div class="file-icon-container">
            <el-icon class="file-type-icon" :size="40">
              <Document />
            </el-icon>
          </div>
          <div class="file-info">
            <div
              class="file-name"
              :title="item.FileTitle || item.name || '未命名文件'"
            >
              {{ item.FileTitle || item.name || '未命名文件' }}
            </div>
            <div
              class="file-extension"
              v-if="getFileExtension(item.FileTitle || item.name)"
            >
              {{ getFileExtension(item.FileTitle || item.name).toUpperCase() }}
            </div>
          </div>
        </div>

        <!-- 悬浮操作层 -->
        <div class="shade" v-show="visibleShade === item.url">
          <el-icon
            v-if="!item.specType"
            :size="30"
            class="icon preview-icon"
            @click="handlePreviewFile(item)"
            title="预览"
          >
            <ZoomIn />
          </el-icon>
          <el-icon
            :size="30"
            class="icon delete-icon"
            @click="handleDeleteFile(index)"
            title="删除"
          >
            <Delete />
          </el-icon>
        </div>
      </li>
    </ul>

    <!--al览对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :destroy-on-close="true"
      :append-to-body="true"
      :width="isVideoType ? '600px' : '500px'"
      center
      :z-index="2091"
    >
      <div class="dialog-content">
        <el-image
          v-if="isImageType"
          :src="dialogImageUrl"
          alt="预览图片"
          fit="contain"
          class="preview-image"
        />
        <video
          v-else-if="isVideoType"
          controls
          width="500"
          height="400"
          class="preview-video"
        >
          <source :src="dialogImageUrl" type="video/mp4" />
          您的浏览器不支持视频播放
        </video>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.card {
  flex-wrap: wrap;
  margin: 0;
}

.upload_list {
  padding: 0;
  list-style: none;
  display: flex;
  position: relative;
  gap: 8px;

  .list_item {
    overflow: hidden;
    background-color: transparent;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    box-sizing: border-box;
    width: v-bind('imageSize.width');
    height: v-bind('imageSize.height');
    padding: 0;
    display: inline-flex;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--el-color-primary);
      box-shadow: 0 2px 8px color-mix(in srgb, var(--el-color-primary) 20%, transparent);
    }

    .file-preview {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-style: none;
      border-radius: 5px;
    }

    .file-display {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px;
      background: var(--el-fill-color-lighter);
      border-radius: 5px;

      .file-icon-container {
        margin-bottom: 8px;

        .file-type-icon {
          color: var(--el-text-color-regular);
        }
      }

      .file-info {
        text-align: center;
        width: 100%;

        .file-name {
          font-size: 12px;
          color: var(--el-text-color-primary);
          font-weight: 500;
          line-height: 1.2;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }

        .file-extension {
          font-size: 10px;
          color: var(--el-text-color-secondary);
          font-weight: 600;
          background: var(--el-fill-color);
          padding: 2px 6px;
          border-radius: 10px;
          display: inline-block;
          min-width: 20px;
        }
      }
    }

    .shade {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      z-index: 10;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      opacity: 0;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 1;
      }

      .icon {
        margin: 0 8px;
        color: #fff;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        &.preview-icon:hover {
          color: var(--el-color-primary);
        }

        &.delete-icon:hover {
          color: var(--el-color-danger);
        }
      }
    }

    &:hover .shade {
      opacity: 1;
    }
  }

  .upload_list_item {
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
    font-size: 14px;
    color: var(--el-text-color-placeholder);
  }
}

.dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;

  .preview-image {
    max-width: 100%;
    max-height: 70vh;
  }

  .preview-video {
    max-width: 100%;
    border-radius: 4px;
  }
}


@media (max-width: 768px) {
  .upload_list {
    flex-wrap: wrap;

    .list_item {
      width: calc(50% - 4px);
      height: calc(50% - 4px);
      margin-bottom: 8px;
    }
  }

  .dialog-content {
    .preview-video {
      width: 100%;
      height: auto;
    }
  }
}
</style>
