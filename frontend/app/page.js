'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import api from '@/lib/api'

const imageUrl = (image) => (typeof image === 'string' ? image : image?.url)
const cover = (project) => project?.thumbnail || imageUrl(project?.images?.[0]) || ''

export default function Home() {
  const [projects, setProjects] = useState([])
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    let active = true
    api.projects.getFeatured()
      .then((data) => active && setProjects(data.slice(0, 6)))
      .catch(() => {})
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (projects.length < 2) return undefined
    const timer = window.setInterval(() => setHeroIndex((value) => (value + 1) % Math.min(3, projects.length)), 6500)
    return () => window.clearInterval(timer)
  }, [projects.length])

  const hero = projects[heroIndex]
  const visibleProjects = useMemo(() => projects.slice(0, 5), [projects])

  return (
    <div className="home-page">
      <aside className="section-rail" aria-label="Page sections">
        <span>00</span><i />
        <a href="#hero">01</a><a href="#approach">02</a><a href="#projects">03</a><a href="#studio">04</a>
      </aside>

      <section className="hero" id="hero">
        <AnimatePresence mode="wait">
          {cover(hero) ? (
            <motion.img key={cover(hero)} src={cover(hero)} alt={hero.title} className="hero-image" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} />
          ) : <div className="hero-placeholder" />}
        </AnimatePresence>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="hero-kicker">Architecture · Interiors · Visualization</p>
          <h1>Ahsan<br /><em>Aziz</em></h1>
          <div className="hero-line">
            <span>A place to imagine</span><i /><span>A practice built to create</span>
          </div>
        </div>
        <Link href={hero ? `/portfolio/${hero._id}` : '/portfolio'} className="hero-project">
          <span>{String(heroIndex + 1).padStart(2, '0')} / {String(Math.max(Math.min(3, projects.length), 1)).padStart(2, '0')}</span>
          <strong>{hero?.title || 'Selected works'}</strong>
          <b>Explore project ↗</b>
        </Link>
        <a className="scroll-cue" href="#approach"><span>Scroll to discover</span><i /></a>
      </section>

      <section className="statement section-pad" id="approach">
        <div className="section-number">01 — Approach</div>
        <p className="statement-intro">Thoughtful design for the way people live, work and belong.</p>
        <h2>We turn ideas into spaces with <em>purpose, presence</em> and lasting value.</h2>
        <div className="statement-foot">
          <p>From first sketch to final visualization, every project is developed as a clear response to its site, its people and its future.</p>
          <Link href="/about" className="text-link">Discover the studio <span>↗</span></Link>
        </div>
      </section>

      <section className="featured" id="projects">
        <div className="section-pad featured-head">
          <div className="section-number light">02 — Selected projects</div>
          <h2>Places with a point<br />of <em>view.</em></h2>
          <Link href="/portfolio" className="outline-link">View all projects <span>↗</span></Link>
        </div>
        <div className="project-showcase">
          {visibleProjects.length ? visibleProjects.map((project, index) => (
            <Link href={`/portfolio/${project._id}`} className={`showcase-card card-${index + 1}`} key={project._id}>
              <img src={cover(project)} alt={project.title} loading={index > 1 ? 'lazy' : 'eager'} />
              <div className="card-overlay" />
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="card-copy"><small>{project.category} · {project.location}</small><h3>{project.title}</h3><span>View project ↗</span></div>
            </Link>
          )) : [1,2,3].map((item) => <div className={`showcase-card skeleton card-${item}`} key={item} />)}
        </div>
      </section>

      <section className="studio section-pad" id="studio">
        <div className="section-number">03 — Studio</div>
        <div className="studio-grid">
          <div><p className="eyebrow">Independent architectural practice</p><h2>Local insight.<br /><em>Global ambition.</em></h2></div>
          <div className="studio-copy"><p>Ahsan Aziz creates residential, commercial and interior environments across Pakistan and beyond. The work combines rigorous planning with cinematic visual storytelling.</p><div className="studio-stats"><div><strong>38+</strong><span>Projects</span></div><div><strong>04</strong><span>Design disciplines</span></div><div><strong>01</strong><span>Clear vision</span></div></div><Link href="/about" className="text-link">Meet Ahsan <span>↗</span></Link></div>
        </div>
      </section>
    </div>
  )
}
