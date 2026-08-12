'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import api from '@/lib/api'

const imageUrl = (image) => (typeof image === 'string' ? image : image?.url)

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    Promise.all([api.projects.getById(id), api.projects.getAll()])
      .then(([current, all]) => { if (active) { setProject(current); setProjects(all) } })
      .catch(() => active && setError(true))
    return () => { active = false }
  }, [id])

  const navigation = useMemo(() => {
    const index = projects.findIndex((item) => item._id === id)
    if (index < 0) return {}
    return {
      previous: projects[(index - 1 + projects.length) % projects.length],
      next: projects[(index + 1) % projects.length],
    }
  }, [projects, id])

  if (error) return <div className="project-loading"><p>Project not found.</p><Link href="/portfolio">Return to projects ↗</Link></div>
  if (!project) return <div className="project-loading"><span>Loading project</span><i /></div>

  const images = project.images?.length ? project.images : [{ url: project.thumbnail, alt: project.title }]

  return (
    <article className="detail-page">
      <section className="detail-hero">
        <img src={imageUrl(images[0])} alt={images[0]?.alt || project.title} loading="eager" decoding="async" fetchPriority="high" />
        <div className="detail-shade" />
        <Link href="/portfolio" className="back-link">← All projects</Link>
        <div className="detail-title"><p>{project.category} · {project.year || 'Selected work'}</p><h1>{project.title}</h1><span>{project.location}</span></div>
        <a href="#story" className="detail-scroll">Discover the project <i /></a>
      </section>

      <section className="detail-story section-pad" id="story">
        <div className="section-number">01 — Overview</div>
        <div className="detail-story-grid">
          <h2>A considered response to <em>place, purpose</em> and possibility.</h2>
          <div><p>{project.description}</p><dl>
            <div><dt>Location</dt><dd>{project.location || 'Pakistan'}</dd></div>
            <div><dt>Typology</dt><dd>{project.category || 'Architecture'}</dd></div>
            <div><dt>Year</dt><dd>{project.year || '—'}</dd></div>
            <div><dt>Status</dt><dd>{project.status || 'Completed'}</dd></div>
            {project.area && <div><dt>Area</dt><dd>{project.area}</dd></div>}
            {project.projectCode && <div><dt>Project code</dt><dd>{project.projectCode}</dd></div>}
          </dl></div>
        </div>
      </section>

      <section className="detail-gallery">
        <div className="gallery-heading section-pad"><div className="section-number light">02 — Gallery</div><h2>Every available <em>view.</em></h2><span>{String(images.length).padStart(2, '0')} images</span></div>
        <div className="gallery-stack">
          {images.map((image, index) => (
            <motion.figure key={`${imageUrl(image)}-${index}`} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .8 }}>
              <img src={imageUrl(image)} alt={image.alt || `${project.title} — view ${index + 1}`} loading={index ? 'lazy' : 'eager'} />
              <figcaption>{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')} — {image.alt || project.title}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <nav className="project-pagination section-pad" aria-label="Project navigation">
        {navigation.previous && <Link href={`/portfolio/${navigation.previous._id}`}><small>← Previous project</small><strong>{navigation.previous.title}</strong></Link>}
        {navigation.next && <Link href={`/portfolio/${navigation.next._id}`}><small>Next project →</small><strong>{navigation.next.title}</strong></Link>}
      </nav>
    </article>
  )
}
