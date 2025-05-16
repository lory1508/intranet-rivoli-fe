import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

const categories = ref([])

export const getPosts = async (queryObj) => {
  try {
    await getPostsCategories()
    let queryString = ''
    if (queryObj?.categories) {
      console.log(categories.value.value)
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

export const getPostsCategories = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/categories`)
    categories.value = res?.data
  } catch (err) {
    console.error(err)
  }
}
