<template>
  <div
    class="flex flex-row items-center h-16 gap-4 pl-2 transition-all duration-300 bg-white border rounded-lg w-fit border-secondaryLight hover:shadow-lg hover:cursor-pointer"
    @click="goToAttachment"
  >
    <Icon :icon="ICON_FILE_TYPE[props.type]" height="36" class="text-secondary" />
    <div class="flex flex-col gap-1">
      <div class="font-semibold">{{ title }}</div>
      <div class="font-mono">{{ MbSize }}</div>
    </div>
    <div class="flex items-center justify-center w-12 h-full rounded-r-lg bg-secondary">
      <Icon icon="material-symbols:download-rounded" height="36" class="h-full text-white" />
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { ICON_FILE_TYPE } from '~/utils/staticData/constants'

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 0,
    },
  })

  const MbSize = ref(0)

  const ByteToMega = (bytes) => {
    const MB = (bytes / (1024 * 1024)).toFixed(2)
    if (MB > 1024) {
      return `${(MB / 1024).toFixed(2)}GB`
    }
    if (MB < 1) {
      return `${MB}KB`
    }
    return `${MB}MB`
  }

  const goToAttachment = async () => {
    await navigateTo(props.url, { external: true, open: { target: '_blank' } })
  }

  onMounted(() => {
    MbSize.value = ByteToMega(props.size)
  })
</script>
