<template>
  <PagePostList :category="category" :title="title" :breadcrumb="breadcrumb" />
</template>

<script setup>
  import PagePostList from '~/components/common/PagePostList.vue'

  const category = ref('formazione')
  const title = ref('Formazione')
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
      slug: '/formazione',
    },
  ])
</script>
