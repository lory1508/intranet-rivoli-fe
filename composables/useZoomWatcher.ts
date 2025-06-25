// composables/useZoomWatcher.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useZoomWatcher() {
  const zoom = ref(window.devicePixelRatio)
  let frameId: number

  const checkZoom = () => {
    const currentRatio = window.devicePixelRatio * 100
    if (zoom.value !== currentRatio) {
      zoom.value = currentRatio
    }
    frameId = requestAnimationFrame(checkZoom)
  }

  onMounted(() => {
    frameId = requestAnimationFrame(checkZoom)
  })

  onUnmounted(() => {
    cancelAnimationFrame(frameId)
  })

  return { zoom }
}
