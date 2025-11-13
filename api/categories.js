import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const getCategories = async (query) => {
  try {
    const q = ref('')
    if (query?.search) q.value += `search=${query.search}&`
    if (query?.perPage) q.value += `per_page=${query.perPage}&`
    if (query?.page) q.value += `page=${query.page}&`
    if (query?.parent) q.value += `parent=${query.parent}&`

    const res = await useFetch(`${WORDPRESS_BASE_URL}/categories?${q.value}`)
    return res?.data?.value
  } catch (err) {
    console.error(err)
  }
}
