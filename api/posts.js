import { WORDPRESS_BASE_URL } from "../utils/staticData/constants";
import { getData, formatDate } from "#imports";

export const getPosts = async (queryObj, pagination) => {
  try {
    const query = {
      populate: ["*"],
      sort: ["createdAt:desc"],
    };

    if (queryObj?.perPage) query["pagination[limit]"] = queryObj?.perPage;
    if (queryObj?.page) query["pagination[page]"] = queryObj?.page;
    if (queryObj?.limit) query["pagination[limit]"] = queryObj?.limit;

    if (queryObj?.highlight) {
      query["filters[highlight][$eq]"] = queryObj?.highlight;
    }

    if (queryObj?.categories) {
      query["filters[category][slug][$eq]"] = queryObj?.categories[0];
    }

    if (queryObj?.excerpt) {
      query["excerptLength"] = queryObj?.excerpt;
    }

    if (queryObj?.query) {
      query["filters[title][$containsi]"] = queryObj?.query;
      query["filters[content][$containsi]"] = queryObj?.query;
    }

    // Start date
    if (queryObj?.startDate) {
      query["filters[$and][0][start][$gte]"] = queryObj?.startDate;
    }
    if (queryObj?.endDate) {
      query["filters[$and][1][start][$lte]"] = queryObj?.endDate;
    }

    // Tags
    if (queryObj?.tags && queryObj?.tags.length > 0) {
      queryObj?.tags.forEach((tag, index) => {
        query[`filters[$or][${index}][tags][documentId][$eq]`] = tag;
      });
    }

    const resStrapi = await getData(`articles?${pagination || ""}`, query);

    resStrapi.data.forEach((post) => {
      post.createdAt = formatDate(post.createdAt);
      if (post.updatedAt) post.updatedAt = formatDate(post.updatedAt);
      if (post.start) formatDate(post.start);
      if (post.end) formatDate(post.end);
    });

    return resStrapi;
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
      createdAt: formatDate(post?.date),
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

export const getPostById = async (id) => {
  try {
    const config = useRuntimeConfig();
    const token = config.public.strapi.token;

    const resStrapi = await $fetch(
      `${config.public.strapi.url}/api/articles/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          populate: ["category.parent", "attachments", "tags"],
        },
      }
    );
    return resStrapi.data;
  } catch (err) {
    console.error(err);
  }
};
