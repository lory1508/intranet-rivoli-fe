<template>
  <div class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-zinc-100 text-primary shadow-zinc-300">
    <div v-if="icon || title" class="flex flex-row items-center justify-between pb-2">
      <div class="flex flex-row gap-2">
        <Icon v-if="icon" :icon="icon" height="32" />
        <div v-if="title" class="text-xl font-semibold">{{ title }}</div>
      </div>
      <div
        class="flex flex-row items-center gap-2 px-2 py-1 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 rounded-lg bg-primary hover:cursor-pointer hover:bg-opacity-85"
        @click="$router.push('/applicativi')"
      >
        altri applicativi
        <Icon icon="solar:arrow-right-line-duotone" height="24" />
      </div>
    </div>
    <div>
      <div v-for="type in categories" :key="type.slug">
        <div class="pt-2 text-lg font-semibold">{{ type.title }}</div>
        <div
          class="grid gap-2 pb-2 border-b-2 border-zinc-200"
          :class="{
            'grid-cols-1 w-fit': monoColumn,
            'grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2': !monoColumn && zoom <= 100,
            'grid-cols-1 w-fit': zoom > 100,
          }"
        >
          <a
            v-for="link in links.filter((link) => link.slugType === type.slug)"
            :key="link.slug"
            :href="link.href"
            target="_blank"
            class="flex flex-row items-center font-semibold text-white w-fit rounded-xl"
          >
            <div
              class="flex items-center h-10 px-4 text-xs transition-all duration-300 bg-primary bg-opacity-90 rounded-l-xl hover:bg-opacity-95"
              :class="zoom <= 100 && !monoColumn ? 'w-full max-w-48' : 'w-fit'"
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
            <div class="flex items-center h-10 px-2 bg-primary rounded-r-xl">
              <Icon icon="solar:arrow-right-up-line-duotone" height="24" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { NTooltip } from 'naive-ui'
  import { useZoomWatcher } from '~/composables/useZoomWatcher'

  const props = defineProps({
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    links: {
      type: Array,
      default: () => [],
    },
    monoColumn: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Array,
      default: () => [],
    },
  })

  const { zoom } = useZoomWatcher()
</script>
