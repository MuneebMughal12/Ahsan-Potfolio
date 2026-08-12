const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  key: { type: String, default: 'site', unique: true },
  fullName: { type: String, default: 'AR Ahsan Aziz' },
  title: { type: String, default: 'Architect' },
  phone: { type: String, default: '+92-316-1588956' },
  email: { type: String, default: 'geocoenterprises@outlook.com' },
  location: { type: String, default: 'I-14/3, Islamabad' },
  address: { type: String, default: 'I-14/3, Islamabad, Pakistan' },
  bio: String,
  workExperience: String,
  skills: String,
  education: String,
  languages: String,
  profileImageUrl: { type: String, default: '' },
  profileImageAdjustment: {
    posX: { type: Number, default: 0 },
    posY: { type: Number, default: 0 },
    scale: { type: Number, default: 1 },
  },
}, { timestamps: true })

module.exports = mongoose.models.Settings || mongoose.model('Settings', settingsSchema)
