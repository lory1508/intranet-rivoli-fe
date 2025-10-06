<template>
  <div class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-zinc-100 text-neutralDark shadow-zinc-300">
    <CardTitle :icon="icon" :title="title" button-destination="/applicativi" button-title="Tutti gli applicativi" />
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
          <div v-for="link in links.filter((link) => link.slugType.includes(type.slug))" :key="link.slug">
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
  import { useZoomWatcher } from '~/composables/useZoomWatcher'
  import CardTitle from '~/components/common/CardTitle.vue'
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
