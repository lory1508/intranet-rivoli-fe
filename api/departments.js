import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const getDepartments = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/department`)
    return res?.data
  } catch (err) {
    console.error(err)
  }
}
