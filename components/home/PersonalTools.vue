<template>
  <div
    class="flex flex-col gap-2 p-4 rounded-lg"
    :class="{
      'bg-white border-2 border-zinc-800 ': isHighContrast,
      ' bg-zinc-100 shadow-zinc-300 shadow-md text-primary': !isHighContrast,
    }"
  >
    <CardTitle :icon="icon" :title="title" />
    <div class="flex flex-wrap items-stretch justify-center gap-1">
      <LoaderComponent v-if="loading" />
      <div
        v-for="tool in tools"
        v-else
        :key="tool.slug"
        class="flex flex-col items-center justify-start gap-1 p-2 text-white transition-all duration-300 border bg-opacity-85 h-fit rounded-2xl hover:ring-2 hover:shadow-md hover:cursor-pointer"
        :class="{
          'bg-black hover:ring-zinc-800 ': isHighContrast,
          ' bg-primary hover:ring-primary': !isHighContrast,
        }"
        @click="goToTool(tool.href)"
      >
        <a :href="tool.href" target="_blank">
          <Icon :icon="tool.icon" height="36" />
        </a>
        <span
          class="font-semibold tracking-tighter text-center"
          :class="{ 'text-lg': isLargeFont, 'text-xs': !isLargeFont }"
        >
          {{ tool.title }}
        </span>
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

  const goToTool = async (tool) => {
    await navigateTo(tool, { external: true, open: { target: '_blank' } })
  }
</script>
