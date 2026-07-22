import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6 lg:px-8">
        <div>
          <h3 className="text-xl font-bold text-brand-400">Turisto</h3>
          <p className="mt-2 text-sm text-gray-400">Explore the world, curated for you. Handpicked tours and unforgettable trips.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li><Link href="/tours" className="hover:text-white">All Tours</Link></li>
            <li><Link href="/destinations" className="hover:text-white">Destinations</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Account</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li><Link href="/login" className="hover:text-white">Sign In</Link></li>
            <li><Link href="/signup" className="hover:text-white">Sign Up</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Turisto. All rights reserved.
      </div>
    </footer>
  )
}
