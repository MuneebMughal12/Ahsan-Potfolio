const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const apiCall = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // Add auth token if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'API request failed')
  }

  return response.json()
}

// Auth API calls
export const auth = {
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  verify: () =>
    apiCall('/auth/verify', {
      method: 'POST',
    }),

  changePassword: (email, oldPassword, newPassword) =>
    apiCall('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ email, oldPassword, newPassword }),
    }),
}

// Projects API calls
export const projects = {
  getAll: () => apiCall('/projects'),

  getFeatured: () => apiCall('/projects/featured'),

  getById: (id) => apiCall(`/projects/${id}`),

  create: (data) =>
    apiCall('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/projects/${id}`, {
      method: 'DELETE',
    }),
}

// Gallery API calls
export const gallery = {
  getAll: () => apiCall('/gallery'),

  getFeatured: () => apiCall('/gallery/featured'),

  getByCategory: (category) => apiCall(`/gallery/category/${category}`),

  create: (data) =>
    apiCall('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/gallery/${id}`, {
      method: 'DELETE',
    }),
}

// Contact API calls
export const contact = {
  getAll: () => apiCall('/contact'),

  getUnread: () => apiCall('/contact/unread'),

  create: (data) =>
    apiCall('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/contact/${id}`, {
      method: 'DELETE',
    }),
}

// Testimonials API calls
export const testimonials = {
  getAll: () => apiCall('/testimonials'),

  getFeatured: () => apiCall('/testimonials/featured'),

  getById: (id) => apiCall(`/testimonials/${id}`),

  create: (data) =>
    apiCall('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/testimonials/${id}`, {
      method: 'DELETE',
    }),

  updateOrder: (testimonials) =>
    apiCall('/testimonials/order/update', {
      method: 'PUT',
      body: JSON.stringify({ testimonials }),
    }),
}

// Settings API calls
export const settings = {
  get: () => apiCall('/settings'),

  update: (data) =>
    apiCall('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
}
