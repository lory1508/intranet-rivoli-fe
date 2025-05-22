// stores/tag.js
import { defineStore } from 'pinia'

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [], // Initial state for your tags array
  }),
  actions: {
    setTags(tagsArray) {
      this.tags = tagsArray
    },
    addTag(tag) {
      this.tags.push(tag)
    },
    clearTags() {
      this.tags = []
    },
  },
  getters: {
    getTags: (state) => state.tags,
    tagsCount: (state) => state.tags.length,
    getTagById: (state) => (id) => state.tags.find((tag) => tag.id === id),
    getTagBySlug: (state) => (slug) => state.tags.find((tag) => tag.slug === slug),
  },
})
