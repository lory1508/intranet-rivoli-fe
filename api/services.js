import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const getServices = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/service`)
    return res?.data
  } catch (err) {
    console.error(err)
  }
}
