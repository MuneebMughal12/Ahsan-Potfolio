import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const imageSchema = new mongoose.Schema(
  { url: String, publicId: String, alt: String },
  { _id: false }
)

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, unique: true, sparse: true },
    projectCode: { type: String, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Residential', 'Commercial', 'Interior', 'Other'],
      required: true,
    },
    location: { type: String, required: true },
    clientName: { type: String, trim: true },
    year: { type: Number, required: true },
    area: { type: String, trim: true },
    budget: { type: String, trim: true },
    thumbnail: { type: String, trim: true },
    images: [imageSchema],
    floorPlans: [imageSchema],
    renderings: [imageSchema],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
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
  if (!this.thumbnail && this.images?.length) this.thumbnail = this.images[0].url
  next()
})

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, trim: true },
    role: { type: String, enum: ['admin', 'user'], default: 'admin' },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)
export const User = mongoose.models.User || mongoose.model('User', userSchema)
