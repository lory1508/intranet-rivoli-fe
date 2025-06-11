<template>
  <LoaderComponent v-if="loading" />
  <div v-else>
    <div v-if="post">
      <HeaderComponent :title="post.title" :breadcrumb="breadcrumb" />

      <!-- Tags -->
      <div v-if="post.tags?.length" class="flex flex-row gap-2">
        <TagComponent v-for="tag in post.tags" :key="tag.slug" :tag="tag" color="indigo" />
      </div>

      <!-- Content -->
      <div v-html="post.content" class="flex flex-col gap-4 pt-4" />

      <!-- Attachments -->
      <div v-if="post?.attachment?.id" class="flex flex-col gap-2">
        <div class="text-xl font-semibold text-secondary">Allegato</div>
        <AttachmentComponent
          :title="post?.attachment?.title"
          :url="post?.attachment?.url"
          :type="post?.attachment?.type"
          :size="post?.attachment?.size"
          :categories="post?.attachment?.categories"
          :tags="post?.attachment?.tags"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import LoaderComponent from '~/components/common/LoaderComponent.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import TagComponent from '~/components/common/TagComponent.vue'
  import AttachmentComponent from '~/components/common/AttachmentComponent.vue'

  import { useCategoriesStore } from '~/stores/categories'
  import { useTagsStore } from '~/stores/tags'
  import { getPostById } from '~/api/posts'

  const route = useRoute()

  const categoriesStore = useCategoriesStore()
  const tagsStore = useTagsStore()
  const categories = ref([])
  const tags = ref([])
  const post = ref(null)
  const loading = ref(false)

  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
  ])

  onMounted(async () => {
    try {
      loading.value = true
      const id = route.query.id || null
      if (!id) return
      route.path
        .split('/')
        .slice(1)
        .map((item) => item.split('-').join(' '))
        .forEach((item) => {
          breadcrumb.value.push({
            title: item.toString().charAt(0).toUpperCase() + item.toString().slice(1),
            slug: `/${item}`,
          })
        })

      categories.value = await categoriesStore.getCategories()
      tags.value = await tagsStore.getTags()

      const resPost = await getPostById(id, categories.value, tags.value)
      post.value = resPost
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  })
</script>
