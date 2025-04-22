import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

const categories = ref()

export const getPosts = async (queryObj) => {
  try {
    await getPostsCaregories()
    let queryString = ''
    if (queryObj?.categories) {
      const categoryIds = categories.value
        ?.filter((category) => queryObj?.categories?.includes(category?.slug))
        ?.map((category) => category?.id)
      queryString += `categories=${categoryIds?.join(',')}`
    }
    const res = await useFetch(`${WORDPRESS_BASE_URL}/posts?${queryString}`)
    return res?.data
  } catch (err) {
    console.error(err)
  }
}

export const getPostsCaregories = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/categories`)
    categories.value = res?.data
  } catch (err) {
    console.error(err)
  }
}
