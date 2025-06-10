<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-indigo-50 text-darkAccent border-secondaryLight shadow-zinc-300"
    >
      <div class="flex flex-row gap-2 pb-2">
        <Icon :icon="icon" height="32" />
        <div class="text-xl">{{ title }}</div>
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
    const res = await getPosts({ categories: ['news'], limit: 3 }, categories, tags)
    news.value = res.posts
    pagination.value = res.pagination
  })
</script>
