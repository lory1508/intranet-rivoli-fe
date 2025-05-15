<template>
  <div class="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm">
    <div
      class="flex flex-col items-center justify-center gap-4 p-4 border shadow-lg rounded-xl bg-secondaryLight text-secondary border-secondary w-fit"
    >
      <Icon icon="svg-spinners:ring-resize" height="48" />
      <div class="text-xl">Caricamento in corso...</div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
</script>
