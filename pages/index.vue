<template>
  <div class="flex flex-col w-full">
    <h1 class="pb-6 text-3xl font-bold text-primary">{{ homeStaticData.title }}</h1>

    <!-- Rubrica -->
    <div
      class="flex flex-col w-1/2 gap-2 p-4 bg-white rounded-lg shadow-md text-darkAccent border-secondaryLight shadow-zinc-300"
    >
      <div class="flex flex-row gap-2 pb-2">
        <Icon icon="hugeicons:contact-01" height="32" />
        <div class="text-2xl">{{ homeStaticData.rubrica.title }}</div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-2">
          <n-input v-model:value="rubricaSearch.query" placeholder="Nome o interno" type="text" class="" />
          <n-select v-model:value="rubricaSearch.department" :options="optionsDepartment" placeholder="Direzione" />
        </div>
        <div class="flex flex-row gap-2">
          <n-select v-model:value="rubricaSearch.office" :options="optionsOffice" placeholder="Ufficio" />
          <n-select v-model:value="rubricaSearch.service" :options="optionsService" placeholder="Servizio" />
        </div>
      </div>
      <n-button strong secondary type="info" @click="searchEmployees">
        Cerca
        <template #icon>
          <n-icon>
            <Icon icon="solar:magnifer-line-duotone" height="24" />
          </n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<script setup>
  import { homeStaticData } from '~/utils/staticData/home'
  import { Icon } from '@iconify/vue'
  import { useDepartmentStore } from '~/stores/departments'
  import { useEmployeeStore } from '~/stores/employees'

  const departmentStore = useDepartmentStore()
  const employeeStore = useEmployeeStore()

  const departments = computed(() => departmentStore.getDepartments)
  const employees = ref([])

  const rubricaSearch = ref({
    query: null,
    department: null,
    office: null,
    service: null,
  })

  const searchEmployees = () => {
    employees.value = employeeStore.searchEmployees(rubricaSearch.value)
  }

  const optionsDepartment = computed(() =>
    departments.value.map((department) => ({ label: department.title.rendered, value: department.id }))
  )

  const optionsOffice = [{ label: 'Ufficio 1', value: 'Ufficio 1' }]
  const optionsService = [{ label: 'Servizio 1', value: 'Servizio 1' }]
</script>
