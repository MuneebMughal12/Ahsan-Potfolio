'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiEdit2, FiTrash2, FiPlus, FiArrowLeft, FiStar } from 'react-icons/fi'
import api from '@/lib/api'

export default function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Residential',
    image: { url: '', publicId: '' },
    tags: '',
    featured: false,
  })
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      setLoading(true)
      const data = await api.gallery.getAll()
      setGalleryItems(data)
    } catch (error) {
      console.error('Failed to fetch gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      }

      if (editingId) {
        await api.gallery.update(editingId, submitData)
      } else {
        await api.gallery.create(submitData)
      }
      resetForm()
      fetchGallery()
    } catch (error) {
      console.error('Error saving gallery item:', error)
    }
  }

  const handleEdit = (item) => {
    setFormData({
      ...item,
      tags: item.tags.join(', '),
    })
    setEditingId(item._id)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        await api.gallery.delete(id)
        fetchGallery()
      } catch (error) {
        console.error('Error deleting gallery item:', error)
      }
    }
  }

  const toggleFeatured = async (item) => {
    try {
      await api.gallery.update(item._id, {
        ...item,
        featured: !item.featured,
      })
      fetchGallery()
    } catch (error) {
      console.error('Error updating gallery item:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Residential',
      image: { url: '', publicId: '' },
      tags: '',
      featured: false,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const categories = ['Residential', 'Commercial', 'Interior', 'Other']

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start"
      >
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard">
            <motion.button
              className="p-2 hover:bg-secondary rounded-lg transition"
              whileHover={{ scale: 1.1 }}
            >
              <FiArrowLeft size={20} className="text-primary" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Gallery</h1>
            <p className="text-gray-400 mt-2">Manage gallery images</p>
          </div>
        </div>
        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FiPlus size={20} />
            Add Image
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
            {editingId ? 'Edit Gallery Item' : 'Add Gallery Image'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="Image title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-light">
                  Upload Image *
                </label>
                <p className="text-xs text-gray-400 mb-3">Choose file or paste URL</p>

                {/* Image Preview */}
                {formData.image?.url && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={formData.image.url}
                      alt="Preview"
                      className="w-40 h-32 rounded-lg object-cover border-2 border-primary"
                    />
                  </div>
                )}

                {/* File Upload */}
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setFormData({
                            ...formData,
                            image: { ...formData.image, url: reader.result },
                          })
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  />
                  <p className="text-xs text-gray-400 mt-2">Or paste URL below:</p>
                </div>

                {/* Image URL */}
                <input
                  type="url"
                  value={formData.image.url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: { ...formData.image, url: e.target.value },
                    })
                  }
                  required
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="modern, minimalist, design"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <label
                  htmlFor="featured"
                  className="text-sm font-semibold text-light cursor-pointer"
                >
                  Featured Image
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
                placeholder="Image description..."
              />
            </div>

            <div className="flex gap-4">
              <motion.button
                type="submit"
                className="flex-1 px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                {editingId ? 'Update Image' : 'Add Image'}
              </motion.button>
              <motion.button
                type="button"
                onClick={resetForm}
                className="flex-1 px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-secondary"
                whileHover={{ scale: 1.02 }}
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Gallery Grid */}
      <div>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading gallery...</p>
          </div>
        ) : galleryItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-secondary rounded-xl p-8"
          >
            <p className="text-gray-400 mb-4">No gallery items yet</p>
            <motion.button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-2 gradient-bg text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              <FiPlus size={18} />
              Add First Image
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative h-48 bg-dark overflow-hidden">
                  {item.image?.url && (
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <motion.button
                      onClick={() => toggleFeatured(item)}
                      className={`p-2 rounded-lg transition ${
                        item.featured
                          ? 'bg-yellow-400 bg-opacity-20 text-yellow-400'
                          : 'bg-gray-600 bg-opacity-20 text-gray-400 hover:text-yellow-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiStar size={18} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-primary bg-opacity-20 text-primary rounded-lg hover:bg-opacity-30 transition"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiEdit2 size={18} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 bg-error bg-opacity-20 text-error rounded-lg hover:bg-opacity-30 transition"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiTrash2 size={18} />
                    </motion.button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-light">{item.title}</h3>
                    {item.featured && (
                      <FiStar className="text-yellow-400 fill-yellow-400" size={16} />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{item.category}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-primary bg-opacity-20 text-primary px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
