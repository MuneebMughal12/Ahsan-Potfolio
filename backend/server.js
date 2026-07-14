const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Database Connection
console.log('🔄 Connecting to MongoDB...')
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!')
    console.log('📊 Database: ahsan-portfolio')
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  })

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/gallery', require('./routes/gallery'))
app.use('/api/testimonials', require('./routes/testimonials'))
app.use('/api/skills', require('./routes/skills'))
app.use('/api/experience', require('./routes/experience'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/settings', require('./routes/settings'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('')
  console.log('🚀 ================================')
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log('🚀 ================================')
  console.log('')
  console.log('📁 Available Routes:')
  console.log('   ✓ GET  /api/health - Health check')
  console.log('   ✓ POST /api/auth/login - Admin login')
  console.log('   ✓ GET  /api/projects - Get all projects')
  console.log('   ✓ GET  /api/gallery - Get all gallery items')
  console.log('   ✓ POST /api/contact - Submit contact form')
  console.log('')
})
