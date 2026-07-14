'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiEdit2, FiTrash2, FiPlus, FiArrowLeft, FiStar } from 'react-icons/fi'
import api from '@/lib/api'

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Residential',
    location: '',
    client: '',
    year: new Date().getFullYear(),
    area: '',
    budget: '',
    featured: false,
    thumbnail: '',
    images: [],
    floorPlans: [],
    renderings: [],
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await api.projects.getAll()
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.projects.update(editingId, formData)
      } else {
        await api.projects.create(formData)
      }
      resetForm()
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleEdit = (project) => {
    setFormData(project)
    setEditingId(project._id)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await api.projects.delete(id)
        fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const toggleFeatured = async (project) => {
    try {
      await api.projects.update(project._id, {
        ...project,
        featured: !project.featured,
      })
      fetchProjects()
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Residential',
      location: '',
      client: '',
      year: new Date().getFullYear(),
      area: '',
      budget: '',
      featured: false,
      thumbnail: '',
      images: [],
      floorPlans: [],
      renderings: [],
    })
    setEditingId(null)
    setShowForm(false)
  }

  const categories = ['Residential', 'Commercial', 'Interior']

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
            <h1 className="text-4xl font-bold gradient-text">Projects</h1>
            <p className="text-gray-400 mt-2">Manage portfolio projects</p>
          </div>
        </div>
        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FiPlus size={20} />
            Add Project
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
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="Modern House Design"
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

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="Dubai, UAE"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Client
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) =>
                    setFormData({ ...formData, client: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="Client Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Area (sq ft)
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="5000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Budget
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="$50,000"
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
                  Featured Project
                </label>
              </div>
            </div>

            {/* Project Thumbnail Image */}
            <div className="border-t border-gray-600 pt-6">
              <label className="block text-sm font-semibold mb-2 text-light">
                Project Thumbnail Image
              </label>
              <p className="text-xs text-gray-400 mb-3">Upload an image for the project thumbnail</p>

              {formData.thumbnail && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={formData.thumbnail}
                    alt="Thumbnail Preview"
                    className="w-40 h-32 rounded-lg object-cover border-2 border-primary"
                  />
                </div>
              )}

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
                          thumbnail: reader.result,
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
                <p className="text-xs text-gray-400 mt-2">Or paste URL below:</p>
              </div>

              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition mb-6"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
                placeholder="Project description..."
              />
            </div>

            <div className="flex gap-4">
              <motion.button
                type="submit"
                className="flex-1 px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                {editingId ? 'Update Project' : 'Add Project'}
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

      {/* Projects List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-secondary rounded-xl p-8"
          >
            <p className="text-gray-400 mb-4">No projects yet</p>
            <motion.button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-2 gradient-bg text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              <FiPlus size={18} />
              Add First Project
            </motion.button>
          </motion.div>
        ) : (
          projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary p-6 rounded-xl shadow-lg group hover:bg-opacity-80 transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-light">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <FiStar className="text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-400">
                    <span>{project.category}</span>
                    {project.location && <span>📍 {project.location}</span>}
                    {project.year && <span>📅 {project.year}</span>}
                  </div>
                  <p className="text-gray-300 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <motion.button
                    onClick={() => toggleFeatured(project)}
                    className={`p-2 rounded-lg transition ${
                      project.featured
                        ? 'bg-yellow-400 bg-opacity-20 text-yellow-400'
                        : 'bg-gray-600 bg-opacity-20 text-gray-400 hover:text-yellow-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiStar size={18} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleEdit(project)}
                    className="p-2 bg-primary bg-opacity-20 text-primary rounded-lg hover:bg-opacity-30 transition"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiEdit2 size={18} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 bg-error bg-opacity-20 text-error rounded-lg hover:bg-opacity-30 transition"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiTrash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
