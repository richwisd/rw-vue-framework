import { ref } from 'vue'

export function useMouse() {
  const show = ref(true)
  const timeoutId = ref()
  const isAnimating = ref(false)

  const handleMouseEnter = () => {
    // 如果正在动画中，则不触发新的动画
    if (isAnimating.value) {
      return
    }

    // 清除可能存在的定时器
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
    // 开始动画
    isAnimating.value = true
    show.value = false

    timeoutId.value = setTimeout(() => {
      show.value = true
    }, 500)
  }

  const handleMouseLeave = () => {
    // 鼠标离开时重置动画状态，允许下次进入时重新触发
    isAnimating.value = false
  }

  return {
    show,
    handleMouseEnter,
    handleMouseLeave
  }
}
