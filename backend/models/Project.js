const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    projectCode: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Residential', 'Commercial', 'Interior', 'Other'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    area: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    images: [
      {
        url: String,
        publicId: String,
        alt: String,
      },
    ],
    floorPlans: [
      {
        url: String,
        publicId: String,
      },
    ],
    renderings: [
      {
        url: String,
        publicId: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'Archived'],
      default: 'Completed',
    },
    sourcePages: [Number],
  },
  { timestamps: true }
)

projectSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
  if (!this.thumbnail && this.images?.length) {
    this.thumbnail = this.images[0].url
  }
  next()
})

module.exports = mongoose.model('Project', projectSchema)
