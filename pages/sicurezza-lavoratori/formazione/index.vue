<template>
  <PagePostList :category="category" :title="title" :breadcrumb="breadcrumb" />
</template>

<script setup>
  import PagePostList from '~/components/common/PagePostList.vue'

  const route = useRoute()
  console.log(route)
  const category = ref('formazione-sicurezza-lavoratori')
  const title = ref('Formazione')
  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Sicurezza lavoratori',
      slug: '/sicurezza-lavoratori',
    },
    {
      title: title,
      slug: '/formazione-sicurezza-lavoratori',
    },
  ])
</script>
