<template>
  <div class="flex flex-col gap-1 pt-4 pb-2">
    <div class="text-xl font-semibold text-primary">{{ title }}</div>
    <div class="flex flex-row gap-1 text-sm">
      <div
        v-for="item in breadcrumb"
        class="flex"
        :key="item.slug"
        :class="{
          'text-secondary': item.slug !== breadcrumb[breadcrumb.length - 1].slug,
        }"
      >
        <div
          v-if="item.slug !== breadcrumb[breadcrumb.length - 1].slug"
          @click="$router.push(item.slug)"
          class="hover:cursor-pointer"
        >
          {{ item.title }}
        </div>
        <div v-else class="text-zinc-500">
          {{ item.title }}
        </div>
        <span v-if="item.slug !== breadcrumb[breadcrumb.length - 1].slug" class="px-2 text-zinc-500">/</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    breadcrumb: {
      type: Array,
      default: () => [],
    },
  })
</script>
