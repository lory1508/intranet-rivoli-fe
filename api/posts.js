import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

/**
 * Fetches WordPress posts based on the provided query object.
 * @param {object} queryObj - Object with query parameters
 * @param {string[]} queryObj.categories - Array of category slugs to filter by
 * @param {number} queryObj.limit - Number of posts to return per page
 * @param {number} queryObj.offset - Number of posts to skip before returning
 * @param {number} queryObj.page - Page number to return
 * @param {string[]} queryObj.tags - Array of tag IDs to filter by
 * @param {string} queryObj.search - Search string to filter by
 * @param {Date[]} queryObj.range - Array of two dates to filter by post date
 * @param {array} categories - Array of category objects from WordPress
 * @param {array} tags - Array of tag objects from WordPress
 * @returns {Promise<{posts: Post[], pagination: {total: number, totalPages: number, page: number}}>}
 */
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
    if (queryObj?.excerpt) {
      queryString += `excerpt=${queryObj?.excerpt}&`
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

/**
 * Fetches the details of an attachment from WordPress.
 *
 * @param {number} attachmentId - The ID of the attachment to fetch.
 * @param {Array} categories - The array of categories, used to map category IDs to names.
 * @param {Array} tags - The array of tags, used to map tag IDs to names.
 *
 * @returns {Promise<Object>} The attachment details, with the following properties:
 *   - id: The ID of the attachment.
 *   - categories: An array of category objects, with the following properties:
 *     - id: The ID of the category.
 *     - name: The name of the category.
 *   - tags: An array of tag objects, with the following properties:
 *     - id: The ID of the tag.
 *     - name: The name of the tag.
 *   - size: The size of the attachment in bytes.
 *   - url: The URL of the attachment.
 *   - title: The title of the attachment.
 *   - type: The MIME type of the attachment.
 */
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

/**
 * Fetches a WordPress post by its slug.
 * @param {string} slug - The slug of the post to fetch.
 * @param {Array} categories - The array of categories, used to map category IDs to names.
 * @param {Array} tags - The array of tags, used to map tag IDs to names.
 *
 * @returns {Promise<Object>} The post details, with the following properties:
 *   - title: The title of the post.
 *   - content: The content of the post.
 *   - excerpt: The excerpt of the post.
 *   - categories: An array of category objects, with the following properties:
 *     - id: The ID of the category.
 *     - name: The name of the category.
 *   - tags: An array of tag objects, with the following properties:
 *     - id: The ID of the tag.
 *     - name: The name of the tag.
 *   - start: The start date of the post.
 *   - end: The end date of the post.
 *   - slug: The slug of the post.
 *   - createdAt: The creation date of the post in the format "dd/mm/yyyy".
 *   - attachment: An object with the following properties:
 *     - id: The ID of the attachment.
 *     - url: The URL of the attachment.
 *     - title: The title of the attachment.
 *     - type: The MIME type of the attachment.
 *     - size: The size of the attachment in bytes.
 */
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

/**
 * Fetches a WordPress post by its ID.
 *
 * @param {number} id - The ID of the post to fetch.
 * @param {Array} categories - An array of category objects to map the post's category IDs to names.
 * @param {Array} tags - An array of tag objects to map the post's tag IDs to names.
 *
 * @returns {Promise<Object>} An object containing post details:
 *   - title: The title of the post.
 *   - content: The rendered content of the post.
 *   - excerpt: The rendered excerpt of the post.
 *   - categories: An array of category objects associated with the post.
 *   - tags: An array of tag objects associated with the post.
 *   - start: The start date of the post.
 *   - end: The end date of the post.
 *   - slug: The slug of the post.
 *   - createdAt: The creation date of the post in "dd/mm/yyyy" format.
 *   - attachment: An object with the following properties:
 *     - id: The ID of the attachment.
 *     - url: The URL of the attachment.
 *     - title: The title of the attachment.
 *     - type: The MIME type of the attachment.
 *     - size: The size of the attachment in bytes.
 */
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
