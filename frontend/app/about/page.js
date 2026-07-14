'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-dark text-light">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">About Me</h1>
          <p className="text-gray-400 text-lg mb-12">Professional Architect with 10+ years of experience</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-light">My Journey</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                As a dedicated architect, I specialize in creating innovative designs that balance aesthetics with functionality. My work spans residential, commercial, and interior design projects.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I believe in sustainable design practices and always prioritize client satisfaction and project excellence.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              className="gradient-bg h-96 rounded-2xl flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-white text-2xl font-bold">Profile Image</p>
            </motion.div>
          </div>

          {/* Skills */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 gradient-text">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {['AutoCAD', 'Revit', 'SketchUp', 'Lumion', '3DS Max', 'Adobe Suite'].map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-secondary p-6 rounded-lg shadow-lg border border-gray-700"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="font-bold text-lg mb-2 text-light">{skill}</h3>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="gradient-bg h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 gradient-text">Education</h2>
            <div className="space-y-6">
              {[
                { degree: 'Bachelor of Architecture', institute: 'Hazara University Mansehra', year: '2015-2019' },
                { degree: 'Advanced CAD & BIM Certification', institute: 'International Institute of Architecture', year: '2020' },
                { degree: 'Sustainable Design Course', institute: 'Green Building Academy', year: '2021' },
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  className="bg-secondary p-6 rounded-lg shadow-lg border-l-4 border-accent"
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-xl font-bold text-light">{edu.degree}</h3>
                  <p className="text-accent font-semibold">{edu.institute}</p>
                  <p className="text-gray-400 text-sm">{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 gradient-text">Experience</h2>
            <div className="space-y-6">
              {[
                { company: 'Geoeon Enterprises', position: 'Senior Architect', years: '2019 - Present' },
                { company: 'Design Studio Islamabad', position: 'Lead Architect', years: '2017 - 2019' },
                { company: 'Construction Company', position: 'Junior Architect', years: '2015 - 2017' },
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  className="bg-secondary p-6 rounded-lg shadow-lg border-l-4 border-primary"
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-xl font-bold text-light">{exp.company}</h3>
                  <p className="text-primary font-semibold">{exp.position}</p>
                  <p className="text-gray-400 text-sm">{exp.years}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Professional Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12 gradient-text">Professional Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Professional Image */}
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="gradient-bg h-96 rounded-2xl flex items-center justify-center overflow-hidden">
                <p className="text-white text-2xl font-bold">Professional Photo</p>
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
                <div>
                  <p className="text-gray-400 text-sm mb-2">Date of Birth</p>
                  <p className="text-light font-semibold text-lg">18/01/1997</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Nationality</p>
                  <p className="text-light font-semibold text-lg">Pakistani</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Place of Birth</p>
                  <p className="text-light font-semibold text-lg">Mansehra, Pakistan</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Location</p>
                  <p className="text-light font-semibold text-lg">Mansehra, Pakistan</p>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-secondary p-6 rounded-lg">
                <p className="text-gray-400 text-sm mb-3 font-semibold">Languages</p>
                <div className="flex flex-wrap gap-3">
                  {['Urdu (Mother Tongue)', 'English (B1-B2 Level)'].map((lang, index) => (
                    <span
                      key={index}
                      className="bg-primary bg-opacity-20 text-primary px-4 py-2 rounded-full text-sm font-semibold"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education & Experience Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary p-6 rounded-lg">
                  <p className="text-gray-400 text-sm mb-3 font-semibold">Education</p>
                  <p className="text-light font-semibold mb-1">Bachelor of Architecture</p>
                  <p className="text-primary text-sm">Hazara University Mansehra</p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <p className="text-gray-400 text-sm mb-3 font-semibold">Current Position</p>
                  <p className="text-light font-semibold mb-1">Senior Architect</p>
                  <p className="text-primary text-sm">Geoeon Enterprises</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
