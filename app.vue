<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  import { useDepartmentStore } from '~/stores/departments'
  import { useOfficeStore } from '~/stores/offices'
  import { useServiceStore } from '~/stores/services'
  import { useEmployeeStore } from '~/stores/employees'

  import { updateDepartmentStore, updateOfficeStore, updateServiceStore, updateEmployeeStore } from '~/utils'

  const departmentStore = useDepartmentStore()
  const officeStore = useOfficeStore()
  const serviceStore = useServiceStore()
  const employeeStore = useEmployeeStore()

  onMounted(async () => {
    await updateDepartmentStore(departmentStore)
    await updateOfficeStore(officeStore)
    await updateServiceStore(serviceStore)
    await updateEmployeeStore(employeeStore)
  })
</script>
