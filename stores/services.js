// stores/service.js
import { defineStore } from 'pinia'

export const useServiceStore = defineStore('services', {
  state: () => ({
    services: [], // Initial state for your services array
  }),
  actions: {
    setServices(serviceArray) {
      this.services = serviceArray
    },
    addService(service) {
      this.services.push(service)
    },
    clearServices() {
      this.services = []
    },
  },
  getters: {
    getServices: (state) => state.services,
    serviceCount: (state) => state.services.length,
    getServiceById: (state) => (id) => state.services.find((service) => service.id === id),
    getServiceBySlug: (state) => (slug) => state.services.find((service) => service.slug === slug),
  },
})
