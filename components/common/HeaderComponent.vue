<template>
  <div
    class="sticky top-0 z-50 flex flex-col-reverse items-center justify-between gap-8 pr-6 font-bold lg:flex-row backdrop-blur-sm text-primary"
  >
    <div class="flex flex-col-reverse items-center w-full gap-8 lg:flex-row lg:justify-between">
      <div class="flex flex-row items-center gap-4 lg:w-2/12">
        <div class="flex flex-col w-full gap-1">
          <div class="w-full text-2xl capitalize">{{ title }}</div>

          <!-- Breadcrumbs -->
          <div class="flex flex-row gap-1 text-sm font-normal">
            <div
              v-for="item in breadcrumb"
              class="flex"
              :key="item.slug"
              :class="{
                'text-primary': item.slug !== breadcrumb[breadcrumb.length - 1].slug,
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
      </div>

      <div v-if="showAlert" class="flex flex-row lg:w-8/12 items-centergap-2">
        <span class="relative flex w-3 h-3">
          <span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-amber-400" />
          <span class="relative inline-flex w-3 h-3 rounded-full bg-amber-500" />
        </span>
        <NMarquee class="border-b-2 text-zinc-800 border-amber-400">
          <div class="flex flex-row gap-2 px-4">
            <Icon icon="hugeicons:alert-02" height="24" />
            <span class="whitespace-nowrap">
              {{ latestAlert }}
            </span>
          </div>
        </NMarquee>
        <span class="relative flex w-3 h-3">
          <span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-amber-400" />
          <span class="relative inline-flex w-3 h-3 rounded-full bg-amber-500" />
        </span>
      </div>

      <div class="flex flex-row items-center gap-2 lg:justify-end lg:w-2/12">
        <div class="flex flex-row items-center justify-end w-96">
          <div class="-mr-8 transition-all duration-500" :class="showSearch ? 'w-full' : 'w-0'">
            <NInput
              v-model:value="search.query"
              class="z-10 flex items-center w-full h-12 rounded-l-full"
              placeholder="Cerca..."
              ref="inputSearch"
              @keyup.enter="runGlobalSearch"
            />
          </div>
          <div
            class="z-20 flex items-center justify-center my-2 transition-all duration-300 rounded-full h-14 w-14 hover:ring-4 hover:ring-red-300 hover:scale-105 bg-primary hover:cursor-pointer hover:rotate-180"
            @click="toggleShowSearch"
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
  const inputSearch = ref(null)

  const toggleShowSearch = () => {
    showSearch.value = !showSearch.value
    if (showSearch.value) {
      inputSearch.value.focus()
    }
  }

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
