<template>
  <div
    class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-secondaryLight text-darkAccent border-secondaryLight shadow-zinc-300"
  >
    <div class="flex flex-row gap-2 pb-2">
      <Icon :icon="icon" height="32" />
      <div class="text-2xl">{{ title }}</div>
    </div>
    <div class="flex flex-col gap-2">
      <a
        v-for="link in links"
        :key="link.slug"
        :href="link.href"
        target="_blank"
        class="flex flex-row items-center gap-2 px-4 py-1 font-semibold text-white transition-all duration-300 rounded-full bg-darkAccent w-fit hover:ring-2 hover:ring-secondary hover:shadow-md"
      >
        {{ link.title }}
        <Icon icon="solar:round-arrow-right-up-bold-duotone" height="24" />
      </a>
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
  })
</script>
