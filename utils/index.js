export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const setIntervalMethod = (callback, interval) => {
  callback()
  const intervalId = setInterval(callback, interval)
  return () => clearInterval(intervalId)
}

export const ByteToMega = (bytes) => {
  const MB = (bytes / (1024 * 1024)).toFixed(2)
  if (MB > 1024) {
    return `${(MB / 1024).toFixed(2)}GB`
  }
  if (MB < 1) {
    return `${MB}KB`
  }
  return `${MB}MB`
}

export const formatEmployeeObject = (employee) => {
  console.log('employee', employee)
  return {
    id: employee?.id,
    name: `${employee?.first_name} ${employee?.last_name}`,
    email: employee?.data?.user_email || '',
    phone: employee?.phone || '',
    room: employee?.room || '',
    photo: employee?.avatar_url || '',
    department: employee?.department ? employee?.department[0] : '',
    service: employee?.service ? employee?.service[0] : '',
    office: employee?.office ? employee?.office[0] : '',
  }
}

export const formatArrayOfEmployees = (employees) => {
  return employees.map((employee) => formatEmployeeObject(employee))
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
