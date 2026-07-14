'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch from backend API
    const dummyImages = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Gallery Image ${i + 1}`,
      category: ['Design', 'Photography', 'Sketch'][i % 3],
    }))
    setImages(dummyImages)
    setLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-dark text-light">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">Gallery</h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-12">High-quality images from my projects</p>

          {loading ? (
            <p className="text-center text-gray-400">Loading gallery...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group h-40 sm:h-44 md:h-48 bg-secondary"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelectedImage(image)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-full h-full gradient-bg flex items-center justify-center">
                    <p className="text-white font-semibold">{image.title}</p>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end justify-start p-4 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-sm font-semibold">{image.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="bg-secondary rounded-xl max-w-2xl w-full p-6 border border-gray-700"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gradient-bg h-96 flex items-center justify-center rounded-lg mb-4">
              <p className="text-white text-2xl font-bold">{selectedImage.title}</p>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-light">{selectedImage.title}</h3>
            <p className="text-primary mb-4">{selectedImage.category}</p>
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="px-6 py-2 gradient-bg text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
