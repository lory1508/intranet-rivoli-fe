import { slugify, getData } from "../utils/index.js";

export const getExternalLinks = async (
  onlyHighlight = false,
  typeTitle = null,
  sort = ["title:asc"],
  limit = 1000
) => {
  try {
    const query = {
      populate: ["types"],
      sort: sort,
      "pagination[limit]": limit,
    };

    if (typeTitle) {
      query["filters[types][title][$eq]"] = typeTitle;
    }

    if (onlyHighlight) {
      query["filters[highlight][$eq]"] = true;
    }

    const resStrapi = await getData("external-links", query);
    
    const el = resStrapi.data
    .map((item) => {
      const slugTypes = [];
      const types = item.types || [];
        types.forEach((type) => {
          slugTypes.push(slugify(type.title));
        });
        return {
          title: item.title,
          icon: item.icon || "",
          href: item.url,
          type: types.map((type) => type.title),
          slugType: slugTypes,
          slug: item.slug,
          highlight: item.highlight,
        };
      })
      .sort((a, b) => (a.slugType > b.slugType ? 1 : -1));

    return el;
  } catch (err) {
    console.error(err);
  }
};

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
    const sort = ["title:asc"];
    const externalLinks = await getExternalLinks(
      onlyHighlight,
      "Strumenti personali",
      sort
    );
    return externalLinks.filter((externalLink) =>
      externalLink.slugType.includes(type)
    );
  } catch (err) {
    console.error(err);
  }
};
