// stores/employee.js
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employees', {
  state: () => ({
    employees: [], // Initial state for your employees array
  }),
  actions: {
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
    getEmployees: (state) => state.employees,
    employeeCount: (state) => state.employees.length,
    searchEmployees: (state) => {
      return (query) =>
        state.employees.filter((employee) => {
          return (
            employee?.title?.rendered.toLowerCase().includes(query?.query?.toLowerCase()) ||
            employee?.acf?.phone.toLowerCase().includes(query?.query?.toLowerCase()) ||
            employee?.acf?.department.includes(query?.department) ||
            employee?.acf?.office.includes(query?.office) ||
            employee?.acf?.service.includes(query?.service)
          )
        })
    },
    getEmployeeById: (state) => (id) => state.employees.find((employee) => employee.id === id),
    getEmployeeBySlug: (state) => (slug) => state.employees.find((employee) => employee.slug === slug),
  },
})
