import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getSession } from '@/lib/auth'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: { default: 'Turisto — Curated Tours & Trip Bookings', template: '%s | Turisto' },
  description: 'Explore the world, curated for you. Discover handpicked tours, book unforgettable trips, and manage your travels with Turisto.',
  openGraph: {
    title: 'Turisto — Curated Tours & Trip Bookings',
    description: 'Explore the world, curated for you.',
    type: 'website',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Navbar session={session} />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
