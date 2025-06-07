import { WORDPRESS_BASE_URL, BASE_URL } from '../utils/staticData/constants'

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

export const postsGlobalSearchAPI = async (qs = '') => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/search/?search=${qs}&per_page=100`)
    let posts = cleanPostUrl(res?.data?.value)
    return posts
  } catch (err) {
    console.error(err)
  }
}

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

// const isPostNews = (post) => {
//   if (post?.subtype !== 'post') return false
//   if (post.url.startsWith('/20')) {
//     return {
//       ...post,
//       url: post.url.replace(/\/20\d{2}\/\d{2}\/\d{2}/, '/news'),
//     }
//   }
// }

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
