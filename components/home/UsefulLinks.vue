<template>
  <div
    class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-indigo-50 text-darkAccent border-secondaryLight shadow-zinc-300"
  >
    <div v-if="icon || title" class="flex flex-row items-center justify-between pb-2">
      <div class="flex flex-row gap-2">
        <Icon v-if="icon" :icon="icon" height="32" />
        <div v-if="title" class="text-xl">{{ title }}</div>
      </div>
      <div
        class="flex flex-row items-center gap-2 px-2 py-1 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 rounded-lg bg-secondary hover:cursor-pointer hover:bg-blue-500"
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
          class="grid gap-2 pb-2 border-b-2 border-indigo-200"
          :class="monoColumn ? 'grid-cols-1 w-fit' : 'grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2'"
        >
          <a
            v-for="link in links.filter((link) => link.slugType === type.slug)"
            :key="link.slug"
            :href="link.href"
            target="_blank"
            class="flex flex-row items-center w-full font-semibold text-white transition-all duration-300 rounded-xl hover:ring-2 hover:shadow-md ring-sky-300"
          >
            <div class="flex items-center w-full h-10 gap-2 pl-4 pr-4 text-xs bg-sky-700 rounded-l-xl">
              {{ link.title }}
            </div>
            <div class="flex items-center h-10 px-2 bg-sky-900 rounded-r-xl">
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
  import { customSectionColors } from '~/utils/staticData/constants'

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

  const getCustomColors = (slugType) => {
    return customSectionColors[slugType] || customSectionColors.default
  }
</script>
