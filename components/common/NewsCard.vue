<template>
  <div
    class="flex flex-col gap-2 transition-all duration-500 bg-white rounded-xl"
    :class="{
      'w-96 hover:scale-105': vertical,
      'w-full p-4': !vertical,
      ' border-2 border-black hover:ring-zinc-800': isHighContrast,
      ' hover:shadow-xl': !isHighContrast,
    }"
  >
    <div class="flex flex-col h-full gap-2" :class="vertical ? 'p-4' : ''">
      <!-- Title -->
      <span
        class="font-semibold transition-all duration-300 hover:cursor-pointer"
        :class="{
          'text-2xl': isLargeFont,
          'text-lg': !isLargeFont,
          'text-black': isHighContrast,
          'text-primary ': !isHighContrast,
        }"
        @click="goToNews(post.slug)"
      >
        {{ title }}
      </span>

      <!-- Dates -->
      <div v-if="post.start && post.end" class="flex flex-row items-center gap-1 font-semibold">
        {{ post.start }} <Icon icon="solar:arrow-right-linear" width="20" /> {{ post.end }}
      </div>

      <!-- Excerpt -->
      <div v-if="!hideContent" v-html="post.excerpt" />

      <div class="flex flex-col items-start gap-2">
        <!-- Attachment -->
        <div
          v-if="post?.attachment?.id"
          class="flex flex-row items-center gap-1"
          :class="{
            'text-black font-semibold': isHighContrast,
            'text-primary': !isHighContrast,
          }"
        >
          <Icon icon="solar:paperclip-bold" width="20" />
          <NTooltip trigger="hover">
            <template #trigger>
              <div class="truncate max-w-40">{{ post?.attachment?.title }}</div>
            </template>
            <div>{{ post?.attachment?.title }}</div>
          </NTooltip>
        </div>

        <!-- Tags -->
        <div v-if="post?.tag?.length" class="flex flex-wrap items-center gap-1">
          <span
            class="pr-1 font-semibold"
            :class="{
              'text-black': isHighContrast,
              'text-indigo-700': !isHighContrast,
            }"
            >Tag:</span
          >
          <div v-for="tag in post?.tag" :key="tag.id">
            <TagComponent :tag="tag" color="indigo" />
          </div>
        </div>
        <!-- Caegories -->
        <div v-if="post?.category.length" class="flex flex-wrap items-center gap-1">
          <span
            class="pr-1 font-semibold"
            :class="{
              'text-black': isHighContrast,
              'text-purple-700': !isHighContrast,
            }"
          >
            Categorie:
          </span>
          <div v-for="category in post?.categories" :key="category.id">
            <TagComponent :tag="category" color="purple" />
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-if="vertical" class="w-full px-4 text-sm text-primary text-end">Creato il {{ post.createdAt }}</div> -->
    <div class="flex flex-row items-end justify-between">
      <!-- Btn -->
      <Button v-if="!vertical" title="Leggi di più" width="w-fit" @clicked="goToNews(post.slug)" />
      <div
        v-else
        class="flex items-center justify-center w-full py-4 font-semibold tracking-widest text-white uppercase transition-all duration-300 rounded-b-lg cursor-pointer bg-opacity-90 hover:bg-opacity-95"
        :class="{
          'bg-black ': isHighContrast,
          'bg-primary': !isHighContrast,
        }"
        @click="goToNews(post.slug)"
      >
        Leggi di più
      </div>
      <div
        v-if="!vertical"
        class="px-4 text-sm w-fit text-end"
        :class="{ 'text-black': isHighContrast, 'text-primary': !isHighContrast }"
      >
        Creato il {{ post.createdAt }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import TagComponent from '~/components/common/TagComponent.vue'
  import Button from '~/components/common/Button.vue'
  import { Icon } from '@iconify/vue'
  import { decodeHtmlEntities } from '~/utils'
  import { useAccessibilityStore } from '@/stores/accessibilityStore'

  const accessibilityStore = useAccessibilityStore()
  const isLargeFont = computed(() => accessibilityStore.isLargeFont)
  const isHighContrast = computed(() => accessibilityStore.isHighContrast)

  const props = defineProps({
    post: {
      type: Object,
      default: () => {},
    },
    vertical: {
      type: Boolean,
      default: true,
    },
    hideContent: {
      type: Boolean,
      default: false,
    },
  })

  const title = ref('')

  const goToNews = async () => {
    const path = `${props.post.categories[0].link}/${props.post.slug}`
    await navigateTo({
      path: path,
      params: { slug: props.post.slug },
      query: { id: props.post.id },
    })
  }

  onMounted(() => {
    title.value = decodeHtmlEntities(props.post?.title)
  })
</script>
