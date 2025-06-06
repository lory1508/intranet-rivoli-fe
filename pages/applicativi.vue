<template>
  <div>
    <LoaderComponent v-if="loading" />
    <div v-else>
      <HeaderComponent title="Applicativi" :breadcrumb="breadcrumb" />

      <!-- Link utili generali -->
      <UsefulLinks :links="usefulLinks" :categories="usefulLinksCategories" class="w-full" mono-column />
    </div>
  </div>
</template>

<script setup>
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'

  import UsefulLinks from '~/components/home/UsefulLinks.vue'
  import { getExternalLinks } from '~/api/externalLinks'

  const loading = ref(false)
  const usefulLinks = ref([])
  const usefulLinksCategories = ref([])

  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Applicativi',
      slug: '/applicativi',
    },
  ])

  onMounted(async () => {
    try {
      loading.value = true
      usefulLinks.value = await getExternalLinks()
      const tmpCats = [...new Set(usefulLinks.value.map((link) => link.slugType))]
      tmpCats.forEach((cat) => {
        usefulLinksCategories.value.push({
          title: usefulLinks.value.find((link) => link.slugType === cat).type,
          slug: cat,
        })
      })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
