<template>
  <!-- <NThemeEditor> -->
  <NConfigProvider :theme-overrides="themeOverrides">
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </NConfigProvider>
  <!-- </NThemeEditor> -->
</template>

<script setup>
  import { useDepartmentStore } from '~/stores/departments'
  import { useOfficeStore } from '~/stores/offices'
  import { useServiceStore } from '~/stores/services'
  import { useEmployeeStore } from '~/stores/employees'

  // import { NThemeEditor } from 'naive-ui'
  import { NConfigProvider } from 'naive-ui'

  import { updateDepartmentStore, updateOfficeStore, updateServiceStore, updateEmployeeStore } from '~/utils'

  const departmentStore = useDepartmentStore()
  const officeStore = useOfficeStore()
  const serviceStore = useServiceStore()
  const employeeStore = useEmployeeStore()

  const themeOverrides = {
    Input: {
      caretColor: '#1857A0FF',
      loadingColor: '#1857A0FF',
    },
    common: {
      primaryColor: '#1857A0FF',
      primaryColorHover: '#3676C1FF',
      primaryColorPressed: '#0D3F7AFF',
      primaryColorSuppl: '#5C95D7FF',
    },
  }

  onMounted(async () => {
    await updateDepartmentStore(departmentStore)
    await updateOfficeStore(officeStore)
    await updateServiceStore(serviceStore)
    await updateEmployeeStore(employeeStore)
  })
</script>
