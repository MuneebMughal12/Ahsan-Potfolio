const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors({
  origin: ['https://ahsan-potfolio.vercel.app', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Database Connection (cached for serverless)
let isConnected = false

const connectDB = async () => {
  if (isConnected) return
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    })
    isConnected = true
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    throw err
  }
}

// Connect before every request (serverless needs this)
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' })
  }
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

// Export for Vercel serverless
module.exports = app

// Start server only locally
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}
