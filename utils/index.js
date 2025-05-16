import { getDepartments } from '~/api/departments'
import { getOffices } from '~/api/offices'
import { getServices } from '~/api/services'
import { getEmployees } from '~/api/employees'
import { getExternalLinks } from '~/api/externalLinks'

export const updateDepartmentStore = async (departmentStore) => {
  try {
    const storeDeps = departmentStore.getDepartments
    if (storeDeps?.length === 0) {
      const deps = await getDepartments()
      departmentStore.setDepartments(deps)
    }
  } catch (err) {
    console.error(err)
  }
}

export const updateOfficeStore = async (officeStore) => {
  try {
    const storeOffices = officeStore.getOffices
    if (storeOffices?.length === 0) {
      const offices = await getOffices()
      officeStore.setOffices(offices)
    }
  } catch (err) {
    console.error(err)
  }
}

export const updateServiceStore = async (serviceStore) => {
  try {
    const storeServices = serviceStore.getServices
    if (storeServices?.length === 0) {
      const services = await getServices()
      serviceStore.setServices(services)
    }
  } catch (err) {
    console.error(err)
  }
}

export const updateEmployeeStore = async (employeeStore) => {
  try {
    const storeEmployees = employeeStore.getEmployees
    if (storeEmployees?.length === 0) {
      const employees = await getEmployees()
      employeeStore.setEmployees(employees)
    }
  } catch (err) {
    console.error(err)
  }
}

export const updateExternalLinkStore = async (externalLinkStore) => {
  try {
    const storeExternalLinks = externalLinkStore.getExternalLinks
    if (storeExternalLinks?.length === 0) {
      const externalLinks = await getExternalLinks()
      externalLinkStore.setExternalLinks(externalLinks)
    }
  } catch (err) {
    console.error(err)
  }
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const setIntervalMethod = (callback, interval) => {
  callback()
  const intervalId = setInterval(callback, interval)
  return () => clearInterval(intervalId)
}
