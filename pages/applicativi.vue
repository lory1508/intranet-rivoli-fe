<template>
  <div>
    <LoaderComponent v-if="loading" />
    <div v-else>
      <HeaderComponent title="Applicativi" :breadcrumb="breadcrumb" />

      <!-- Ricerca -->
      <div class="flex flex-col py-4">
        <div class="flex flex-col gap-1">
          <NInputGroup ref="inputGroupRef" class="w-64">
            <NInput
              v-model:value="search"
              placeholder="Applicativo..."
              round
              clearable
              @clear="resetSearch"
              @keypress.enter="searchLinks"
            />
            <NButton type="error" secondary round @click="searchLinks">Cerca</NButton>
          </NInputGroup>
          <div
            class="mt-1 ml-4 text-xs font-semibold transition-all duration-300 text-primary"
            :class="isHovered ? 'opacity-100' : 'opacity-0'"
          >
            Ricerca l'applicativo che ti serve
          </div>
        </div>
        <div v-if="searched">
          <div v-if="results.length" class="flex flex-col gap-2 mb-2">
            <UsefulLink
              v-for="res in results"
              :key="res.slug"
              :link="res"
              :categories="usefulLinksCategories"
              vertical
            />
          </div>
          <NEmpty v-else description="Nessun risultato trovato" class="w-fit" />
          <div class="h-[2px] bg-zinc-300 rounded-full" />
        </div>
      </div>

      <!-- Lista Completa Applicativi -->
      <NCollapse class="pt-2" accordion>
        <NCollapseItem
          v-for="type in usefulLinksCategories"
          :key="type.slug"
          class="pb-2 border-b-2 border-zinc-300 !border-t-0"
        >
          <template #header>
            <div class="text-lg font-semibold text-primary">{{ type.title }}</div>
          </template>
          <div class="grid gap-2">
            <div class="flex flex-col gap-2">
              <UsefulLink
                v-for="link in usefulLinks.filter((link) => link.slugType === type.slug)"
                :key="link.slug"
                :link="link"
                :categories="usefulLinksCategories"
                vertical
              />
            </div>
          </div>
        </NCollapseItem>
      </NCollapse>
    </div>
  </div>
</template>

<script setup>
  import HeaderComponent from '~/components/common/HeaderComponent.vue'
  import LoaderComponent from '~/components/common/LoaderComponent.vue'

  import UsefulLink from '~/components/home/UsefulLink.vue'
  import { getExternalLinks } from '~/api/externalLinks'
  import { NCollapse, NInputGroup } from 'naive-ui'
  import { useElementHover } from '@vueuse/core'

  const loading = ref(false)
  const usefulLinks = ref([])
  const usefulLinksCategories = ref([])
  const search = ref(null)
  const searched = ref(false)
  const results = ref([])
  const inputGroupRef = ref(null)
  const isHovered = useElementHover(inputGroupRef)

  const breadcrumb = ref([
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Applicativi',
      slug: '/applicativi',
    },
  ])

  const searchLinks = () => {
    if (search.value) {
      searched.value = true
      results.value = usefulLinks.value.filter((link) => link.title.toLowerCase().includes(search.value.toLowerCase()))
    }
  }

  const resetSearch = () => {
    search.value = null
    searched.value = false
    results.value = []
  }

  onMounted(async () => {
    try {
      loading.value = true
      usefulLinks.value = (await getExternalLinks()).sort((a, b) => (a.title > b.title ? 1 : -1))
      const tmpCats = [...new Set(usefulLinks.value.map((link) => link.slugType))]
      tmpCats.forEach((cat) => {
        usefulLinksCategories.value.push({
          title: usefulLinks.value.find((link) => link.slugType === cat).type,
          slug: cat,
        })
      })
      usefulLinksCategories.value.sort((a, b) => (a.title > b.title ? 1 : -1))
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
