import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-32 text-center">
      <p className="text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">The trail you followed doesn&apos;t lead anywhere. Let&apos;s get you back.</p>
      <Link href="/" className="mt-6 inline-block"><Button>Back to home</Button></Link>
    </div>
  )
}
