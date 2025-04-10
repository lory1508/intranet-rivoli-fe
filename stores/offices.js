// stores/office.js
import { defineStore } from 'pinia'

export const useOfficeStore = defineStore('offices', {
  state: () => ({
    offices: [], // Initial state for your offices array
  }),
  actions: {
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
    getOffices: (state) => state.offices,
    officeCount: (state) => state.offices.length,
    getOfficeById: (state) => (id) => state.offices.find((office) => office.id === id),
    getOfficeBySlug: (state) => (slug) => state.offices.find((office) => office.slug === slug),
  },
})
