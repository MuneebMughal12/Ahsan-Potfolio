const express = require('express')
const Gallery = require('../models/Gallery')

const router = express.Router()

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ order: 1, createdAt: -1 })
    res.json(gallery)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get featured gallery images
router.get('/featured', async (req, res) => {
  try {
    const gallery = await Gallery.find({ featured: true }).sort({ order: 1 })
    res.json(gallery)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get by category
router.get('/category/:category', async (req, res) => {
  try {
    const gallery = await Gallery.find({ category: req.params.category })
    res.json(gallery)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create gallery item
router.post('/', async (req, res) => {
  try {
    const item = new Gallery(req.body)
    await item.save()
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update gallery item
router.put('/:id', async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete gallery item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' })
    }
    res.json({ message: 'Gallery item deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
