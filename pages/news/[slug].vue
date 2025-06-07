<!-- pages/news/[slug].vue -->
<template>
  <LoaderComponent v-if="loading" />
  <div v-else class="flex flex-col gap-4 pt-2">
    <div class="sticky top-0 flex flex-col px-4 pb-2 -ml-6 shadow-lg w-fit">
      <HeaderComponent :title="news.title" :breadcrumb="breadcrumb" />

      <div
        v-if="(news.start && news.end) || news.tags?.length"
        class="flex flex-row items-center gap-2 pt-2 backdrop-blur-sm"
      >
        <!-- Dates -->
        <div v-if="news.start && news.end" class="flex flex-row items-center gap-1 font-semibold">
          <Icon icon="solar:calendar-bold-duotone" width="24" class="text-primary" />
          {{ news.start }} <Icon icon="solar:arrow-right-linear" width="20" /> {{ news.end }}
        </div>

        <!-- Tags -->
        <div v-if="news.tags?.length" class="flex flex-row gap-2">
          <TagComponent v-for="tag in news.tags" :key="tag.slug" :tag="tag" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-html="news.content" class="flex flex-col gap-4" />

    <!-- Attachments -->
    <div v-if="news?.attachment?.id" class="flex flex-col gap-2">
      <div class="text-xl font-semibold text-secondary">Allegato</div>
      <AttachmentComponent
        :title="attachment.title"
        :url="attachment.url"
        :type="attachment.type"
        :size="attachment.size"
        :categories="attachment.categories"
        :tags="attachment.tags"
      />
    </div>
  </div>
</template>

<script setup>
  import TagComponent from '~/components/common/TagComponent.vue'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import AttachmentComponent from '~/components/common/AttachmentComponent.vue'

  import { Icon } from '@iconify/vue'
  import { getPostBySlug, getAttachmentDetails } from '~/api/posts'
  import { useTagsStore } from '~/stores/tags'
  import { useCategoriesStore } from '~/stores/categories'

  const route = useRoute()
  const tagsStore = useTagsStore()
  const categoriesStore = useCategoriesStore()
  const tags = ref([])
  const categories = ref([])

  const loading = ref(false)
  const news = ref([])
  const attachment = ref(null)

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

  onMounted(async () => {
    try {
      loading.value = true

      categories.value = await categoriesStore.getCategories()
      tags.value = await tagsStore.getTags()

      news.value = await getPostBySlug(route.params.slug, categories.value, tags.value)

      if (news.value?.attachment?.id) {
        attachment.value = await getAttachmentDetails(news.value?.attachment?.id, categories.value, tags.value)
      }
      breadcrumb.value.push({ title: news.value.title, slug: route.params.slug })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
