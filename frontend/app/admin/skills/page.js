'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiEdit2, FiTrash2, FiPlus, FiArrowLeft } from 'react-icons/fi'

export default function AdminSkills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', level: 85 })

  useEffect(() => {
    const defaultSkills = [
      { id: 1, name: 'AutoCAD', level: 95 },
      { id: 2, name: 'Revit', level: 90 },
      { id: 3, name: 'SketchUp', level: 88 },
      { id: 4, name: '3DS Max', level: 85 },
      { id: 5, name: 'Lumion', level: 82 },
      { id: 6, name: 'Adobe Suite', level: 80 },
    ]
    setSkills(defaultSkills)
    setLoading(false)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert('Skill name required')
      return
    }
    if (editingId) {
      setSkills(skills.map(s => s.id === editingId ? { ...s, ...formData } : s))
    } else {
      setSkills([...skills, { id: Date.now(), ...formData }])
    }
    resetForm()
  }

  const handleEdit = (skill) => {
    setFormData(skill)
    setEditingId(skill.id)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this skill?')) {
      setSkills(skills.filter(s => s.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({ name: '', level: 85 })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard">
            <motion.button className="p-2 hover:bg-secondary rounded-lg transition" whileHover={{ scale: 1.1 }}>
              <FiArrowLeft size={20} className="text-primary" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Skills Management</h1>
            <p className="text-gray-400 mt-2">Add and manage your professional skills</p>
          </div>
        </div>
        {!showForm && (
          <motion.button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg" whileHover={{ scale: 1.05 }}>
            <FiPlus size={20} /> Add Skill
          </motion.button>
        )}
      </motion.div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-secondary p-8 rounded-xl shadow-lg max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 gradient-text">{editingId ? 'Edit Skill' : 'Add New Skill'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">Skill Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition" placeholder="e.g., AutoCAD, Revit, SketchUp" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">Proficiency Level: {formData.level}%</label>
              <input type="range" min="0" max="100" value={formData.level} onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div className="bg-dark p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">{formData.name || 'Skill Name'}</span>
                <span className="text-sm text-primary">{formData.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="gradient-bg h-2 rounded-full" style={{ width: `${formData.level}%` }}></div>
              </div>
            </div>
            <div className="flex gap-4">
              <motion.button type="submit" className="flex-1 px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg" whileHover={{ scale: 1.02 }}>
                {editingId ? 'Update Skill' : 'Add Skill'}
              </motion.button>
              <motion.button type="button" onClick={resetForm} className="flex-1 px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-secondary" whileHover={{ scale: 1.02 }}>
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      <div>
        {loading ? (
          <div className="text-center py-12"><p className="text-gray-400">Loading skills...</p></div>
        ) : skills.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 bg-secondary rounded-xl p-8">
            <p className="text-gray-400 mb-4">No skills added yet</p>
            <motion.button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-6 py-2 gradient-bg text-white rounded-lg font-semibold" whileHover={{ scale: 1.05 }}>
              <FiPlus size={18} /> Add First Skill
            </motion.button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-secondary p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Your Skills ({skills.length})</h2>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div key={skill.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-dark p-6 rounded-lg border border-gray-700 group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-light">{skill.name}</h3>
                      <p className="text-sm text-primary font-semibold">{skill.level}% Proficiency</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <motion.button onClick={() => handleEdit(skill)} className="p-2 bg-primary bg-opacity-20 text-primary rounded-lg hover:bg-opacity-30" whileHover={{ scale: 1.1 }}>
                        <FiEdit2 size={18} />
                      </motion.button>
                      <motion.button onClick={() => handleDelete(skill.id)} className="p-2 bg-error bg-opacity-20 text-error rounded-lg hover:bg-opacity-30" whileHover={{ scale: 1.1 }}>
                        <FiTrash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="gradient-bg h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
