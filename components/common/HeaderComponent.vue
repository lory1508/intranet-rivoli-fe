<template>
  <div
    class="sticky top-0 z-50 flex flex-col-reverse items-start justify-between gap-8 pt-4 pb-2 pr-6 font-bold lg:flex-row backdrop-blur-sm text-primary"
  >
    <div class="flex flex-col-reverse items-start gap-8 pr-6 lg:flex-row">
      <div class="flex flex-col gap-1 w-fit">
        <div class="text-2xl">{{ title }}</div>

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
              @click="$router.push(item.slug)"
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
    </div>

    <div class="flex flex-row items-center gap-2 bg-white border rounded-full shadow-lg shadow-sky-200">
      <NInput
        v-model:value="search.query"
        placeholder="Cerca..."
        class="rounded-full"
        :bordered="false"
        @keyup.enter="runGlobalSearch"
      />
      <div class="flex items-center justify-center p-1 rounded-full">
        <n-button strong primary circle type="info" @click="runGlobalSearch">
          <template #icon>
            <Icon icon="solar:magnifer-bold-duotone" height="32" />
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { NMarquee, NInput, NTooltip } from 'naive-ui'
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

  const getLatestAlert = async () => {
    const res = await getAlert()
    const start = new Date(res.value[0]?.acf?.start)
    const end = new Date(res.value[0]?.acf?.end)
    showAlert.value = start <= new Date() && end >= new Date()
    latestAlert.value = res.value[0].acf.content
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
    setIntervalMethod(getLatestAlert, 30 * 60 * 1000) // 30 min
  })
</script>
