<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-zinc-100 text-primary shadow-zinc-300">
      <div v-if="icon || title" class="flex flex-row items-center justify-between pb-2">
        <div class="flex flex-row items-center justify-center gap-2">
          <Icon v-if="icon" :icon="icon" height="32" />
          <div v-if="title" class="text-xl font-semibold">{{ title }}</div>
        </div>
        <Button
          icon="solar:arrow-right-linear"
          title="Tutti gli avvisi"
          width="w-fit"
          icon-placement="right"
          @clicked="$router.push('/bacheca-dipendenti')"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4">
      <NewsCard v-for="post in news" :key="post.slug" :post="post" :vertical="false" hide-content />
    </div>
  </div>
</template>

<script setup>
  import NewsCard from '~/components/common/NewsCard.vue'
  import Button from '~/components/common/Button.vue'
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
