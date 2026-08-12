import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/server/db'
import { Project } from '@/lib/server/models'
import { normalizeProject, requireAdmin } from '@/lib/server/auth'

export const runtime = 'nodejs'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json(await Project.find().sort({ order: 1, createdAt: -1 }))
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    requireAdmin(request)
    await connectDB()
    const project = await Project.create(normalizeProject(await request.json()))
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    const status = error.message === 'Authentication required' ? 401 : 500
    return NextResponse.json({ error: error.message }, { status })
  }
}
