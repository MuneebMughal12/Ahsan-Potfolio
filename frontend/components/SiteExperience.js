'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const eagerImageSelector = '.era-hero > img, .detail-hero > img'
const revealSelector = [
  'main section:not(.era-hero):not(.detail-hero)',
  'main header:not(.projects-hero):not(.editorial-hero)',
  'main .project-card',
  'main .gallery-stack figure',
  '.site-footer .footer-grid > div',
].join(',')

export default function SiteExperience() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return undefined

    const updateProgress = () => {
      if (raf.current) return
      raf.current = window.requestAnimationFrame(() => {
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
        const next = Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100)))
        setProgress(next)
        raf.current = null
      })
    }

    const prepareImages = (root = document) => {
      const images = [
        ...(root.matches?.('img') ? [root] : []),
        ...(root.querySelectorAll?.('img') || []),
      ]
      images.forEach((image) => {
        image.decoding = 'async'
        if (image.matches(eagerImageSelector)) {
          image.loading = 'eager'
          image.fetchPriority = 'high'
        } else {
          image.loading = 'lazy'
          image.fetchPriority = 'low'
        }
      })
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 })

    const prepareReveals = (root = document) => {
      const elements = [
        ...(root.matches?.(revealSelector) ? [root] : []),
        ...(root.querySelectorAll?.(revealSelector) || []),
      ]
      elements.forEach((element) => {
        if (element.dataset.revealReady) return
        element.dataset.revealReady = 'true'
        element.classList.add('scroll-reveal')
        observer.observe(element)
      })
    }

    const prepare = (root) => {
      prepareImages(root)
      prepareReveals(root)
    }

    prepare(document)
    updateProgress()
    const mutations = new MutationObserver((entries) => entries.forEach((entry) => entry.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) prepare(node)
    })))
    mutations.observe(document.querySelector('main') || document.body, { childList: true, subtree: true })
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      if (raf.current) window.cancelAnimationFrame(raf.current)
      raf.current = null
    }
  }, [pathname])

  if (pathname?.startsWith('/admin')) return null

  return (
    <aside className="scroll-progress" aria-label={`Page scroll progress ${progress}%`}>
      <span>{String(progress).padStart(2, '0')}</span>
      <i><b style={{ transform: `scaleY(${progress / 100})` }} /></i>
      <small>Scroll</small>
    </aside>
  )
}
