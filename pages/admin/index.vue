<template>
  <div>
    <LoaderComponent v-if="loading" />
    <div v-else class="flex flex-col gap-4">
      <HeaderComponent title="Rubrica" :breadcrumb="breadcrumb" />
      <div>
        <ProfilePictureUploader />
      </div>
    </div>
  </div>
</template>

<script setup>
  import LoaderComponent from '~/components/common/LoaderComponent.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import ProfilePictureUploader from '~/components/admin/ProfilePictureUploader.vue'

  const loading = ref(false)
  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Admin',
      slug: '/admin',
    },
  ])
</script>
