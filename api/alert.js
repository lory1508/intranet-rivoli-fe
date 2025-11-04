import { WORDPRESS_BASE_URL } from "../utils/staticData/constants";

export const getAlert = async () => {
  try {
    const config = useRuntimeConfig();
    const token = config.public.strapi.token;

    const resStrapi = await $fetch(
      `${config.public.strapi.url}/api/alerts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sort: ["publishedAt:desc"],
          'pagination[limit]': 1
        },
      }
    );

    console.log("ALERT", resStrapi.data[0]);
    return resStrapi.data[0];
  } catch (err) {
    console.error(err);
  }
};
