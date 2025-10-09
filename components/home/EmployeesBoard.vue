<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex flex-col gap-2 p-4 rounded-lg"
      :class="{
        'bg-white border-2 border-zinc-800 ': isHighContrast,
        ' bg-zinc-100 shadow-zinc-300 shadow-md text-primary': !isHighContrast,
      }"
    >
      <CardTitle :icon="icon" :title="title" button-destination="/bacheca-dipendenti" button-title="Tutti gli avvisi" />
    </div>
    <div class="flex flex-wrap gap-4">
      <NewsCard v-for="post in news" :key="post.slug" :post="post" :vertical="false" hide-content />
    </div>
  </div>
</template>

<script setup>
  import NewsCard from '~/components/common/NewsCard.vue'
  import CardTitle from '~/components/common/CardTitle.vue'
  import { getPosts } from '~/api/posts'
  // stores
  import { useCategoriesStore } from '~/stores/categories'
  import { useTagsStore } from '~/stores/tags'
  import { useAccessibilityStore } from '@/stores/accessibilityStore'

  const accessibilityStore = useAccessibilityStore()
  const isLargeFont = computed(() => accessibilityStore.isLargeFont)
  const isHighContrast = computed(() => accessibilityStore.isHighContrast)

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
