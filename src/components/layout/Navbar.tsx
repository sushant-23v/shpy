'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { signOut } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'

type Session = { id: number; name: string; email: string; role: string } | null

const links = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Tours' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar({ session }: { session: Session }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-brand-600">Turisto</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={cn('rounded-lg px-3 py-2 text-sm font-medium transition', pathname === l.href ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600 dark:text-gray-300')}>{l.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {session ? (
            <>
              <Link href="/dashboard" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-300">Dashboard</Link>
              <form action={signOut}><button className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">Sign out</button></form>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-300">Sign In</Link>
              <Link href="/signup" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Sign Up</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="rounded p-2 text-gray-600 dark:text-gray-300">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-200 md:hidden dark:border-gray-800">
          <div className="space-y-1 px-4 py-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">{l.label}</Link>
            ))}
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">Dashboard</Link>
                <form action={signOut}><button className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">Sign out</button></form>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">Sign In</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="block rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
