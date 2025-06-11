import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const getEmployees = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/employee`)
    return res?.data
  } catch (err) {
    console.error(err)
  }
}

export const getEmployeeById = async (id) => {
  try {
    if (!id) return null
    const res = await useFetch(`${WORDPRESS_BASE_URL}/employee/${id}`)
    return res?.data
  } catch (err) {
    console.error('Failed to fetch employee by id', err)
    throw err
  }
}
