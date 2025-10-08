// stores/accessibilityStore.js
import { defineStore } from 'pinia'

export const useAccessibilityStore = defineStore('accessibility', {
  state: () => ({
    isLargeFont: false,
    isHighContrast: false,
  }),
  actions: {
    toggleFontSize() {
      this.isLargeFont = !this.isLargeFont
      localStorage.setItem('largeFont', this.isLargeFont)
    },

    // toggleContrast() {
    //   this.isHighContrast = !this.isHighContrast
    //   localStorage.setItem('highContrast', this.isHighContrast)
    // },

    initializePreferences() {
      // Initialize preferences from localStorage
      const savedLargeFont = localStorage.getItem('largeFont') === 'true'
      // const savedHighContrast = localStorage.getItem('highContrast') === 'true'
      this.isLargeFont = savedLargeFont
      // this.isHighContrast = savedHighContrast
    },
  },
})
