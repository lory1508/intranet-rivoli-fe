<template>
  <div
    class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-secondaryLight text-darkAccent border-secondaryLight shadow-zinc-300"
  >
    <div class="flex flex-row gap-2 pb-2">
      <Icon :icon="icon" height="32" />
      <div class="text-2xl">{{ title }}</div>
    </div>
    <div class="flex flex-row gap-2">
      <LoaderComponent v-if="loading" />
      <NTooltip v-else v-for="tool in tools" :key="tool.slug">
        <template #trigger>
          <a
            :href="tool.href"
            target="_blank"
            class="p-2 text-white transition-all duration-300 bg-opacity-75 border border-secondary rounded-2xl bg-secondary hover:ring-2 hover:ring-secondary hover:shadow-md"
          >
            <Icon :icon="tool.icon" height="48" />
          </a>
        </template>
        <span>{{ tool.title }}</span>
      </NTooltip>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { NTooltip } from 'naive-ui'
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
