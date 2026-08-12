const express = require('express')
const auth = require('../middleware/auth')
const Settings = require('../models/Settings')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { key: 'site' },
      { $setOnInsert: { key: 'site' } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/', auth, async (req, res) => {
  try {
    const allowed = [
      'fullName', 'title', 'phone', 'email', 'location', 'address', 'bio',
      'workExperience', 'skills', 'education', 'languages',
      'profileImageUrl', 'profileImageAdjustment',
    ]
    const updates = Object.fromEntries(allowed.filter((key) => req.body[key] !== undefined).map((key) => [key, req.body[key]]))
    const settings = await Settings.findOneAndUpdate(
      { key: 'site' },
      { $set: updates, $setOnInsert: { key: 'site' } },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    )
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
