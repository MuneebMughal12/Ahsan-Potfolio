'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Projects' },
  { href: '/about', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  if (pathname?.startsWith('/admin')) return null

  return (
    <header className={`site-nav ${scrolled || pathname !== '/' ? 'site-nav--solid' : ''}`}>
      <Link href="/" className="brand" aria-label="Ahsan Aziz home">
        <span className="brand-mark">AA</span>
        <span className="brand-copy"><strong>Ahsan Aziz</strong><small>Architecture</small></span>
      </Link>

      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-cta">Start a project <span>↗</span></Link>
      </nav>

      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
        <span /> <span />
      </button>
    </header>
  )
}
