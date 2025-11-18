import { capitalizeSentence } from "#imports";

export const getData = async (endpoint, params={}) => {
  try {
    const config = useRuntimeConfig();
    const token = config.public.strapi.token;

    const resStrapi = await $fetch(
      `${config.public.strapi.url}/api/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {...params},
      }
    );

    return resStrapi;
  } catch (err) {
    console.error(err);
  }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const setIntervalMethod = (callback, interval) => {
  callback()
  const intervalId = setInterval(callback, interval)
  return () => clearInterval(intervalId)
}

export const ByteToMega = (bytes) => {
  const MB = (bytes / (1024 * 1024)).toFixed(2)
  if (MB > 1024) {
    return `${(MB / 1024).toFixed(2)}GB`
  }
  if (MB < 1) {
    return `${MB}KB`
  }
  return `${MB}MB`
}

export const decodeHtmlEntities = (str) => {
  let doc = new DOMParser().parseFromString(str, 'text/html')
  return doc.documentElement.textContent || doc.body.textContent
}

export const formatEmployeeObject = (employee) => {
  return {
    id: employee?.docuemntId,
    name: capitalizeSentence(employee?.fullname),
    email: `${employee?.email}@comune.rivoli.to.it`,
    phone: employee?.phone || '',
    room: employee?.room || '',
    photo: employee?.photo || '',
    department: employee?.department?.title || '',
    service: employee?.service?.title || '',
    office: employee?.office?.title || '',
  }
}

export const formatArrayOfEmployees = (employees) => {
  return employees.map((employee) => formatEmployeeObject(employee))
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export const capitalizeFirstLetter = (val) => {
  if (val) return String(val).charAt(0).toUpperCase() + String(val).slice(1)
  else return ''
}

export const capitalizeSentence = (val) => {
  if (val) {
    const splitStr = val.toLowerCase().split(' ')
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = capitalizeFirstLetter(splitStr[i])
    }
    return splitStr.join(' ')
  } else return ''
}
