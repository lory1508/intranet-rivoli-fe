<template>
  <div class="flex flex-col gap-8">
    <div
      class="flex flex-row items-center justify-between gap-2 p-4 rounded-lg shadow-md bg-zinc-100 text-primary border-secondaryLight shadow-zinc-300"
    >
      <div class="flex flex-row items-center justify-center gap-2">
        <Icon :icon="icon" height="32" />
        <div class="text-xl font-semibold">{{ title }}</div>
      </div>
      <Button
        icon="solar:arrow-right-linear"
        title="Tutte le news"
        width="w-fit"
        icon-placement="right"
        @clicked="$router.push('/news')"
      />
    </div>
    <div class="flex flex-wrap w-full gap-4">
      <NewsCard v-for="post in news" :key="post.slug" :post="post" />
    </div>
  </div>
</template>

<script setup>
  import Button from '~/components/common/Button.vue'
  import NewsCard from '~/components/common/NewsCard.vue'
  import { Icon } from '@iconify/vue'
  import { getPosts } from '~/api/posts'

  // stores
  import { useCategoriesStore } from '~/stores/categories'
  import { useTagsStore } from '~/stores/tags'
  const categoriesStore = useCategoriesStore()
  const tagsStore = useTagsStore()

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
    const categories = await categoriesStore.getCategories()
    const tags = await tagsStore.getTags()
    const res = await getPosts({ categories: ['news'], limit: 6 }, categories, tags)
    news.value = res.posts
    pagination.value = res.pagination
  })
</script>
