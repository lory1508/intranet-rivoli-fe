<template>
  <div>
    <pre>{{ route }}</pre>
  </div>
</template>

<script setup>
  import { useCategoriesStore } from '~/stores/categories'
  import { useTagsStore } from '~/stores/tags'
  // import { getPostBySlug } from '~/api/posts'

  const route = useRoute()

  const categoriesStore = useCategoriesStore()
  const tagsStore = useTagsStore()
  const categories = ref([])
  const tags = ref([])

  onMounted(async () => {
    categories.value = await categoriesStore.getCategories()
    tags.value = await tagsStore.getTags()
  })
</script>
