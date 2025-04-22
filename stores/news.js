// stores/employee.js
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('news', {
  state: () => ({
    news: [], // Initial state for your news array
  }),
  actions: {
    setNews(employeeArray) {
      this.news = employeeArray
    },
    addEmployee(employee) {
      this.news.push(employee)
    },
    clearNews() {
      this.news = []
    },
  },
  getters: {
    getNews: (state) => state.news,
    employeeCount: (state) => state.news.length,
    searchNews: (state) => {
      return (query) =>
        state.news.filter((employee) => {
          return (
            employee?.title?.rendered.toLowerCase().includes(query?.query?.toLowerCase()) ||
            employee?.acf?.phone.toLowerCase().includes(query?.query?.toLowerCase()) ||
            employee?.acf?.department.includes(query?.department) ||
            employee?.acf?.office.includes(query?.office) ||
            employee?.acf?.service.includes(query?.service)
          )
        })
    },
    getEmployeeById: (state) => (id) => state.news.find((employee) => employee.id === id),
    getEmployeeBySlug: (state) => (slug) => state.news.find((employee) => employee.slug === slug),
  },
})
