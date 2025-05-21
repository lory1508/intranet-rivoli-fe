<template>
  <LoaderComponent v-if="loading" />
  <div v-else class="flex flex-col gap-4">
    <TitleComponent title="News" :breadcrumb="breadcrumb" />

    <div class="flex flex-col gap-6">
      <NewsCard v-for="post in news" :key="post.slug" :post="post" :vertical="false" />
    </div>
    <NPagination
      v-model:page="pagination.page"
      :page-count="pagination.totalPages"
      size="large"
      @update:page="updatePage"
    />
  </div>
</template>

<script setup>
  import { getPosts } from '~/api/posts'
  import { NPagination } from 'naive-ui'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'
  import TitleComponent from '~/components/common/TitleComponent.vue'
  import NewsCard from '~/components/common/NewsCard.vue'

  const loading = ref(false)
  const news = ref([])
  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'News',
      slug: '/news',
    },
  ])

  const pagination = ref({
    page: 1,
  })

  const updatePage = async (page) => {
    try {
      loading.value = true
      const res = await getPosts({ categories: ['news'], limit: 4, page: page })
      news.value = res.posts
      pagination.value = res.pagination
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await updatePage(1)
  })
</script>
