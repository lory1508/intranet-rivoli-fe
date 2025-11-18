// stores/service.js
import { defineStore } from 'pinia'
import { WORDPRESS_BASE_URL } from '~/utils/staticData/constants'
import { getData } from '#imports'

export const useServiceStore = defineStore('services', {
  state: () => ({
    services: [], // Initial state for your services array
    fetched: false,
  }),
  actions: {
    async getServices() {
      if (this.fetched && this.services.length > 0) {
        return this.services
      }

      try {
        const res = await getData("services");
        this.services = res.data || [];
        this.fetched = true;
        return this.services;
      } catch (err) {
        console.error('Failed to fetch services', err)
        throw err
      }
    },
    async getServiceBySlug(slug) {
      try {
        if (!slug) return
        const res = await useFetch(`${WORDPRESS_BASE_URL}/service?slug=${slug}`)
        this.services = res?.data || []
        this.fetched = true
        return this.services
      } catch (err) {
        console.error('Failed to fetch services', err)
        throw err
      }
    },
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
    serviceCount: (state) => state.services.length,
    getServiceById: (state) => (id) => state.services.find((service) => service.id === id),
  },
})
