const express = require('express')

const router = express.Router()

// TODO: Create Experience model and implement CRUD operations

// Get all experience
router.get('/', async (req, res) => {
  try {
    // TODO: Fetch from database
    res.json([])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create experience
router.post('/', async (req, res) => {
  try {
    // TODO: Save to database
    res.status(201).json({ message: 'Experience created' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update experience
router.put('/:id', async (req, res) => {
  try {
    // TODO: Update in database
    res.json({ message: 'Experience updated' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete experience
router.delete('/:id', async (req, res) => {
  try {
    // TODO: Delete from database
    res.json({ message: 'Experience deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
