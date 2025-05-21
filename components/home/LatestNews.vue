<template>
  <div class="flex flex-col gap-8">
    <div
      class="flex flex-row items-center justify-between gap-2 p-4 rounded-lg shadow-md bg-secondaryLight text-darkAccent border-secondaryLight shadow-zinc-300"
    >
      <div class="flex flex-row gap-2 pb-2">
        <Icon :icon="icon" height="32" />
        <div class="text-2xl">{{ title }}</div>
      </div>
      <div
        class="flex flex-row items-center gap-2 px-4 py-2 font-semibold tracking-widest text-white uppercase transition-all duration-300 rounded-lg bg-secondary hover:cursor-pointer hover:bg-blue-500"
        @click="goTo('/news')"
      >
        tutte le news
        <Icon icon="solar:arrow-right-line-duotone" height="24" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4">
      <NewsCard v-for="post in news" :key="post.slug" :post="post" />
    </div>
  </div>
</template>

<script setup>
  import NewsCard from '~/components/common/NewsCard.vue'
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

  const news = ref([])
  const pagination = ref()
  const router = useRouter()

  const goTo = (path) => {
    router.push(path)
  }

  onMounted(async () => {
    const res = await getPosts({ categories: ['news'], limit: 6 })
    news.value = res.posts
    pagination.value = res.pagination
  })
</script>
