import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-change-me')

async function isAuthed(req: NextRequest) {
  const token = req.cookies.get('turisto_session')?.value
  if (!token) return false
  try {
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const authed = await isAuthed(req)
  const { pathname } = req.nextUrl
  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/book')) && !authed) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/book/:path*'],
}
