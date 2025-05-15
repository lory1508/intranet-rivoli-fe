<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-secondaryLight text-darkAccent border-secondaryLight shadow-zinc-300"
    >
      <div class="flex flex-row gap-2 pb-2">
        <Icon :icon="icon" height="32" />
        <div class="text-2xl">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { getPosts } from '~/api/posts'

  const props = defineProps({
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  })

  const posts = await getPosts({ categories: [''] })
</script>
