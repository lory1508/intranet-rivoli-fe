<template>
  <div
    class="flex flex-col gap-2 transition-all duration-500 bg-white rounded-xl hover:shadow-xl"
    :class="vertical ? 'w-96 hover:scale-105' : 'w-full p-4'"
  >
    <div class="flex flex-col h-full gap-2" :class="vertical ? 'p-4' : ''">
      <!-- Title -->
      <span class="font-semibold text-secondary hover:cursor-pointer" @click="goToNews(post.slug)">{{
        post.title
      }}</span>

      <!-- Excerpt -->
      <div v-html="post.excerpt" />

      <div class="flex flex-row items-center gap-2">
        <!-- Attachment -->
        <Icon v-if="post?.attachment?.id" icon="solar:paperclip-bold" width="20" class="text-secondary" />

        <!-- Tags -->
        <div v-if="post.tags.length" class="flex flex-row gap-2">
          <TagComponent v-for="tag in post.tags" :key="tag.slug" :tag="tag" />
        </div>
      </div>

      <!-- Dates -->
      <div v-if="post.start && post.end" class="flex flex-row items-center gap-1 font-semibold">
        {{ post.start }} <Icon icon="solar:arrow-right-linear" width="20" /> {{ post.end }}
      </div>
    </div>

    <div v-if="vertical" class="w-full px-4 text-sm text-secondary text-end">Creato il {{ post.createdAt }}</div>
    <div class="flex flex-row items-end justify-between">
      <!-- Btn -->
      <div
        class="flex items-center justify-center font-semibold tracking-widest text-white transition-all duration-300 cursor-pointer bg-secondary hover:bg-blue-600"
        :class="vertical ? 'rounded-b-xl w-full py-4' : 'w-48 py-2 rounded-lg hover:shadow-md '"
        @click="goToNews(post.slug)"
      >
        LEGGI LA NEWS
      </div>
      <div v-if="!vertical" class="w-full px-4 text-sm text-secondary text-end">Creato il {{ post.createdAt }}</div>
    </div>
  </div>
</template>

<script setup>
  import TagComponent from '~/components/common/TagComponent.vue'
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    post: {
      type: Object,
      default: () => {},
    },
    vertical: {
      type: Boolean,
      default: true,
    },
  })

  const router = useRouter()

  const goToNews = (slug) => {
    router.push(`/news/${slug}`)
  }
</script>
