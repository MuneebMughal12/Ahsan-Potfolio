import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/server/db'
import { Project } from '@/lib/server/models'
import { normalizeProject, requireAdmin } from '@/lib/server/auth'

export const runtime = 'nodejs'

export async function GET(request, { params }) {
  try {
    await connectDB()
    const project = await Project.findById(params.id)
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    requireAdmin(request)
    await connectDB()
    const project = await Project.findById(params.id)
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    Object.assign(project, normalizeProject(await request.json()))
    await project.save()
    return NextResponse.json(project)
  } catch (error) {
    const status = error.message === 'Authentication required' ? 401 : 500
    return NextResponse.json({ error: error.message }, { status })
  }
}

export async function DELETE(request, { params }) {
  try {
    requireAdmin(request)
    await connectDB()
    const project = await Project.findByIdAndDelete(params.id)
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    return NextResponse.json({ message: 'Project deleted' })
  } catch (error) {
    const status = error.message === 'Authentication required' ? 401 : 500
    return NextResponse.json({ error: error.message }, { status })
  }
}
