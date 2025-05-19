<template>
  <div
    class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-secondaryLight text-darkAccent border-secondaryLight shadow-zinc-300"
  >
    <div class="flex flex-row gap-2 pb-2">
      <Icon :icon="icon" height="32" />
      <div class="text-2xl">{{ title }}</div>
    </div>
    <div class="grid grid-cols-2 gap-2 xl:grid-cols-1 2xl:grid-cols-2">
      <a
        v-for="link in links"
        :key="link.slug"
        :href="link.href"
        target="_blank"
        class="flex flex-row items-center w-full font-semibold text-white transition-all duration-300 rounded-xl hover:ring-2 hover:ring-secondary hover:shadow-md"
      >
        <div class="flex items-center w-full h-10 gap-2 pl-4 rounded-l-xl" :class="getCustomColors(link.slugType).bg">
          <Icon v-if="link.slugType === 'edilizia'" icon="hugeicons:building-05" height="20" class="text-white" />
          {{ link.title }}
        </div>
        <div class="flex items-center h-10 px-2 rounded-r-xl" :class="getCustomColors(link.slugType).iconBg">
          <Icon icon="solar:arrow-right-up-line-duotone" height="24" />
        </div>
      </a>
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
  })

  const getCustomColors = (slugType) => {
    return customSectionColors[slugType] || customSectionColors.default
  }
</script>
