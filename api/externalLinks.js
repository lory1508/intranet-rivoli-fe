import { WORDPRESS_BASE_URL } from '../utils/staticData/constants'
import { slugify } from '../utils/index.js'

/**
 * Fetches external links from the WordPress API, processes them,
 * and returns an array of external link objects with attributes such as
 * title, icon, href, type, slugType, slug, and highlight status.
 * Optionally filters the results to include only highlighted links.
 *
 * @param {boolean} [onlyHighlight=false] - If true, filters the returned
 * links to include only those marked as highlighted.
 * @returns {Promise<Array>} A promise that resolves to an array of external
 * link objects.
 */
export const getExternalLinks = async (onlyHighlight = false) => {
  try {
    const res = await useFetch(`${WORDPRESS_BASE_URL}/external-link?per_page=100`)
    const externalLinks = res?.data?.value
      .map((el) => {
        const slugTypes = []
        const types = el?.acf?.type || []
        types.forEach((type) => {
          slugTypes.push(slugify(type))
        })
        return {
          title: el.title.rendered,
          icon: el?.acf?.icon || '',
          href: el?.acf?.url,
          type: types,
          slugType: slugTypes,
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

/**
 * Fetches and filters external links from the WordPress API by type.
 * Optionally filters the results to include only highlighted links.
 *
 * @param {string} type - The type of external link to retrieve.
 * @param {boolean} [onlyHighlight=false] - If true, filters the returned links
 * to include only those marked as highlighted.
 * @returns {Promise<Array>} A promise that resolves to an array of external link
 * objects that match the given type.
 */
export const getExternalLinksByType = async (type, onlyHighlight = false) => {
  try {
    const externalLinks = await getExternalLinks(onlyHighlight)
    return externalLinks.filter((externalLink) => externalLink.slugType.includes(type))
  } catch (err) {
    console.error(err)
  }
}
