import jwt from 'jsonwebtoken'

export function requireAdmin(request) {
  const token = request.headers.get('authorization')?.split(' ')[1]
  if (!token) throw new Error('Authentication required')
  return jwt.verify(token, process.env.JWT_SECRET)
}

export function normalizeProject(body) {
  return {
    ...body,
    clientName: body.clientName ?? body.client ?? '',
    images: (body.images || []).map((image) =>
      typeof image === 'string' ? { url: image } : image
    ),
  }
}
