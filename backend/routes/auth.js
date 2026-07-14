const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    // Find user
    let user = await User.findOne({ email })

    if (!user) {
      // Create default admin if doesn't exist
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        user = new User({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          name: 'Ahsan Aziz',
          role: 'admin',
        })
        await user.save()
      } else {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
    }

    // Check password
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Verify Token
router.post('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ valid: true, user: decoded })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// Change Password
router.post('/change-password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const isMatch = await user.matchPassword(oldPassword)
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
