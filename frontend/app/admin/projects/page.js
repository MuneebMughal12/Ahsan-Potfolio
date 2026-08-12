'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiEdit2, FiImage, FiPlus, FiStar, FiTrash2, FiUploadCloud, FiX } from 'react-icons/fi'
import api from '@/lib/api'

const emptyForm = () => ({
  title: '',
  projectCode: '',
  description: '',
  category: 'Residential',
  location: '',
  year: new Date().getFullYear(),
  area: '',
  featured: false,
  status: 'Completed',
  thumbnail: '',
  images: [],
})

const imageUrl = (image) => (typeof image === 'string' ? image : image?.url)

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm())
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setProjects(await api.projects.getAll())
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(emptyForm())
    setEditingId(null)
    setImageUrlInput('')
    setShowForm(false)
    setError('')
  }

  const editProject = (project) => {
    setFormData({
      ...emptyForm(),
      title: project.title || '',
      projectCode: project.projectCode || '',
      description: project.description || '',
      category: project.category || 'Residential',
      location: project.location || '',
      year: project.year || new Date().getFullYear(),
      area: project.area || '',
      featured: Boolean(project.featured),
      status: project.status || 'Completed',
      thumbnail: project.thumbnail || imageUrl(project.images?.[0]) || '',
      images: project.images || [],
    })
    setEditingId(project._id)
    setShowForm(true)
    setMessage('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const readFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const uploadImages = async (files) => {
    if (!files.length) return
    setUploading(true)
    setError('')
    try {
      const uploaded = []
      for (const file of files) {
        const data = await readFile(file)
        uploaded.push(await api.projects.upload(data, file.name))
      }
      setFormData((current) => {
        const images = [...current.images, ...uploaded]
        return { ...current, images, thumbnail: current.thumbnail || images[0]?.url || '' }
      })
      setMessage(`${uploaded.length} image${uploaded.length === 1 ? '' : 's'} uploaded.`)
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setUploading(false)
    }
  }

  const addImageUrl = () => {
    const url = imageUrlInput.trim()
    if (!url) return
    setFormData((current) => {
      const images = [...current.images, { url, alt: `${current.title || 'Project'} view ${current.images.length + 1}` }]
      return { ...current, images, thumbnail: current.thumbnail || url }
    })
    setImageUrlInput('')
  }

  const removeImage = (index) => {
    setFormData((current) => {
      const images = current.images.filter((_, imageIndex) => imageIndex !== index)
      const removed = imageUrl(current.images[index])
      return {
        ...current,
        images,
        thumbnail: current.thumbnail === removed ? imageUrl(images[0]) || '' : current.thumbnail,
      }
    })
  }

  const saveProject = async (event) => {
    event.preventDefault()
    if (!formData.images.length) {
      setError('Add at least one project image.')
      return
    }
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const payload = { ...formData, thumbnail: formData.thumbnail || imageUrl(formData.images[0]) }
      if (editingId) await api.projects.update(editingId, payload)
      else await api.projects.create(payload)
      await fetchProjects()
      resetForm()
      setMessage(editingId ? 'Project updated.' : 'Project added.')
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    try {
      await api.projects.delete(id)
      await fetchProjects()
      setMessage('Project deleted.')
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  const toggleFeatured = async (project) => {
    try {
      await api.projects.update(project._id, {
        title: project.title,
        projectCode: project.projectCode,
        description: project.description,
        category: project.category,
        location: project.location,
        year: project.year,
        area: project.area,
        status: project.status,
        thumbnail: project.thumbnail,
        images: project.images,
        featured: !project.featured,
      })
      await fetchProjects()
    } catch (updateError) {
      setError(updateError.message)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="p-2 hover:bg-secondary rounded-lg" aria-label="Back to dashboard"><FiArrowLeft className="text-primary" /></Link>
          <div><h1 className="text-3xl md:text-4xl font-bold gradient-text">Projects</h1><p className="text-gray-400 mt-2">Live portfolio content and galleries</p></div>
        </div>
        {!showForm && <button onClick={() => { setShowForm(true); setMessage('') }} className="inline-flex items-center justify-center gap-2 px-6 py-3 gradient-bg rounded-lg font-semibold"><FiPlus /> Add Project</button>}
      </div>

      {message && <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/40 text-green-300">{message}</div>}
      {error && <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300">{error}</div>}

      {showForm && (
        <motion.form onSubmit={saveProject} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-secondary p-5 md:p-8 rounded-2xl border border-gray-700 space-y-6">
          <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">{editingId ? 'Edit Project' : 'Add Project'}</h2><button type="button" onClick={resetForm} className="p-2 rounded-full hover:bg-white/10" aria-label="Close form"><FiX /></button></div>

          <div className="grid md:grid-cols-2 gap-5">
            <label className="space-y-2"><span className="text-sm font-semibold">Project title *</span><input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="admin-input" placeholder="Project title" /></label>
            <label className="space-y-2"><span className="text-sm font-semibold">Project code</span><input value={formData.projectCode} onChange={(e) => setFormData({ ...formData, projectCode: e.target.value })} className="admin-input" placeholder="GCE-000-26" /></label>
            <label className="space-y-2"><span className="text-sm font-semibold">Category</span><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="admin-input">{['Residential', 'Commercial', 'Interior', 'Other'].map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="space-y-2"><span className="text-sm font-semibold">Location *</span><input required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="admin-input" placeholder="Islamabad, Pakistan" /></label>
            <label className="space-y-2"><span className="text-sm font-semibold">Year *</span><input required type="number" min="1900" max="2100" value={formData.year} onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })} className="admin-input" /></label>
            <label className="space-y-2"><span className="text-sm font-semibold">Area</span><input value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className="admin-input" placeholder="50 x 90 ft" /></label>
            <label className="space-y-2"><span className="text-sm font-semibold">Status</span><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="admin-input">{['Completed', 'In Progress', 'Archived'].map((status) => <option key={status}>{status}</option>)}</select></label>
            <label className="flex items-center gap-3 pt-8"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5" /><span className="font-semibold">Featured on home page</span></label>
          </div>

          <label className="space-y-2 block"><span className="text-sm font-semibold">Description *</span><textarea required rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="admin-input resize-y" placeholder="Project overview" /></label>

          <div className="border-t border-gray-700 pt-6 space-y-4">
            <div><h3 className="font-bold text-lg flex items-center gap-2"><FiImage className="text-primary" /> Project gallery *</h3><p className="text-sm text-gray-400 mt-1">Select all photos for this project. The first photo is used as the cover unless you choose another.</p></div>
            <label className="flex flex-col items-center justify-center min-h-32 border-2 border-dashed border-gray-600 hover:border-primary rounded-xl cursor-pointer p-6 text-center">
              <FiUploadCloud size={28} className="text-primary mb-2" />
              <span className="font-semibold">{uploading ? 'Uploading images…' : 'Choose multiple images'}</span>
              <span className="text-xs text-gray-400 mt-1">JPG, PNG or WebP</span>
              <input type="file" multiple accept="image/*" disabled={uploading} onChange={(e) => uploadImages([...e.target.files])} className="hidden" />
            </label>
            <div className="flex gap-2"><input type="url" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} className="admin-input" placeholder="Or paste an image URL" /><button type="button" onClick={addImageUrl} className="px-5 rounded-lg bg-dark border border-gray-600 hover:border-primary">Add</button></div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.images.map((image, index) => {
                  const url = imageUrl(image)
                  return <div key={`${url}-${index}`} className={`relative rounded-xl overflow-hidden border-2 ${formData.thumbnail === url ? 'border-primary' : 'border-gray-700'}`}>
                    <img src={url} alt="" className="w-full h-32 object-cover" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2 bg-black/70">
                      <button type="button" onClick={() => setFormData({ ...formData, thumbnail: url })} className="text-xs hover:text-primary">{formData.thumbnail === url ? 'Cover' : 'Set cover'}</button>
                      <button type="button" onClick={() => removeImage(index)} className="text-red-300 hover:text-red-200" aria-label={`Remove image ${index + 1}`}><FiTrash2 /></button>
                    </div>
                  </div>
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3"><button type="submit" disabled={saving || uploading} className="flex-1 px-6 py-3 gradient-bg rounded-lg font-semibold disabled:opacity-50">{saving ? 'Saving…' : editingId ? 'Update Project' : 'Publish Project'}</button><button type="button" onClick={resetForm} className="flex-1 px-6 py-3 border border-gray-600 rounded-lg">Cancel</button></div>
        </motion.form>
      )}

      <div className="grid gap-4">
        {loading ? <p className="text-gray-400 py-12 text-center">Loading projects…</p> : projects.map((project) => (
          <div key={project._id} className="bg-secondary rounded-xl p-4 md:p-5 border border-gray-800 flex flex-col sm:flex-row gap-4">
            <img src={project.thumbnail || imageUrl(project.images?.[0])} alt="" loading="lazy" decoding="async" className="w-full sm:w-36 h-28 object-cover rounded-lg bg-dark" />
            <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><h3 className="font-bold text-lg truncate">{project.title}</h3>{project.featured && <FiStar className="text-yellow-400 fill-yellow-400 shrink-0" />}</div><p className="text-primary text-sm mt-1">{project.category}</p><p className="text-gray-400 text-sm mt-2">{project.location} · {project.images?.length || 0} images</p></div>
            <div className="flex sm:flex-col gap-2"><button onClick={() => toggleFeatured(project)} className="p-3 bg-dark rounded-lg hover:text-yellow-400" aria-label="Toggle featured"><FiStar /></button><button onClick={() => editProject(project)} className="p-3 bg-dark rounded-lg hover:text-primary" aria-label="Edit project"><FiEdit2 /></button><button onClick={() => deleteProject(project._id)} className="p-3 bg-dark rounded-lg hover:text-red-400" aria-label="Delete project"><FiTrash2 /></button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
