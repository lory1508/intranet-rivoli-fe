<template>
  <div>
    <LoaderComponent v-if="loading" />
    <div v-else>
      <div class="flex flex-col mb-2">
        <HeaderComponent title="Rubrica" :breadcrumb="breadcrumb" />

        <NRadioGroup v-model:value="chosenLayout" name="layout">
          <NRadioButton value="cards" label="Vista a schede" />
          <NRadioButton value="table" label="Vista a tabella" />
        </NRadioGroup>
      </div>
      <div class="flex flex-row justify-between w-10/12 gap-4">
        <NEmpty
          v-if="employeesData.length === 0"
          description="Nessun risultato trovato"
          class="p-4 bg-white border w-fit h-fit rounded-xl"
        />
        <div v-else class="w-9/12">
          <div v-if="chosenLayout === 'cards'" class="flex flex-wrap gap-4">
            <div v-for="employee in employeesData" :key="employee.id">
              <EmployeeCard :employee="employee" />
            </div>
          </div>
          <div v-else class="flex flex-col w-full gap-1">
            <NDataTable
              :columns="columns"
              :data="employeesData"
              :bordered="true"
              :loading="loadingData"
              class="w-full"
              striped
              remote
            />
            <NPagination
              v-model:page="pagination.page"
              v-model:page-size="pagination.perPage"
              :item-count="pagination.total"
              :page-sizes="pageSizes"
              size="medium"
              show-quick-jumper
              show-size-picker
              @update:page="updatePage"
              @update:page-size="updatePageSize"
            />
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
  import { NEmpty, NButton } from 'naive-ui'
  import { homeStaticData } from '~/utils/staticData/home'
  import { formatArrayOfEmployees, capitalizeSentence } from '~/utils'

  import RubricaCard from '~/components/home/RubricaCard.vue'
  import EmployeeCard from '~/components/common/EmployeeCard.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'

  const route = useRoute()

  const loading = ref(false)
  const loadingData = ref(false)
  const employeeStore = useEmployeeStore()
  const employees = ref(() => {})
  const employeesData = ref([])
  const chosenLayout = ref('cards')
  const pagination = ref({
    page: 1,
    itemCount: 0,
    perPage: 10,
    'show-size-picker': true,
  })
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

  const pageSizes = [
    {
      label: '10 per pagina',
      value: 10,
    },
    {
      label: '20 per pagina',
      value: 20,
    },
    {
      label: '30 per pagina',
      value: 30,
    },
    {
      label: '40 per pagina',
      value: 40,
    },
  ]

  const columns = [
    {
      title: 'Nome',
      key: 'name',
      resizable: true,
      minWidth: 200,
      render(row) {
        return capitalizeSentence(row.name)
      },
    },
    {
      title: 'Tel.',
      key: 'phone',
      resizable: true,
      minWidth: 200,
    },
    {
      title: 'Email',
      key: 'email',
      resizable: true,
      minWidth: 200,
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            secondary: true,
            type: 'info',
            size: 'small',
            onClick: async () => await navigateTo(`mailto:${row.email}`, { external: true }),
          },
          { default: () => row.email }
        )
      },
    },
    {
      title: 'Stanza',
      key: 'room',
      resizable: true,
      minWidth: 200,
    },
    {
      title: 'Dir.',
      key: 'department',
      minWidth: 300,
    },
    {
      title: 'Serv.',
      key: 'service',
      minWidth: 300,
    },
    {
      title: 'Uff.',
      key: 'office',
      minWidth: 300,
    },
  ]

  const runSearch = async (query) => {
    rubricaSearch.value = query
    await searchEmployees()
  }
  const searchEmployees = async () => {
    try {
      loading.value = true
      employees.value = await employeeStore.searchEmployees(rubricaSearch.value, pagination.value)
      employeesData.value = formatArrayOfEmployees(employees.value.data)
      if (employeesData.value.length >= 10) {
        chosenLayout.value = 'table'
      }
      pagination.value.total = employees.value.pagination.total
      pagination.value.page = employees.value.pagination.page || 1
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const updatePage = async (page) => {
    try {
      loadingData.value = true
      pagination.value.page = page
      employees.value = await employeeStore.searchEmployees(rubricaSearch.value, pagination.value)
      employeesData.value = formatArrayOfEmployees(employees.value.data)
    } catch (error) {
      console.error(error)
    } finally {
      loadingData.value = false
    }
  }

  const updatePageSize = async (pageSize) => {
    try {
      loadingData.value = true
      pagination.value.perPage = pageSize
      pagination.value.page = 1
      employees.value = await employeeStore.searchEmployees(rubricaSearch.value, pagination.value)
      employeesData.value = formatArrayOfEmployees(employees.value.data)
    } catch (error) {
      console.error(error)
    } finally {
      loadingData.value = false
    }
  }

  onMounted(async () => {
    if (route.query) {
      rubricaSearch.value = route.query
      await searchEmployees()
    }
  })
</script>
