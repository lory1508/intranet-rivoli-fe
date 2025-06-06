<template>
  <div>
    <HeaderComponent :title="title" :breadcrumb="breadcrumb" />
  </div>
</template>

<script setup>
  import HeaderComponent from '~/components/common/HeaderComponent.vue'

  const title = 'Bacheca RSU'
  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: title,
      slug: '/bacheca-rsu',
    },
  ])
</script>
