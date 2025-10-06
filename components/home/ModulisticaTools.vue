<template>
  <div class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-zinc-100 text-primary shadow-zinc-300">
    <CardTitle :icon="icon" :title="title" />

    <div>
      <div
        class="grid gap-2 pb-2 border-b-2 border-zinc-200"
        :class="monoColumn ? 'grid-cols-1 w-fit' : 'grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2'"
      >
        <div
          v-for="link in links"
          :key="link.slug"
          target="_blank"
          class="flex flex-row items-center w-full hover:cursor-pointer rounded-xl"
          @click="goto(link.href)"
        >
          <Button
            :title="link.title"
            color="gray"
            icon="solar:arrow-right-up-linear"
            icon-placement="right"
            @clicked="goto(link.href)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  })

  const goto = async (href) => {
    await navigateTo(href)
  }
</script>
