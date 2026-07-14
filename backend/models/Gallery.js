const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Design', 'Photography', 'Sketch', 'Rendering', 'Other'],
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: String,
    },
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Gallery', gallerySchema)
