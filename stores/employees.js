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
          const departmentIds = employee?.acf?.department.map((dept) => dept.ID)
          const officeIds = employee?.acf?.office.map((office) => office.ID)
          const serviceIds = employee?.acf?.service.map((service) => service.ID)

          return (
            employee?.title?.rendered.toLowerCase().includes(query?.query?.toLowerCase()) ||
            employee?.acf?.phone.toLowerCase().includes(query?.query?.toLowerCase()) ||
            departmentIds.includes(Number(query?.department)) ||
            officeIds.includes(Number(query?.office)) ||
            serviceIds.includes(Number(query?.service))
          )
        })
    },
    getEmployeeById: (state) => (id) => state.employees.find((employee) => employee.id === id),
    getEmployeeBySlug: (state) => (slug) => state.employees.find((employee) => employee.slug === slug),
  },
})
