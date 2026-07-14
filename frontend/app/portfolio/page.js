'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Residential', 'Commercial', 'Interior']

  useEffect(() => {
    // TODO: Fetch from backend API
    const dummyProjects = [
      { id: 1, title: 'Project 1', category: 'Residential', year: 2024 },
      { id: 2, title: 'Project 2', category: 'Commercial', year: 2024 },
      { id: 3, title: 'Project 3', category: 'Interior', year: 2023 },
    ]
    setProjects(dummyProjects)
    setFiltered(dummyProjects)
    setLoading(false)
  }, [])

  const filterProjects = (category) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFiltered(projects)
    } else {
      setFiltered(projects.filter((p) => p.category === category))
    }
  }

  return (
    <div className="min-h-screen bg-dark text-light">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">Portfolio</h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-12">My recent architectural projects</p>

          {/* Filter Buttons */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 mb-12 flex-wrap">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => filterProjects(cat)}
                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition text-sm sm:text-base ${
                  selectedCategory === cat
                    ? 'gradient-bg text-white'
                    : 'bg-secondary text-gray-300 border-2 border-gray-600 hover:border-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <p className="text-center text-gray-400">Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-40 sm:h-48 bg-dark flex items-center justify-center px-4 overflow-hidden">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="gradient-bg w-full h-full flex items-center justify-center">
                        <p className="text-white font-semibold text-sm sm:text-base text-center">{project.title}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-light">{project.title}</h3>
                    <p className="text-primary text-sm mb-2">{project.category}</p>
                    <p className="text-gray-400 text-sm mb-4">Year: {project.year}</p>
                    <motion.button
                      className="text-primary font-semibold hover:gap-3 transition-all inline-flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      View Details →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 mt-8">No projects found in this category.</p>
          )}
        </motion.div>
      </section>
    </div>
  )
}
