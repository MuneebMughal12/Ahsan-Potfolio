'use client'

import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  const contactInfo = {
    email: 'geocoenterprises@outlook.com',
    phone: '+92-316-1588956',
    location: 'Mansehra, Pakistan',
    website: 'https://geo-199m.vercel.app',
  }

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-secondary border-t border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">AA Aziz</h3>
            <p className="text-gray-400 text-sm">Professional architect creating innovative and sustainable spaces.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-4">
            <h4 className="text-lg font-bold text-light">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-primary transition flex items-center gap-2"><FiArrowRight size={14} />{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4">
            <h4 className="text-lg font-bold text-light">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-primary transition">Residential Design</li>
              <li className="hover:text-primary transition">Commercial Architecture</li>
              <li className="hover:text-primary transition">Interior Design</li>
              <li className="hover:text-primary transition">3D Visualization</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="space-y-4">
            <h4 className="text-lg font-bold text-light">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiMail className="text-primary mt-1 flex-shrink-0" size={18} />
                <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-primary transition text-sm">{contactInfo.email}</a>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="text-primary mt-1 flex-shrink-0" size={18} />
                <a href={`tel:${contactInfo.phone}`} className="text-gray-400 hover:text-primary transition text-sm">{contactInfo.phone}</a>
              </div>
              <div className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1 flex-shrink-0" size={18} />
                <p className="text-gray-400 text-sm">{contactInfo.location}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-gray-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>&copy; 2024 Ahsan Aziz. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
