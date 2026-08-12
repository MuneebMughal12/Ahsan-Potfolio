'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function About() {
  return <div className="editorial-page">
    <header className="editorial-hero section-pad"><p className="eyebrow">About the studio</p><h1>Designing with<br /><em>intention.</em></h1><p className="editorial-lead">Ahsan Aziz is an architect based in Mansehra, Pakistan, working across architecture, interiors and visualization.</p></header>
    <section className="editorial-content section-pad"><div className="section-number">01 — Profile</div><div className="editorial-grid"><h2>Architecture should feel inevitable — grounded in its place and generous to its people.</h2><div><p>The practice brings together creative direction, technical design and atmospheric visualization. Each commission is approached as a complete story, from the first spatial idea to the final detail.</p><p>A Bachelor of Architecture graduate from Hazara University, Ahsan currently works as Senior Architect at Geoeon Enterprises while developing a growing independent portfolio.</p><Link href="/portfolio" className="text-link">Explore the work <span>↗</span></Link></div></div></section>
    <section className="services section-pad"><div className="section-number light">02 — Capabilities</div>{['Residential architecture','Commercial architecture','Interior environments','3D visualization'].map((item,index)=><motion.div key={item} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><span>0{index+1}</span><h3>{item}</h3><b>↗</b></motion.div>)}</section>
  </div>
}
