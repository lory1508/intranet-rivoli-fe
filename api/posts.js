import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const getPosts = async (queryObj, categories, tags) => {
  try {
    let queryString = ''
    if (queryObj?.categories) {
      const categoryIds = categories
        ?.filter((category) => queryObj?.categories?.includes(category?.slug))
        ?.map((category) => category?.id)
      queryString += `categories=${categoryIds?.join(',')}&`
    }
    if (queryObj?.limit) {
      queryString += `per_page=${queryObj?.limit}&`
    }
    if (queryObj?.offset) {
      queryString += `offset=${queryObj?.offset}&`
    }
    if (queryObj?.page) {
      queryString += `page=${queryObj?.page}&`
    }
    if (queryObj?.tags) {
      queryString += `tags=${queryObj?.tags.join(',')}&`
    }
    if (queryObj?.search) {
      queryString += `search=${queryObj?.search}&`
    }
    if (queryObj.range) {
      const start = new Date(queryObj.range[0]).toISOString()
      const end = new Date(queryObj.range[1]).toISOString()
      queryString += `after=${start}&before=${end}&`
    }
    const res = await fetch(`${WORDPRESS_BASE_URL}/posts?${queryString}`)
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`)
    }
    const json = await res.json()

    const posts = json.map((post) => {
      return {
        id: post?.id,
        title: post?.title?.rendered,
        content: post?.content?.rendered,
        excerpt: post?.excerpt?.rendered,
        categories: post?.categories?.map((category) => categories.find((c) => c?.id === category)),
        tags: post?.tags?.map((tag) => tags.find((t) => t?.id === tag)),
        start: post?.acf?.start,
        end: post?.acf?.end,
        slug: post?.slug,
        createdAt: new Date(post?.date).toLocaleDateString('it-IT'),
        attachment: {
          id: post?.acf?.attachment?.ID,
          url: post?.acf?.attachment?.url,
          title: post?.acf?.attachment?.title,
          type: post?.acf?.attachment?.subtype,
          size: post?.acf?.attachment?.filesize,
        },
      }
    })
    return {
      posts: posts,
      pagination: {
        total: res.headers.get('x-wp-total'),
        totalPages: res.headers.get('x-wp-totalpages'),
        page: queryObj?.page || 1,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

export const getAttachmentDetails = async (attachmentId, categories, tags) => {
  try {
    const res = await fetch(`${WORDPRESS_BASE_URL}/media/${attachmentId}`)
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`)
    }
    const json = await res.json()

    const attachment = {
      id: json?.id,
      categories: json?.categories?.map((category) => categories.find((c) => c?.id === category)),
      tags: json?.tags?.map((tag) => tags.find((t) => t?.id === tag)),
      size: json?.media_details?.filesize,
      url: json?.guid?.rendered,
      title: json?.title?.rendered,
      type: json?.mime_type,
    }
    return attachment
  } catch (err) {
    console.error(err)
  }
}

export const getPostBySlug = async (slug, categories, tags) => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/posts?slug=${slug}`)
    const post = res?.data?.value[0]
    return {
      title: post?.title?.rendered,
      content: post?.content?.rendered,
      excerpt: post?.excerpt?.rendered,
      categories: post?.categories?.map((category) => categories.find((c) => c?.id === category)),
      tags: post?.tags?.map((tag) => tags.find((t) => t?.id === tag)),
      start: post?.acf?.start,
      end: post?.acf?.end,
      slug: post?.slug,
      createdAt: new Date(post?.date).toLocaleDateString('it-IT'),
      attachment: {
        id: post?.acf?.attachment?.ID,
        url: post?.acf?.attachment?.url,
        title: post?.acf?.attachment?.title,
        type: post?.acf?.attachment?.subtype,
        size: post?.acf?.attachment?.filesize,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

export const getPostById = async (id, categories = [], tags = []) => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/posts/${id}`)
    const post = res?.data?.value
    return {
      title: post?.title?.rendered,
      content: post?.content?.rendered,
      excerpt: post?.excerpt?.rendered,
      categories: post?.categories?.map((category) => categories.find((c) => c?.id === category)),
      tags: post?.tags?.map((tag) => tags.find((t) => t?.id === tag)),
      start: post?.acf?.start,
      end: post?.acf?.end,
      slug: post?.slug,
      createdAt: new Date(post?.date).toLocaleDateString('it-IT'),
      attachment: {
        id: post?.acf?.attachment?.ID,
        url: post?.acf?.attachment?.url,
        title: post?.acf?.attachment?.title,
        type: post?.acf?.attachment?.subtype,
        size: post?.acf?.attachment?.filesize,
      },
    }
  } catch (err) {
    console.error(err)
  }
}
