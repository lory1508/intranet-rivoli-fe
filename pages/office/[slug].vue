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
      </div>
    </div>
  </div>
</template>

<script setup>
  import { NEmpty } from 'naive-ui'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import EmployeeCard from '~/components/common/EmployeeCard.vue'

  import { formatArrayOfEmployees } from '~/utils'

  import { useEmployeeStore } from '~/stores/employees'
  import { useOfficeStore } from '~/stores/offices'

  const route = useRoute()
  const employeeStore = useEmployeeStore()
  const employees = ref([])
  const officeStore = useOfficeStore()
  const loading = ref(false)

  onMounted(async () => {
    try {
      loading.value = true
      const slug = route.params.slug
      const office = await officeStore.getOfficeBySlug(slug)
      const resEmps = await employeeStore.runEmployeeSearch('office', office[0]?.id)
      employees.value = formatArrayOfEmployees(resEmps)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
