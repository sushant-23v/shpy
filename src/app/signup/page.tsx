import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthForm } from '@/components/auth/AuthForm'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = { title: 'Sign Up' }

export default async function SignupPage() {
  const session = await getSession()
  if (session) redirect('/dashboard')
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <Link href="/" className="mb-6 text-center text-2xl font-bold text-brand-600">Turisto</Link>
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h1 className="mb-6 text-center text-xl font-semibold">Create your account</h1>
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}
