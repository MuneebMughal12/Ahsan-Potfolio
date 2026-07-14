'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-secondary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AA</span>
              </div>
              <span className="text-lg font-bold gradient-text hidden sm:inline">Ahsan Aziz</span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
                <Link href={link.href} className="font-medium text-gray-300 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex gap-4">
            <Link href="/contact" className="w-fit">
              <motion.div
                className="px-6 py-2 gradient-bg text-white rounded-lg font-medium hover:shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4 space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-300 hover:bg-dark rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
              <button className="w-full mt-4 px-4 py-2 gradient-bg text-white rounded-lg font-medium">
                Contact
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
