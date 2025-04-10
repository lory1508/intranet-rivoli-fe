import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const getEmployees = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/dipendenti`)
    return res?.data
  } catch (err) {
    console.error(err)
  }
}
