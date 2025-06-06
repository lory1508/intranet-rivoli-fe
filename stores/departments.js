// stores/department.js
import { defineStore } from 'pinia'
import { WORDPRESS_BASE_URL } from '~/utils/staticData/constants'

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
        const res = await useFetch(`${WORDPRESS_BASE_URL}/department`)
        this.departments = res?.data || []
        this.fetched = true
        return this.departments
      } catch (err) {
        console.error('Failed to fetch departments', err)
        throw err
      }
    },
    async getDepartmentBySlug(slug) {
      try {
        if (!slug) return
        const res = await useFetch(`${WORDPRESS_BASE_URL}/department?slug=${slug}`)
        this.departments = res?.data || []
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
