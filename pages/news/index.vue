<template>
  <LoaderComponent v-if="loading" />
  <div v-else class="flex flex-col gap-4">
    <HeaderComponent title="News" :breadcrumb="breadcrumb" />

    <div class="flex flex-col-reverse gap-8 xl:flex-row">
      <div v-if="news.length === 0" class="w-full">
        <NEmpty description="Nessun risultato trovato" class="p-4 bg-white border w-fit h-fit rounded-xl" />
      </div>
      <div v-else class="flex flex-col w-full gap-4 xl:w-2/3">
        <div class="flex flex-col gap-6">
          <NewsCard v-for="post in news" :key="post.slug" :post="post" :vertical="false" />
        </div>
        <!-- <NPagination
          v-model:page="pagination.page"
          :page-count="pagination.totalPages"
          size="large"
          @update:page="updatePage"
        /> -->
        <PaginationComponent
          :total="total"
          :per-page="perPage"
          :current-page="currentPage"
          :per-page-options="[3, 6, 12, 24]"
          @page-change="handlePageChange"
        />
      </div>
      <div
        class="flex flex-col w-full gap-1 p-4 border bg-zinc-100 border-zinc-200 xl:w-1/3 h-fit text-primary shadow-zinc-300 rounded-xl"
      >
        <n-input
          v-model:value="filters.search"
          placeholder="Cerca..."
          type="text"
          clearable
          @keypress.enter="getNews(true)"
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
        <n-button strong secondary type="error" @click="getNews(true)">
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
  import { Icon } from '@iconify/vue'

  import LoaderComponent from '~/components/common/LoaderComponent.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import PaginationComponent from '~/components/common/PaginationComponent.vue'
  import NewsCard from '~/components/common/NewsCard.vue'

  // store
  import { useCategoriesStore } from '~/stores/categories'
  import { useTagsStore } from '~/stores/tags'
  const categoriesStore = useCategoriesStore()
  const tagsStore = useTagsStore()
  const categories = ref([])
  const tags = ref([])

  const currentPage = ref(1);
  const total = ref(0);
  const perPage = ref(6);
  
  const pagination = ref({
    page: currentPage.value,
    itemCount: total.value,
    perPage: perPage.value,
    "show-size-picker": true,
  });
  
  const filters = ref({
    search: null,
    tags: [],
    range: null,
  })
  const optionsTags = computed(() => tags.value.map((tag) => ({ label: tag?.name, value: tag?.id })))
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

  const getNews = async (search=false) => {
    try {
      loading.value = true
      if(search){
        currentPage.value = 1
      }

      const filtersToRun = ref({categories: ['news']})

      if(filters.value.search){
        filtersToRun.value.query = filters.value.search
      }
      // const filtersToRun = { categories: ['news'], limit: 4, page: page, ...filters.value }
      
      // if (filtersToRun.tags.length === 0) delete filtersToRun.tags
      // if (!filtersToRun.range) delete filtersToRun.range
      

      pagination.value  =`pagination[page]=${currentPage.value}&pagination[pageSize]=${perPage.value}`
      const res = await getPosts(filtersToRun.value, pagination.value)
      news.value = res.data
      total.value = res.meta.pagination.total
      pagination.value = {...res.meta.pagination}
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const handlePageChange = async (page, itemsPerPage) => {
    currentPage.value = page;
    perPage.value = itemsPerPage;
    news.value = [];
    await getNews();
  };

  const runSearch = async () => {
    try {
      loading.value = true
      const filtersToRun = { categories: ['news'], limit: 4, page: 1, ...filters.value }
      if (filtersToRun.tags.length === 0) delete filtersToRun.tags
      if (!filtersToRun.range) delete filtersToRun.range

      categories.value = await categoriesStore.getCategories()
      tags.value = await tagsStore.getTags()

      const res = await getPosts(filtersToRun, pagination.value)
      news.value = res.data
      total.value = res.meta.pagination.total
      pagination.value = {...res.meta.pagination}
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await getNews()
    
      categories.value = await categoriesStore.getCategories()
      tags.value = await tagsStore.getTags()
  })
</script>
