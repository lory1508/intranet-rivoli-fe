// stores/department.js
import { defineStore } from 'pinia'
import { getData } from '#imports'

export const useDepartmentStore = defineStore('departments', {
  state: () => ({
    departments: [], // Initial state for your departments array
    fetched: false,
  }),
  actions: {
    async getDepartments() {
      if (this.fetched && this.departments.length > 0) {
        return this.departments
      }

      try {
        const res = await getData('departments')
        this.departments = res.data || []
        this.fetched = true
        return this.departments
      } catch (err) {
        console.error('Failed to fetch departments', err)
        throw err
      }
    },
    setDepartments(departmentArray) {
      this.departments = departmentArray
    },
    addDepartment(department) {
      this.departments.push(department)
    },
    clearDepartments() {
      this.departments = []
    },
  },
  getters: {
    departmentCount: (state) => state.departments.length,
    getDepartmentById: (state) => (id) => state.departments.find((department) => department.id === id),
  },
})
