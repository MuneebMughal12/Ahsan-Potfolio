const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors({
  origin: [
    'https://ahsan-potfolio.vercel.app',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Database connection promise is cached across warm serverless invocations.
let connectionPromise = null

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection
  try {
    if (!connectionPromise) {
      connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
      })
    }
    await connectionPromise
    console.log('MongoDB connected')
    return mongoose.connection
  } catch (err) {
    connectionPromise = null
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
