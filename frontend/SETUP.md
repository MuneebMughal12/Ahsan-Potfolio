# Ahsan Aziz Portfolio Website - Setup Guide

A professional architecture portfolio website built with Next.js, Node.js, Express, and MongoDB.

## Features

✅ Responsive design with smooth animations
✅ Project showcase with filtering
✅ Gallery with lightbox
✅ Contact form with message management
✅ Admin panel for content management
✅ Cloudinary integration for image hosting
✅ JWT authentication
✅ MongoDB database

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB account (Atlas)
- Cloudinary account

## Installation

### 1. Frontend Setup

```bash
cd ahsan-potfolio
npm install
```

### 2. Backend Setup

```bash
cd backend
npm install
```

## Configuration

### Frontend (.env.local)

```env
NEXT_PUBLIC_ADMIN_EMAIL=ahsanaziz@gmail.com
NEXT_PUBLIC_ADMIN_PASSWORD=Ahsanaziz
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ahsan-portfolio
ADMIN_EMAIL=ahsanaziz@gmail.com
ADMIN_PASSWORD=Ahsanaziz
JWT_SECRET=your_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Application

### Development

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Open http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on http://localhost:5000

### Production

**Frontend:**
```bash
npm run build
npm start
```

**Backend:**
```bash
npm start
```

## Admin Panel

**URL:** http://localhost:3000/admin/login

**Credentials:**
- Email: ahsanaziz@gmail.com
- Password: Ahsanaziz

**Features:**
- Manage Projects (create, edit, delete)
- Manage Gallery (upload images)
- View Contact Messages
- Change Password
- Configure Settings

## Database Setup

1. Create MongoDB Atlas cluster
2. Create database named `ahsan-portfolio`
3. Update MONGODB_URI in backend/.env

## Cloudinary Setup

1. Create Cloudinary account
2. Get Cloud Name, API Key, API Secret
3. Update environment variables

## Deployment

### Deploy Frontend to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy Backend

Options:
- Heroku
- Railway.app
- DigitalOcean
- AWS

## API Documentation

### Auth
- POST `/api/auth/login` - Login with email and password
- POST `/api/auth/verify` - Verify token
- POST `/api/auth/change-password` - Change password

### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/featured` - Get featured projects
- GET `/api/projects/:id` - Get single project
- POST `/api/projects` - Create project
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project

### Gallery
- GET `/api/gallery` - Get all images
- GET `/api/gallery/featured` - Get featured images
- GET `/api/gallery/category/:category` - Get by category
- POST `/api/gallery` - Upload image
- PUT `/api/gallery/:id` - Update image
- DELETE `/api/gallery/:id` - Delete image

### Contact
- GET `/api/contact` - Get all messages
- GET `/api/contact/unread` - Get unread messages
- POST `/api/contact` - Submit contact form
- PUT `/api/contact/:id` - Update message status
- DELETE `/api/contact/:id` - Delete message

### Settings
- GET `/api/settings` - Get settings
- PUT `/api/settings` - Update settings

## Project Structure

```
ahsan-portfolio/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin pages
│   ├── about/               # About page
│   ├── portfolio/           # Portfolio page
│   ├── gallery/             # Gallery page
│   ├── contact/             # Contact page
│   ├── globals.css          # Global styles
│   └── layout.js            # Root layout
├── components/              # React components
│   ├── Navbar.js
│   └── Footer.js
├── lib/                     # Utilities
│   └── api.js              # API calls
├── public/                  # Static assets
├── next.config.js
├── package.json
└── backend/                 # Express backend
    ├── models/             # Database models
    ├── routes/             # API routes
    ├── server.js           # Main server file
    └── package.json
```

## Technologies Used

**Frontend:**
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion (animations)
- React Icons
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcryptjs
- Cloudinary

## Troubleshooting

**MongoDB Connection Error:**
- Check MONGODB_URI in .env
- Ensure IP is whitelisted in MongoDB Atlas

**Cloudinary Upload Error:**
- Verify CLOUDINARY_CLOUD_NAME and API keys
- Check Cloudinary account settings

**API Not Found:**
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in frontend .env.local

## Future Enhancements

- Email notifications for contact form
- SEO optimization
- Testimonials section
- Blog integration
- Analytics dashboard
- Multi-language support

## Support

For issues or questions, contact: ahsanaziz@gmail.com

---

**Created:** 2024
**Version:** 1.0.0
