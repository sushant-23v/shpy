'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { updateProfile, type ActionState } from '@/lib/actions'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const initial: ActionState = { success: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save Profile'}</Button>
}

export function ProfileForm({ name, bio }: { name: string; bio: string | null }) {
  const [state, formAction] = useFormState(updateProfile, initial)
  return (
    <form action={formAction} className="space-y-4">
      <FormField label="Name" htmlFor="name" error={state.fieldErrors?.name}>
        <Input id="name" name="name" defaultValue={name} required />
      </FormField>
      <FormField label="Bio" htmlFor="bio" error={state.fieldErrors?.bio}>
        <textarea id="bio" name="bio" rows={3} defaultValue={bio ?? ''} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900" />
      </FormField>
      {state.success && <p className="text-sm text-brand-600">Profile updated.</p>}
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton />
    </form>
  )
}
