const express = require('express')
const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')

const router = express.Router()

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get unread messages
router.get('/unread', async (req, res) => {
  try {
    const messages = await Contact.find({ status: 'Unread' }).sort({
      createdAt: -1,
    })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create message
router.post('/', async (req, res) => {
  try {
    const message = new Contact(req.body)
    await message.save()

    // Send email notification to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${req.body.subject}`,
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${req.body.subject}</p>
        <hr>
        <h3>Message:</h3>
        <p>${req.body.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
      `,
    }

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email error:', error)
      } else {
        console.log('✅ Email sent to admin:', info.response)
      }
    })

    // Also send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'We received your message - Ahsan Aziz Portfolio',
      html: `
        <h2>Thank you for contacting me!</h2>
        <p>Hi ${req.body.name},</p>
        <p>I received your message and will get back to you as soon as possible.</p>
        <hr>
        <p><strong>Your Message:</strong></p>
        <p>${req.body.subject}</p>
        <hr>
        <p>Best regards,<br>Ahsan Aziz</p>
      `,
    }

    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.error('❌ Confirmation email error:', error)
      } else {
        console.log('✅ Confirmation email sent to user:', info.response)
      }
    })

    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update message status
router.put('/:id', async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!message) {
      return res.status(404).json({ error: 'Message not found' })
    }
    res.json(message)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id)
    if (!message) {
      return res.status(404).json({ error: 'Message not found' })
    }
    res.json({ message: 'Message deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
