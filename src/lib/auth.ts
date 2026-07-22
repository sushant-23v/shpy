import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-change-me')
const COOKIE = 'turisto_session'

export async function hashPassword(pw: string) {
  return bcrypt.hash(pw, 10)
}

export async function verifyPassword(pw: string, hash: string) {
  return bcrypt.compare(pw, hash)
}

export async function createSession(userId: number) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function destroySession() {
  cookies().delete(COOKIE)
}

export async function getSession() {
  const token = cookies().get(COOKIE)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    const userId = payload.userId as number
    const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    const user = rows[0]
    if (!user) return null
    return { id: user.id, name: user.name, email: user.email, role: user.role, bio: user.bio }
  } catch {
    return null
  }
}
