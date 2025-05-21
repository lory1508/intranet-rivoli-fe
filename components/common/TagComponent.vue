<template>
  <div class="px-3 text-sm rounded-full w-fit bg-primaryLight text-primary">{{ tag.name }}</div>
</template>

<script setup>
  const props = defineProps({
    tag: {
      type: Object,
      default: () => {},
    },
  })
</script>
