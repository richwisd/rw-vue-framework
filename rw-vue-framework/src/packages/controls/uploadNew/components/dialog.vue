<script setup lang="ts">
import {
  ElButton,
  ElCol,
  ElDialog,
  ElInput,
  ElMessage,
  ElRadio,
  ElRadioGroup,
  ElTabPane,
  ElTabs,
  ElUpload,
  ElImage,
  ElIcon,
  type UploadFiles,
  type UploadProgressEvent,
  type UploadRequestOptions,
} from 'element-plus'
import {
  Picture,
  VideoPlay,
  Iphone,
  Document,
  Delete,
  UploadFilled,
  Check,
  Loading,
} from '@element-plus/icons-vue'
import { type FrameworkOptions  } from '../../../constants/'
import { ref, watch, reactive, computed, inject } from 'vue'
import { t } from '../../../locale'
import FileItem from './fileItem.vue'
import Cookies from 'js-cookie'
import { http } from '../../../utils'
import axios, { type AxiosResponse } from 'axios'
import {
  type OptionT,
  type UploadFile,
  type FileData,
  getUploadAccept,
} from '../upload'
import { RwPagination } from '../../pagination'

const config = inject('frameworkConfig') as FrameworkOptions

console.log('dialog:Upload component received config:', config)

// 使用统一的类型定义
interface UploadResponse {
  status: number
  data: FileData
}

interface SearchParams {
  FileType: string
  FileModel: number
  searchVal: string
  pageSize: number
  page: number
}

// 组件属性
interface Props {
  control: OptionT
}

const props = defineProps<Props>()

// 双向绑定
const fieldValue = defineModel<number | number[] | string | string[]>('value')
const dialogShow = defineModel<boolean>('dialogShow', { required: true })

// 响应式数据
const activeName = ref<'uploadFile' | 'selectFile'>('uploadFile')
const searchType = ref<0 | 1>(1) // 0我的文件，1企业文件
const keyword = ref('')
const rwFileList = ref<FileData[]>([])
const fileList = ref<UploadFile[]>([])
const fileLoading = ref(false)
const successUploadList = ref<FileData[]>([])
const uploadInfo = ref<Partial<UploadFile>>({})
const pagination = reactive(RwPagination.init(''))

// 文件映射表：用于跟踪 uploadFile.uid 和 FileID 的关系
const fileMapping = ref<Map<number, string | number>>(new Map())

// 上传进度跟踪
interface UploadProgress {
  uid: number
  name: string
  percent: number
  status: 'uploading' | 'success' | 'error'
  size?: number
  fadeOut?: boolean
}

const uploadingFiles = ref<Map<number, UploadProgress>>(new Map())

// 计算属性
const uploadAccept = computed(() => getUploadAccept(props.control.type))

const canUpload = computed(() => {
  // 使用 successUploadList 来计算当前已上传的文件数量
  const currentCount = successUploadList.value.length
  return currentCount < props.control.limit
})

// 计算剩余可上传文件数量
const remainingUploadCount = computed(() => {
  return Math.max(0, props.control.limit - successUploadList.value.length)
})

const uploadLimitMessage = computed(
  () =>
    `上传失败，最多选择${props.control.limit}个文件。如已选择其他文件，请先删除`,
)

// 文件列表加载
const loadFileList = async (): Promise<void> => {
  try {
    fileLoading.value = true

    const searchParams: SearchParams = {
      FileType: props.control.type,
      FileModel: searchType.value,
      searchVal: keyword.value,
      pageSize: pagination.pageSize,
      page: pagination.page,
    }

    const response = await http.post(config?.apiBaseUrl + '?p=Files&a=getFileList', searchParams)

    if (response.status === 0) {
      rwFileList.value = response.data.rows || []
      pagination.total = response.data.total || 0
    } else {
      console.error('Failed to load file list:', response)
      rwFileList.value = []
    }
  } catch (error) {
    console.error('Error loading file list:', error)
    rwFileList.value = []
    ElMessage.error('加载文件列表失败')
  } finally {
    fileLoading.value = false
  }
}

// 上传前验证
const handleBeforeUpload = (rawFile: File): boolean => {
  if (props.control.debug) {
    console.log('before-upload:', rawFile)
    console.log('Current success upload count:', successUploadList.value.length)
    console.log('Upload limit:', props.control.limit)
  }

  // 检查当前已上传文件数量 + 准备上传的文件数量是否超过限制
  const currentUploadCount = successUploadList.value.length
  if (currentUploadCount >= props.control.limit) {
    ElMessage.error(uploadLimitMessage.value)
    return false
  }

  // 检查文件类型
  if (props.control.type === 'image' && !rawFile.type.startsWith('image/')) {
    ElMessage.error('只能上传图片文件')
    return false
  }

  if (props.control.type === 'video' && !rawFile.type.startsWith('video/')) {
    ElMessage.error('只能上传视频文件')
    return false
  }

  if (props.control.type === 'music' && !rawFile.type.startsWith('audio/')) {
    ElMessage.error('只能上传音频文件')
    return false
  }

  return true
}

// 开始上传时添加到进度跟踪
const handleUploadStart = (file: UploadFile): void => {
  if (file.uid) {
    const uploadProgress: UploadProgress = {
      uid: file.uid,
      name: file.name,
      percent: 0,
      status: 'uploading',
      size: file.size,
    }
    uploadingFiles.value.set(file.uid, uploadProgress)

    if (props.control.debug) {
      console.log('Upload started for file:', uploadProgress)
    }
  }
}

// 更新上传进度
const updateUploadProgress = (uid: number, percent: number): void => {
  const uploadProgress = uploadingFiles.value.get(uid)
  if (uploadProgress) {
    uploadProgress.percent = percent
    uploadingFiles.value.set(uid, uploadProgress)
  }
}

// 上传数量超限处理
const handleUploadExceed = (): void => {
  ElMessage.error(uploadLimitMessage.value)
}

// 自定义上传方法
const handleUpload = async (options: UploadRequestOptions): Promise<void> => {
  const { file, onProgress, onSuccess, onError } = options

  // 从 fileList 中找到对应的文件以获取 uid
  const uploadFile = fileList.value.find((f) => f.raw === file)
  const uid = uploadFile?.uid

  // 初始化上传进度跟踪
  if (uid) {
    handleUploadStart({
      uid,
      name: file.name,
      size: file.size,
    } as UploadFile)
  }

  try {
    const formData = new FormData()
    formData.append('rwUploadFile', file)
    formData.append('FileType', props.control.type)
    formData.append('UserType', '0')

    const cookieId = Cookies.get('rwCookieID')
    if (cookieId) {
      formData.append('rwCookieID', cookieId)
    }

    if (props.control.debug) {
      const debugObj: Record<string, any> = {}
      for (const [key, value] of formData.entries()) {
        debugObj[key] = value
      }
      console.log('Upload data:', debugObj)
      console.log(
        'Upload API:',
        // `${import.meta.env.VITE_API_URL}?p=files&a=uploadFile`,
        `${config?.apiBaseUrl}?p=files&a=uploadFile`,
      )
    }

    const response: AxiosResponse<UploadResponse> = await axios.post(
      // `${import.meta.env.VITE_API_URL}?p=files&a=uploadFile`,
      `${config?.apiBaseUrl}?p=files&a=uploadFile`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            )

            // 更新进度条
            if (uid) {
              updateUploadProgress(uid, percent)
            }

            onProgress({ percent } as UploadProgressEvent)
          }
        },
      },
    )

    if (response.data.status === 0) {
      // 标记上传成功
      if (uid) {
        const uploadProgress = uploadingFiles.value.get(uid)
        if (uploadProgress) {
          uploadProgress.status = 'success'
          uploadProgress.percent = 100
          uploadingFiles.value.set(uid, uploadProgress)
        }
      }

      onSuccess(response.data)
    } else {
      // 标记上传失败
      if (uid) {
        const uploadProgress = uploadingFiles.value.get(uid)
        if (uploadProgress) {
          uploadProgress.status = 'error'
          uploadingFiles.value.set(uid, uploadProgress)
        }
      }

      const uploadError = {
        status: response.status,
        method: 'POST',
        // url: `${import.meta.env.VITE_API_URL}?p=files&a=uploadFile`,
        url: `${config?.apiBaseUrl}?p=files&a=uploadFile`,
        message: 'Upload failed',
      }
      onError(uploadError as any)
    }
  } catch (error) {
    console.error('Upload error:', error)

    // 标记上传失败
    if (uid) {
      const uploadProgress = uploadingFiles.value.get(uid)
      if (uploadProgress) {
        uploadProgress.status = 'error'
        uploadingFiles.value.set(uid, uploadProgress)
      }
    }

    const uploadError = {
      status: 0,
      method: 'POST',
      // url: `${import.meta.env.VITE_API_URL}?p=files&a=uploadFile`,
      url: `${config?.apiBaseUrl}?p=files&a=uploadFile`,
      message: error instanceof Error ? error.message : 'Upload failed',
    }
    onError(uploadError as any)
  }
}

// 上传成功处理
const handleUploadSuccess = (
  response: UploadResponse,
  file: UploadFile,
): void => {
  if (props.control.debug) {
    console.log('Upload success response:', response)
    console.log('Upload file:', file)
  }

  if (response?.data) {
    const fileData = response.data
    const uploadedFile: FileData = {
      ...fileData,
      FileTitle: fileData.FileTitle || file.name,
      url: fileData.FileImageSource || fileData.FileImageDect,
    }

    // 建立 uid 和 FileID 的映射关系
    if (file.uid && fileData.FileID) {
      fileMapping.value.set(file.uid, fileData.FileID)
    }

    // 检查是否已存在相同的文件（避免重复添加）
    const existingIndex = successUploadList.value.findIndex(
      (item) => item.FileID === fileData.FileID,
    )

    if (existingIndex === -1) {
      successUploadList.value.push(uploadedFile)

      // 对于多文件上传，不要覆盖 uploadInfo，而是保持最新上传的文件信息
      uploadInfo.value = uploadedFile

      if (props.control.debug) {
        console.log('Upload success:', uploadedFile)
        console.log('Total uploaded files:', successUploadList.value.length)
        console.log('File mapping updated:', fileMapping.value)
      }
    } else {
      if (props.control.debug) {
        console.log(
          'File already exists in success list, skipping:',
          uploadedFile,
        )
      }
    }

    // 延迟清理上传进度（让用户看到成功状态，然后淡出）
    if (file.uid) {
      // 1.5秒后开始淡出动画
      setTimeout(() => {
        const uploadProgress = uploadingFiles.value.get(file.uid!)
        if (uploadProgress) {
          uploadProgress.fadeOut = true
          uploadingFiles.value.set(file.uid!, uploadProgress)
        }
      }, 1500)

      // 2.5秒后完全移除（给淡出动画时间）
      setTimeout(() => {
        uploadingFiles.value.delete(file.uid!)
        if (props.control.debug) {
          console.log('Cleaned up upload progress for file:', file.name)
        }
      }, 2500)
    }
  }
}

// 移除上传文件
const handleUploadRemove = (
  uploadFile: UploadFile,
  uploadFiles: UploadFiles,
): void => {
  if (props.control.debug) {
    console.log('Remove file:', uploadFile)
    console.log('Current file list:', uploadFiles)
    console.log('Success upload list before remove:', successUploadList.value)
    console.log('File mapping:', fileMapping.value)
  }

  let fileId: string | number | undefined

  // 方法1: 通过 fileMapping 获取 FileID（最可靠的方法）
  if (uploadFile.uid && fileMapping.value.has(uploadFile.uid)) {
    fileId = fileMapping.value.get(uploadFile.uid)
    if (props.control.debug) {
      console.log('Found FileID through mapping:', fileId)
    }
  }

  // 方法2: 通过 response 获取 FileID
  if (!fileId) {
    const response = uploadFile.response as UploadResponse | undefined
    fileId = response?.data?.FileID
    if (fileId && props.control.debug) {
      console.log('Found FileID through response:', fileId)
    }
  }

  // 方法3: 如果前两种方法都失败，尝试通过文件名匹配
  if (!fileId && uploadFile.name) {
    const matchedFile = successUploadList.value.find(
      (item) =>
        item.FileTitle === uploadFile.name || item.name === uploadFile.name,
    )
    fileId = matchedFile?.FileID
    if (fileId && props.control.debug) {
      console.log('Found FileID through name matching:', fileId)
    }
  }

  // 移除文件
  if (fileId) {
    const index = successUploadList.value.findIndex(
      (item) => item.FileID === fileId,
    )

    if (index > -1) {
      const removedFile = successUploadList.value.splice(index, 1)[0]

      // 清理文件映射
      if (uploadFile.uid) {
        fileMapping.value.delete(uploadFile.uid)
      }

      if (props.control.debug) {
        console.log('Successfully removed file:', removedFile)
        console.log('Updated file mapping:', fileMapping.value)
      }
    } else if (props.control.debug) {
      console.warn('File not found in success upload list:', fileId)
    }
  } else {
    // 如果无法通过 ID 匹配，尝试移除最后一个文件（回退策略）
    if (successUploadList.value.length > 0) {
      const removedFile = successUploadList.value.pop()

      // 清理对应的映射关系
      if (uploadFile.uid) {
        fileMapping.value.delete(uploadFile.uid)
      }

      if (props.control.debug) {
        console.log('Removed last file (fallback strategy):', removedFile)
      }
    } else if (props.control.debug) {
      console.warn('No files to remove and no FileID found')
    }
  }

  // 清空当前上传信息
  if (successUploadList.value.length === 0) {
    uploadInfo.value = {}
    fileMapping.value.clear() // 清空所有映射
  }

  if (props.control.debug) {
    console.log('Success upload list after remove:', successUploadList.value)
    console.log('Final file mapping:', fileMapping.value)
  }
}

// 上传错误处理
const handleUploadError = (error: Error, file: UploadFile): void => {
  console.error('Upload error:', error, file)
  ElMessage.error(`文件 ${file.name} 上传失败`)
}

// 提交选择的文件
const handleSubmit = (): void => {
  const fileIds = successUploadList.value.map((item) => String(item.FileID))

  fieldValue.value = props.control.limit === 1 ? fileIds[0] : fileIds

  dialogShow.value = false
  resetForm()
}

// 重置表单
const resetForm = (): void => {
  uploadInfo.value = {}
  fileList.value = []
  successUploadList.value = []
  fileMapping.value.clear()
  activeName.value = 'uploadFile'
}

// 监听器
watch(
  () => activeName.value,
  (newValue) => {
    if (newValue === 'selectFile' && rwFileList.value.length === 0) {
      loadFileList()
    }
  },
)

watch(
  () => [pagination.page, pagination.pageSize],
  () => {
    if (activeName.value === 'selectFile') {
      loadFileList()
    }
  },
  { deep: true },
)

// 搜索处理
const handleSearch = (): void => {
  pagination.page = 1
  loadFileList()
}

// 删除已上传的文件
const handleRemoveUploadedFile = (index: number): void => {
  if (index >= 0 && index < successUploadList.value.length) {
    const removedFile = successUploadList.value[index]

    // 找到对应的 Element Plus 上传文件项
    let targetUploadFile: UploadFile | undefined
    let targetUid: number | undefined

    // 通过文件映射找到对应的 uid
    for (const [uid, fileId] of fileMapping.value.entries()) {
      if (fileId === removedFile.FileID) {
        targetUid = uid
        // 在 fileList 中找到对应的上传文件
        targetUploadFile = fileList.value.find((file) => file.uid === uid)
        break
      }
    }

    if (props.control.debug) {
      console.log('Removing uploaded file:', removedFile)
      console.log('Found target upload file:', targetUploadFile)
      console.log('Target uid:', targetUid)
    }

    // 从成功上传列表中移除
    successUploadList.value.splice(index, 1)

    // 如果找到了对应的上传文件，从 Element Plus 的文件列表中移除
    if (targetUploadFile) {
      const uploadFileIndex = fileList.value.findIndex(
        (file) => file.uid === targetUploadFile!.uid,
      )
      if (uploadFileIndex > -1) {
        fileList.value.splice(uploadFileIndex, 1)
        if (props.control.debug) {
          console.log(
            'Removed file from Element Plus file list at index:',
            uploadFileIndex,
          )
        }
      }
    }

    // 清理文件映射
    if (targetUid !== undefined) {
      fileMapping.value.delete(targetUid)
    }

    // 如果删除的是最后一个文件，清空上传信息
    if (successUploadList.value.length === 0) {
      uploadInfo.value = {}
      fileMapping.value.clear()
      fileList.value = [] // 清空整个文件列表
    }

    if (props.control.debug) {
      console.log('Manually removed uploaded file:', removedFile)
      console.log('Remaining success files:', successUploadList.value)
      console.log('Remaining upload files:', fileList.value)
      console.log('Updated file mapping:', fileMapping.value)
    }
  }
}

// 获取进度文本（支持多语言）
const getProgressText = (progress: UploadProgress): string => {
  switch (progress.status) {
    case 'success':
      return t('upload.success') || '成功'
    case 'error':
      return t('upload.failed') || '失败'
    case 'uploading':
    default:
      return `${progress.percent}%`
  }
}

// 删除上传失败的文件
const handleRemoveFailedUpload = (uid: number): void => {
  if (props.control.debug) {
    console.log('Removing failed upload with uid:', uid)
    console.log('Current uploading files:', uploadingFiles.value)
    console.log('Current file list:', fileList.value)
  }

  // 从上传进度跟踪中移除
  const uploadProgress = uploadingFiles.value.get(uid)
  if (uploadProgress) {
    uploadingFiles.value.delete(uid)

    if (props.control.debug) {
      console.log('Removed upload progress:', uploadProgress)
    }
  }

  // 从 Element Plus 文件列表中移除对应的文件
  const fileIndex = fileList.value.findIndex((file) => file.uid === uid)
  if (fileIndex > -1) {
    const removedFile = fileList.value.splice(fileIndex, 1)[0]

    if (props.control.debug) {
      console.log('Removed file from Element Plus file list:', removedFile)
    }
  }

  // 清理文件映射（如果存在）
  if (fileMapping.value.has(uid)) {
    fileMapping.value.delete(uid)

    if (props.control.debug) {
      console.log('Cleaned up file mapping for uid:', uid)
    }
  }

  // 显示删除成功消息
  ElMessage.success('已删除上传失败的文件')

  if (props.control.debug) {
    console.log('After removing failed upload:')
    console.log('Remaining uploading files:', uploadingFiles.value)
    console.log('Remaining file list:', fileList.value)
    console.log('Updated file mapping:', fileMapping.value)
  }
}
</script>
<template>
  <ElDialog
    v-model="dialogShow"
    :draggable="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :z-index="2050"
  >
    <template #header> </template>
    <ElTabs v-model="activeName">
      <ElTabPane label="本地上传" name="uploadFile">
        <ElUpload
          v-model:file-list="fileList"
          ref="rwUpload"
          drag
          multiple
          :limit="remainingUploadCount"
          :before-upload="handleBeforeUpload"
          :on-exceed="handleUploadExceed"
          :accept="uploadAccept"
          :http-request="handleUpload"
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove"
          :on-error="handleUploadError"
          :disabled="!canUpload"
          :show-file-list="false"
        >
          <!-- 文件类型上传区域 -->
          <div v-if="control.type === 'file'">
            <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或 <em>点击上传</em>
            </div>
            <div class="el-upload__tip">
              支持 doc、pdf、xls、ppt 等文件格式
            </div>
          </div>

          <!-- 图片/视频类型上传区域 -->
          <div v-else-if="(control.type === 'image' || control.type === 'video') && uploadInfo.FileImageSource">
            <el-image
              style="width: 200px; height: 200px"
              :src="uploadInfo.FileImageSource"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              fit="cover"
            />
          </div>

          <!-- 默认上传区域 -->
          <div v-else>
            <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
            <div class="el-upload__text">
              将{{ control.type === 'image' ? '图片' : control.type === 'video' ? '视频' : control.type === 'music' ? '音频' : '文件' }}拖到此处，或 <em>点击上传</em>
            </div>
          </div>

          <template #tip>
            最多上传{{ control.limit }}个文件，已上传{{
              successUploadList.length
            }}个
          </template>
        </ElUpload>

        <!-- 上传进度列表 -->
        <div v-if="uploadingFiles.size > 0" class="uploading-files-section">
          <h4 class="uploading-files-title">
            正在上传 ({{ uploadingFiles.size }})
          </h4>
          <div class="uploading-files-list">
            <transition-group name="upload-progress" tag="div" class="upload-progress-container">
              <div
                v-for="[uid, progress] in uploadingFiles"
                :key="uid"
                class="uploading-file-item"
                :class="{ 'fade-out': progress.fadeOut }"
              >
                <div class="file-info">
                  <el-icon class="file-icon uploading-icon">
                    <UploadFilled />
                  </el-icon>
                  <div class="file-details">
                    <span class="file-name">{{ progress.name }}</span>
                    <div class="progress-container">
                      <el-progress
                        :percentage="progress.percent"
                        :status="
                          progress.status === 'error'
                            ? 'exception'
                            : progress.status === 'success'
                              ? 'success'
                              : undefined
                        "
                        :stroke-width="6"
                        :show-text="false"
                      />
                      <span
                        class="progress-text"
                        :class="{
                          'progress-text--error': progress.status === 'error',
                          'progress-text--success': progress.status === 'success'
                        }"
                      >
                        {{ getProgressText(progress) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="upload-status">
                  <el-icon
                    v-if="progress.status === 'success'"
                    class="status-icon success-icon"
                  >
                    <Check />
                  </el-icon>
                  <el-button
                    v-else-if="progress.status === 'error'"
                    type="danger"
                    size="small"
                    :icon="Delete"
                    circle
                    @click="handleRemoveFailedUpload(uid)"
                    title="删除失败的文件"
                  />
                  <el-icon v-else class="status-icon uploading-icon rotating">
                    <Loading />
                  </el-icon>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!-- 已上传文件列表 -->
        <div v-if="successUploadList.length > 0" class="uploaded-files-section">
          <h4 class="uploaded-files-title">
            已上传文件 ({{ successUploadList.length }}/{{ control.limit }})
          </h4>
          <div class="uploaded-files-list">
            <div
              v-for="(file, index) in successUploadList"
              :key="file.FileID"
              class="uploaded-file-item"
            >
              <div class="file-info">
                <el-image
                  v-if="control.type === 'image'"
                  :src="file.FileImageDect || file.FileImageSource"
                  class="file-thumbnail"
                  fit="cover"
                >
                  <template #error>
                    <div class="image-error">
                      <el-icon><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
                <el-icon
                  v-else-if="control.type === 'video'"
                  class="file-icon video-icon"
                >
                  <VideoPlay />
                </el-icon>
                <el-icon
                  v-else-if="control.type === 'music'"
                  class="file-icon music-icon"
                >
                  <Iphone />
                </el-icon>
                <el-icon v-else class="file-icon file-icon-default">
                  <Document />
                </el-icon>
                <span class="file-name">{{
                  file.FileTitle || file.name || '未命名文件'
                }}</span>
              </div>
              <el-button
                type="danger"
                size="small"
                :icon="Delete"
                circle
                @click="handleRemoveUploadedFile(index)"
                title="删除文件"
              />
            </div>
          </div>
        </div>
      </ElTabPane>

      <ElTabPane label="选择文件" name="selectFile">
        <ElRow>
          <ElCol>
            <ElInput
              v-model="keyword"
              @keydown.enter="handleSearch"
              clearable
              @clear="handleSearch"
              placeholder="搜索文件..."
            >
              <template #prepend>
                <ElRadioGroup v-model="searchType" @change="loadFileList">
                  <ElRadio :value="0">我的文件</ElRadio>
                  <ElRadio :value="1">企业文件</ElRadio>
                </ElRadioGroup>
              </template>
              <template #append>
                <ElButton icon="Search" @click="loadFileList">搜索</ElButton>
              </template>
            </ElInput>
          </ElCol>
          <ElCol>
            <FileItem
              :fileList="rwFileList"
              v-model:selectedFile="successUploadList"
              :loading="fileLoading"
              :fileType="control.type"
              :limit="control.limit"
            />
            <RwPagination.Template :control="pagination" />
          </ElCol>
        </ElRow>
        <ElRow> </ElRow>
      </ElTabPane>
    </ElTabs>
    <template #footer>
      <ElButton type="primary" @click="handleSubmit">确定</ElButton>
      <ElButton type="danger" @click="dialogShow = false">取消</ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.el-dialog {
  .el-tabs {
    .el-tab-pane {
      min-height: 400px;
    }
  }

  .el-upload {
    &.is-drag {
      .el-upload-dragger {
        padding: 40px;

        .el-icon--upload {
          font-size: 48px;
          color: var(--el-text-color-placeholder);
          margin-bottom: 16px;
        }

        .el-upload__text {
          color: var(--el-text-color-regular);
          font-size: 14px;

          em {
            color: var(--el-color-primary);
            font-style: normal;
          }
        }
      }
    }
  }

  .el-input-group {
    .el-radio-group {
      .el-radio {
        margin-right: 12px;
      }
    }
  }
}

.uploaded-files-section {
  margin-top: 20px;
  padding: 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  border: 1px solid var(--el-border-color-lighter);

  .uploaded-files-title {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: 4px;
      height: 16px;
      background: var(--el-color-primary);
      margin-right: 8px;
      border-radius: 2px;
    }
  }

  .uploaded-files-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 200px;
    overflow-y: auto;

    .uploaded-file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--el-bg-color);
      border-radius: 6px;
      border: 1px solid var(--el-border-color-lighter);
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--el-color-primary);
        box-shadow: 0 2px 4px color-mix(in srgb, var(--el-color-primary) 10%, transparent);
      }

      .file-info {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;

        .file-thumbnail {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          margin-right: 12px;
          flex-shrink: 0;

          .image-error {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--el-fill-color-lighter);
            color: var(--el-text-color-placeholder);
            font-size: 16px;
          }
        }

        .file-icon {
          width: 32px;
          height: 32px;
          margin-right: 12px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 18px;

          &.video-icon {
            background: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
          }

          &.music-icon {
            background: var(--el-color-purple-light-9);
            color: var(--el-color-purple);
          }

          &.file-icon-default {
            background: var(--el-color-warning-light-9);
            color: var(--el-color-warning);
          }
        }

        .file-name {
          font-size: 14px;
          color: var(--el-text-color-primary);
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }
      }

      .el-button {
        margin-left: 12px;
        flex-shrink: 0;
      }
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: var(--el-fill-color-light);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--el-text-color-disabled);
      border-radius: 3px;

      &:hover {
        background: var(--el-text-color-placeholder);
      }
    }
  }
}

.uploading-files-section {
  margin-top: 20px;
  padding: 16px;
  background: var(--el-color-warning-light-9);
  border-radius: 8px;
  border: 1px solid var(--el-color-warning-light-7);

  .uploading-files-title {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--el-color-warning);
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: 4px;
      height: 16px;
      background: var(--el-color-warning);
      margin-right: 8px;
      border-radius: 2px;
    }
  }

  .uploading-files-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 200px;
    overflow-y: auto;

    .uploading-file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: var(--el-bg-color);
      border-radius: 6px;
      border: 1px solid var(--el-color-warning-light-7);
      transition: all 0.2s ease;

      .file-info {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;

        .file-icon {
          width: 32px;
          height: 32px;
          margin-right: 12px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 18px;
          background: var(--el-color-warning-light-9);
          color: var(--el-color-warning);
        }

        .file-details {
          flex: 1;
          min-width: 0;

          .file-name {
            font-size: 14px;
            color: var(--el-text-color-primary);
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 8px;
            display: block;
          }

          .progress-container {
            display: flex;
            align-items: center;
            gap: 12px;

            .el-progress {
              flex: 1;
            }

            .progress-text {
              font-size: 12px;
              color: var(--el-text-color-secondary);
              font-weight: 500;
              min-width: 35px;
              text-align: right;
              transition: color 0.3s ease;

              &--success {
                color: var(--el-color-success);
                font-weight: 600;
              }

              &--error {
                color: var(--el-color-danger);
                font-weight: 600;
              }
            }
          }
        }
      }

      .upload-status {
        margin-left: 12px;
        flex-shrink: 0;

        .status-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          &.success-icon {
            background: var(--el-color-success-light-9);
            color: var(--el-color-success);
          }

          &.error-icon {
            background: var(--el-color-danger-light-9);
            color: var(--el-color-danger);
          }

          &.uploading-icon {
            background: var(--el-color-warning-light-9);
            color: var(--el-color-warning);

            &.rotating {
              animation: rotate 1s linear infinite;
            }
          }
        }
      }
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: var(--el-fill-color-light);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--el-color-warning-light-5);
      border-radius: 3px;

      &:hover {
        background: var(--el-color-warning);
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


@media (max-width: 768px) {
  .uploaded-files-section {
    padding: 12px;

    .uploaded-files-list {
      .uploaded-file-item {
        padding: 6px 8px;

        .file-info {
          .file-thumbnail,
          .file-icon {
            width: 28px;
            height: 28px;
            margin-right: 8px;
          }

          .file-name {
            font-size: 13px;
          }
        }
      }
    }
  }

  .uploading-files-section {
    padding: 12px;

    .uploading-files-list {
      .uploading-file-item {
        padding: 8px;

        .file-info {
          .file-icon {
            width: 28px;
            height: 28px;
            margin-right: 8px;
          }

          .file-details {
            .file-name {
              font-size: 13px;
              margin-bottom: 6px;
            }

            .progress-container {
              gap: 8px;

              .progress-text {
                font-size: 11px;
                min-width: 30px;
              }
            }
          }
        }

        .upload-status {
          .status-icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}

.upload-progress-enter-active {
  transition: all 0.5s ease-out;
}

.upload-progress-leave-active {
  transition: all 0.8s ease-in;
}

.upload-progress-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.upload-progress-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.upload-progress-move {
  transition: transform 0.5s ease;
}

.uploading-file-item {
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateY(0);

  &.fade-out {
    opacity: 0;
    transform: translateY(-10px);
    transition: all 1s ease-out;
  }
}

</style>
