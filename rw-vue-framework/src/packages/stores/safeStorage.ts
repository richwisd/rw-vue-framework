/**
 * 获取安全的 Storage 对象。
 * 在浏览器中返回 localStorage；在 SSR/Node 环境中返回内存版 Storage。
 *
 * 用于 defineStore 的 persist.storage 选项，避免模块加载时直接访问 localStorage 抛 ReferenceError。
 */
function createMemoryStorage(): Storage {
  const map = new Map<string, string>()
  return {
    get length() { return map.size },
    key: (i: number) => Array.from(map.keys())[i] ?? null,
    getItem: (k: string) => map.has(k) ? map.get(k)! : null,
    setItem: (k: string, v: string) => map.set(k, String(v)),
    removeItem: (k: string) => map.delete(k),
    clear: () => map.clear(),
  }
}

export const safeStorage: Storage =
  typeof localStorage !== 'undefined'
    ? localStorage
    : createMemoryStorage()
