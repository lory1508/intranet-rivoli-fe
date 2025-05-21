<!-- pages/news/[slug].vue -->
<template>
  <LoaderComponent v-if="loading" />
  <div v-else class="flex flex-col gap-4">
    <TitleComponent :title="news.title" :breadcrumb="breadcrumb" />

    <!-- Tags -->
    <div v-if="news.tags?.length" class="flex flex-row gap-2">
      <TagComponent v-for="tag in news.tags" :key="tag.slug" :tag="tag" />
    </div>

    <!-- Dates -->
    <div v-if="news.start && news.end" class="flex flex-row items-center gap-1 font-semibold">
      <Icon icon="solar:calendar-bold-duotone" width="24" class="text-primary" />
      {{ news.start }} <Icon icon="solar:arrow-right-linear" width="20" /> {{ news.end }}
    </div>

    <!-- Content -->
    <div v-html="news.content" class="flex flex-col gap-4" />

    <!-- Attachments -->
    <div v-if="news?.attachment" class="flex flex-col gap-2">
      <div class="text-xl font-semibold text-secondary">Allegato</div>
      <AttachmentComponent
        :title="news.attachment.title"
        :url="news.attachment.url"
        :type="news.attachment.type"
        :size="news.attachment.size"
      />
    </div>
  </div>
</template>

<script setup>
  import TagComponent from '~/components/common/TagComponent.vue'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'
  import TitleComponent from '~/components/common/TitleComponent.vue'
  import AttachmentComponent from '~/components/common/AttachmentComponent.vue'

  import { Icon } from '@iconify/vue'

  import { getPostBySlug } from '~/api/posts'

  const route = useRoute()

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

  onMounted(async () => {
    try {
      loading.value = true
      news.value = await getPostBySlug(route.params.slug)
      breadcrumb.value.push({ title: news.value.title, slug: route.params.slug })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
