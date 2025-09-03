// stores/office.js
import { defineStore } from 'pinia'
import { WORDPRESS_BASE_URL } from '~/utils/staticData/constants'

export const useOfficeStore = defineStore('offices', {
  state: () => ({
    offices: [], // Initial state for your offices array
  }),
  actions: {
    async getOffices() {
      if (this.fetched && this.offices.length > 0) {
        return this.offices
      }

      try {
        const res = await useFetch(`${WORDPRESS_BASE_URL}/office?per_page=100`)
        this.offices = res?.data || []
        this.fetched = true
        return this.offices
      } catch (err) {
        console.error('Failed to fetch offices', err)
        throw err
      }
    },
    async getOfficeBySlug(slug) {
      try {
        if (!slug) return
        const res = await useFetch(`${WORDPRESS_BASE_URL}/office?slug=${slug}`)
        this.offices = res?.data || []
        this.fetched = true
        return this.offices
      } catch (err) {
        console.error('Failed to fetch offices', err)
        throw err
      }
    },
    setOffices(officeArray) {
      this.offices = officeArray
    },
    addOffice(office) {
      this.offices.push(office)
    },
    clearOffices() {
      this.offices = []
    },
  },
  getters: {
    officeCount: (state) => state.offices.length,
    getOfficeById: (state) => (id) => state.offices.find((office) => office.id === id),
  },
})
