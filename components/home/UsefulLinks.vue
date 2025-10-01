<template>
  <div class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-zinc-100 text-primary shadow-zinc-300">
    <div v-if="icon || title" class="flex flex-row items-center justify-between pb-2">
      <div class="flex flex-row gap-2">
        <Icon v-if="icon" :icon="icon" height="32" />
        <div v-if="title" class="text-xl font-semibold">{{ title }}</div>
      </div>
      <Button
        icon="solar:arrow-right-linear"
        title="Tutti gli applicativi"
        width="w-fit"
        icon-placement="right"
        @clicked="$router.push('/applicativi')"
      />
    </div>
    <div>
      <div v-for="type in categories" :key="type.slug">
        <div class="pt-2 text-lg font-semibold text-center">{{ type.title }}</div>
        <div
          class="grid gap-2 pb-2 border-b-2 border-zinc-200"
          :class="{
            'grid-cols-1 w-fit': monoColumn,
            'grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2': !monoColumn && zoom <= 100,
            'grid-cols-1 w-fit': zoom > 100,
          }"
        >
          <div v-for="link in links.filter((link) => link.slugType === type.slug)" :key="link.slug">
            <Button
              :title="link.title"
              color="gray"
              icon="solar:arrow-right-up-linear"
              icon-placement="right"
              show-tooltip
              @clicked="goto(link.href)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { useZoomWatcher } from '~/composables/useZoomWatcher'
  import Button from '~/components/common/Button.vue'

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

  const { zoom } = useZoomWatcher()

  const goto = (href) => {
    window.open(href, '_blank')
  }
</script>
