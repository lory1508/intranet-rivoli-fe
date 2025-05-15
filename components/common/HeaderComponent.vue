<template>
  <div class="flex flex-row items-center justify-between gap-4 pb-6 pr-6 font-bold text-primary">
    <div class="text-3xl shrink-0">{{ title }}</div>

    <NMarquee class="max-w-3xl border-b-2 text-amber-600 border-amber-400">
      <div class="flex flex-row gap-2">
        <Icon icon="hugeicons:alert-02" height="24" />
        <span class="whitespace-nowrap">
          Dalle 14.00 alle 16.00 del 20/02/2025 sono previste interruzioni di rete.
        </span>
      </div>
    </NMarquee>

    <div class="shrink-0">Rivoli, {{ formattedToday }}</div>
  </div>
</template>

<script setup>
  import { NMarquee } from 'naive-ui'
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
  })

  const formattedToday = ref(new Date().toLocaleDateString('it-IT'))
</script>
