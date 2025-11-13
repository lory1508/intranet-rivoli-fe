// ~/composables/useEmployees.js

export const useEmployees = async (filters = {}) => {
  const config = useRuntimeConfig();
  const token = config.public.strapi.token;

  const query = {
    populate: ["department", "service", "office"],
    ...filters,
  };

  const res = await $fetch(`${config.public.strapi.url}/api/employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    query,
  });

  return res;
};

export const getEmployeeByDocumentId = async (id) => {
  if (!id) return null;

  const config = useRuntimeConfig();
  const token = config.public.strapi.token;

  const res = await $fetch(`${config.public.strapi.url}/api/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    query: {
      populate: ["department", "service", "office"],
    },
  });

  return res;
}