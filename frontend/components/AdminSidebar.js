'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FiMenu, FiX, FiLogOut, FiHome, FiLayout, FiImage, FiMessageSquare, FiSettings, FiStar, FiAward } from 'react-icons/fi'

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { href: '/admin/projects', label: 'Projects', icon: FiLayout },
    { href: '/admin/gallery', label: 'Gallery', icon: FiImage },
    { href: '/admin/skills', label: 'Skills', icon: FiAward },
    { href: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
    { href: '/admin/testimonials', label: 'Testimonials', icon: FiStar },
    { href: '/admin/settings', label: 'Settings', icon: FiSettings },
  ]

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 gradient-bg text-white rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-secondary w-64 border-r border-gray-700 flex flex-col transition-all z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold gradient-text">AA Admin</h2>
          <p className="text-gray-400 text-sm mt-1">Portfolio Manager</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                    isActive
                      ? 'gradient-bg text-white'
                      : 'text-gray-400 hover:bg-dark hover:text-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-error text-white rounded-lg font-semibold hover:bg-opacity-90"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
