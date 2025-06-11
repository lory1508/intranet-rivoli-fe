import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const getExternalLinks = async (onlyHighlight = false) => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/external-link?per_page=100`)
    const externalLinks = res?.data?.value
      .map((el) => {
        return {
          title: el.title.rendered,
          icon: el?.acf?.icon || '',
          href: el?.acf?.url,
          type: el?.acf?.type || '',
          slugType: slugify(el?.acf?.type),
          slug: el?.slug,
          highlight: el?.acf?.highlight,
        }
      })
      .sort((a, b) => (a.slugType > b.slugType ? 1 : -1))

    if (onlyHighlight) {
      return externalLinks.filter((el) => el.highlight)
    }
    return externalLinks
  } catch (err) {
    console.error(err)
  }
}

export const getExternalLinksByType = async (type, onlyHighlight = false) => {
  try {
    const externalLinks = await getExternalLinks(onlyHighlight)
    return externalLinks.filter((externalLink) => externalLink.slugType === type)
  } catch (err) {
    console.error(err)
  }
}

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
