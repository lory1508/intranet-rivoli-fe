// stores/employee.js
import { defineStore } from 'pinia'
import { BASE_URL } from '~/utils/staticData/constants'

export const useEmployeeStore = defineStore('employees', {
  state: () => ({
    employees: [], // Initial state for your employees array
    fetched: false,
  }),
  actions: {
    async getEmployees() {
      if (this.fetched && this.employees.length > 0) {
        return this.employees
      }

      try {
        const res = await useFetch(`${BASE_URL}/wp-json/custom/v1/ldap-users?per_page=100`)
        this.employees = res?.data || []
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
        const res = await useFetch(`${BASE_URL}/wp-json/custom/v1/ldap-users?meta_key=${section}&meta_value=${id}`)
        this.employees = res?.data || []
        this.fetched = true
        return this.employees
      } catch (err) {
        console.error('Failed to fetch employees', err)
        throw err
      }
    },
    async searchEmployees(query) {
      if (!this.fetched || this.employees.length == 0) {
        await this.getEmployees()
      }
      return this.employees.filter((employee) => {
        const departmentIds = employee?.acf?.department ? employee?.acf?.department.map((dept) => dept.ID) : []
        const officeIds = employee?.acf?.office ? employee?.acf?.office.map((office) => office.ID) : []
        const serviceIds = employee?.acf?.service ? employee?.acf?.service.map((service) => service.ID) : []

        return (
          employee?.first_name?.toLowerCase().includes(query?.query?.toLowerCase()) ||
          employee?.last_name?.toLowerCase().includes(query?.query?.toLowerCase()) ||
          employee?.acf?.phone.toLowerCase().includes(query?.query?.toLowerCase()) ||
          departmentIds.includes(Number(query?.department)) ||
          officeIds.includes(Number(query?.office)) ||
          serviceIds.includes(Number(query?.service))
        )
      })
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
