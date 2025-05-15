// stores/externalLink.js
import { defineStore } from 'pinia'

export const useExternalLinkStore = defineStore('externalLinks', {
  state: () => ({
    externalLinks: [], // Initial state for your externalLinks array
  }),
  actions: {
    setExternalLinks(externalLinkArray) {
      this.externalLinks = externalLinkArray
    },
    addExternalLink(externalLink) {
      this.externalLinks.push(externalLink)
    },
    clearExternalLinks() {
      this.externalLinks = []
    },
  },
  getters: {
    getExternalLinks: (state) => state.externalLinks,
    externalLinkCount: (state) => state.externalLinks.length,
    getExternalLinkById: (state) => (id) => state.externalLinks.find((externalLink) => externalLink.id === id),
    getExternalLinkByType: (state) => (type) =>
      state.externalLinks.filter((externalLink) => externalLink.slugType === type),
  },
})
