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
    <div tabindex="0" class="flex flex-col h-full gap-2" :class="vertical ? 'p-4' : ''">
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
      <div
        v-if="post.start && post.end"
        class="flex flex-row items-center gap-1 font-semibold"
      >
        {{ post.start }} <Icon icon="solar:arrow-right-linear" width="20" />
        {{ post.end }}
      </div>

      <!-- Excerpt -->
      <div v-if="!hideContent" v-html="excerpt" />

      <div class="flex flex-col items-start gap-2">
        <!-- Attachment -->
        <div class="flex flex-wrap w-full gap-8">
          <div v-if="post?.attachments?.length <= 3" class="flex flex-wrap w-full gap-8">
            <div
              v-for="attachment in post?.attachments"
              :key="attachment.documentId"
              class="flex flex-row items-center gap-1 border-b-2 border-opacity-50 w-fit border-primary"
              :class="{
                'text-black font-semibold': isHighContrast,
                'text-primary': !isHighContrast,
              }"
            >
              <Icon icon="solar:paperclip-bold" width="20" />
              <NTooltip trigger="hover">
                <template #trigger>
                  <div class="truncate max-w-40">{{ attachment?.name }}</div>
                </template>
                <div>{{ attachment?.name }}</div>
              </NTooltip>
            </div>
          </div>
          <div v-else class="flex flex-wrap gap-8">
            <div
              v-for="attachment in post?.attachments?.slice(0, 3)"
              :key="attachment.documentId"
              class="flex flex-row items-center gap-1 px-2 transition-all duration-300 border-b-2 border-opacity-50 w-fit border-primary hover:bg-primary hover:bg-opacity-20"
              :class="{
                'text-black font-semibold': isHighContrast,
                'text-primary': !isHighContrast,
              }"
            >
              <Icon icon="solar:paperclip-bold" width="20" />
              <NTooltip trigger="hover">
                <template #trigger>
                  <div class="truncate max-w-40">{{ attachment?.name }}</div>
                </template>
                <div>{{ attachment?.name }}</div>
              </NTooltip>
            </div>
            <span
              v-if="post?.attachments?.length"
              class="flex items-center h-8 px-2 transition-all duration-300 border-b-2 border-opacity-50 hover:bg-primary hover:bg-opacity-20 text-primary border-primary sharp-shadow-sm"
              >+ {{ post?.attachments?.length - 3 }} allegati</span
            >
          </div>
        </div>

        <!-- Tags -->
        <div v-if="post?.tags?.length" class="flex flex-wrap items-center gap-1">
          <span
            class="pr-1 font-semibold"
            :class="{
              'text-black': isHighContrast,
              'text-indigo-700': !isHighContrast,
            }"
            >Tag:</span
          >
          <div v-for="tag in post?.tags" :key="tag.id">
            <TagComponent :tag="tag" color="indigo" />
          </div>
        </div>
        <!-- Categories -->
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
      <Button
        v-if="!vertical"
        title="Leggi di più"
        width="w-fit"
        @clicked="goToNews(post.slug)"
      />
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
        v-if="!vertical && showCreatedAt"
        class="px-4 text-sm w-fit text-end"
        :class="{
          'text-black': isHighContrast,
          'text-primary': !isHighContrast,
        }"
      >
        Creato il {{ post.createdAt }}
      </div>
      <div
        v-if="!vertical && showUpdatedAt"
        class="px-4 text-sm w-fit text-end"
        :class="{
          'text-black': isHighContrast,
          'text-primary': !isHighContrast,
        }"
      >
        Aggiornato il {{ post.updatedAt }}
      </div>
    </div>
  </div>
</template>

<script setup>
import TagComponent from "~/components/common/TagComponent.vue";
import Button from "~/components/common/Button.vue";
import { Icon } from "@iconify/vue";
import { decodeHtmlEntities } from "~/utils";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import markdownit from "markdown-it";

const accessibilityStore = useAccessibilityStore();
const isLargeFont = computed(() => accessibilityStore.isLargeFont);
const isHighContrast = computed(() => accessibilityStore.isHighContrast);

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
  showCreatedAt: {
    type: Boolean,
    default: true,
  },
  showUpdatedAt: {
    type: Boolean,
    default: false,
  },
});

const md = markdownit();
const title = ref("");
const excerpt = ref("");

const goToNews = async () => {
  const path = `${props.post.category.slug}/${props.post.slug}`;
  await navigateTo({
    path: path,
    params: { slug: props.post.slug },
    query: { id: props.post.documentId },
  });
};

onMounted(() => {
  title.value = decodeHtmlEntities(props.post?.title);
  excerpt.value = md.render(props.post?.excerpt || "");
});
</script>
