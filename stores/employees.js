// stores/employee.js
import { defineStore } from 'pinia'
import { WORDPRESS_BASE_URL } from '~/utils/staticData/constants'

export const useEmployeeStore = defineStore('employees', {
  state: () => ({
    employees: [], // Initial state for your employees array
    fetched: false,
  }),
  actions: {
    async getEmployees(query, pagination) {
      if (this.employees.length > 0) {
        return this.employees
      }

      try {
        let params = ''
        if (pagination) params += `per_page=${pagination.perPage}&page=${pagination.page}`
        else params += `per_page=100&page=1`

        if (query?.department) params += `&department=${query?.department}`
        if (query?.office) params += `&office=${query?.office}`
        if (query?.service) params += `&service=${query?.service}`
        if (query?.query) params += `&search=${query?.query}`

        const res = await $fetch.raw(`${WORDPRESS_BASE_URL}/employee?${params}`)

        this.employees = {
          data: res._data || [],
          pagination: {
            total: res.headers.get('x-wp-total'),
            totalPages: res.headers.get('x-wp-totalpages'),
            page: pagination?.page || 1,
          },
        }

        this.fetched = true
        return this.employees
      } catch (err) {
        console.error('Failed to fetch employees', err)
        throw err
      }
    },
    async runEmployeeSearch(section, id) {
      try {
        if (!section || !id) return
        const res = await useFetch(`${WORDPRESS_BASE_URL}/employee?meta_key=${section}&meta_value=${id}`)
        this.employees = res?.data || []
        this.fetched = true
        return this.employees
      } catch (err) {
        console.error('Failed to fetch employees', err)
        throw err
      }
    },
    async searchEmployees(query, pagination) {
      await this.getEmployees(query, pagination)
      return this.employees
    },
    setEmployees(employeeArray) {
      this.employees = employeeArray
    },
    addEmployee(employee) {
      this.employees.push(employee)
    },
    clearEmployees() {
      this.employees = []
    },
  },
  getters: {
    employeeCount: (state) => state.employees.length,
    getEmployeeById: (state) => (id) => state.employees.find((employee) => employee.id === id),
    getEmployeeBySlug: (state) => (slug) => state.employees.find((employee) => employee.slug === slug),
  },
})
