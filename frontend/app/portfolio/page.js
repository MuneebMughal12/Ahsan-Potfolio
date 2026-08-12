'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import api from '@/lib/api'

const imageUrl = (image) => (typeof image === 'string' ? image : image?.url)
const cover = (project) => project.thumbnail || imageUrl(project.images?.[0]) || ''

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    const load = () => api.projects.getAll().then((data) => { if (active) { setProjects(data); setError(false) } }).catch(() => active && setError(true)).finally(() => active && setLoading(false))
    load()
    const timer = window.setInterval(load, 30000)
    return () => { active = false; window.clearInterval(timer) }
  }, [])

  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))], [projects])
  const filtered = category === 'All' ? projects : projects.filter((p) => p.category === category)

  return (
    <div className="projects-page">
      <header className="projects-hero section-pad">
        <p className="eyebrow">A living archive · Synced with the admin panel</p>
        <h1>Selected<br /><em>projects</em></h1>
        <div className="projects-summary"><p>Architecture, interiors and visual studies developed across Pakistan and internationally.</p><strong>{String(projects.length || 38).padStart(2, '0')}</strong><span>Works</span></div>
      </header>

      <div className="filter-bar section-pad">
        <span>Filter by type</span>
        <div>{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={item === category ? 'active' : ''}>{item}</button>)}</div>
      </div>

      {error ? <div className="empty-state">The live project archive is temporarily unavailable. Please refresh in a moment.</div> : (
        <div className="projects-grid section-pad">
          {loading ? [1,2,3,4,5,6].map((item) => <div className="project-card project-skeleton" key={item} />) : filtered.map((project, index) => (
            <motion.div key={project._id} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .65, delay: Math.min(index * .04, .2) }}>
              <Link href={`/portfolio/${project._id}`} className="project-card">
                <div className="project-image"><img src={cover(project)} alt={project.title} loading="lazy" /><span>{project.images?.length || 1} images</span></div>
                <div className="project-meta"><span>{String(index + 1).padStart(2, '0')}</span><div><small>{project.category} · {project.year || '—'}</small><h2>{project.title}</h2><p>{project.location}</p></div><b>↗</b></div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
