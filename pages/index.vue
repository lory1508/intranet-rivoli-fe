<template>
  <div class="flex flex-col w-full gap-2">
    <HeaderComponent :title="homeStaticData.title" />

    <div class="grid w-full grid-cols-1 gap-4 xl:grid-cols-3">
      <div class="flex flex-col gap-4">
        <!-- Rubrica -->
        <RubricaCard
          :title="homeStaticData.rubrica.title"
          :icon="homeStaticData.rubrica.icon"
          @search="searchRubrica"
        />

        <!-- Strumenti personali -->
        <PersonalTools
          :title="homeStaticData.personalTools.title"
          :icon="homeStaticData.personalTools.icon"
          :tools="personalTools"
          :loading="loading"
        />

        <!-- Strumenti personali -->
        <ModulisticaTools
          title="Modulistica"
          icon="hugeicons:document-validation"
          :tools="personalTools"
          :loading="loading"
        />
      </div>

      <!-- Applicativi -->
      <UsefulLinks
        :title="homeStaticData.usefulLinks.title"
        :icon="homeStaticData.usefulLinks.icon"
        :links="usefulLinks"
        :categories="usefulLinksCategories"
      />

      <!-- Bacheca dipendenti -->
      <EmployeesBoard :title="homeStaticData.employeesBoard.title" :icon="homeStaticData.employeesBoard.icon" />
    </div>

    <NDivider />

    <!-- News -->
    <LatestNews :title="homeStaticData.news.title" :icon="homeStaticData.news.icon" />
  </div>
</template>

<script setup>
  import RubricaCard from '~/components/home/RubricaCard.vue'
  import EmployeesBoard from '~/components/home/EmployeesBoard.vue'
  import UsefulLinks from '~/components/home/UsefulLinks.vue'
  import LatestNews from '~/components/home/LatestNews.vue'
  import PersonalTools from '~/components/home/PersonalTools.vue'
  import ModulisticaTools from '~/components/home/ModulisticaTools.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'

  import { useDepartmentStore } from '~/stores/departments'
  import { useOfficeStore } from '~/stores/offices'
  import { useServiceStore } from '~/stores/services'
  import { useEmployeeStore } from '~/stores/employees'

  import { getExternalLinksByType, getExternalLinks } from '~/api/externalLinks'
  import { homeStaticData } from '~/utils/staticData/home'

  import { updateDepartmentStore, updateOfficeStore, updateServiceStore, updateEmployeeStore } from '~/utils'

  const departmentStore = useDepartmentStore()
  const officeStore = useOfficeStore()
  const serviceStore = useServiceStore()
  const employeeStore = useEmployeeStore()

  const personalTools = ref([])
  const usefulLinks = ref([])
  const usefulLinksCategories = ref([])

  const loading = ref(false)

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

  const getAllLinks = async () => {
    try {
      loading.value = true
      return await getExternalLinks()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await updateDepartmentStore(departmentStore)
    await updateOfficeStore(officeStore)
    await updateServiceStore(serviceStore)
    await updateEmployeeStore(employeeStore)

    personalTools.value = await getExternalLinksBySlug('strumenti-personali')
    const tmpLinks = await getAllLinks()
    usefulLinks.value = tmpLinks.filter((link) => link.slugType !== 'strumenti-personali')
    const tmpCats = [...new Set(usefulLinks.value.map((link) => link.slugType))]
    tmpCats.forEach((cat) => {
      usefulLinksCategories.value.push({
        title: tmpLinks.find((link) => link.slugType === cat).type,
        slug: cat,
      })
    })
  })
</script>
