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
    const res = await useFetch(`${WORDPRESS_BASE_URL}/posts?${queryString}`)
    const posts = res?.data?.value.map((post) => {
      return {
        title: post?.title?.rendered,
        content: post?.content?.rendered,
        excerpt: post?.excerpt?.rendered,
        categories: post?.categories?.map((category) => categories.value.find((c) => c?.id === category)),
        tags: post?.tags?.map((tag) => tags.value.find((t) => t?.id === tag)),
        start: post?.acf?.start,
        end: post?.acf?.end,
        slug: post?.slug,
      }
    })
    console.log(posts)
    return posts
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

const getTags = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/tags`)
    tags.value = res?.data?.value.map((tag) => {
      return {
        id: tag?.id,
        name: tag?.name,
        slug: tag?.slug,
      }
    })
  } catch (err) {
    console.error(err)
  }
}

export const getPostsCategories = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/categories`)
    categories.value = res?.data?.value.map((category) => {
      return {
        id: category?.id,
        name: category?.name,
        slug: category?.slug,
      }
    })
  } catch (err) {
    console.error(err)
  }
}
