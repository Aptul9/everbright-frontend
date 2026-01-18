import { NextRequest } from 'next/server'
import * as jose from 'jose'

export type SessionPayload = {
  userId: string
  companyId: string
  companyName: string
  isManagement: boolean
  notarifyToken: string
}

export async function getSession(request: NextRequest): Promise<SessionPayload | null> {
  let token: string | undefined

  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  }

  if (!token) {
    token = request.cookies.get('session_token')?.value
  }

  if (!token || !process.env.JWT_SECRET) {
    return null
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jose.jwtVerify(token, secret)

    return payload as SessionPayload
  } catch (error) {
    console.error('Failed to verify session:', error)
    return null
  }
}
