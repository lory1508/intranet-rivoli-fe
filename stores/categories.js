// stores/categorie.js
import { defineStore } from 'pinia'
import { WORDPRESS_BASE_URL } from '~/utils/staticData/constants'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [], // Initial state for your categories array
    fetched: false,
  }),

  actions: {
    async getCategories() {
      if (this.fetched && this.categories.length > 0) {
        return this.categories
      }

      try {
        const res = await useFetch(`${WORDPRESS_BASE_URL}/categories?per_page=100`)
        this.categories =
          res?.data?.value.map((category) => {
            return {
              id: category?.id,
              parent: category?.parent || null,
              name: category?.name,
              slug: category?.slug,
              link: category?.link
                .replace(/.*\/category\//, '')
                .slice(0, -1)
                .replace(/\//g, '-'),
            }
          }) || []
        this.fetched = true
        return this.categories
      } catch (err) {
        console.error('Failed to fetch categories', err)
        throw err
      }
    },
    async getCategoryBySlug(slug) {
      try {
        if (!slug) return
        const res = await useFetch(`${WORDPRESS_BASE_URL}/category?slug=${slug}`)
        this.categories =
          res?.data?.value.map((category) => {
            return {
              id: category?.id,
              name: category?.name,
              slug: category?.slug,
              link: category?.link
                .replace(/.*\/category\//, '')
                .slice(0, -1)
                .replace(/\//g, '-'),
            }
          }) || []
        this.fetched = true
        return this.categories
      } catch (err) {
        console.error('Failed to fetch categories', err)
        throw err
      }
    },
  },
})
