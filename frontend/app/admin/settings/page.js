'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import api from '@/lib/api'

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('password')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [passwordForm, setPasswordForm] = useState({
    email: 'ahsanaziz@gmail.com',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [profileForm, setProfileForm] = useState({
    fullName: 'AR Ahsan Aziz',
    title: 'Architect',
    phone: '+92-316-1588956',
    email: 'geocoenterprises@outlook.com',
    website: 'https://geo-199m.vercel.app/contact',
    location: 'Mansehra, Pakistan',
    address: 'House no 409 Muhla Dandi, Zareen Mansehra, 21300, Pakistan',
    bio: 'Professional Architect with expertise in architectural design, planning, and 3D modeling.',
    dateOfBirth: '18/01/1997',
    placeOfBirth: 'Mansehra, Pakistan',
    nationality: 'Pakistani',
    education: 'Bachelor of Architecture - Hazara University Mansehra',
    workExperience: 'Architect at Geoeon Enterprises - Islamabad',
    skills: 'AutoCAD, ArchCAD, SketchUp, Photoshop, Revit, 3D Modeling, Lumion, Adobe Suite',
    languages: 'Urdu (Mother Tongue), English (B1-B2 Level)',
  })

  const [profileImage, setProfileImage] = useState({
    url: '',
    file: null,
  })

  const [professionalImage, setProfessionalImage] = useState({
    url: '',
    file: null,
  })

  const [imageAdjustment, setImageAdjustment] = useState({
    posX: 0,
    posY: 0,
    scale: 1,
  })

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      await api.auth.changePassword(
        passwordForm.email,
        passwordForm.oldPassword,
        passwordForm.newPassword
      )

      setSuccess('Password changed successfully!')
      setPasswordForm({
        email: 'ahsanaziz@gmail.com',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (err) {
      setError(err.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      setSuccess('')

      await api.settings.update(profileForm)

      // Save professional image to localStorage
      if (professionalImage.url) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('professionalImage', professionalImage.url)
        }
      }

      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link href="/admin/dashboard">
          <motion.button
            className="p-2 hover:bg-secondary rounded-lg transition"
            whileHover={{ scale: 1.1 }}
          >
            <FiArrowLeft size={20} className="text-primary" />
          </motion.button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold gradient-text">Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account settings</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 border-b border-gray-700 overflow-x-auto"
      >
        <motion.button
          onClick={() => setActiveTab('password')}
          className={`px-6 py-3 font-semibold transition relative whitespace-nowrap ${
            activeTab === 'password'
              ? 'text-primary'
              : 'text-gray-400 hover:text-light'
          }`}
          whileHover={{ y: -2 }}
        >
          Password
          {activeTab === 'password' && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-500"
            />
          )}
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('contact')}
          className={`px-6 py-3 font-semibold transition relative whitespace-nowrap ${
            activeTab === 'contact'
              ? 'text-primary'
              : 'text-gray-400 hover:text-light'
          }`}
          whileHover={{ y: -2 }}
        >
          Contact Info
          {activeTab === 'contact' && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-500"
            />
          )}
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('professional')}
          className={`px-6 py-3 font-semibold transition relative whitespace-nowrap ${
            activeTab === 'professional'
              ? 'text-primary'
              : 'text-gray-400 hover:text-light'
          }`}
          whileHover={{ y: -2 }}
        >
          Professional
          {activeTab === 'professional' && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-500"
            />
          )}
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('profile-image')}
          className={`px-6 py-3 font-semibold transition relative whitespace-nowrap ${
            activeTab === 'profile-image'
              ? 'text-primary'
              : 'text-gray-400 hover:text-light'
          }`}
          whileHover={{ y: -2 }}
        >
          Profile Image
          {activeTab === 'profile-image' && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-500"
            />
          )}
        </motion.button>
      </motion.div>

      {/* Success/Error Messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-success bg-opacity-20 border border-success rounded-lg text-success flex items-center gap-2"
        >
          <FiCheck size={20} />
          {success}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-error bg-opacity-20 border border-error rounded-lg text-error"
        >
          {error}
        </motion.div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary p-8 rounded-xl shadow-lg max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Email Address
              </label>
              <input
                type="email"
                value={passwordForm.email}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    email: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Current Password *
              </label>
              <input
                type="password"
                value={passwordForm.oldPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    oldPassword: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                New Password *
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Confirm New Password *
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* Contact Info Tab */}
      {activeTab === 'contact' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary p-8 rounded-xl shadow-lg max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Full Name</label>
                <input
                  type="text"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Professional Title</label>
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Phone</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Website</label>
                <input
                  type="url"
                  value={profileForm.website}
                  onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Location</label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">Address</label>
              <textarea
                value={profileForm.address}
                onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">Bio</label>
              <textarea
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
            >
              {loading ? 'Saving...' : 'Save Contact Info'}
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* Professional Tab */}
      {activeTab === 'professional' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary p-8 rounded-xl shadow-lg max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text">Professional Information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Date of Birth</label>
                <input
                  type="text"
                  value={profileForm.dateOfBirth}
                  onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Place of Birth</label>
                <input
                  type="text"
                  value={profileForm.placeOfBirth}
                  onChange={(e) => setProfileForm({ ...profileForm, placeOfBirth: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">Nationality</label>
                <input
                  type="text"
                  value={profileForm.nationality}
                  onChange={(e) => setProfileForm({ ...profileForm, nationality: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">Education</label>
              <textarea
                value={profileForm.education}
                onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">Work Experience</label>
              <textarea
                value={profileForm.workExperience}
                onChange={(e) => setProfileForm({ ...profileForm, workExperience: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">Skills</label>
              <textarea
                value={profileForm.skills}
                onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
                placeholder="Separate skills with commas"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">Languages</label>
              <textarea
                value={profileForm.languages}
                onChange={(e) => setProfileForm({ ...profileForm, languages: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
              />
            </div>

            {/* Professional Image Upload */}
            <div className="border-t border-gray-600 pt-6 mt-6">
              <label className="block text-sm font-semibold mb-2 text-light">Professional Photo</label>
              <p className="text-xs text-gray-400 mb-4">Upload a professional photo for the About page Professional section</p>

              {professionalImage.url && (
                <div className="flex justify-center mb-4">
                  <img
                    src={professionalImage.url}
                    alt="Professional Preview"
                    className="w-32 h-32 rounded-lg object-cover border-2 border-primary"
                  />
                </div>
              )}

              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setProfessionalImage({
                          url: reader.result,
                          file: file,
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
                <p className="text-xs text-gray-400 mt-2">Or paste URL below:</p>
              </div>

              <input
                type="url"
                value={professionalImage.url}
                onChange={(e) =>
                  setProfessionalImage({ ...professionalImage, url: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition mt-2"
                placeholder="https://example.com/professional-photo.jpg"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
            >
              {loading ? 'Saving...' : 'Save Professional Info'}
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* Profile Image Tab */}
      {activeTab === 'profile-image' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text">Upload & Adjust Profile Image</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (profileImage.url) {
                if (typeof window !== 'undefined') {
                  // Store both image URL and adjustment settings
                  localStorage.setItem('profileImage', profileImage.url)
                  localStorage.setItem('profileImageAdjustment', JSON.stringify(imageAdjustment))
                }
                setSuccess('Profile image updated!')
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Left Column - Upload Controls */}
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Select Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setProfileImage({
                          url: reader.result,
                          file: file,
                        })
                        // Reset adjustments when new image is uploaded
                        setImageAdjustment({ posX: 0, posY: 0, scale: 1 })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                />
                <p className="text-xs text-gray-400 mt-2">
                  JPG or PNG format - any size
                </p>
              </div>

              {/* OR divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-gray-600"></div>
                <p className="text-gray-400 text-sm">OR</p>
                <div className="flex-1 border-t border-gray-600"></div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-light">
                  Image URL
                </label>
                <input
                  type="url"
                  value={profileImage.url}
                  onChange={(e) => {
                    setProfileImage({ ...profileImage, url: e.target.value })
                    setImageAdjustment({ posX: 0, posY: 0, scale: 1 })
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Adjustment Controls */}
              {profileImage.url && (
                <div className="border-t border-gray-600 pt-6 space-y-6">
                  <h3 className="font-semibold text-light">Adjust Image</h3>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-light">
                      Zoom: {Math.round(imageAdjustment.scale * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.3"
                      max="5"
                      step="0.05"
                      value={imageAdjustment.scale}
                      onChange={(e) =>
                        setImageAdjustment({
                          ...imageAdjustment,
                          scale: parseFloat(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <p className="text-xs text-gray-400 mt-1">Drag to show full image or zoom in</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-light">
                      Horizontal: {imageAdjustment.posX}px
                    </label>
                    <input
                      type="range"
                      min="-300"
                      max="300"
                      step="5"
                      value={imageAdjustment.posX}
                      onChange={(e) =>
                        setImageAdjustment({
                          ...imageAdjustment,
                          posX: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <p className="text-xs text-gray-400 mt-1">Move image left/right</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-light">
                      Vertical: {imageAdjustment.posY}px
                    </label>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="5"
                      value={imageAdjustment.posY}
                      onChange={(e) =>
                        setImageAdjustment({
                          ...imageAdjustment,
                          posY: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <p className="text-xs text-gray-400 mt-1">Move image up/down</p>
                  </div>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading || !profileImage.url}
                className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
              >
                {loading ? 'Saving...' : 'Save Profile Image'}
              </motion.button>
            </div>

            {/* Right Column - Live Preview */}
            {profileImage.url && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-sm font-semibold text-light">Live Preview</p>
                <div
                  className="rounded-3xl overflow-hidden shadow-2xl border-2 border-primary flex items-center justify-center bg-dark"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    aspectRatio: '750 / 600',
                  }}
                >
                  <img
                    src={profileImage.url}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: `${50 + (imageAdjustment.posX / 150) * 25}% ${50 + (imageAdjustment.posY / 150) * 25}%`,
                      transform: `scale(${imageAdjustment.scale})`,
                      transformOrigin: 'center center',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 text-center">
                  This is how your image will appear on the homepage
                </p>
              </div>
            )}
          </form>
        </motion.div>
      )}

      {/* Old Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary p-8 rounded-xl shadow-lg max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text">
            Profile Information
          </h2>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Full Name
              </label>
              <input
                type="text"
                value={profileForm.fullName}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    fullName: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Professional Title
              </label>
              <input
                type="text"
                value={profileForm.title}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    title: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                placeholder="Architect"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Location
              </label>
              <input
                type="text"
                value={profileForm.location}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    location: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                placeholder="Dubai, UAE"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Phone
              </label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    phone: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition"
                placeholder="+971 123 456 789"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-light">
                Bio
              </label>
              <textarea
                value={profileForm.bio}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    bio: e.target.value,
                  })
                }
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-600 bg-dark text-light rounded-lg focus:border-primary outline-none transition resize-none"
                placeholder="Tell something about yourself..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary p-6 rounded-xl border border-gray-700"
      >
        <h3 className="font-semibold text-light mb-2">🔐 Security Tips</h3>
        <ul className="text-gray-400 text-sm space-y-2">
          <li>• Use a strong password with at least 8 characters</li>
          <li>• Include uppercase, lowercase, and numbers</li>
          <li>• Change your password regularly for security</li>
          <li>• Never share your credentials with anyone</li>
        </ul>
      </motion.div>
    </div>
  )
}
