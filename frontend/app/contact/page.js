'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [contactInfo, setContactInfo] = useState({
    email: 'geocoenterprises@outlook.com',
    phone: '+92-316-1588956',
    location: 'Mansehra, Pakistan',
    website: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sliderIndex, setSliderIndex] = useState(0)

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      // Fetch from admin settings endpoint if available
      const response = await fetch('/api/profile/contact-info')
      if (response.ok) {
        const data = await response.json()
        setContactInfo({
          email: data.email || 'ahsanaziz@gmail.com',
          phone: data.phone || '+92-316-1588956',
          location: data.location || 'Mansehra, Pakistan',
          website: data.website || '',
        })
      }
    } catch (error) {
      console.log('Using default contact info')
    }
  }

  const testimonials = [
    { name: 'Client A', company: 'Company A', text: 'Outstanding architectural design!', rating: 5 },
    { name: 'Client B', company: 'Company B', text: 'Professional and creative work', rating: 5 },
    { name: 'Client C', company: 'Company C', text: 'Exceeded all expectations', rating: 5 },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Send to backend API
      console.log('Form data:', formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark text-light">
      {/* Testimonials Slider */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-8 md:mb-12 text-center">What Clients Say</h2>
          <div className="relative max-w-2xl mx-auto">
            <motion.div
              key={sliderIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-dark p-4 sm:p-6 md:p-8 rounded-xl border border-gray-700"
            >
              <div className="mb-4 flex gap-1">
                {Array(testimonials[sliderIndex].rating).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg sm:text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 text-sm sm:text-base md:text-lg">"{testimonials[sliderIndex].text}"</p>
              <p className="font-bold text-light text-sm sm:text-base">{testimonials[sliderIndex].name}</p>
              <p className="text-gray-400 text-xs sm:text-sm">{testimonials[sliderIndex].company}</p>
            </motion.div>

            {/* Slider Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                onClick={() => setSliderIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-2 gradient-bg text-white rounded-lg hover:shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FiChevronLeft size={24} />
              </motion.button>
              <motion.button
                onClick={() => setSliderIndex((prev) => (prev + 1) % testimonials.length)}
                className="p-2 gradient-bg text-white rounded-lg hover:shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FiChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">Get In Touch</h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-12">Let's discuss your project</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-light">Contact Information</h2>

              {[
                { icon: FiMail, label: 'Email', value: contactInfo.email },
                { icon: FiPhone, label: 'Phone', value: contactInfo.phone },
                { icon: FiMapPin, label: 'Location', value: contactInfo.location },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-3 sm:gap-4 items-start"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 sm:w-12 h-10 sm:h-12 gradient-bg rounded-lg flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm sm:text-base md:text-lg text-light">{item.label}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-secondary p-4 sm:p-6 md:p-8 rounded-xl shadow-lg space-y-4 border border-gray-700"
            >
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-light">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-light">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="Your phone"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="Project subject"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>

              {submitted && (
                <motion.p
                  className="text-green-400 text-center font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✓ Message sent successfully!
                </motion.p>
              )}
            </motion.form>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
