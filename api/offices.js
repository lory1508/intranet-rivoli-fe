import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const getOffices = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/office`)
    return res?.data
  } catch (err) {
    console.error(err)
  }
}
