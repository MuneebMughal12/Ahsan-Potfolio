const express = require('express')
const Testimonial = require('../models/Testimonial')

const router = express.Router()

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ featured: -1, order: 1, createdAt: -1 })
    res.json(testimonials)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get featured testimonials
router.get('/featured', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ featured: true, status: 'approved' })
      .sort({ order: 1 })
    res.json(testimonials)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single testimonial
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    res.json(testimonial)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create testimonial
router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body)
    await testimonial.save()
    console.log('✅ New testimonial created:', testimonial._id)
    res.status(201).json(testimonial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update testimonial
router.put('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    console.log('✅ Testimonial updated:', testimonial._id)
    res.json(testimonial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete testimonial
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id)
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    console.log('✅ Testimonial deleted:', req.params.id)
    res.json({ message: 'Testimonial deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Reorder testimonials
router.put('/order/update', async (req, res) => {
  try {
    const { testimonials } = req.body
    for (let i = 0; i < testimonials.length; i++) {
      await Testimonial.findByIdAndUpdate(testimonials[i]._id, {
        order: i,
      })
    }
    console.log('✅ Testimonials reordered')
    res.json({ message: 'Order updated' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
