'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import api from '@/lib/api'

const imageUrl = (image) => (typeof image === 'string' ? image : image?.url)
const cover = (project, index = 0) => imageUrl(project?.images?.[index]) || project?.thumbnail || imageUrl(project?.images?.[0]) || ''

export default function Home() {
  const [projects, setProjects] = useState([])
  const [heroMode, setHeroMode] = useState('day')
  const [selectedType, setSelectedType] = useState(0)

  useEffect(() => {
    let active = true
    api.projects.getAll().then((data) => active && setProjects(data)).catch(() => {})
    return () => { active = false }
  }, [])

  const picks = useMemo(() => {
    const find = (title) => projects.find((project) => project.title === title)
    return {
      vision: find('Vision Flow Group Headquarters') || projects[0],
      sonery: find('Sonery Residencias') || projects[4] || projects[1],
      infinity: find('Infinity 99') || projects[5] || projects[2],
      vola: find('Vola Vista Kwanenya') || projects[20] || projects[3],
      shafaq: find('Shafaq Hadi Plaza') || projects[21] || projects[4],
      urban: find('The Urban Oasis') || projects[11] || projects[5],
    }
  }, [projects])

  const heroProject = heroMode === 'day' ? picks.vision : picks.infinity
  const types = [picks.vision, picks.vola, picks.shafaq].filter(Boolean)
  const activeType = types[selectedType] || types[0]

  return (
    <div className="era-home">
      <aside className="era-rail"><span>00</span><i /><b>Scroll</b></aside>

      <section className="era-hero" id="hero">
        <AnimatePresence mode="wait">
          {cover(heroProject, heroMode === 'day' ? 1 : 2) && <motion.img key={`${heroMode}-${heroProject?._id}`} src={cover(heroProject, heroMode === 'day' ? 1 : 2)} alt={heroProject?.title || 'Ahsan Aziz architecture'} initial={{opacity:0,scale:1.035}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:1.2}} />}
        </AnimatePresence>
        <div className="era-hero-wash" />
        <div className="era-hero-title"><h1>Ahsan Aziz</h1><h2>Architecture</h2></div>
        <div className="era-hero-tagline"><span>A place</span><button onClick={() => setHeroMode('day')} className={heroMode === 'day' ? 'active' : ''}>by day</button><button onClick={() => setHeroMode('night')} className={heroMode === 'night' ? 'active' : ''}>by night</button><span>to create</span></div>
        <p className="era-hero-caption">Selected architecture · Pakistan and beyond</p>
      </section>

      <section className="era-place section-pad">
        <div className="era-counter"><span>1</span><i /><span>2</span></div>
        <p className="era-place-script">Spaces</p>
        <h2>A place to imagine<br />— to return to <em>year after year</em></h2>
      </section>

      <section className="era-location section-pad">
        <div className="era-location-copy"><p className="eyebrow">Real-life architecture</p><h2>Designed for<br /><em>how life feels.</em></h2><p>Thoughtful buildings shaped by their climate, context and the lives unfolding inside them. Each project balances a strong identity with effortless everyday use.</p><p className="era-small-copy">Designed as places to belong, not objects to observe.</p></div>
        <Link href={picks.urban ? `/portfolio/${picks.urban._id}` : '/portfolio'} className="era-location-image era-location-image-a"><img src={cover(picks.urban)} alt={picks.urban?.title || 'Residential architecture'} loading="lazy" /><span>{picks.urban?.title} ↗</span></Link>
        <Link href={picks.vola ? `/portfolio/${picks.vola._id}` : '/portfolio'} className="era-location-image era-location-image-b"><img src={cover(picks.vola, 1)} alt={picks.vola?.title || 'Contemporary residence'} loading="lazy" /><span>{picks.vola?.location} ↗</span></Link>
      </section>

      <section className="era-concept">
        <div className="era-concept-image"><img src={cover(picks.vision, 1)} alt={picks.vision?.title || 'Contemporary architecture'} loading="lazy" /></div>
        <div className="era-concept-copy section-pad"><p className="era-vertical-label">The concept</p><h2>Architecture with<br /><em>a clear idea.</em></h2><div><h3>Every project begins with one strong response to site, program and ambition.</h3><p>Clean contemporary lines meet warm materials, purposeful circulation and carefully framed views. The result is architecture that feels distinctive without becoming difficult to live with.</p><Link href={picks.vision ? `/portfolio/${picks.vision._id}` : '/portfolio'} className="text-link">Explore the concept <span>↗</span></Link></div></div>
      </section>

      <section className="era-between section-pad">
        <p>Pakistan</p><h2>Between context<br />and <em>possibility</em></h2><span>Architecture · Interiors · Visualization</span>
      </section>

      <section className="era-feature-project">
        <div className="era-feature-heading section-pad"><h2>The spaces you imagined<br /><em>yours, this year.</em></h2><p>Selected work</p></div>
        <div className="era-type-viewer">
          <AnimatePresence mode="wait">{activeType && <motion.img key={activeType._id} src={cover(activeType, Math.min(1, (activeType.images?.length || 1) - 1))} alt={activeType.title} initial={{opacity:0,scale:1.02}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.7}} />}</AnimatePresence>
          <div className="era-type-shade" />
          <div className="era-type-info"><small>{activeType?.category}</small><h3>{activeType?.title || 'Selected project'}</h3><p>{activeType?.location}</p><div className="era-type-facts"><div><span>Year</span><strong>{activeType?.year || '2026'}</strong></div><div><span>Views</span><strong>{String(activeType?.images?.length || 1).padStart(2,'0')}</strong></div><div><span>Status</span><strong>{activeType?.status || 'Completed'}</strong></div></div><Link href={activeType ? `/portfolio/${activeType._id}` : '/portfolio'}>Explore project ↗</Link></div>
          <div className="era-type-tabs">{types.map((project,index)=><button key={project._id} className={selectedType===index?'active':''} onClick={()=>setSelectedType(index)}><span>0{index+1}</span>{project.category}</button>)}</div>
        </div>
      </section>

      <section className="era-community section-pad">
        <div className="era-counter light"><span>1</span><i /><span>2</span></div>
        <p className="eyebrow">A complete design practice</p>
        <h2>From the first line<br />to the final <em>atmosphere.</em></h2>
        <div className="era-service-list">{['Architecture','Interior Design','Planning','3D Visualization','Design Development'].map((item,index)=><div key={item}><span>0{index+1}</span><h3>{item}</h3><b>↗</b></div>)}</div>
        <Link href="/contact" className="era-round-contact">Book a call<br />now <span>↗</span></Link>
      </section>

      <section className="era-live">
        <div className="era-live-title section-pad"><h2>The space to</h2><h3>Live in</h3></div>
        <div className="era-live-grid section-pad">
          <img src={cover(picks.shafaq, 1)} alt={picks.shafaq?.title || 'Interior design'} loading="lazy" />
          <div><p className="eyebrow">More than a rendering</p><h4>Every detail is selected to make a place feel elegant, intuitive and effortless to live in.</h4><p>Material, light, proportion and landscape work together as one architectural experience.</p></div>
          <img src={cover(picks.sonery, 2)} alt={picks.sonery?.title || 'Architectural detail'} loading="lazy" />
        </div>
      </section>

      <section className="era-architecture section-pad">
        <p className="eyebrow">Architecture</p><h2>Clean contemporary lines.<br /><em>Warm human spaces.</em></h2><div className="era-architecture-grid"><p>The work balances clarity and texture, bold form and daily comfort. Each project is developed as a coherent whole—from massing and movement to material and mood.</p><Link href="/about" className="text-link">About the architect <span>↗</span></Link><div><small>Architecture by</small><strong>Ahsan Aziz</strong><span>I-14/3 · Islamabad</span></div></div>
      </section>
    </div>
  )
}
