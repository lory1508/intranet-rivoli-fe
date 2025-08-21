<template>
  <a
    :href="link.href"
    target="_blank"
    class="flex flex-row items-center gap-2 font-semibold transition-all duration-300 hover:text-sky-700 text-sky-950 w-fit rounded-xl hover:bg-opacity-90"
  >
    <Icon
      icon="solar:arrow-right-up-line-duotone"
      height="24"
      class="w-8 h-8 p-2 text-white transition-all duration-300 rounded-full hover:bg-sky-700 bg-sky-900"
    />
    <div>{{ link.title }}</div>
    <!-- <div
      class="flex items-center h-10 px-4 text-xs transition-all duration-300"
      :class="{
        'w-full max-w-48': zoom <= 100 && !monoColumn,
        'w-fit': monoColumn,
        'rounded-t-xl': vertical,
        'rounded-l-xl': !vertical,
      }"
    >
      <NTooltip trigger="hover" class="w-fit">
        <template #trigger>
          <div class="truncate">{{ link?.title }}</div>
        </template>
        <div>
          {{ link?.title }}
        </div>
      </NTooltip>
    </div>
    <div class="h-[1px] bg-white w-full" />
    <div
      class="flex items-center h-10 px-2 transition-all duration-300"
      :class="{
        'rounded-b-xl w-full justify-center': vertical,
        'rounded-r-xl': !vertical,
      }"
    >
      <div v-if="vertical" class="text-sm font-light">Vai all'applicativo</div>
      <Icon icon="solar:arrow-right-up-line-duotone" height="24" />
    </div> -->
  </a>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { NTooltip } from 'naive-ui'
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
