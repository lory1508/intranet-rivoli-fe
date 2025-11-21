import { getData } from "#imports";

export const getAlert = async () => {
  try {
    const params = {
      sort: ["publishedAt:desc"],
      "pagination[limit]": 1,
    };

    const resStrapi = await getData("alerts", params);

    return resStrapi.data[0];
  } catch (err) {
    console.error(err);
  }
};
