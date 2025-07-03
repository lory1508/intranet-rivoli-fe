// services/auth.js

import { BASE_URL, WORDPRESS_BASE_URL } from '../utils/staticData/constants'

export const login = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message)
    return data // contains token, user_email, user_nicename, etc.
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async (token) => {
  if (!token) return

  try {
    const res = await fetch(`${WORDPRESS_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('Failed to fetch user info')

    const data = await res.json()
    return data
  } catch (err) {
    console.error('Error fetching user:', err)
    this.logout()
  }
}
