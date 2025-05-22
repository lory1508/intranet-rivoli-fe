import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

const categories = ref([])
const tags = ref([])

export const getPosts = async (queryObj) => {
  try {
    await getTags()
    await getPostsCategories()
    let queryString = ''
    if (queryObj?.categories) {
      const categoryIds = categories.value
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
        title: post?.title?.rendered,
        content: post?.content?.rendered,
        excerpt: post?.excerpt?.rendered,
        categories: post?.categories?.map((category) => categories.value.find((c) => c?.id === category)),
        tags: post?.tags?.map((tag) => tags.value.find((t) => t?.id === tag)),
        start: post?.acf?.start,
        end: post?.acf?.end,
        slug: post?.slug,
        createdAt: new Date(post?.date).toLocaleDateString('it-IT'),
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

export const getPostBySlug = async (slug) => {
  try {
    await getTags()
    await getPostsCategories()
    const res = await useFetch(`${WORDPRESS_BASE_URL}/posts?slug=${slug}`)
    const post = res?.data?.value[0]
    return {
      title: post?.title?.rendered,
      content: post?.content?.rendered,
      excerpt: post?.excerpt?.rendered,
      categories: post?.categories?.map((category) => categories.value.find((c) => c?.id === category)),
      tags: post?.tags?.map((tag) => tags.value.find((t) => t?.id === tag)),
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

export const getTags = async (tagsStore) => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/tags`)
    tags.value = res?.data?.value.map((tag) => {
      return {
        id: tag?.id,
        name: tag?.name,
        slug: tag?.slug,
      }
    })
    if (tagsStore) tagsStore.setTags(tags.value)
  } catch (err) {
    console.error(err)
  }
}

export const getPostsCategories = async (categoriesStore) => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/categories`)
    categories.value = res?.data?.value.map((category) => {
      return {
        id: category?.id,
        name: category?.name,
        slug: category?.slug,
      }
    })
    if (categoriesStore) categoriesStore.setCategories(categories.value)
  } catch (err) {
    console.error(err)
  }
}
