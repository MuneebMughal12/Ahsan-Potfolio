'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiTrash2, FiEye, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'
import api from '@/lib/api'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const data = await api.contact.getAll()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await api.contact.delete(id)
        fetchMessages()
      } catch (error) {
        console.error('Error deleting message:', error)
      }
    }
  }

  const markAsRead = async (id) => {
    try {
      const message = messages.find((msg) => msg._id === id)
      await api.contact.update(id, { ...message, status: 'Read' })
      fetchMessages()
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link href="/admin/dashboard">
          <motion.button
            className="p-2 hover:bg-secondary rounded-lg transition"
            whileHover={{ scale: 1.1 }}
          >
            <FiArrowLeft size={20} className="text-primary" />
          </motion.button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold gradient-text">Messages</h1>
          <p className="text-gray-400 mt-2">Contact form submissions</p>
        </div>
      </motion.div>

      {/* Messages List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-secondary rounded-xl p-8"
        >
          <p className="text-gray-400">No messages yet</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl shadow-lg cursor-pointer transition group ${
                msg.status === 'Unread'
                  ? 'bg-gradient-to-r from-primary to-cyan-500 bg-opacity-20 border-l-4 border-primary'
                  : 'bg-secondary hover:bg-opacity-80'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-light">{msg.name}</h3>
                  <p className="text-sm text-gray-400">{msg.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      msg.status === 'Unread'
                        ? 'bg-primary text-white'
                        : 'bg-gray-600 bg-opacity-30 text-gray-300'
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
              </div>

              <h4 className="font-semibold text-primary mb-2 text-sm">
                {msg.subject}
              </h4>
              <p className="text-gray-300 line-clamp-2 mb-4">{msg.message}</p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()} at{' '}
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMessage(msg)
                      markAsRead(msg._id)
                    }}
                    className="p-2 bg-primary bg-opacity-20 text-primary rounded-lg hover:bg-opacity-30"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiEye size={18} />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(msg._id)
                    }}
                    className="p-2 bg-error bg-opacity-20 text-error rounded-lg hover:bg-opacity-30"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiTrash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedMessage(null)}
        >
          <motion.div
            className="bg-secondary rounded-xl max-w-2xl w-full p-8 border border-gray-700"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">
              {selectedMessage.subject}
            </h2>
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm text-gray-400 mb-1">From</p>
                <p className="font-semibold text-light">{selectedMessage.name}</p>
                <p className="text-sm text-gray-400">{selectedMessage.email}</p>
              </div>
              {selectedMessage.phone && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Phone</p>
                  <p className="font-semibold text-light">{selectedMessage.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-400 mb-2">Message</p>
                <p className="p-4 bg-dark rounded-lg text-gray-300 whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Received: {new Date(selectedMessage.createdAt).toLocaleString()}
              </p>
            </div>
            <motion.button
              onClick={() => setSelectedMessage(null)}
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
