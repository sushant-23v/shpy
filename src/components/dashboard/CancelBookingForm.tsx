'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { cancelBooking, type ActionState } from '@/lib/actions'
import { Button } from '@/components/ui/Button'

const initial: ActionState = { success: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" variant="danger" size="sm" disabled={pending}>{pending ? 'Cancelling...' : 'Cancel'}</Button>
}

export function CancelBookingForm({ bookingId }: { bookingId: number }) {
  const [, formAction] = useFormState(cancelBooking, initial)
  return (
    <form action={formAction}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <SubmitButton />
    </form>
  )
}
