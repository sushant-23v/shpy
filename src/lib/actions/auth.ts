'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { signUpSchema, signInSchema } from '@/lib/validations'
import { hashPassword, verifyPassword, createSession, destroySession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export type AuthState = { error?: string; fieldErrors?: Record<string, string> }

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message })
    return { fieldErrors }
  }
  const existing = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1)
  if (existing.length) return { error: 'An account with that email already exists.' }

  const hashed = await hashPassword(parsed.data.password)
  const inserted = await db.insert(users).values({
    name: parsed.data.name,
    email: parsed.data.email,
    password: hashed,
    role: 'traveler',
  }).returning()
  await createSession(inserted[0].id)
  redirect('/dashboard')
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message })
    return { fieldErrors }
  }
  const rows = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1)
  const user = rows[0]
  if (!user || !(await verifyPassword(parsed.data.password, user.password))) {
    return { error: 'Invalid email or password.' }
  }
  await createSession(user.id)
  redirect('/dashboard')
}

export async function signOut() {
  await destroySession()
  redirect('/')
}
