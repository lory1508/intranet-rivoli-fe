<template>
  <div class="flex flex-col gap-8">
    <div
      class="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-secondaryLight text-darkAccent border-secondaryLight shadow-zinc-300"
    >
      <div class="flex flex-row gap-2 pb-2">
        <Icon :icon="icon" height="32" />
        <div class="text-2xl">{{ title }}</div>
      </div>
    </div>
    <div class="flex flex-wrap gap-4">
      <div v-for="post in news" :key="post.slug" class="flex flex-col bg-white w-96 rounded-xl">
        <div class="flex flex-col h-full gap-2 p-4">
          <!-- Title -->
          <span class="font-semibold text-primary">{{ post.title }}</span>

          <!-- Excerpt -->
          <div v-html="post.excerpt" />

          <!-- Tags -->
          <div v-if="post.tags.length" class="flex flex-row gap-2">
            <TagComponent v-for="tag in post.tags" :key="tag.slug" :tag="tag" />
          </div>

          <!-- Dates -->
          <div v-if="post.start && post.end" class="flex flex-row items-center gap-1 font-semibold">
            {{ post.start }} <Icon icon="solar:arrow-right-linear" width="20" /> {{ post.end }}
          </div>
        </div>

        <!-- Btn -->
        <div
          class="flex items-center justify-center py-4 font-semibold tracking-widest text-white cursor-pointer rounded-b-xl bg-primary"
          @click="goToNews(post.slug)"
        >
          LEGGI LA NEWS
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import TagComponent from '~/components/common/TagComponent.vue'
  import { Icon } from '@iconify/vue'
  import { getPosts } from '~/api/posts'

  const props = defineProps({
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  })

  const router = useRouter()
  const news = ref([])

  const goToNews = (slug) => {
    router.push(`/news/${slug}`)
  }

  onMounted(async () => {
    news.value = await getPosts({ categories: ['news'], limit: 6 })
  })
</script>
