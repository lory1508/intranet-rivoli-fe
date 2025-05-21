<template>
  <div class="flex flex-row items-start gap-8 pb-6 pr-6 font-bold text-primary">
    <div class="flex flex-col gap-1 w-fit">
      <div class="text-3xl">{{ title }}</div>
      <div>Rivoli, {{ formattedToday }}</div>
    </div>

    <div v-if="!showAlert" class="flex flex-row items-center gap-2 max-w-[400px]">
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
</template>

<script setup>
  import { NMarquee } from 'naive-ui'
  import { Icon } from '@iconify/vue'

  import { setIntervalMethod } from '~/utils'
  import { getAlert } from '~/api/alert'

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
  })

  const latestAlert = ref()
  const formattedToday = ref(new Date().toLocaleDateString('it-IT'))

  const getLatestAlert = async () => {
    const res = await getAlert()
    const start = new Date(res.value[0]?.acf?.start)
    const end = new Date(res.value[0]?.acf?.end)
    const showAlert = start <= new Date() && end >= new Date()
    latestAlert.value = res.value[0].acf.content
  }

  onMounted(async () => {
    setIntervalMethod(getLatestAlert, 30 * 60 * 1000) // 30 min
  })
</script>
