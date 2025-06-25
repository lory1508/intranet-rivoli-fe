<template>
  <div
    class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-indigo-50 text-darkAccent border-secondaryLight shadow-zinc-300"
  >
    <div class="flex flex-row items-center justify-between pb-2">
      <div class="flex flex-row gap-2">
        <Icon :icon="icon" height="32" />
        <div class="text-xl">{{ title }}</div>
      </div>
    </div>
    <div class="flex flex-wrap items-stretch gap-1">
      <LoaderComponent v-if="loading" />
      <div
        v-for="tool in tools"
        v-else
        :key="tool.slug"
        class="flex flex-col items-center justify-start gap-1 p-2 text-white transition-all duration-300 bg-opacity-75 border h-fit border-secondary rounded-2xl bg-secondary hover:ring-2 hover:ring-secondary hover:shadow-md hover:cursor-pointer"
      >
        <a :href="tool.href" target="_blank">
          <Icon :icon="tool.icon" height="36" />
        </a>
        <span class="text-xs font-semibold tracking-tighter text-center">{{ tool.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'

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
