// stores/categorie.js
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [], // Initial state for your categories array
  }),
  actions: {
    setCategories(categoriesArray) {
      this.categories = categoriesArray
    },
    addCategory(category) {
      this.categories.push(category)
    },
    clearCategories() {
      this.categories = []
    },
  },
  getters: {
    getCategories: (state) => state.categories,
    categoriesCount: (state) => state.categories.length,
    getCategoryById: (state) => (id) => state.categories.find((categorie) => categorie.id === id),
    getCategoryBySlug: (state) => (slug) => state.categories.find((categorie) => categorie.slug === slug),
  },
})
