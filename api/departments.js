const config = useRuntimeConfig()
const WORDPRESS_BASE_URL = config.public.wordpressBaseUrl

export const getDepartments = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/department`)
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}
