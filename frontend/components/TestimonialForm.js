'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    message: '',
    rating: 5,
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Send to backend API
      console.log('Testimonial submitted:', formData)
      setSubmitted(true)
      setFormData({ name: '', company: '', message: '', rating: 5 })

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Error submitting testimonial:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-secondary p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold mb-2 gradient-text">Share Your Feedback</h3>
      <p className="text-gray-400 mb-6">Have you worked with me? Share your testimonial!</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <label className="block text-sm font-semibold mb-2">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-dark border-2 border-gray-600 rounded-lg text-light focus:border-primary outline-none transition"
            placeholder="Your full name"
          />
        </motion.div>

        {/* Company */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <label className="block text-sm font-semibold mb-2">Company/Organization</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-dark border-2 border-gray-600 rounded-lg text-light focus:border-primary outline-none transition"
            placeholder="Your company name"
          />
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <label className="block text-sm font-semibold mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                className={`text-3xl transition ${
                  star <= formData.rating ? 'text-warning' : 'text-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiStar className="fill-current" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <label className="block text-sm font-semibold mb-2">Your Testimonial</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 bg-dark border-2 border-gray-600 rounded-lg text-light focus:border-primary outline-none transition resize-none"
            placeholder="Share your experience working with me..."
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Submitting...' : 'Submit Testimonial'}
        </motion.button>

        {/* Success Message */}
        {submitted && (
          <motion.div
            className="p-4 bg-success bg-opacity-20 border-2 border-success text-success rounded-lg text-center font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✓ Thank you! Your testimonial has been submitted.
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
