'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import api from '@/lib/api'

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if on login page
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    // Skip auth check for login page
    if (isLoginPage) {
      setLoading(false)
      return
    }

    const verify = async () => {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        setLoading(false)
        return
      }
      try {
        await api.auth.verify()
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }
    verify()
  }, [router, isLoginPage])

  if (loading) return <div className="bg-dark min-h-screen" />

  // For login page, just render children without sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  if (!isAuthenticated) return null

  return (
    <div className="flex bg-dark text-light min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
