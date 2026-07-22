'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createReview, type ActionState } from '@/lib/actions'
import { FormField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

const initial: ActionState = { success: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? 'Posting...' : 'Post Review'}</Button>
}

export function ReviewForm({ tourId }: { tourId: number }) {
  const [state, formAction] = useFormState(createReview, initial)
  const [rating, setRating] = useState(5)

  if (state.success) {
    return <p className="rounded-lg bg-brand-50 p-4 text-sm text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">Thanks for your review!</p>
  }

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-gray-200 p-5 dark:border-gray-800">
      <h3 className="font-semibold">Leave a review</h3>
      <input type="hidden" name="tourId" value={tourId} />
      <input type="hidden" name="rating" value={rating} />
      <FormField label="Your rating" error={state.fieldErrors?.rating}>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button type="button" key={i} onClick={() => setRating(i)} aria-label={`Rate ${i}`}>
              <svg className={`h-7 w-7 ${i <= rating ? 'text-accent-500' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.958c.3.922-.755 1.688-1.54 1.118l-3.367-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.958a1 1 0 00-.363-1.118L2.075 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" /></svg>
            </button>
          ))}
        </div>
      </FormField>
      <FormField label="Your review" htmlFor="comment" error={state.fieldErrors?.comment}>
        <textarea id="comment" name="comment" rows={3} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900" placeholder="How was your trip?" required />
      </FormField>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton />
    </form>
  )
}
