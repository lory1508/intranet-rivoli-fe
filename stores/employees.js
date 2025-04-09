// stores/department.js
import { defineStore } from 'pinia'

export const useDepartmentStore = defineStore('departments', {
  state: () => ({
    departments: [], // Initial state for your departments array
  }),
  actions: {
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
    getDepartments: (state) => state.departments,
    departmentCount: (state) => state.departments.length,
    getDepartmentById: (state) => (id) => state.departments.find((department) => department.id === id),
    getDepartmentBySlug: (state) => (slug) => state.departments.find((department) => department.slug === slug),
  },
})
