import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/server/db'
import { Project } from '@/lib/server/models'

export const runtime = 'nodejs'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json(await Project.find({ featured: true }).sort({ order: 1 }))
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
