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

  import { useEmployeeStore } from '~/stores/employees'
  import { useDepartmentStore } from '~/stores/departments'

  const route = useRoute()
  const employeeStore = useEmployeeStore()
  const employees = ref([])
  const departmentStore = useDepartmentStore()
  const loading = ref(false)

  onMounted(async () => {
    try {
      loading.value = true
      const slug = route.params.slug
      const department = await departmentStore.getDepartmentBySlug(slug)
      console.log('department', department[0]?.id)
      const resEmps = await employeeStore.runEmployeeSearch('department', department[0]?.id)
      employees.value = resEmps?.map((employee) => {
        return {
          id: employee?.id,
          name: employee?.title.rendered,
          email: `${employee?.acf.email}@comune.rivoli.to.it`,
          phone: employee?.acf.phone,
          room: employee?.acf.room,
          photo: employee?.acf.photo,
          department: employee?.acf.department[0].post_title,
          service: employee?.acf.service[0].post_title,
          office: employee?.acf.office[0].post_title,
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
