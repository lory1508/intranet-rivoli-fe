<template>
  <PagePostList :category="category" :title="title" :breadcrumb="breadcrumb" />
</template>

<script setup>
  import PagePostList from '~/components/common/PagePostList.vue'

  const route = useRoute()

  const category = ref(route.path.split('/').at(-1))
  const title = ref(category.value.split('-').join(' '))
  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: title,
      slug: category,
    },
  ])
</script>
