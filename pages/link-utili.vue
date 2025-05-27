<template>
  <div>
    <LoaderComponent v-if="loading" />
    <div v-else>
      <TitleComponent title="Link utili" :breadcrumb="breadcrumb" />

      <!-- Link utili generali -->
      <UsefulLinks :links="usefulLinks" class="w-full" mono-column />
    </div>
  </div>
</template>

<script setup>
  import TitleComponent from '~/components/common/TitleComponent.vue'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'

  import UsefulLinks from '~/components/home/UsefulLinks.vue'
  import { getExternalLinks } from '~/api/externalLinks'

  const loading = ref(false)
  const usefulLinks = ref([])

  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Link Utili',
      slug: '/link-utili',
    },
  ])

  onMounted(async () => {
    try {
      loading.value = true
      usefulLinks.value = await getExternalLinks()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
