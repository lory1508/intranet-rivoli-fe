<template>
  <div
    class="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg shadow-amber-400 ring-2 ring-amber-500 border-secondaryLight h-fit"
  >
    <div class="flex flex-row gap-2 pb-2 text-amber-950">
      <Icon :icon="icon" height="32" class="text-amber-500" />
      <div class="text-2xl">{{ title }}</div>
    </div>
    <div class="text-lg">
      {{ message }}
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
    message: {
      type: String,
      default: '',
    },
  })
</script>
