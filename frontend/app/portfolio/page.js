'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiMapPin, FiMaximize2, FiX } from 'react-icons/fi'
import api from '@/lib/api'

const imageUrl = (image) => (typeof image === 'string' ? image : image?.url)
const projectCover = (project) =>
  project.thumbnail || imageUrl(project.images?.[0]) || ''

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const data = await api.projects.getAll()
        if (active) {
          setProjects(data)
          setUsingFallback(false)
        }
      } catch (error) {
        const response = await fetch('/project-data.json')
        const data = await response.json()
        if (active) {
          setProjects(data)
          setUsingFallback(true)
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    const refresh = window.setInterval(load, 15000)
    return () => {
      active = false
      window.clearInterval(refresh)
    }
  }, [])

  useEffect(() => {
    if (!selectedProject) return undefined
    const handleKey = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
      if (event.key === 'ArrowRight') changeImage(1)
      if (event.key === 'ArrowLeft') changeImage(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [selectedProject, activeImage])

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category).filter(Boolean))],
    [projects]
  )
  const filtered = useMemo(
    () =>
      selectedCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === selectedCategory),
    [projects, selectedCategory]
  )

  const openProject = (project) => {
    setSelectedProject(project)
    setActiveImage(0)
  }

  const changeImage = (direction) => {
    const count = selectedProject?.images?.length || 1
    setActiveImage((current) => (current + direction + count) % count)
  }

  return (
    <div className="min-h-screen bg-dark text-light">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-primary uppercase tracking-[0.25em] text-xs font-semibold mb-3">Selected work</p>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold gradient-text">Architecture Portfolio</h1>
              <p className="text-gray-400 mt-3">{projects.length || 38} projects across Pakistan and international locations.</p>
            </div>
            {!loading && (
              <p className="text-sm text-gray-500">
                {usingFallback ? 'Catalog preview' : 'Synced with admin panel'}
              </p>
            )}
          </div>

          <div className="flex gap-2 sm:gap-3 mb-10 flex-wrap" aria-label="Project categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold text-sm border transition ${
                  selectedCategory === category
                    ? 'gradient-bg text-white border-transparent'
                    : 'bg-secondary text-gray-300 border-gray-700 hover:border-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-80 bg-secondary rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, index) => (
                <motion.button
                  type="button"
                  key={project._id || project.slug || project.title}
                  onClick={() => openProject(project)}
                  className="group bg-secondary rounded-2xl overflow-hidden shadow-lg text-left border border-gray-800 hover:border-primary/60"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.035, 0.35) }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-56 bg-black overflow-hidden relative">
                    <img
                      src={projectCover(project)}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 text-xs text-white backdrop-blur">
                      {project.images?.length || 1} {project.images?.length === 1 ? 'image' : 'images'}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-primary text-xs uppercase tracking-widest mb-2">{project.category}</p>
                        <h2 className="text-xl font-bold text-light">{project.title}</h2>
                      </div>
                      <FiMaximize2 className="text-gray-500 group-hover:text-primary shrink-0 mt-1" />
                    </div>
                    {project.location && (
                      <p className="text-gray-400 text-sm mt-3 flex items-center gap-2">
                        <FiMapPin className="text-primary" /> {project.location}
                      </p>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} gallery`}
          >
            <div className="min-h-full max-w-7xl mx-auto px-4 py-6 md:py-10">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <p className="text-primary text-xs uppercase tracking-[0.2em]">{selectedProject.category}</p>
                  <h2 className="text-2xl md:text-4xl font-bold mt-2">{selectedProject.title}</h2>
                  <p className="text-gray-400 mt-2">{selectedProject.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Close project gallery"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="relative bg-black rounded-2xl overflow-hidden border border-white/10 min-h-[45vh] flex items-center justify-center">
                <img
                  src={imageUrl(selectedProject.images?.[activeImage]) || projectCover(selectedProject)}
                  alt={selectedProject.images?.[activeImage]?.alt || `${selectedProject.title} view ${activeImage + 1}`}
                  className="w-full max-h-[72vh] object-contain"
                />
                {(selectedProject.images?.length || 0) > 1 && (
                  <>
                    <button type="button" onClick={() => changeImage(-1)} className="absolute left-3 md:left-5 p-3 rounded-full bg-black/60 hover:bg-primary" aria-label="Previous image">
                      <FiArrowLeft size={22} />
                    </button>
                    <button type="button" onClick={() => changeImage(1)} className="absolute right-3 md:right-5 p-3 rounded-full bg-black/60 hover:bg-primary" aria-label="Next image">
                      <FiArrowRight size={22} />
                    </button>
                  </>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto py-5">
                {(selectedProject.images || []).map((image, index) => (
                  <button
                    type="button"
                    key={`${imageUrl(image)}-${index}`}
                    onClick={() => setActiveImage(index)}
                    className={`w-28 h-20 md:w-36 md:h-24 shrink-0 rounded-lg overflow-hidden border-2 ${activeImage === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={imageUrl(image)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-[2fr_1fr] gap-8 py-4 border-t border-white/10">
                <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div><dt className="text-gray-500">Year</dt><dd className="font-semibold mt-1">{selectedProject.year || '—'}</dd></div>
                  <div><dt className="text-gray-500">Area</dt><dd className="font-semibold mt-1">{selectedProject.area || '—'}</dd></div>
                  {selectedProject.projectCode && <div><dt className="text-gray-500">Project code</dt><dd className="font-semibold mt-1">{selectedProject.projectCode}</dd></div>}
                  <div><dt className="text-gray-500">Status</dt><dd className="font-semibold mt-1">{selectedProject.status || 'Completed'}</dd></div>
                </dl>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
