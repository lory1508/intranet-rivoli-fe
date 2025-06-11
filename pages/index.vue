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

        <!-- Modulistica -->
        <ModulisticaTools title="Modulistica" icon="hugeicons:document-validation" :links="forms" />
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
  const forms = ref([
    {
      title: 'Personale',
      icon: '',
      href: '/modulistica/personale',
      slug: '/modulistica/personale',
    },
    {
      title: 'Magazzino',
      icon: '',
      href: '/modulistica/magazzino',
      slug: '/modulistica/magazzino',
    },
    {
      title: 'Economato',
      icon: '',
      href: '/modulistica/economato',
      slug: '/modulistica/economato',
    },
    {
      title: 'Disposizioni Segretario',
      icon: '',
      href: '/modulistica/disposizioni-segretario',
      slug: '/modulistica/disposizioni-segretario',
    },
    {
      title: 'Manuali SIA',
      icon: '',
      href: '/manuali',
      slug: '/manuali',
    },
    {
      title: 'Sicurezza Lavoratori',
      icon: '',
      href: '/sicurezza-lavoratori',
      slug: '/sicurezza-lavoratori',
    },
  ])

  const loading = ref(false)

  const searchRubrica = async (query) => {
    await navigateTo({
      path: '/rubrica',
      query,
    })
  }

  onMounted(async () => {
    try {
      loading.value = true
      await updateDepartmentStore(departmentStore)
      await updateOfficeStore(officeStore)
      await updateServiceStore(serviceStore)
      await updateEmployeeStore(employeeStore)

      personalTools.value = await getExternalLinksByType('strumenti-personali')
      const tmpLinks = await getExternalLinks(true)
      usefulLinks.value = tmpLinks.filter((link) => link.slugType !== 'strumenti-personali')
      const tmpCats = [...new Set(usefulLinks.value.map((link) => link.slugType))]
      tmpCats.forEach((cat) => {
        usefulLinksCategories.value.push({
          title: tmpLinks.find((link) => link.slugType === cat).type,
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
