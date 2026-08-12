import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/auth'

export const runtime = 'nodejs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  try {
    requireAdmin(request)
    const { data, filename } = await request.json()
    if (!data?.startsWith('data:image/')) {
      return NextResponse.json({ error: 'A valid image is required' }, { status: 400 })
    }
    const result = await cloudinary.uploader.upload(data, {
      folder: 'ahsan-portfolio/projects',
      public_id: filename
        ? filename.replace(/\.[^.]+$/, '').replace(/[^a-z0-9_-]+/gi, '-')
        : undefined,
      resource_type: 'image',
      overwrite: false,
    })
    return NextResponse.json(
      { url: result.secure_url, publicId: result.public_id, width: result.width, height: result.height },
      { status: 201 }
    )
  } catch (error) {
    const status = error.message === 'Authentication required' ? 401 : 500
    return NextResponse.json({ error: error.message }, { status })
  }
}
