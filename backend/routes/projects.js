const express = require('express')
const cloudinary = require('cloudinary').v2
const Project = require('../models/Project')
const auth = require('../middleware/auth')

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const normalizeProject = (body) => ({
  ...body,
  clientName: body.clientName ?? body.client ?? '',
  images: (body.images || []).map((image) =>
    typeof image === 'string' ? { url: image } : image
  ),
})

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create project
router.post('/upload', auth, async (req, res) => {
  try {
    const { data, filename } = req.body
    if (!data?.startsWith('data:image/')) {
      return res.status(400).json({ error: 'A valid image is required' })
    }
    const result = await cloudinary.uploader.upload(data, {
      folder: 'ahsan-portfolio/projects',
      public_id: filename
        ? filename.replace(/\.[^.]+$/, '').replace(/[^a-z0-9_-]+/gi, '-')
        : undefined,
      resource_type: 'image',
    })
    res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const project = new Project(normalizeProject(req.body))
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    Object.assign(project, normalizeProject(req.body))
    await project.save()
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.json({ message: 'Project deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
