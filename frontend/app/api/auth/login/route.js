import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/server/db'
import { User } from '@/lib/server/models'

export const runtime = 'nodejs'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    await connectDB()
    let user = await User.findOne({ email })
    const adminEmail = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    if (!user && email === adminEmail && password === adminPassword) {
      user = await User.create({ email, password, name: 'Ahsan Aziz', role: 'admin' })
    }
    if (!user || !(await user.matchPassword(password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    )
    return NextResponse.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
