// stores/categorie.js
import { defineStore } from 'pinia'
import { WORDPRESS_BASE_URL } from '~/utils/staticData/constants'

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [], // Initial state for your tags array
    fetched: false,
  }),

  actions: {
    async getTags() {
      if (this.fetched && this.tags.length > 0) {
        return this.tags
      }

      try {
        const res = await useFetch(`${WORDPRESS_BASE_URL}/tags`)
        this.tags =
          res?.data?.value.map((tag) => {
            return {
              id: tag?.id,
              name: tag?.name,
              slug: tag?.slug,
            }
          }) || []
        this.fetched = true
        return this.tags
      } catch (err) {
        console.error('Failed to fetch tags', err)
        throw err
      }
    },
  },
})
