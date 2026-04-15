import { type baseT } from '../../constants'
import { http } from '../../utils'
import { withInstall, type SFCWithInstall } from '../../utils'
import {
  type UploadFile as ElUploadFile,
  ElMessage
} from 'element-plus'

import Upload from './upload.vue'

export const Template: SFCWithInstall<typeof Upload> = withInstall(Upload)

// 基础类型定义
export type ImageTypeT = 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp'
export type FileTypeT =
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx'
  | 'ppt'
  | 'pptx'
  | 'pdf'
  | 'txt'
  | 'zip'
  | 'rar'
export type MediaTypeT = 'file' | 'image' | 'video' | 'music'
export type UserTypeT = '0' | '1' | '2' // 0为我的文件，1为企业文件或平台文件，2为系统文件
export type UploadTypeT = 'server' | 'vos' // 默认是server表示上传到服务器，vos表示上传到腾讯云点播

// 组件配置类型
export interface OptionT extends baseT {
  type: MediaTypeT
  limit: number
  width?: number
  debug: boolean
  uploadType: UploadTypeT
  imgHeight?: number
  imgWidth?: number
}

// 扩展的上传文件类型，基于 Element Plus 的类型进行扩展
export interface UploadFile extends ElUploadFile {
  FileTitle?: string
  specType?: number
  FileImageDect?: string
  FileID?: string | number
  FileImageSource?: string
  [key: string]: any
}

export type UploadFiles = UploadFile[]
export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
  Partial<Pick<UploadFile, 'status' | 'uid'>>

// API 响应类型
export interface ApiResponse<T = any> {
  status: number
  data: T
  message?: string
}

export interface FileData {
  FileID: string | number
  FileTitle?: string
  FileImageSource?: string
  FileImageDect?: string
  [key: string]: any
}

export interface InitFileParams {
  apiParam: string
  FileID: string | number
}

// 初始化函数
export function init( moduleName:string, name: string, options: Partial<OptionT> = {}): OptionT {
  return {
    moduleName,
    name,
    limit: 1,
    type: 'image' as MediaTypeT,
    debug: false,
    uploadType: 'server' as UploadTypeT,
    ...options,
  } as OptionT
}



// 辅助函数
export const validateUploadLimit = (
  currentCount: number,
  limit: number,
): boolean => {
  if (currentCount >= limit) {
    ElMessage.error(
      `上传失败，最多选择${limit}个文件。如已选择其他文件，请先删除`,
    )
    return false
  }
  return true
}

export const showUploadExceedMessage = (limit: number): void => {
  ElMessage.error(
    `上传失败，最多选择${limit}个文件。如已选择其他文件，请先删除`,
  )
}

export const getUploadAccept = (fileType: MediaTypeT): string => {
  const acceptMap: Record<MediaTypeT, string> = {
    image: 'image/*',
    video: 'video/*',
    music: 'audio/*',
    file: '*',
  }
  return acceptMap[fileType] || '*'
}


// 删除文件方法
export const removeUploadedFile = async (
  fileId: string | number,
  userType: UserTypeT = '0',
  baseUrl: string
): Promise<boolean> => {
  try {
    const endpoint = userType === '0' ? '?p=files&a=delUserFile' : '?p=files&a=delSiteFile'
    const response = await http.post(baseUrl+ endpoint, { FileID: fileId })

    if (response?.status === 0) {
      ElMessage.success('成功删除上传的文件')
      return true
    } else {
      ElMessage.error('删除文件失败')
      return false
    }
  } catch (error) {
    console.error('Delete file error:', error)
    ElMessage.error('删除文件失败')
    return false
  }
}

// 上传错误处理
export const handleUploadError = (error: Error, fileName: string): void => {
  const message = error.message || '未知错误'
  ElMessage.error(`文件 ${fileName} 上传失败（${message}）`)
}

// API 接口方法
export const initFile = async (
  data: InitFileParams,
  baseUrl: string
): Promise<ApiResponse<FileData[]>> => {
  return http.post(baseUrl+ '?p=Files&a=getInitFile&apiName=Files/getInitFile', data)
}

export const getFileList = async (
  baseUrl: string,
  data: {
    FileType: MediaTypeT
    FileModel: number
    searchVal: string
    pageSize: number
    page: number
}): Promise<ApiResponse<{ rows: FileData[]; total: number }>> => {
  return http.post(baseUrl + '?p=Files&a=getFileList', data)
}

// 工具函数
export const isEmpty = (value: unknown): boolean => {
  // 判断 null 或 undefined
  if (value == null) return true

  // 判断数组
  if (Array.isArray(value)) return value.length === 0

  // 判断对象
  if (typeof value === 'object') return Object.keys(value).length === 0

  // 判断字符串
  if (typeof value === 'string') return value.trim().length === 0

  // 判断数字
  if (typeof value === 'number') return false

  return false
}

// 工具类型
export type Awaitable<T> = Promise<T> | T
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }
