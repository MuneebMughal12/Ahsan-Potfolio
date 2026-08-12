import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/auth'

export const runtime = 'nodejs'

export async function POST(request) {
  try {
    return NextResponse.json({ valid: true, user: requireAdmin(request) })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
