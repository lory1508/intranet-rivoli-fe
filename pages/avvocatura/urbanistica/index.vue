<template>
  <PagePostList :category="category" :title="title" :breadcrumb="breadcrumb" />
</template>

<script setup>
  import PagePostList from '~/components/common/PagePostList.vue'

  const category = ref('urbanistica')
  const title = ref('Urbanistica')
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
      title: title,
      slug: '/urbanistica',
    },
  ])
</script>
