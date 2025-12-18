<template>
  <LoaderComponent v-if="loading" />
  <div v-else class="flex flex-col gap-4">
    <HeaderComponent :title="title" :breadcrumb="breadcrumb" />

    <div class="flex flex-col-reverse gap-8 mt-2 xl:flex-row">
      <div v-if="posts.length === 0" class="w-full">
        <NEmpty
          description="Nessun risultato trovato"
          class="p-4 bg-white border w-fit h-fit rounded-xl"
        />
      </div>
      <div v-else class="flex flex-col w-full gap-4 xl:w-2/3">
        <div class="flex flex-col gap-6">
          <NewsCard
            v-for="post in posts"
            :key="post.slug"
            :post="post"
            :vertical="false"
          />
        </div>
        <PaginationComponent
          :total="total"
          :per-page="perPage"
          :current-page="currentPage"
          :per-page-options="[3, 6, 12, 24]"
          @page-change="handlePageChange"
        />
      </div>
      <div
        class="flex flex-col w-full gap-1 p-4 border border-zinc-200 xl:w-1/3 h-fit bg-zinc-100 text-darkAccent shadow-zinc-300 rounded-xl"
      >
        <n-input
          v-model:value="filters.search"
          placeholder="Cerca..."
          type="text"
          @keypress.enter="fetchPosts(true)"
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
        <n-select
          v-model:value="filters.tags"
          :options="optionsTags"
          placeholder="Tag"
          filterable
          multiple
          clearable
        />
        <n-button strong secondary type="info" @click="fetchPosts(true)">
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
  import { getPosts } from "~/api/posts";
  import { Icon } from "@iconify/vue";

  import LoaderComponent from "~/components/common/LoaderComponent.vue";
  import HeaderComponent from "~/components/common/HeaderComponent.vue";
  import PaginationComponent from "~/components/common/PaginationComponent.vue";
  import NewsCard from "~/components/common/NewsCard.vue";

  // store
  import { useTagsStore } from "~/stores/tags";
  const tagsStore = useTagsStore();
  const tags = ref([]);

  const props = defineProps({
    title: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    breadcrumb: {
      type: Array,
      default: () => [],
    },
  });

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
  });
  const optionsTags = computed(() =>
    tags.value.map((tag) => ({ label: tag?.name, value: tag?.documentId }))
  );
  const loading = ref(false);
  const posts = ref([]);

  const fetchPosts = async (search = false) => {
    try {
      loading.value = true;
      if (search) {
        currentPage.value = 1;
      }

      const filtersToRun = ref({ categories: [props.category] });

      if (filters.value.search) {
        filtersToRun.value.query = filters.value.search;
      }
      if (filters.value.range) {
        filtersToRun.value.startDate = new Date(filters.value.range[0])
          .toISOString()
          .split("T")[0];
        filtersToRun.value.endDate = new Date(filters.value.range[1])
          .toISOString()
          .split("T")[0];
      }
      if (filters.value.tags.length > 0) {
        filtersToRun.value.tags = filters.value.tags;
      }

      pagination.value = `pagination[page]=${currentPage.value}&pagination[pageSize]=${perPage.value}`;
      const res = await getPosts(filtersToRun.value, pagination.value);
      posts.value = res.data;
      total.value = res.meta.pagination.total;
      pagination.value = { ...res.meta.pagination };
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const handlePageChange = async (page, itemsPerPage) => {
    currentPage.value = page;
    perPage.value = itemsPerPage;
    posts.value = [];
    await fetchPosts();
  };

  onMounted(async () => {
    await fetchPosts(1);
    tags.value = await tagsStore.getTags();
  });
</script>
