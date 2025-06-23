import { WORDPRESS_BASE_URL, BASE_URL } from '../utils/staticData/constants'

/**
 * Run a global search on both posts and media.
 * @param {string} qs The search query string
 * @param {array} categories The categories to map returned posts categories
 * @param {array} tags The tags to map returned posts tags
 * @returns {Promise<Object[]>} An array of posts and media objects
 */
export const runGlobalSearchAPI = async (qs = '', categories = [], tags = []) => {
  try {
    let posts = []
    const res = await postsGlobalSearchAPI(qs)
    if (res?.data?.value?.length >= 0) {
      posts = cleanPostUrl(res?.data?.value)
    }

    const media = await mediaGlobalSearchAPI(qs, categories, tags)
    posts = [...posts, ...media]
    return posts
  } catch (err) {
    console.error(err)
  }
}

/**
 * Runs a global search on WordPress posts.
 * @param {string} qs The search query string
 * @returns {Promise<Post[]>} An array of posts
 */
export const postsGlobalSearchAPI = async (qs = '') => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/search/?search=${qs}&per_page=100`)
    let posts = cleanPostUrl(res?.data?.value)
    return posts
  } catch (err) {
    console.error(err)
  }
}

/**
 * Runs a global search on WordPress media.
 * @param {string} qs The search query string
 * @param {array} categories The categories to map returned media categories
 * @param {array} tags The tags to map returned media tags
 * @returns {Promise<Media[]>} An array of media objects
 */
export const mediaGlobalSearchAPI = async (qs = '', categories = [], tags = []) => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/media/?search=${qs}&per_page=100`)
    let rawMedia = res?.data?.value
    let media = rawMedia.map((m) => {
      return {
        id: m.id,
        title: m.title.rendered,
        categories: m.categories.map((category) => categories.find((c) => c?.id === category)),
        tags: m.tags.map((tag) => tags.find((t) => t?.id === tag)),
        url: m.source_url,
        type: m.mime_type,
        size: m.media_details.filesize,
      }
    })
    return media
  } catch (err) {
    console.error(err)
  }
}

/**
 * Takes an array of posts and returns a new array with the same posts
 * but with their `url` property modified to remove the base URL.
 *
 * @param {Post[]} posts The array of posts to clean
 * @returns {Post[]} A new array with the same posts but with their `url` property cleaned
 */
const cleanPostUrl = (posts) => {
  let p = posts.map((post) => ({
    ...post,
    url: post.url.replace(BASE_URL, ''),
  }))
  p.forEach((pl) => {
    delete pl._links
  })
  return p
}
