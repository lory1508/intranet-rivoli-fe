<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-zinc-100 text-primary shadow-zinc-300">
      <div v-if="icon || title" class="flex flex-row items-center justify-between pb-2">
        <div class="flex flex-row gap-2">
          <Icon v-if="icon" :icon="icon" height="32" />
          <div v-if="title" class="text-xl font-semibold">{{ title }}</div>
        </div>
        <div
          class="flex flex-row items-center gap-2 px-2 py-1 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 rounded-lg bg-primary hover:cursor-pointer hover:bg-opacity-90"
          @click="$router.push('/bacheca-dipendenti')"
        >
          tutti gli avvisi
          <Icon icon="solar:arrow-right-line-duotone" height="24" />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-4">
      <NewsCard v-for="post in news" :key="post.slug" :post="post" :vertical="false" hide-content />
    </div>
  </div>
</template>

<script setup>
  import NewsCard from '~/components/common/NewsCard.vue'
  import { Icon } from '@iconify/vue'
  import { getPosts } from '~/api/posts'
  // stores
  import { useCategoriesStore } from '~/stores/categories'
  import { useTagsStore } from '~/stores/tags'

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

  const categoriesStore = useCategoriesStore()
  const tagsStore = useTagsStore()

  const news = ref([])
  const pagination = ref()

  onMounted(async () => {
    const categories = await categoriesStore.getCategories()
    const tags = await tagsStore.getTags()
    const res = await getPosts({ categories: ['bacheca-dipendenti'], limit: 3 }, categories, tags)
    news.value = res.posts
    pagination.value = res.pagination
  })
</script>
