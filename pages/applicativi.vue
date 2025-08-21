<template>
  <div>
    <LoaderComponent v-if="loading" />
    <div v-else>
      <HeaderComponent title="Applicativi" :breadcrumb="breadcrumb" />

      <!-- Link utili generali -->
      <!-- <UsefulLinks :links="usefulLinks" :categories="usefulLinksCategories" class="w-full" mono-column /> -->

      <NCollapse class="pt-2" accordion>
        <NCollapseItem v-for="type in usefulLinksCategories" :key="type.slug" class="pb-2 border-b-2 border-zinc-300">
          <template #header>
            <div class="text-lg font-semibold text-secondary">{{ type.title }}</div>
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

  import UsefulLinks from '~/components/home/UsefulLinks.vue'
  import UsefulLink from '~/components/home/UsefulLink.vue'
  import { getExternalLinks } from '~/api/externalLinks'
  import { NCollapse } from 'naive-ui'

  const loading = ref(false)
  const usefulLinks = ref([])
  const usefulLinksCategories = ref([])

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

  onMounted(async () => {
    try {
      loading.value = true
      usefulLinks.value = await getExternalLinks()
      const tmpCats = [...new Set(usefulLinks.value.map((link) => link.slugType))]
      tmpCats.forEach((cat) => {
        usefulLinksCategories.value.push({
          title: usefulLinks.value.find((link) => link.slugType === cat).type,
          slug: cat,
        })
      })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
