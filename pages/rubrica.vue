<template>
  <div>
    <LoaderComponent v-if="loading" />
    <div v-else>
      <HeaderComponent title="Rubrica" :breadcrumb="breadcrumb" />

      <div class="flex flex-row justify-between gap-4">
        <NEmpty
          v-if="employees.length === 0"
          description="Nessun risultato trovato"
          class="p-4 bg-white border w-fit h-fit rounded-xl"
        />
        <div v-else class="flex flex-wrap gap-4">
          <div v-for="employee in employees" :key="employee.id">
            <EmployeeCard :employee="employee" />
          </div>
        </div>
        <RubricaCard
          :title="homeStaticData.rubrica.title"
          :icon="homeStaticData.rubrica.icon"
          compact
          @search="runSearch"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useEmployeeStore } from '~/stores/employees'
  import { NEmpty } from 'naive-ui'
  import { homeStaticData } from '~/utils/staticData/home'
  import { formatArrayOfEmployees } from '~/utils'

  import RubricaCard from '~/components/home/RubricaCard.vue'
  import EmployeeCard from '~/components/common/EmployeeCard.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'

  const route = useRoute()

  const loading = ref(false)
  const employeeStore = useEmployeeStore()
  const employees = ref([])
  const rubricaSearch = ref({
    query: null,
    department: null,
    office: null,
    service: null,
  })

  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Rubrica',
      slug: '/rubrica',
    },
  ])

  const runSearch = async (query) => {
    rubricaSearch.value = query
    await searchEmployees()
  }
  const searchEmployees = async () => {
    try {
      loading.value = true
      employees.value = await employeeStore.searchEmployees(rubricaSearch.value)
      employees.value = formatArrayOfEmployees(employees.value)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    if (route.query) {
      rubricaSearch.value = route.query
      await searchEmployees()
    }
  })
</script>
