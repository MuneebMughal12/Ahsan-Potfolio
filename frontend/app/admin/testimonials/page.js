'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiEdit2, FiTrash2, FiPlus, FiArrowLeft } from 'react-icons/fi'
import api from '@/lib/api'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    rating: 5,
    message: '',
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const data = await api.testimonials.getAll()
      setTestimonials(data)
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.testimonials.update(editingId, formData)
      } else {
        await api.testimonials.create(formData)
      }
      setFormData({ name: '', company: '', rating: 5, message: '' })
      setEditingId(null)
      setShowForm(false)
      fetchTestimonials()
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
  }

  const handleEdit = (testimonial) => {
    setFormData(testimonial)
    setEditingId(testimonial._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await api.testimonials.delete(id)
        fetchTestimonials()
      } catch (error) {
        console.error('Error deleting testimonial:', error)
      }
    }
  }

  const handleCancel = () => {
    setFormData({ name: '', company: '', rating: 5, message: '' })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start"
      >
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin/dashboard">
              <motion.button
                className="p-2 hover:bg-secondary rounded-lg transition"
                whileHover={{ scale: 1.1 }}
              >
                <FiArrowLeft size={20} className="text-primary" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold gradient-text">Testimonials</h1>
              <p className="text-gray-400 mt-2">Manage client testimonials</p>
            </div>
          </div>
        </div>
        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FiPlus size={20} />
            Add Testimonial
          </motion.button>
        )}
      </motion.div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text">
            {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Client Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`text-3xl transition ${
                      star <= formData.rating
                        ? 'text-yellow-400'
                        : 'text-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  >
                    ★
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
                placeholder="What did you like about working with Ahsan?"
              />
            </div>

            <div className="flex gap-4">
              <motion.button
                type="submit"
                className="flex-1 px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                {editingId ? 'Update Testimonial' : 'Add Testimonial'}
              </motion.button>
              <motion.button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-secondary"
                whileHover={{ scale: 1.02 }}
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Testimonials List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-secondary rounded-xl p-8"
          >
            <p className="text-gray-400 mb-4">No testimonials yet</p>
            <motion.button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-2 gradient-bg text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              <FiPlus size={18} />
              Add First Testimonial
            </motion.button>
          </motion.div>
        ) : (
          testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary p-6 rounded-xl shadow-lg flex justify-between items-start group hover:bg-opacity-80 transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-light">
                      {testimonial.name}
                    </h3>
                    {testimonial.company && (
                      <p className="text-sm text-gray-400">{testimonial.company}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3 text-yellow-400">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p className="text-gray-300">{testimonial.message}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition ml-4">
                <motion.button
                  onClick={() => handleEdit(testimonial)}
                  className="p-2 bg-primary bg-opacity-20 text-primary rounded-lg hover:bg-opacity-30"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiEdit2 size={18} />
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(testimonial._id)}
                  className="p-2 bg-error bg-opacity-20 text-error rounded-lg hover:bg-opacity-30"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiTrash2 size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
