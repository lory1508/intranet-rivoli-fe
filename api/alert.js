import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const getAlert = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/alert?per_page=1`)
    return res?.data
  } catch (err) {
    console.error(err)
  }
}
