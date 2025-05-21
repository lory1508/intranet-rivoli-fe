<template>
  <div
    class="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md text-darkAccent border-secondaryLight shadow-zinc-300 h-fit"
  >
    <div class="flex flex-row gap-2 pb-2">
      <Icon :icon="icon" height="32" />
      <div class="text-2xl">{{ title }}</div>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2" :class="compact ? 'flex-col' : 'flex-row'">
        <n-input
          v-model:value="rubricaSearch.query"
          placeholder="Nome o interno"
          type="text"
          @keypress.enter="runSearch"
        />
        <n-select
          v-model:value="rubricaSearch.department"
          :options="optionsDepartment"
          placeholder="Direzione"
          filterable
          clearable
        />
      </div>
      <div class="flex gap-2" :class="compact ? 'flex-col' : 'flex-row'">
        <n-select
          v-model:value="rubricaSearch.office"
          :options="optionsOffice"
          placeholder="Ufficio"
          filterable
          clearable
        />
        <n-select
          v-model:value="rubricaSearch.service"
          :options="optionsService"
          placeholder="Servizio"
          filterable
          clearable
        />
      </div>
    </div>
    <n-button strong secondary type="info" @click="runSearch">
      Cerca
      <template #icon>
        <n-icon>
          <Icon icon="solar:magnifer-line-duotone" height="24" />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script setup>
  /**
   * TODO:
   * 1. search by department and/or office and/or service not working
   * 2. filter select by previous selection
   *  */
  import { Icon } from '@iconify/vue'
  import { useDepartmentStore } from '~/stores/departments'
  import { useOfficeStore } from '~/stores/offices'
  import { useServiceStore } from '~/stores/services'

  const emits = defineEmits(['search'])
  const props = defineProps({
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    compact: {
      type: Boolean,
      default: false,
    },
  })

  const departmentStore = useDepartmentStore()
  const officeStore = useOfficeStore()
  const serviceStore = useServiceStore()

  const departments = computed(() => departmentStore.getDepartments)
  const offices = computed(() => officeStore.getOffices)
  const services = computed(() => serviceStore.getServices)

  const rubricaSearch = ref({
    query: null,
    department: null,
    office: null,
    service: null,
  })

  const optionsDepartment = computed(() =>
    departments.value.map((department) => ({ label: department?.title?.rendered, value: department?.id }))
  )

  const optionsOffice = computed(() =>
    offices.value.map((office) => ({ label: office?.title?.rendered, value: office?.id }))
  )

  const optionsService = computed(() =>
    services.value.map((service) => ({ label: service?.title?.rendered, value: service?.id }))
  )

  const runSearch = () => {
    emits('search', rubricaSearch.value)
  }
</script>
