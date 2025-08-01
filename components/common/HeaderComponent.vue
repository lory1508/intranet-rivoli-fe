<template>
  <div
    class="sticky top-0 z-50 flex flex-col-reverse items-start justify-between gap-8 pt-4 pb-2 pr-6 font-bold lg:flex-row backdrop-blur-sm text-primary"
  >
    <div class="flex flex-col-reverse items-start w-full gap-8 pr-6 lg:flex-row lg:justify-between">
      <div class="flex flex-col gap-1 w-fit">
        <div class="text-2xl capitalize">{{ title }}</div>

        <!-- Breadcrumbs -->
        <div class="flex flex-row gap-1 text-sm font-normal">
          <div
            v-for="item in breadcrumb"
            class="flex"
            :key="item.slug"
            :class="{
              'text-secondary': item.slug !== breadcrumb[breadcrumb.length - 1].slug,
            }"
          >
            <div
              v-if="item.slug !== breadcrumb[breadcrumb.length - 1].slug"
              @click="goTo(item.slug)"
              class="hover:cursor-pointer"
            >
              {{ item.title }}
            </div>
            <div v-else class="text-zinc-500">
              <div class="truncate max-w-80">{{ item.title }}</div>
            </div>
            <span v-if="item.slug !== breadcrumb[breadcrumb.length - 1].slug" class="px-2 text-zinc-500">/</span>
          </div>
        </div>
      </div>

      <div v-if="showAlert" class="flex flex-row items-center gap-2 max-w-[400px]">
        <span class="relative flex w-3 h-3">
          <span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-amber-400"></span>
          <span class="relative inline-flex w-3 h-3 rounded-full bg-amber-500"></span>
        </span>
        <NMarquee class="border-b-2 text-amber-600 border-amber-400">
          <div class="flex flex-row gap-2 px-4">
            <Icon icon="hugeicons:alert-02" height="24" />
            <span class="whitespace-nowrap">
              {{ latestAlert }}
            </span>
          </div>
        </NMarquee>
        <span class="relative flex w-3 h-3">
          <span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-amber-400"></span>
          <span class="relative inline-flex w-3 h-3 rounded-full bg-amber-500"></span>
        </span>
      </div>
      <div class="flex flex-row items-center gap-2">
        <div class="flex flex-row items-center justify-end w-96">
          <div class="-mr-8 transition-all duration-500" :class="showSearch ? 'w-full' : 'w-0'">
            <NInput
              class="z-10 flex items-center w-full h-12 rounded-l-full"
              v-model:value="search.query"
              placeholder="Cerca..."
              @keyup.enter="runGlobalSearch"
            />
          </div>
          <div
            class="z-20 flex items-center justify-center transition-all duration-300 rounded-full h-14 w-14 hover:ring-4 hover:ring-sky-300 hover:scale-105 bg-secondary hover:cursor-pointer hover:rotate-180"
            @click="showSearch = !showSearch"
          >
            <Icon icon="solar:magnifer-bold-duotone" class="text-2xl text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { NMarquee, NInput } from 'naive-ui'
  import { Icon } from '@iconify/vue'

  import { setIntervalMethod } from '~/utils'
  import { getAlert } from '~/api/alert'

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    breadcrumb: {
      type: Array,
      default: () => [],
    },
  })

  const loading = ref(false)
  const search = ref({
    query: null,
  })
  const showAlert = ref(false)
  const latestAlert = ref()
  const showSearch = ref(false)

  const getLatestAlert = async () => {
    const res = await getAlert()
    const start = new Date(res.value[0]?.acf?.start)
    const end = new Date(res.value[0]?.acf?.end)
    showAlert.value = start <= new Date() && end >= new Date()
    latestAlert.value = res.value[0].acf.content
  }

  const goTo = (path) => {
    const pathReplaced = path.replace(/\s/g, '-')
    const itemIndex = props.breadcrumb.findIndex((item) => item.slug === pathReplaced)
    if (itemIndex > 1) {
      const completePath = props.breadcrumb
        .slice(1, props.breadcrumb.length - 1)
        .map((item) => item.slug.slice(1))
        .join('/')
      navigateTo(`/${completePath}`)
    } else {
      navigateTo(pathReplaced)
    }
  }

  const runGlobalSearch = async () => {
    try {
      loading.value = true
      await navigateTo({
        path: '/search',
        query: search.value,
      })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    try {
      setIntervalMethod(getLatestAlert, 30 * 60 * 1000) // 30 min
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
