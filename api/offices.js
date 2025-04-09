const config = useRuntimeConfig()
const WORDPRESS_BASE_URL = config.public.wordpressBaseUrl

export const getOffices = async () => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/office`)
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}
