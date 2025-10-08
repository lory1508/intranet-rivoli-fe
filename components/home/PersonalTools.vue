<template>
  <div class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-zinc-100 text-primary shadow-zinc-300">
    <CardTitle :icon="icon" :title="title" />
    <div class="flex flex-wrap items-stretch justify-center gap-1">
      <LoaderComponent v-if="loading" />
      <div
        v-for="tool in tools"
        v-else
        :key="tool.slug"
        class="flex flex-col items-center justify-start gap-1 p-2 text-white transition-all duration-300 border bg-opacity-85 h-fit border-primary rounded-2xl bg-primary hover:ring-2 hover:ring-primary hover:shadow-md hover:cursor-pointer"
      >
        <a :href="tool.href" target="_blank">
          <Icon :icon="tool.icon" height="36" />
        </a>
        <span
          class="font-semibold tracking-tighter text-center"
          :class="{ 'text-lg': isLargeFont, 'text-xs': !isLargeFont, 'bg-black text-white': isHighContrast }"
          >{{ tool.title }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { useAccessibilityStore } from '@/stores/accessibilityStore'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'
  import CardTitle from '~/components/common/CardTitle.vue'

  const accessibilityStore = useAccessibilityStore()
  const isLargeFont = computed(() => accessibilityStore.isLargeFont)
  const isHighContrast = computed(() => accessibilityStore.isHighContrast)

  const props = defineProps({
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    tools: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })
</script>
