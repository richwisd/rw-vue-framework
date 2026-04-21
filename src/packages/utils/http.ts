import Cookies from 'js-cookie'
import { rwEncode, rwDecode } from './encrypt'

import axios, {
  // AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

// 扩展 AxiosRequestConfig 类型
declare module 'axios' {
  interface AxiosRequestConfig {
    cache?: boolean
    useQueue?: boolean
    _retryCount?: number
  }
}
// 插件接口
export interface HttpPlugin {
  name: string
  onRequest?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  onResponse?: (
    response: AxiosResponse,
  ) => AxiosResponse | Promise<AxiosResponse>
  onError?: (error: any) => any
}

// 响应数据处理配置
export interface ResponseHandlerConfig {
  // 成功状态码列表
  successCodes?: number[]
  // 需要重新登录的状态码列表
  reloginCodes?: number[]
  // 登录页面路径，支持字符串或函数动态生成，默认为 '/login'
  loginPath?: string | (() => string)
  // 需要跳转的状态码配置
  redirectCodes?: {
    [code: number]: string // 状态码 -> 跳转路径
  }
  // 自定义状态码处理器
  customHandlers?: {
    [code: number]: (data: any, response: AxiosResponse) => any
  }
  // 重新登录方法
  reLogin?: () => void
  // 路由跳转函数
  routerPush?: (path: string) => void
  // 消息提示函数
  showMessage?: (
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info',
  ) => void
}

// 扩展配置接口
export interface HttpConfig extends AxiosRequestConfig {
  init?: boolean
  // 基础配置
  baseURL?: string

  // 功能开关
  repeatPost?: boolean // 是否防止重复提交
  repeatPostTime?: number // 重复提交限制时间(秒)
  showError?: boolean // 是否显示错误信息
  autoRelogin?: boolean // 是否自动重新登录
  isDebug?: boolean // 是否开启调试模式

  // 统一响应处理
  responseHandler?: ResponseHandlerConfig // 响应处理配置

  // 加密配置
  encrypt?: boolean // 是否加密
  encryptOptions?: {
    encryptKey?: string // 加密密钥
    encryptFunc?: (data: any, key: string) => any // 加密方法
    decryptFunc?: (data: any, key: string) => any // 解密方法
  }

  // 默认参数
  defaultParams?: {
    [key: string]: any
  }

  // 自定义处理函数
  errorHandler?: () => void // 自定义错误处理
  reloginHandler?: () => Promise<boolean> // 自定义重新登录处理

  // 插件系统
  plugins?: HttpPlugin[] // 自定义插件列表
}

/**
 * HTTP 请求类 - 单例模式实现
 */
export class Http {
  private static instance: Http
  private static domainInstances: Map<string, Http> = new Map()
  public axiosInstance: AxiosInstance
  public config: HttpConfig
  private plugins: HttpPlugin[] = []
  /**
   * 私有构造函数，防止外部直接实例化
   */
  private constructor(config: HttpConfig = {}) {
    this.config = {
      init: false,
      baseURL: '', // 默认为空，由使用者提供
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      repeatPost: false,
      repeatPostTime: 3,
      showError: true,
      autoRelogin: true,
      isDebug: false,
      ...config,
    }
    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: this.config.headers,
    })

    // 注册内置插件
    this.registerBuiltinPlugins()
    // 注册自定义插件
    if (this.config.plugins && this.config.plugins.length) {
      this.use(...this.config.plugins)
    }
    this.setupInterceptors()
  }
  /**
   * 获取单例实例
   */
  public static getInstance(config?: HttpConfig): Http {
    if (!Http.instance || config?.init) {
      Http.instance = new Http(config)
    }
    return Http.instance
  }
  /**
   * 获取指定域名的实例
   * @param domain 域名
   * @param config 配置
   */
  public static getDomainInstance(
    domain: string,
    config: HttpConfig = {},
  ): Http {
    if (!Http.domainInstances.has(domain)) {
      const domainConfig = { ...config, baseURL: domain }
      Http.domainInstances.set(domain, new Http(domainConfig))
    }
    return Http.domainInstances.get(domain)!
  }
  /**
   * 创建新的 HTTP 实例（用于特殊需求）
   */
  public static createInstance(config: HttpConfig = {}): Http {
    return new Http(config)
  }
  /**
   * 重新配置实例
   */
  public reconfigure(config: HttpConfig): void {
    this.config = { ...this.config, ...config }
    // 重新创建 axios 实例
    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: this.config.headers,
    })
    // 清空插件并重新注册
    this.plugins = []
    this.registerBuiltinPlugins()
    if (this.config.plugins && this.config.plugins.length) {
      this.use(...this.config.plugins)
    }
    this.setupInterceptors()
  }
  /**
   * 注册内置插件
   */
  private registerBuiltinPlugins(): void {
    // 统一响应处理插件（优先级最高，最先注册）
    if (this.config.responseHandler) {
      this.use(this.createResponseHandlerPlugin(this.config.responseHandler))
    }

    // 根据配置注册内置插件
    if (this.config.repeatPost) {
      this.use(this.createRepeatPostPlugin(this.config.repeatPostTime))
    }
    if (this.config.showError) {
      this.use(this.createErrorHandlerPlugin(this.config.errorHandler))
    }
    if (this.config.autoRelogin) {
      this.use(this.createReloginPlugin(this.config.reloginHandler))
    }
    if (this.config.isDebug) {
      this.use(this.createDebugPlugin())
    }
  }
  /**
   * 注册插件
   */
  public use(...plugins: HttpPlugin[]): Http {
    plugins.forEach((plugin) => {
      if (!this.plugins.some((p) => p.name === plugin.name)) {
        this.plugins.push(plugin)
      }
    })
    return this
  }
  /**
   * 设置拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // 默认参数处理
        if (this.config.defaultParams) {
          // 处理默认参数,支持函数形式的动态参数
          const processedParams = Object.entries(
            this.config.defaultParams,
          ).reduce(
            (acc, [key, value]) => {
              acc[key] = typeof value === 'function' ? value() : value
              return acc
            },
            {} as Record<string, any>,
          )

          config.data = { ...processedParams, ...config.data }
        }

        // 加密处理
        if (this.config.encrypt && this.config.encryptOptions?.encryptFunc) {
          config.data = this.config.encryptOptions.encryptFunc(
            config.data,
            this.config.encryptOptions.encryptKey||"",
          )
        }

        let processedConfig = config
        for (const plugin of this.plugins) {
          if (plugin.onRequest) {
            processedConfig = await plugin.onRequest(processedConfig)
          }
        }
        return processedConfig
      },
      (error) => Promise.reject(error),
    )
    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      async (response) => {
        // 解密操作
        if (this.config.encrypt && this.config.encryptOptions?.decryptFunc) {
          response.data = this.config.encryptOptions.decryptFunc(
            response.data,
            this.config.encryptOptions.encryptKey||"",
          )
        }
        let processedResponse = response
        for (const plugin of this.plugins) {
          if (plugin.onResponse) {
            processedResponse = await plugin.onResponse(processedResponse)
          }
        }
        return processedResponse.data
      },
      async (error) => {
        // 应用所有插件的错误处理
        let processedError = error
        for (const plugin of this.plugins) {
          if (plugin.onError) {
            processedError = await plugin.onError(processedError)
          }
        }
        return Promise.reject(processedError)
      },
    )
  }
  /**
   * 创建防重复提交插件
   */
  private createRepeatPostPlugin(time: number = 3): HttpPlugin {
    return {
      name: 'repeatPost',
      onRequest: (config) => {
        const url = config.url || ''
        const data = config.data || {}
        // 实现防重复提交逻辑
        if (this.isRepeatPost(url, data, time)) {
          config.cancelToken = new axios.CancelToken((cancel) => {
            cancel('重复提交，已取消请求')
          })
        }
        return config
      },
    }
  }
  /**
   * 创建错误处理插件
   */
  private createErrorHandlerPlugin(customHandler?: () => void): HttpPlugin {
    return {
      name: 'errorHandler',
      onError: (error) => {
        const message = error.message || '请求失败'
        if (customHandler) {
          customHandler()
        } else {
          // 默认错误处理
          console.error(`请求错误: ${message}`)
        }
        return error
      },
    }
  }
  /**
   * 创建重新登录插件
   */
  private createReloginPlugin(
    reloginHandler?: () => Promise<boolean>,
  ): HttpPlugin {
    return {
      name: 'autoRelogin',
      onResponse: async (response) => {
        const data = response.data
        // 处理登录失效
        if (data && data.status === 99) {
          if (reloginHandler) {
            const loginResult = await reloginHandler()
            if (loginResult) {
              // 重新发送请求
              const result = await this.axiosInstance(response.config)
              return { ...response, data: result }
            }
          }
          // 默认重新登录处理
          // 这里可以添加默认的重新登录逻辑
        }
        return response
      },
    }
  }
  /**
   * 创建调试插件
   */
  private createDebugPlugin(): HttpPlugin {
    return {
      name: 'debug',
      onRequest: (config) => {
        console.log('请求配置:', config)
        return config
      },
      onResponse: (response) => {
        console.log('响应数据:', response.data)
        return response
      },
      onError: (error) => {
        console.error('请求错误:', error)
        return error
      },
    }
  }
  /**
   * 创建统一响应处理插件
   */
  private createResponseHandlerPlugin(
    config: ResponseHandlerConfig,
  ): HttpPlugin {
    const {
      successCodes = [200, 0], // 默认成功状态码
      reloginCodes = [401, 403, 99], // 默认需要重新登录的状态码
      loginPath = '/login', // 默认登录页面路径
      redirectCodes = {},
      customHandlers = {},
      reLogin,
      routerPush,
      showMessage,
    } = config

    return {
      name: 'responseHandler',
      onResponse: async (response) => {
        const data = response.data
        const status = data?.status ?? data?.code ?? response.status

        // 自定义状态码处理器优先级最高
        if (customHandlers[status]) {
          return { ...response, data: customHandlers[status](data, response) }
        }

        // 处理需要重新登录的状态码
        if (reloginCodes.includes(status)) {
          const message = data?.message || data?.msg || '登录已过期，请重新登录'

          if (showMessage) {
            showMessage(message, 'warning')
          }

          if (reLogin) {
            reLogin()
          } else if (routerPush) {
            const finalLoginPath =
              typeof loginPath === 'function' ? loginPath() : loginPath
            routerPush(finalLoginPath)
          }
          return Promise.reject(new Error(message))
        }

        // 处理需要跳转的状态码
        if (redirectCodes[status]) {
          const message = data?.message || data?.msg || '页面跳转中...'

          if (showMessage) {
            showMessage(message, 'info')
          }

          if (routerPush) {
            routerPush(redirectCodes[status])
          }
        }

        // 处理成功状态码
        if (successCodes.includes(status)) {
          return response
        }

        // 处理业务错误状态码
        const errorMessage = data?.message || data?.msg || '请求失败'

        if (showMessage) {
          showMessage(errorMessage, 'error')
        }

        // 对于业务错误，可以选择抛出错误或返回数据
        // 这里选择抛出错误，让调用方处理
        return Promise.reject(new Error(errorMessage))
      },
      onError: (error) => {
        // 处理网络错误等
        const message = error.message || '网络请求失败'

        if (showMessage) {
          showMessage(message, 'error')
        }

        return Promise.reject(error)
      },
    }
  }
  /**
   * 检查是否重复提交
   */
  private isRepeatPost(url: string, data: any, time: any): boolean {
    // 实现防重复提交的逻辑
    // 这里需要根据实际情况实现
    return false
  }
  /**
   * GET 请求
   * @param url 请求路径
   * @param params 请求参数
   * @param config 请求配置
   * @param domain 可选的域名，如果提供则使用该域名发送请求
   */
  public get<T = any>(
    url: string,
    params = {},
    config = {},
    domain?: string,
  ): Promise<T> {
    if (domain) {
      return Http.getDomainInstance(domain).get<T>(url, params, config)
    }
    return this.axiosInstance.get(url, { params, ...config })
  }
  /**
   * POST 请求
   * @param url 请求路径
   * @param data 请求数据
   * @param config 请求配置
   * @param domain 可选的域名，如果提供则使用该域名发送请求
   */
  public post<T = any>(
    url: string,
    data = {},
    config = {},
    domain?: string,
  ): Promise<T> {
    if (domain) {
      return Http.getDomainInstance(domain).post<T>(url, data, config)
    }
    return this.axiosInstance.post(url, data, config)
  }
  /**
   * PUT 请求
   * @param url 请求路径
   * @param data 请求数据
   * @param config 请求配置
   * @param domain 可选的域名，如果提供则使用该域名发送请求
   */
  public put<T = any>(
    url: string,
    data = {},
    config = {},
    domain?: string,
  ): Promise<T> {
    if (domain) {
      return Http.getDomainInstance(domain).put<T>(url, data, config)
    }
    return this.axiosInstance.put(url, data, config)
  }
  /**
   * DELETE 请求
   * @param url 请求路径
   * @param config 请求配置
   * @param domain 可选的域名，如果提供则使用该域名发送请求
   */
  public delete<T = any>(
    url: string,
    config = {},
    domain?: string,
  ): Promise<T> {
    if (domain) {
      return Http.getDomainInstance(domain).delete<T>(url, config)
    }
    return this.axiosInstance.delete(url, config)
  }

  /**
   * 直接请求特定域名
   * @param domain 域名
   */
  public domain(domain: string): Http {
    return Http.getDomainInstance(domain)
  }
  /**
   * 添加请求取消功能
   */
  // public createCancelToken() {
  //   const controller = new AbortController()
  //   return {
  //     token: controller.signal,
  //     cancel: (message?: string) => controller.abort(message),
  //   }
  // }
  /**
   * 文件上传请求
   */
  public upload<T = any>(
    url: string,
    file: File | FormData,
    config = {},
    domain?: string,
  ): Promise<T> {
    const formData = file instanceof File ? new FormData() : file

    if (file instanceof File) {
      formData.append('file', file)
    }
    const uploadConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    }

    if (domain) {
      return Http.getDomainInstance(domain).post<T>(url, formData, uploadConfig)
    }
    return this.axiosInstance.post(url, formData, uploadConfig)
  }
  /**
   * 文件下载请求
   */
  public download(
    url: string,
    params = {},
    config = {},
    domain?: string,
  ): Promise<Blob> {
    const downloadConfig: AxiosRequestConfig = {
      responseType: 'blob' as const,
      ...config,
    }

    if (domain) {
      return Http.getDomainInstance(domain).get(url, params, downloadConfig)
    }
    return this.axiosInstance.get(url, { params, ...downloadConfig })
  }
  /**
   * 创建请求重试插件
   */
  // private createRetryPlugin(
  //   maxRetries: number = 3,
  //   retryDelay: number = 1000
  // ): HttpPlugin {
  //   return {
  //     name: 'retry',
  //     onError: async (error) => {
  //       if (!error.config) {
  //         return Promise.reject(error)
  //       }

  //       const config = error.config

  //       // 如果没有设置重试计数器，则初始化
  //       if (config._retryCount === undefined) {
  //         config._retryCount = 0
  //       }

  //       // 如果已经达到最大重试次数，则不再重试
  //       if (config._retryCount >= maxRetries) {
  //         return Promise.reject(error)
  //       }

  //       // 增加重试计数
  //       config._retryCount += 1

  //       // 创建延迟
  //       const delay = new Promise((resolve) => setTimeout(resolve, retryDelay))

  //       // 延迟后重试请求
  //       await delay
  //       return this.axiosInstance(config)
  //     },
  //   }
  // }
  /**
   * 创建缓存插件
   */
  // private createCachePlugin(maxAge: number = 60000): HttpPlugin {
  //   const cache = new Map<string, { data: any; timestamp: number }>()

  //   return {
  //     name: 'cache',
  //     onRequest: (config) => {
  //       // 只缓存 GET 请求
  //       if (config.method?.toLowerCase() !== 'get' || !config.cache) {
  //         return config
  //       }

  //       const key = `${config.url}${JSON.stringify(config.params || {})}`
  //       const cached = cache.get(key)

  //       if (cached && Date.now() - cached.timestamp < maxAge) {
  //         // 从缓存返回数据
  //         const adapter = async () => {
  //           return {
  //             data: cached.data,
  //             status: 200,
  //             statusText: 'OK',
  //             headers: {},
  //             config: config,
  //             request: {},
  //           } as AxiosResponse
  //         }
  //         config.adapter = adapter
  //       }
  //       return config
  //     },
  //     onResponse: (response) => {
  //       // 只缓存 GET 请求
  //       if (
  //         response.config.method?.toLowerCase() === 'get' &&
  //         response.config.cache
  //       ) {
  //         const key = `${response.config.url}${JSON.stringify(
  //           response.config.params || {}
  //         )}`
  //         cache.set(key, {
  //           data: response.data,
  //           timestamp: Date.now(),
  //         })
  //       }
  //       return response
  //     },
  //   }
  // }
  /**
   * 添加请求队列控制插件
   */
  // private createQueuePlugin(maxConcurrent: number = 5): HttpPlugin {
  //   const queue: Array<() => void> = []
  //   let activeCount = 0

  //   const processQueue = () => {
  //     if (activeCount < maxConcurrent && queue.length > 0) {
  //       const task = queue.shift()
  //       if (task) {
  //         activeCount++
  //         task()
  //       }
  //     }
  //   }

  //   return {
  //     name: 'queue',
  //     onRequest: (config) => {
  //       if (!config.useQueue) {
  //         return config
  //       }

  //       return new Promise<InternalAxiosRequestConfig>((resolve) => {
  //         const executeRequest = () => {
  //           resolve(config)
  //         }

  //         queue.push(executeRequest)
  //         processQueue()
  //       })
  //     },
  //     onResponse: (response) => {
  //       if (response.config.useQueue) {
  //         activeCount--
  //         processQueue()
  //       }
  //       return response
  //     },
  //     onError: (error) => {
  //       if (error.config?.useQueue) {
  //         activeCount--
  //         processQueue()
  //       }
  //       return Promise.reject(error)
  //     },
  //   }
  // }
}

// 创建并导出一个默认的 Http 实例，使用单例模式确保全局只有一个实例
export const http = Http.getInstance({
  // 可以在这里添加默认配置
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  encrypt: true, // 是否加密
  encryptOptions: {
    encryptKey: '9IUYGv58', // 加密密钥
    encryptFunc: rwEncode, // 加密方法
    decryptFunc: rwDecode, // 解密方法
  },
  defaultParams: {
    ClientTime: ()=> Date.now(),
    rwCookieID: ()=> Cookies.get('rwCookieID'),
    ClientLang: ()=> Cookies.get('ClientLang') ?? 'zh',
  }
})

// 获取当前的实例（函数形式，确保获取最新的实例）
// export const getHttp = () => Http.getInstance()

// // 创建一个代理对象，提供完全的向后兼容性
// export const http = new Proxy({} as Http, {
//   get(target, prop) {
//     const instance = Http.getInstance()
//     const value = instance[prop as keyof Http]

//     // 如果是方法，绑定正确的 this 上下文
//     if (typeof value === 'function') {
//       return value.bind(instance)
//     }

//     return value
//   },
// })

export const initHttp = (HttpConfig:any) => {
  Http.getInstance(HttpConfig)
}

export const useHttp = () => http
