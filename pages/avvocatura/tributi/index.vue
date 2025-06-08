<template>
  <LoaderComponent v-if="loading" />
  <div v-else class="flex flex-col gap-4">
    <HeaderComponent title="News" :breadcrumb="breadcrumb" />

    <div class="flex flex-col-reverse gap-8 xl:flex-row">
      <div class="flex flex-col w-full gap-4 xl:w-2/3">
        <div class="flex flex-col gap-6">
          <NewsCard v-for="post in appalti" :key="post.slug" :post="post" :vertical="false" />
        </div>
        <NPagination
          v-model:page="pagination.page"
          :page-count="pagination.totalPages"
          size="large"
          @update:page="updatePage"
        />
      </div>
      <div class="flex flex-col w-full gap-1 p-4 xl:w-1/3 h-fit bg-indigo-50 rounded-xl">
        <n-input
          v-model:value="filters.search"
          placeholder="Cerca..."
          type="text"
          @keypress.enter="runSearch"
          clearable
        />
        <n-date-picker
          v-model:value="filters.range"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="Da"
          end-placeholder="A"
          clearable
        />
        <n-select v-model:value="filters.tags" :options="optionsTags" placeholder="Tag" filterable multiple clearable />
        <n-button strong secondary type="info" @click="runSearch">
          Cerca
          <template #icon>
            <n-icon>
              <Icon icon="solar:magnifer-line-duotone" height="24" />
            </n-icon>
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { getPosts } from '~/api/posts'
  import { NPagination } from 'naive-ui'
  import { Icon } from '@iconify/vue'

  import LoaderComponent from '~/components/common/LoaderComponent.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import NewsCard from '~/components/common/NewsCard.vue'

  // store
  import { useCategoriesStore } from '~/stores/categories'
  import { useTagsStore } from '~/stores/tags'
  const categoriesStore = useCategoriesStore()
  const tagsStore = useTagsStore()
  const categories = ref([])
  const tags = ref([])

  const filters = ref({
    search: null,
    tags: [],
    range: null,
  })
  const optionsTags = computed(() => tags.value.map((tag) => ({ label: tag?.name, value: tag?.id })))
  const loading = ref(false)
  const appalti = ref([])
  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Avvocatura',
      slug: '/avvocatura',
    },
    {
      title: 'Appalti',
      slug: '/appalti',
    },
  ])

  const pagination = ref({
    page: 1,
  })

  const updatePage = async (page) => {
    try {
      loading.value = true
      const filtersToRun = { categories: ['appalti'], limit: 4, page: page, ...filters.value }
      if (filtersToRun.tags.length === 0) delete filtersToRun.tags
      if (!filtersToRun.range) delete filtersToRun.range

      categories.value = await categoriesStore.getCategories()
      tags.value = await tagsStore.getTags()

      const res = await getPosts(filtersToRun, categories.value, tags.value)
      appalti.value = res.posts
      pagination.value = res.pagination
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const runSearch = async () => {
    try {
      loading.value = true
      const filtersToRun = { categories: ['appalti'], limit: 4, page: 1, ...filters.value }
      if (filtersToRun.tags.length === 0) delete filtersToRun.tags
      if (!filtersToRun.range) delete filtersToRun.range

      categories.value = await categoriesStore.getCategories()
      tags.value = await tagsStore.getTags()

      const res = await getPosts(filtersToRun, categories.value, tags.value)
      appalti.value = res.posts
      pagination.value = res.pagination
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await updatePage(1)
    // tags.value = tagsStore.getTags
  })
</script>
