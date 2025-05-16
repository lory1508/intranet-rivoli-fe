<template>
  <div class="flex flex-col w-full gap-2">
    <HeaderComponent :title="homeStaticData.title" />

    <div class="flex flex-row w-full gap-4">
      <div class="flex flex-col w-full gap-4">
        <!-- Rubrica -->
        <RubricaCard
          :title="homeStaticData.rubrica.title"
          :icon="homeStaticData.rubrica.icon"
          @search="searchRubrica"
        />

        <!-- Link utili generali -->
        <UsefulLinks
          :title="homeStaticData.usefulLinks.title"
          :icon="homeStaticData.usefulLinks.icon"
          :links="usefulLinks"
        />
      </div>

      <div class="flex flex-col w-full gap-4">
        <!-- Comunicazioni di servizio -->
        <!-- <AlertCard :title="homeStaticData.alerts.title" :icon="homeStaticData.alerts.icon" :message="alertMessage" /> -->

        <!-- Strumenti personali -->
        <PersonalTools
          :title="homeStaticData.personalTools.title"
          :icon="homeStaticData.personalTools.icon"
          :tools="personalTools"
          :loading="loading"
        />

        <!-- Bacheca dipendenti -->
        <EmployeesBoard :title="homeStaticData.employeesBoard.title" :icon="homeStaticData.employeesBoard.icon" />

        <!-- Link utili edilizia -->
        <UsefulLinks
          :title="homeStaticData.edilizia.title"
          :icon="homeStaticData.edilizia.icon"
          :links="ediliziaLinks"
        />
      </div>
    </div>

    <NDivider />

    <!-- News -->
    <LatestNews :title="homeStaticData.news.title" :icon="homeStaticData.news.icon" />
  </div>
</template>

<script setup>
  import AlertCard from '~/components/home/AlertCard.vue'
  import RubricaCard from '~/components/home/RubricaCard.vue'
  import EmployeesBoard from '~/components/home/EmployeesBoard.vue'
  import UsefulLinks from '~/components/home/UsefulLinks.vue'
  import LatestNews from '~/components/home/LatestNews.vue'
  import PersonalTools from '~/components/home/PersonalTools.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'

  import { getExternalLinksByType } from '~/api/externalLinks'
  import { homeStaticData } from '~/utils/staticData/home'

  const personalTools = ref([])
  const usefulLinks = ref([])
  const ediliziaLinks = ref([])

  const loading = ref(false)
  const alertMessage = 'Dalle 14.00 alle 16.00 del 20/02/2025 sono previste interruzioni di rete.'

  const searchRubrica = async (query) => {
    await navigateTo({
      path: '/rubrica',
      query,
    })
  }

  const getExternalLinksBySlug = async (slug) => {
    try {
      loading.value = true
      return await getExternalLinksByType(slug)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    personalTools.value = await getExternalLinksBySlug('strumenti-personali')
    usefulLinks.value = await getExternalLinksBySlug('link-utili')
    ediliziaLinks.value = await getExternalLinksBySlug('edilizia')
  })
</script>
