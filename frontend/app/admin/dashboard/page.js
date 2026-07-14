'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiLayout, FiImage, FiMessageSquare, FiStar } from 'react-icons/fi'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Projects',
      value: '0',
      icon: FiLayout,
      link: '/admin/projects',
      color: 'from-primary to-cyan-500',
    },
    {
      title: 'Gallery Images',
      value: '0',
      icon: FiImage,
      link: '/admin/gallery',
      color: 'from-accent to-cyan-400',
    },
    {
      title: 'Contact Messages',
      value: '0',
      icon: FiMessageSquare,
      link: '/admin/messages',
      color: 'from-warning to-yellow-500',
    },
    {
      title: 'Testimonials',
      value: '0',
      icon: FiStar,
      link: '/admin/testimonials',
      color: 'from-success to-green-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome back! Manage your portfolio content</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link key={index} href={stat.link}>
              <motion.div
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg cursor-pointer group`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, shadow: '0 20px 40px rgba(0,0,0,0.3)' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-white opacity-80 group-hover:opacity-100">
                    <Icon size={32} />
                  </div>
                  <span className="text-white text-opacity-60 text-sm">+0</span>
                </div>
                <p className="text-white text-opacity-80 text-sm mb-2">{stat.title}</p>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-secondary p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/projects">
            <motion.button
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              ➕ Add New Project
            </motion.button>
          </Link>
          <Link href="/admin/gallery">
            <motion.button
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              🖼️ Upload Gallery Image
            </motion.button>
          </Link>
          <Link href="/admin/testimonials">
            <motion.button
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              ⭐ Add Testimonial
            </motion.button>
          </Link>
          <Link href="/admin/skills">
            <motion.button
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              🏆 Manage Skills
            </motion.button>
          </Link>
          <Link href="/admin/settings">
            <motion.button
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              ⚙️ Settings
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Getting Started */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-secondary p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Getting Started</h2>
        <div className="space-y-3 text-gray-300">
          <p className="flex items-center gap-3">
            <span className="w-6 h-6 flex items-center justify-center rounded-full gradient-bg text-white font-bold text-sm">1</span>
            Click on any stat card above to manage that section
          </p>
          <p className="flex items-center gap-3">
            <span className="w-6 h-6 flex items-center justify-center rounded-full gradient-bg text-white font-bold text-sm">2</span>
            Use the sidebar to navigate between different management areas
          </p>
          <p className="flex items-center gap-3">
            <span className="w-6 h-6 flex items-center justify-center rounded-full gradient-bg text-white font-bold text-sm">3</span>
            Click Quick Action buttons to add new content quickly
          </p>
          <p className="flex items-center gap-3">
            <span className="w-6 h-6 flex items-center justify-center rounded-full gradient-bg text-white font-bold text-sm">4</span>
            Go to Settings to update profile information
          </p>
        </div>
      </motion.div>
    </div>
  )
}
