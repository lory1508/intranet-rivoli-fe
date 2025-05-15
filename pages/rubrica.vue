<template>
  <div>
    <LoaderComponent v-if="loading" />
    <div v-else>
      <HeaderComponent title="Rubrica" />

      <div class="flex flex-row justify-between gap-4">
        <NEmpty
          v-if="employees.length === 0"
          description="Nessun risultato trovato"
          class="p-4 bg-white border w-fit h-fit rounded-xl"
        />
        <div v-else class="flex flex-wrap gap-4">
          <div
            v-for="employee in employees"
            :key="employee.id"
            class="flex flex-col gap-4 transition-all duration-300 bg-white border hover:scale-105 hover:shadow-lg w-fit h-fit rounded-xl"
          >
            <div class="flex flex-row items-center gap-4 border-b">
              <img
                :src="employee?.photo"
                :alt="employee?.name"
                class="h-24 rounded-tl-xl hover:cursor-pointer"
                @click="openImage(employee?.photo)"
              />
              <div class="pr-4 text-2xl font-semibold text-secondary">{{ employee?.name }}</div>
            </div>
            <div class="flex flex-col gap-6 px-4">
              <div class="flex flex-row gap-16">
                <div class="flex flex-row items-center gap-2">
                  <Icon icon="fluent:call-48-filled" height="36" class="text-secondary" />
                  <div class="text-lg font-semibold">{{ employee?.phone }}</div>
                </div>
                <div class="flex flex-row items-center gap-2">
                  <Icon icon="fluent:location-ripple-24-filled" height="36" class="text-secondary" />
                  <div class="text-lg font-semibold">{{ employee?.room }}</div>
                </div>
              </div>
              <div>
                <div class="flex flex-row items-center gap-2">
                  <Icon icon="fluent:mail-48-filled" height="36" class="text-secondary" />
                  <div class="text-base font-semibold">{{ employee?.email }}</div>
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <div class="flex flex-row items-center gap-2">
                  <div class="text-base font-semibold text-secondary">Direzione</div>
                  <div class="text-base">{{ employee?.department }}</div>
                </div>
                <div class="flex flex-row items-center gap-2">
                  <div class="text-base font-semibold text-secondary">Ufficio</div>
                  <div class="text-base">{{ employee?.office }}</div>
                </div>
                <div class="flex flex-row items-center gap-2">
                  <div class="text-base font-semibold text-secondary">Servizio</div>
                  <div class="text-base">{{ employee?.service }}</div>
                </div>
              </div>
            </div>
            <div class="flex flex-row">
              <!-- <div class="flex items-center justify-center w-full py-2 bg-darkAccent rounded-bl-xl">
            <Icon icon="fluent:call-outbound-48-filled" height="36" class="text-white" />
          </div> -->
              <a
                :href="`mailto:${employee?.email}`"
                class="flex items-center justify-center w-full py-2 transition-all duration-300 bg-secondary rounded-b-xl hover:cursor-pointer hover:bg-darkAccent"
              >
                <Icon icon="fluent:mail-arrow-up-24-filled" height="36" class="text-white" />
              </a>
            </div>
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
  import { Icon } from '@iconify/vue'
  import { NEmpty } from 'naive-ui'
  import { homeStaticData } from '~/utils/staticData/home'

  import RubricaCard from '~/components/home/RubricaCard.vue'
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

  const runSearch = async (query) => {
    rubricaSearch.value = query
    await searchEmployees()
  }
  const searchEmployees = async () => {
    try {
      loading.value = true
      await delay(1000)
      employees.value = employeeStore.searchEmployees(rubricaSearch.value)?.map((employee) => {
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
      console.log(employees.value, rubricaSearch.value)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const openImage = async (url) => {
    await navigateTo(url, { external: true, open: { target: '_blank' } })
  }

  onMounted(async () => {
    if (route.query) {
      rubricaSearch.value = route.query
      await searchEmployees()
    }
  })
</script>
