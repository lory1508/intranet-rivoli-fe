<template>
  <div class="flex flex-col w-full gap-2">
    <HeaderComponent :title="homeStaticData.title" />

    <div class="flex flex-col w-full gap-4 xl:flex-row">
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
        <!-- Strumenti personali -->
        <PersonalTools
          :title="homeStaticData.personalTools.title"
          :icon="homeStaticData.personalTools.icon"
          :tools="personalTools"
          :loading="loading"
        />

        <!-- Bacheca dipendenti -->
        <EmployeesBoard :title="homeStaticData.employeesBoard.title" :icon="homeStaticData.employeesBoard.icon" />
      </div>
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
  })
</script>
