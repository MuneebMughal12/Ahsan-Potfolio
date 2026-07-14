const express = require('express')

const router = express.Router()

// TODO: Create Skills model and implement CRUD operations

// Get all skills
router.get('/', async (req, res) => {
  try {
    // TODO: Fetch from database
    res.json([])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create skill
router.post('/', async (req, res) => {
  try {
    // TODO: Save to database
    res.status(201).json({ message: 'Skill created' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update skill
router.put('/:id', async (req, res) => {
  try {
    // TODO: Update in database
    res.json({ message: 'Skill updated' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete skill
router.delete('/:id', async (req, res) => {
  try {
    // TODO: Delete from database
    res.json({ message: 'Skill deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
