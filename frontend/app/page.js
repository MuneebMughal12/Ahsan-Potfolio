'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiStar, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import TestimonialForm from '@/components/TestimonialForm'
import api from '@/lib/api'

export default function Home() {
  const [profileImage, setProfileImage] = useState('')
  const [professionalImage, setProfessionalImage] = useState('')
  const [imageAdjustment, setImageAdjustment] = useState({ posX: 0, posY: 0, scale: 1 })
  const [featuredProjects, setFeaturedProjects] = useState([])

  useEffect(() => {
    // Fetch profile image from localStorage or default
    if (typeof window !== 'undefined') {
      const savedProfileImage = localStorage.getItem('profileImage')
      const savedProfessionalImage = localStorage.getItem('professionalImage')
      const savedAdjustment = localStorage.getItem('profileImageAdjustment')

      if (savedProfileImage) {
        setProfileImage(savedProfileImage)
      }
      if (savedProfessionalImage) {
        setProfessionalImage(savedProfessionalImage)
      }
      if (savedAdjustment) {
        try {
          setImageAdjustment(JSON.parse(savedAdjustment))
        } catch (e) {
          console.log('Could not parse adjustment settings')
        }
      }
    }
  }, [])

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const data = await api.projects.getFeatured()
        setFeaturedProjects(data.slice(0, 6))
      } catch (error) {
        try {
          const response = await fetch('/project-data.json')
          const data = await response.json()
          setFeaturedProjects(data.filter((project) => project.featured).slice(0, 6))
        } catch (fallbackError) {
          console.error('Could not load featured projects', fallbackError)
        }
      }
    }
    loadFeaturedProjects()
    const refresh = window.setInterval(loadFeaturedProjects, 15000)
    return () => window.clearInterval(refresh)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const skills = [
    { name: 'AutoCAD', level: 95 },
    { name: 'Revit', level: 90 },
    { name: 'SketchUp', level: 88 },
    { name: '3DS Max', level: 85 },
    { name: 'Lumion', level: 82 },
    { name: 'Adobe Suite', level: 80 },
  ]

  const galleryItems = [
    { id: 1, title: 'Exterior Design', category: 'Design' },
    { id: 2, title: 'Interior Concept', category: 'Design' },
    { id: 3, title: 'Site Photography', category: 'Photography' },
    { id: 4, title: 'Architectural Sketch', category: 'Sketch' },
    { id: 5, title: '3D Rendering', category: 'Design' },
    { id: 6, title: 'Project Photography', category: 'Photography' },
    { id: 7, title: 'Design Process', category: 'Sketch' },
    { id: 8, title: 'Video Walkthrough', category: 'Video' },
    { id: 9, title: 'Concept Art', category: 'Design' },
    { id: 10, title: 'Site Plan', category: 'Sketch' },
    { id: 11, title: 'Client Presentation', category: 'Photography' },
    { id: 12, title: 'Final Render', category: 'Design' },
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      company: 'Hassan Construction',
      text: 'Ahsan delivered exceptional design work. Professional, creative, and always on deadline.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Fatima Ali',
      company: 'Luxury Homes Pakistan',
      text: 'Outstanding architectural vision. Transformed our vision into reality perfectly.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Muhammad Khan',
      company: 'Urban Development Co.',
      text: 'Best architect I have worked with. Innovative solutions and attention to detail.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Saira Malik',
      company: 'Premium Interiors',
      text: 'Highly skilled and dedicated. Made our project a showpiece in the city.',
      rating: 5,
    },
  ]


  return (
    <div className="min-h-screen bg-dark text-light">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div variants={itemVariants}>
              <span className="text-primary font-semibold text-lg">Welcome to My Portfolio</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 gradient-text">
                Ahsan Aziz
              </h1>
              <p className="text-xl text-gray-300 mt-2">Professional Architect</p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 leading-relaxed"
            >
              Designing innovative spaces that blend aesthetics with functionality.
              Specializing in residential, commercial, and interior architecture projects.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link href="/portfolio" className="w-full sm:w-fit">
                <motion.div
                  className="px-6 sm:px-8 py-3 gradient-bg text-white rounded-lg font-semibold flex items-center justify-center sm:justify-start gap-2 hover:shadow-lg cursor-pointer text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Portfolio <FiArrowRight />
                </motion.div>
              </Link>
              <Link href="/contact" className="w-full sm:w-fit">
                <motion.div
                  className="px-6 sm:px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-dark cursor-pointer text-center sm:text-left text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[750px] rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden flex-shrink-0"
            style={{ aspectRatio: '750 / 600' }}
          >
            {profileImage ? (
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: `${50 + (imageAdjustment.posX / 150) * 25}% ${50 + (imageAdjustment.posY / 150) * 25}%`,
                    transform: `scale(${imageAdjustment.scale})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </div>
            ) : (
              <div className="gradient-bg w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-3xl font-bold">Profile Image</p>
                  <p className="text-sm mt-2">Upload from admin</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 gradient-text">About Me</h2>
          <p className="text-gray-400 mb-12">Professional architect with years of experience</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Bio */}
            <div className="md:col-span-2 space-y-4">
              <p className="text-gray-300 leading-relaxed">
                I am a dedicated architect with a passion for creating innovative and sustainable spaces.
                With over 10 years of experience in the industry, I have successfully designed and executed
                numerous residential, commercial, and interior design projects.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My approach combines modern design principles with practical functionality, ensuring that
                every project not only looks exceptional but also serves its purpose efficiently. I believe
                in close collaboration with clients to bring their vision to life.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Specializing in sustainable architecture and green building practices, I am committed to
                creating spaces that are both beautiful and environmentally responsible.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Skills</h3>
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">{skill.name}</span>
                    <span className="text-sm text-primary">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Professional Profile Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 gradient-text">Professional Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Professional Image */}
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-80 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl">
                {professionalImage ? (
                  <img
                    src={professionalImage}
                    alt="Professional"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="gradient-bg w-full h-full flex items-center justify-center">
                    <p className="text-white text-xl font-bold">Professional Photo</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Professional Info */}
            <motion.div
              className="md:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Personal Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2 font-semibold">Date of Birth</p>
                  <p className="text-light font-semibold text-lg">18/01/1997</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2 font-semibold">Nationality</p>
                  <p className="text-light font-semibold text-lg">Pakistani</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2 font-semibold">Place of Birth</p>
                  <p className="text-light font-semibold text-lg">Mansehra, Pakistan</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2 font-semibold">Education</p>
                  <p className="text-light font-semibold text-lg">B.Arch - Hazara Uni.</p>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-secondary p-6 rounded-lg">
                <p className="text-gray-400 text-sm mb-4 font-semibold">Languages</p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-primary bg-opacity-20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    Urdu (Mother Tongue)
                  </span>
                  <span className="bg-primary bg-opacity-20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    English (B1-B2)
                  </span>
                </div>
              </div>

              {/* Position */}
              <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-lg">
                <p className="text-gray-100 text-sm mb-2 font-semibold">Current Position</p>
                <p className="text-white font-bold text-xl">Senior Architect</p>
                <p className="text-gray-100 text-sm mt-1">Geoeon Enterprises, Islamabad</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 gradient-text">Featured Projects</h2>
          <p className="text-gray-400 mb-12">Showcase of recent architectural projects</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project._id || project.slug || project.title}
                className="bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="h-40 sm:h-48 bg-dark flex items-center justify-center overflow-hidden">
                  {project.thumbnail || project.images?.[0] ? (
                    <img
                      src={project.thumbnail || project.images?.[0]?.url || project.images?.[0]}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="gradient-bg w-full h-full flex items-center justify-center">
                      <p className="text-white font-semibold text-sm sm:text-base text-center">{project.title}</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-primary text-sm mb-3 font-medium">{project.category}</p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <Link href="/portfolio" className="inline-block">
                    <motion.div
                      className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-2 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      View Project <FiArrowRight size={16} />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio" className="inline-block">
              <motion.div
                className="px-8 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                View All Projects
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 gradient-text">Gallery</h2>
          <p className="text-gray-400 mb-12">Visual collection of my work</p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group h-48"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full gradient-bg flex items-center justify-center">
                  <p className="text-white font-semibold">{item.title}</p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end justify-start p-4 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-sm font-semibold">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery" className="inline-block">
              <motion.div
                className="px-8 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                View Full Gallery
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 gradient-text">Testimonials</h2>
          <p className="text-gray-400 mb-12">What clients say about my work</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-secondary p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 gradient-bg rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-primary text-sm">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-warning fill-warning" size={16} />
                  ))}
                </div>

                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonial Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <TestimonialForm />
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="gradient-bg rounded-2xl p-12 md:p-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-base sm:text-lg text-gray-100 mb-8 max-w-2xl mx-auto px-4">
            Let's collaborate to bring your architectural vision to life.
          </p>
          <Link href="/contact" className="inline-block">
            <motion.div
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Get In Touch
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
