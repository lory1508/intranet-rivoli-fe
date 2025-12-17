<template>
  <LoaderComponent v-if="loading" />
  <div v-else>
    <div v-if="post">
      <HeaderComponent :title="post.title" :breadcrumb="breadcrumb" />

      <div class="mt-20">
        <!-- Tags -->
        <div v-if="post.tags?.length" class="flex flex-row gap-2 mt-2">
          <TagComponent
            v-for="tag in post.tags"
            :key="tag.slug"
            :tag="tag"
            color="rose"
          />
        </div>

        <!-- Content -->
        <div v-html="content" class="flex flex-col gap-4 pt-4" />

        <!-- Attachments -->
        <div v-if="post?.attachments?.length" class="flex flex-col gap-2">
          <div class="text-xl font-semibold text-primary">Allegati</div>
          <div class="flex flex-wrap gap-x-8 gap-y-4">
            <AttachmentComponent
              v-for="attachment in post?.attachments"
              :key="attachment.id"
              :title="attachment?.name"
              :url="attachment?.url"
              :type="attachment?.ext"
              :size="attachment?.size"
            />
            <!-- :tags="attachment?.tags" -->
            <!-- :categories="attachment?.categories" -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import LoaderComponent from "~/components/common/LoaderComponent.vue";
  import HeaderComponent from "~/components/common/HeaderComponent.vue";
  import TagComponent from "~/components/common/TagComponent.vue";
  import AttachmentComponent from "~/components/common/AttachmentComponent.vue";
  import markdownit from "markdown-it";

  import { getPostById } from "~/api/posts";

  const route = useRoute();

  const md = markdownit();
  const content = ref("");

  // const categories = ref([]);
  const post = ref(null);
  const loading = ref(false);

  const breadcrumb = ref([
    {
      title: "Home",
      slug: "/",
    },
  ]);

  onMounted(async () => {
    try {
      loading.value = true;
      const id = route.query.id || null;
      if (!id) return;
      route.path
        .split("/")
        .slice(1)
        .map((item) => item.split("-").join(" "))
        .forEach((item) => {
          breadcrumb.value.push({
            title:
              item.toString().charAt(0).toUpperCase() +
              item.toString().slice(1),
            slug: `/${item}`,
          });
        });

      const resPost = await getPostById(id);
      post.value = resPost;
      if (post.value.attachments?.length) {
        post.value.attachments = post.value?.attachments.sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
      }
      content.value = md.render(post.value.content || "");
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  });
</script>

<style>
  ul {
    list-style-type: disc !important;
    padding-left: 1.5rem;
  }

  a {
    color: #b10015 !important;
  }
</style>
