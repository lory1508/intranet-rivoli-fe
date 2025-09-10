<template>
  <div
    class="flex flex-col gap-2 transition-all duration-500 bg-white rounded-xl hover:shadow-xl"
    :class="vertical ? 'w-96 hover:scale-105' : 'w-full p-4'"
  >
    <div class="flex flex-col h-full gap-2" :class="vertical ? 'p-4' : ''">
      <!-- Title -->
      <span class="font-semibold text-primary hover:cursor-pointer" @click="goToNews(post.slug)">{{ post.title }}</span>

      <!-- Excerpt -->
      <div v-if="!hideContent" v-html="post.excerpt" />

      <div class="flex flex-col items-start gap-2">
        <!-- Attachment -->
        <div v-if="post?.attachment?.id" class="flex flex-row items-center gap-1 text-primary">
          <Icon icon="solar:paperclip-bold" width="20" />
          <NTooltip trigger="hover">
            <template #trigger>
              <div class="truncate max-w-40">{{ post?.attachment?.title }}</div>
            </template>
            <div>{{ post?.attachment?.title }}</div>
          </NTooltip>
        </div>

        <!-- Tags -->
        <div v-if="post?.tags.length" class="flex flex-wrap gap-1">
          <span class="pr-1 font-semibold text-indigo-700">Tag:</span>
          <div v-for="tag in post?.tags" :key="tag.id">
            <TagComponent :tag="tag" color="indigo" />
          </div>
        </div>
        <!-- Caegories -->
        <div v-if="post?.categories.length" class="flex flex-wrap gap-1">
          <span class="pr-1 font-semibold text-purple-700">Categorie:</span>
          <div v-for="category in post?.categories" :key="category.id">
            <TagComponent :tag="category" color="purple" />
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div v-if="post.start && post.end" class="flex flex-row items-center gap-1 font-semibold">
        {{ post.start }} <Icon icon="solar:arrow-right-linear" width="20" /> {{ post.end }}
      </div>
    </div>

    <div v-if="vertical" class="w-full px-4 text-sm text-primary text-end">Creato il {{ post.createdAt }}</div>
    <div class="flex flex-row items-end justify-between">
      <!-- Btn -->
      <div
        class="flex items-center justify-center font-semibold tracking-widest text-white uppercase transition-all duration-300 cursor-pointer bg-primary bg-opacity-90 hover:bg-opacity-95"
        :class="vertical ? 'rounded-b-xl w-full py-4' : 'w-48 py-2 rounded-lg hover:shadow-md '"
        @click="goToNews(post.slug)"
      >
        Leggi di più
      </div>
      <div v-if="!vertical" class="w-full px-4 text-sm text-primary text-end">Creato il {{ post.createdAt }}</div>
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
    hideContent: {
      type: Boolean,
      default: false,
    },
  })

  const goToNews = async () => {
    const path = `${props.post.categories[0].link}/${props.post.slug}`
    await navigateTo({
      path: path,
      params: { slug: props.post.slug },
      query: { id: props.post.id },
    })
  }
</script>
