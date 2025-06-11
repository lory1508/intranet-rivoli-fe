<template>
  <div
    class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-indigo-50 text-darkAccent border-secondaryLight shadow-zinc-300"
  >
    <div v-if="icon || title" class="flex flex-row gap-2 pb-2">
      <Icon v-if="icon" :icon="icon" height="32" />
      <div v-if="title" class="text-xl">{{ title }}</div>
    </div>
    <div>
      <div
        class="grid gap-2 pb-2 border-b-2 border-indigo-200"
        :class="monoColumn ? 'grid-cols-1 w-fit' : 'grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2'"
      >
        <div
          v-for="link in links"
          :key="link.slug"
          target="_blank"
          class="flex flex-row items-center w-full font-semibold text-white transition-all duration-300 hover:cursor-pointer rounded-xl hover:ring-2 hover:shadow-md ring-sky-300"
          @click="goto(link.href)"
        >
          <div class="flex items-center w-full h-10 gap-2 pl-4 pr-4 text-xs bg-cyan-700 rounded-l-xl">
            {{ link.title }}
          </div>
          <div class="flex items-center h-10 px-2 bg-cyan-900 rounded-r-xl">
            <Icon icon="solar:arrow-right-up-line-duotone" height="24" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'

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
  })

  const goto = async (href) => {
    await navigateTo(href)
  }
</script>
