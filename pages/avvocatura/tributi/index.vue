<template>
  <PagePostList :category="category" :title="title" :breadcrumb="breadcrumb" />
</template>

<script setup>
  import PagePostList from '~/components/common/PagePostList.vue'

  const category = ref('tributi')
  const title = ref('Tributi')
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
      slug: '/tributi',
    },
  ])
</script>
