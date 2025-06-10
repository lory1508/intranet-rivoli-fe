<template>
  <PagePostList :category="category" :title="title" :breadcrumb="breadcrumb" />
</template>

<script setup>
  import PagePostList from '~/components/common/PagePostList.vue'

  const category = ref('riscarcimento-danno')
  const title = ref('Risarcimento danno')
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
      slug: '/riscarcimento-danno',
    },
  ])
</script>
