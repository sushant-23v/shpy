'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContact, type ActionState } from '@/lib/actions'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const initial: ActionState = { success: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" size="lg" disabled={pending}>{pending ? 'Sending...' : 'Send Message'}</Button>
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initial)

  if (state.success) {
    return <div className="rounded-xl border border-brand-200 bg-brand-50 p-6 text-center dark:border-brand-800 dark:bg-brand-900/30"><h3 className="font-semibold">Message sent!</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Thanks for reaching out. We&apos;ll get back to you soon.</p></div>
  }

  return (
    <form action={formAction} className="space-y-4">
      <FormField label="Name" htmlFor="name" error={state.fieldErrors?.name}><Input id="name" name="name" required /></FormField>
      <FormField label="Email" htmlFor="email" error={state.fieldErrors?.email}><Input id="email" name="email" type="email" required /></FormField>
      <FormField label="Subject" htmlFor="subject" error={state.fieldErrors?.subject}><Input id="subject" name="subject" required /></FormField>
      <FormField label="Message" htmlFor="message" error={state.fieldErrors?.message}>
        <textarea id="message" name="message" rows={5} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900" required />
      </FormField>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton />
    </form>
  )
}
