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
        <ModulisticaTools title="Modulistica" icon="hugeicons:document-validation" :links="forms" />
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
  import { homeStaticData } from '~/utils/staticData/home'

  const personalTools = ref([])
  const usefulLinks = ref([])
  const usefulLinksCategories = ref([])
  const forms = ref([
    {
      title: 'Personale',
      icon: '',
      href: '/modulistica/personale',
      slug: '/modulistica/personale',
    },
    {
      title: 'Magazzino',
      icon: '',
      href: '/modulistica/magazzino',
      slug: '/modulistica/magazzino',
    },
    {
      title: 'Economato',
      icon: '',
      href: '/modulistica/economato',
      slug: '/modulistica/economato',
    },
    {
      title: 'Disposizioni Segretario',
      icon: '',
      href: '/modulistica/disposizioni-segretario',
      slug: '/modulistica/disposizioni-segretario',
    },
    {
      title: 'Manuali SIA',
      icon: '',
      href: '/manuali',
      slug: '/manuali',
    },
    {
      title: 'Sicurezza Lavoratori',
      icon: '',
      href: '/sicurezza-lavoratori',
      slug: '/sicurezza-lavoratori',
    },
  ])

  const loading = ref(false)

  const searchRubrica = async (query) => {
    await navigateTo({
      path: '/rubrica',
      query,
    })
  }

  onMounted(async () => {
    try {
      loading.value = true

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
