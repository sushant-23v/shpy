'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { signIn, signUp, type AuthState } from '@/lib/actions/auth'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const initial: AuthState = {}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return <Button type="submit" size="lg" className="w-full" disabled={pending}>{pending ? 'Please wait...' : label}</Button>
}

export function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const action = mode === 'signin' ? signIn : signUp
  const [state, formAction] = useFormState(action, initial)

  return (
    <form action={formAction} className="space-y-4">
      {mode === 'signup' && (
        <FormField label="Name" htmlFor="name" error={state.fieldErrors?.name}><Input id="name" name="name" required /></FormField>
      )}
      <FormField label="Email" htmlFor="email" error={state.fieldErrors?.email}><Input id="email" name="email" type="email" required /></FormField>
      <FormField label="Password" htmlFor="password" error={state.fieldErrors?.password}><Input id="password" name="password" type="password" required /></FormField>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton label={mode === 'signin' ? 'Sign In' : 'Create Account'} />
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        {mode === 'signin' ? (
          <>Don&apos;t have an account? <Link href="/signup" className="text-brand-600 hover:underline">Sign up</Link></>
        ) : (
          <>Already have an account? <Link href="/login" className="text-brand-600 hover:underline">Sign in</Link></>
        )}
      </p>
    </form>
  )
}
