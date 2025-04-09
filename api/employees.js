const config = useRuntimeConfig()
const WORDPRESS_BASE_URL = config.public.wordpressBaseUrl

export const getEmployees = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/dipendenti`)
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}
