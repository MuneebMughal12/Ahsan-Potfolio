const express = require('express')

const router = express.Router()

// TODO: Create Settings model and implement CRUD operations

// Get settings
router.get('/', async (req, res) => {
  try {
    // TODO: Fetch from database
    const settings = {
      siteName: 'Ahsan Aziz Portfolio',
      siteDescription: 'Professional Architecture Portfolio',
      email: 'ahsanaziz@gmail.com',
      phone: '+92-300-XXXXXXX',
      location: 'Pakistan',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
        github: 'https://github.com',
      },
    }
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update settings
router.put('/', async (req, res) => {
  try {
    // TODO: Update in database
    res.json({ message: 'Settings updated' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
