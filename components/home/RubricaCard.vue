<template>
  <div class="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md min-w-80 text-neutralDark shadow-zinc-300 h-fit">
    <CardTitle :icon="icon" :title="title" />

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
    <Button title="Cerca" icon="solar:magnifer-line-duotone" @clicked="runSearch" />
  </div>
</template>

<script setup>
  /**
   * TODO:
   * 1. search by department and/or office and/or service not working
   * 2. filter select by previous selection
   *  */
  import CardTitle from '~/components/common/CardTitle.vue'
  import { useDepartmentStore } from '~/stores/departments'
  import { useOfficeStore } from '~/stores/offices'
  import { useServiceStore } from '~/stores/services'
  import Button from '~/components/common/Button.vue'

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

  const departments = ref([])
  const offices = ref([])
  const services = ref([])

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

  onMounted(async () => {
    departments.value = await departmentStore.getDepartments()
    offices.value = await officeStore.getOffices()
    services.value = await serviceStore.getServices()
  })
</script>
