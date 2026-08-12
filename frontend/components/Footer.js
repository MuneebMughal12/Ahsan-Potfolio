'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-lead">
        <p className="eyebrow">Have a project in mind?</p>
        <Link href="/contact" className="footer-title">Let&apos;s shape it together <span>↗</span></Link>
      </div>
      <div className="footer-grid">
        <div><span className="footer-mark">AA</span><p>Architecture shaped by context,<br />clarity and human experience.</p></div>
        <div><small>Explore</small><Link href="/portfolio">All projects</Link><Link href="/about">Studio</Link></div>
        <div><small>Contact</small><a href="mailto:geocoenterprises@outlook.com">geocoenterprises@outlook.com</a><a href="tel:+923161588956">+92 316 1588956</a></div>
        <div><small>Based in</small><p>Mansehra, Pakistan<br />Working internationally</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Ahsan Aziz</span><span>Architectural portfolio</span></div>
    </footer>
  )
}
