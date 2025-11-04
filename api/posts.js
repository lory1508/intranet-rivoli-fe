import { WORDPRESS_BASE_URL } from "../utils/staticData/constants";

export const getPosts = async (queryObj, categories, tags) => {
  try {
    const config = useRuntimeConfig();
    const token = config.public.strapi.token;
    
    const query = {
      populate: ["*"],
      sort: ["publishedAt:desc"],
    };

    if(queryObj?.categories){
      query["filters[category][slug][$eq]"] = queryObj?.categories[0];
    }

    if(queryObj?.limit){
      query["pagination[limit]"] = queryObj?.limit;
    }

    if(queryObj?.excerpt){
      query["excerptLength"] = queryObj?.excerpt;
    }

    const resStrapi = await $fetch(`${config.public.strapi.url}/api/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query,
    });

    resStrapi.data.forEach((post) => {
      post.createdAt = new Date(post.createdAt).toLocaleDateString("it-IT");
      if(post.start) new Date(post.start).toLocaleDateString("it-IT");
      if(post.end) new Date(post.end).toLocaleDateString("it-IT");
    })
    
    return {
      posts: resStrapi.data,
      pagination: {
        total: resStrapi.meta.pagination.total,
        limit: resStrapi.meta.pagination.limit,
        start: resStrapi.meta.pagination.start,
        // total: res.headers.get("x-wp-total"),
        // totalPages: res.headers.get("x-wp-totalpages"),
        // page: queryObj?.page || 1,
      },
    };
  } catch (err) {
    console.error(err);
  }
};

export const getAttachmentDetails = async (attachmentId, categories, tags) => {
  try {
    const config = useRuntimeConfig();
    const token = config.public.strapi.token;

    const resStrapi = await $fetch(`${config.public.strapi.url}/api/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        sort: ["publishedAt:desc"],
      },
    });
    console.log("ARTICLES getAttachmentDetails", resStrapi);
    const res = await fetch(`${WORDPRESS_BASE_URL}/media/${attachmentId}`);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();

    const attachment = {
      id: json?.id,
      categories: json?.categories?.map((category) =>
        categories.find((c) => c?.id === category)
      ),
      tags: json?.tags?.map((tag) => tags.find((t) => t?.id === tag)),
      size: json?.media_details?.filesize,
      url: json?.guid?.rendered,
      title: json?.title?.rendered,
      type: json?.mime_type,
    };
    return attachment;
  } catch (err) {
    console.error(err);
  }
};

export const getPostBySlug = async (slug, categories, tags) => {
  try {
    const config = useRuntimeConfig();
    const token = config.public.strapi.token;

    const resStrapi = await $fetch(`${config.public.strapi.url}/api/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        sort: ["publishedAt:desc"],
      },
    });
    console.log("ARTICLES getPostBySlug", resStrapi);
    const res = await useFetch(`${WORDPRESS_BASE_URL}/posts?slug=${slug}`);
    const post = res?.data?.value[0];
    return {
      title: post?.title?.rendered,
      content: post?.content?.rendered,
      excerpt: post?.excerpt?.rendered,
      categories: post?.categories?.map((category) =>
        categories.find((c) => c?.id === category)
      ),
      tags: post?.tags?.map((tag) => tags.find((t) => t?.id === tag)),
      start: post?.acf?.start,
      end: post?.acf?.end,
      slug: post?.slug,
      createdAt: new Date(post?.date).toLocaleDateString("it-IT"),
      attachment: {
        id: post?.acf?.attachment?.ID,
        url: post?.acf?.attachment?.url,
        title: post?.acf?.attachment?.title,
        type: post?.acf?.attachment?.subtype,
        size: post?.acf?.attachment?.filesize,
      },
    };
  } catch (err) {
    console.error(err);
  }
};

export const getPostById = async (id, categories = [], tags = []) => {
  try {
    const config = useRuntimeConfig();
    const token = config.public.strapi.token;

    const resStrapi = await $fetch(`${config.public.strapi.url}/api/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        populate: ["*"],
      },
    });
    return resStrapi.data
  } catch (err) {
    console.error(err);
  }
};
