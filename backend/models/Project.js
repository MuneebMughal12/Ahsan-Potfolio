const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
)

module.exports = mongoose.model('Project', projectSchema)
