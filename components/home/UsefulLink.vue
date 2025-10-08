<template>
  <a
    :href="link.href"
    target="_blank"
    class="flex flex-row items-center gap-2 font-semibold transition-all duration-300 hover:translate-x-2 hover:text-opacity-95 text-neutralDark w-fit rounded-xl hover:bg-opacity-90"
    :class="{ 'text-xl': isLargeFont, 'text-base': !isLargeFont, 'bg-black text-white': isHighContrast }"
  >
    <Icon
      icon="solar:arrow-right-up-linear"
      height="24"
      class="w-8 h-8 p-1 text-white transition-all duration-300 rounded-full hover:bg-opacity-95 bg-primary"
    />
    <div>{{ link.title }}</div>
  </a>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { useAccessibilityStore } from '@/stores/accessibilityStore'

  const accessibilityStore = useAccessibilityStore()
  const isLargeFont = computed(() => accessibilityStore.isLargeFont)
  const isHighContrast = computed(() => accessibilityStore.isHighContrast)

  const props = defineProps({
    link: {
      type: Object,
      default: () => {},
    },
    monoColumn: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  })
</script>
