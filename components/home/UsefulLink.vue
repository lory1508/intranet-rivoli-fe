<template>
  <a
    :href="link.href"
    target="_blank"
    class="flex flex-row items-center gap-2 font-semibold transition-all duration-300 hover:translate-x-2 hover:text-sky-700 text-sky-950 w-fit rounded-xl hover:bg-opacity-90"
  >
    <Icon
      icon="solar:arrow-right-up-linear"
      height="24"
      class="w-8 h-8 p-1 text-white transition-all duration-300 rounded-full hover:bg-sky-700 bg-sky-900"
    />
    <div>{{ link.title }}</div>
  </a>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { useZoomWatcher } from '~/composables/useZoomWatcher'

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

  const { zoom } = useZoomWatcher()
</script>
