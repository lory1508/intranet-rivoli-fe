const config = useRuntimeConfig()
const WORDPRESS_BASE_URL = config.public.wordpressBaseUrl

export const getServices = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/service`)
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}
