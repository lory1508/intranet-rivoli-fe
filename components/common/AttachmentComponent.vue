<template>
  <div
    class="flex flex-col items-center gap-4 transition-all duration-300 bg-white border rounded-lg h-fit w-fit max-w-72 border-secondaryLight hover:shadow-lg"
  >
    <div class="flex flex-row items-center w-full gap-4 px-2 pt-2">
      <Icon :icon="ICON_FILE_TYPE[props.type]" height="36" class="w-24 text-secondary" />
      <div class="flex flex-col gap-1 overflow-hidden text-ellipsis">
        <NTooltip trigger="hover">
          <template #trigger>
            <div class="font-semibold truncate">{{ title }}</div>
          </template>
          <div class="font-semibold">{{ title }}</div>
        </NTooltip>
        <div class="font-mono">{{ MbSize }}</div>
      </div>
    </div>

    <div class="flex w-full gap-4 px-2" :class="tags.length && categories.length ? 'flex-col' : 'flex-row'">
      <!-- Tags -->
      <div v-if="tags.length" class="flex flex-wrap gap-1">
        <span class="pr-1 font-semibold text-emerald-700">Tag:</span>
        <div v-for="tag in tags" :key="tag.id">
          <TagComponent :tag="tag" color="emerald" />
        </div>
      </div>
      <!-- Caegories -->
      <div v-if="categories.length" class="flex flex-wrap gap-1">
        <span class="pr-1 font-semibold text-purple-700">Categorie:</span>
        <div v-for="category in categories" :key="category.id">
          <TagComponent :tag="category" color="purple" />
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-center w-full h-full py-1 transition-all duration-300 rounded-b-lg bg-secondary hover:cursor-pointer hover:bg-blue-800"
      @click="goToAttachment"
    >
      <Icon icon="material-symbols:download-rounded" height="36" class="h-full text-white" />
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { ICON_FILE_TYPE } from '~/utils/staticData/constants'

  import TagComponent from '~/components/common/TagComponent.vue'

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
    categories: {
      type: Array,
      default: () => [],
    },
    tags: {
      type: Array,
      default: () => [],
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
