# Ahsan Aziz Portfolio - Backend

Backend server for the architect's portfolio website built with Node.js and Express.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required variables:
```
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
ADMIN_EMAIL=ahsanaziz@gmail.com
ADMIN_PASSWORD=Ahsanaziz
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Start development server:
```bash
npm run dev
```

## API Routes

- **Auth**: `/api/auth` - Login, verify token, change password
- **Projects**: `/api/projects` - CRUD operations for projects
- **Gallery**: `/api/gallery` - CRUD operations for gallery images
- **Skills**: `/api/skills` - CRUD operations for skills
- **Experience**: `/api/experience` - CRUD operations for experience
- **Contact**: `/api/contact` - Manage contact messages
- **Settings**: `/api/settings` - Website settings

## Database Models

- User (Admin)
- Project
- Gallery
- Contact
- Skills (TODO)
- Experience (TODO)
