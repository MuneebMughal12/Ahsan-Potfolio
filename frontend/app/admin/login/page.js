'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await api.auth.login(email, password)
      localStorage.setItem('adminToken', result.token)
      router.push('/admin/dashboard')
    } catch (error) {
      setError('Login failed. Please try again.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-light">
      <div className="w-full max-w-md bg-secondary rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">AA</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
          <p className="text-gray-400 mt-2">Portfolio Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-light">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-light">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-4 bg-error bg-opacity-20 border-2 border-error rounded-lg text-error text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 transition"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

      </div>
    </div>
  )
}
