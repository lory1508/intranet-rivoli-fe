<template>
  <div class="flex flex-col w-full gap-2">
    <HeaderComponent :title="homeStaticData.title" />

    <div class="grid w-full grid-cols-1 gap-4 xl:grid-cols-3">
      <div class="flex flex-col gap-4">
        <!-- Rubrica -->
        <RubricaCard
          :title="homeStaticData.rubrica.title"
          :icon="homeStaticData.rubrica.icon"
          @search="searchRubrica"
        />

        <!-- Strumenti personali -->
        <PersonalTools
          :title="homeStaticData.personalTools.title"
          :icon="homeStaticData.personalTools.icon"
          :tools="personalTools"
          :loading="loading"
        />

        <!-- Modulistica -->
        <ModulisticaTools title="Modulistica" icon="hugeicons:document-validation" :links="catModulistica" />
      </div>

      <!-- Applicativi -->
      <UsefulLinks
        :title="homeStaticData.usefulLinks.title"
        :icon="homeStaticData.usefulLinks.icon"
        :links="usefulLinks"
        :categories="usefulLinksCategories"
      />

      <!-- Bacheca dipendenti -->
      <EmployeesBoard :title="homeStaticData.employeesBoard.title" :icon="homeStaticData.employeesBoard.icon" />
    </div>

    <NDivider />

    <!-- News -->
    <LatestNews :title="homeStaticData.news.title" :icon="homeStaticData.news.icon" />
  </div>
</template>

<script setup>
  import RubricaCard from '~/components/home/RubricaCard.vue'
  import EmployeesBoard from '~/components/home/EmployeesBoard.vue'
  import UsefulLinks from '~/components/home/UsefulLinks.vue'
  import LatestNews from '~/components/home/LatestNews.vue'
  import PersonalTools from '~/components/home/PersonalTools.vue'
  import ModulisticaTools from '~/components/home/ModulisticaTools.vue'
  import HeaderComponent from '~/components/common/HeaderComponent.vue'

  import { getExternalLinksByType, getExternalLinks } from '~/api/externalLinks'
  import { getCategories } from '~/api/categories'
  import { homeStaticData } from '~/utils/staticData/home'

  const personalTools = ref([])
  const usefulLinks = ref([])
  const usefulLinksCategories = ref([])
  const catModulistica = ref([])

  const loading = ref(false)

  const searchRubrica = async (query) => {
    await navigateTo({
      path: '/rubrica',
      query,
    })
  }

  const getCatFromLink = (link) => {
    const linkToArray = link.split('/')
    const catIndex = linkToArray.indexOf('category') + 1
    const str = linkToArray.slice(catIndex).join('/')
    return str.substring(0, str.length - 1)
  }

  onMounted(async () => {
    try {
      loading.value = true

      const modulistica = await getCategories({ search: 'modulistica', perPage: 1 })
      const tmp = ref([])
      tmp.value = await getCategories({ parent: modulistica[0]?.id, perPage: 100 })
      tmp.value.forEach((cat) => {
        catModulistica.value.push({
          title: cat.name,
          slug: getCatFromLink(cat.link),
          href: getCatFromLink(cat.link),
        })
      })

      personalTools.value = await getExternalLinksByType('strumenti-personali')

      usefulLinks.value = (await getExternalLinks(true))
        .filter((link) => link.slugType !== 'strumenti-personali')
        .sort((a, b) => (a.title > b.title ? 1 : -1))
      usefulLinksCategories.value = Array.from(
        new Map(
          usefulLinks.value
            // flatten type/slugType pairs
            .flatMap((item) =>
              item.type.map((t, i) => ({
                title: t,
                slug: item.slugType[i],
              }))
            )
            // remove duplicates by slug
            .map((obj) => [obj.slug, obj])
        ).values()
      )
      usefulLinksCategories.value.sort((a, b) => a.title.localeCompare(b.title))
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
