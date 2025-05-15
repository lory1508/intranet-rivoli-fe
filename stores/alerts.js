// stores/alert.js
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alerts', {
  state: () => ({
    alerts: [], // Initial state for your alerts array
  }),
  actions: {
    setAlerts(alertArray) {
      this.alerts = alertArray
    },
    addAlert(alert) {
      this.alerts.push(alert)
    },
    clearAlerts() {
      this.alerts = []
    },
  },
  getters: {
    getAlerts: (state) => state.alerts,
    alertCount: (state) => state.alerts.length,
    getAlertById: (state) => (id) => state.alerts.find((alert) => alert.id === id),
    getAlertBySlug: (state) => (slug) => state.alerts.find((alert) => alert.slug === slug),
  },
})
