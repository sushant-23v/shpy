'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createBooking, type ActionState } from '@/lib/actions'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'
import Link from 'next/link'

const initial: ActionState = { success: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" size="lg" className="w-full" disabled={pending}>{pending ? 'Booking...' : 'Confirm Booking'}</Button>
}

export function BookingForm({ tourId, price, capacity, slug }: { tourId: number; price: number; capacity: number; slug: string }) {
  const [state, formAction] = useFormState(createBooking, initial)
  const [travelers, setTravelers] = useState(1)

  if (state.success) {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-6 text-center dark:border-brand-800 dark:bg-brand-900/30">
        <svg className="mx-auto h-12 w-12 text-brand-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3 className="mt-3 text-lg font-semibold">Booking confirmed!</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Your trip is booked. See it in your dashboard.</p>
        <Link href="/dashboard" className="mt-4 inline-block"><Button>Go to Dashboard</Button></Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="tourId" value={tourId} />
      <FormField label="Start date" htmlFor="startDate" error={state.fieldErrors?.startDate}>
        <Input id="startDate" name="startDate" type="date" required />
      </FormField>
      <FormField label="Travelers" htmlFor="travelers" error={state.fieldErrors?.travelers}>
        <Input id="travelers" name="travelers" type="number" min={1} max={20} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} required />
      </FormField>
      <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
        <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
        <span className="text-lg font-semibold text-brand-600">{formatPrice(price * travelers)}</span>
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton />
    </form>
  )
}
