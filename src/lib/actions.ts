'use server'

import { db } from '@/db'
import { bookings, reviews, contactMessages } from '@/db/schema'
import { bookingSchema, reviewSchema, contactSchema, profileSchema } from '@/lib/validations'
import { getSession } from '@/lib/auth'
import { getTourById, getTourBookedCount, userHasBookedTour, userHasReviewedTour } from '@/lib/queries'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export type ActionState = { success: boolean; error?: string; fieldErrors?: Record<string, string> }

export async function createBooking(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await getSession()
  if (!session) return { success: false, error: 'You must be signed in to book.' }

  const parsed = bookingSchema.safeParse({
    tourId: formData.get('tourId'),
    startDate: formData.get('startDate'),
    travelers: formData.get('travelers'),
  })
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message })
    return { success: false, error: 'Please fix the errors below.', fieldErrors }
  }

  const tour = await getTourById(parsed.data.tourId)
  if (!tour) return { success: false, error: 'Tour not found.' }

  const booked = await getTourBookedCount(tour.id)
  if (booked + parsed.data.travelers > tour.capacity) {
    return { success: false, error: `Only ${Math.max(0, tour.capacity - booked)} spots left for this tour.` }
  }

  const totalPrice = tour.price * parsed.data.travelers

  await db.insert(bookings).values({
    userId: session.id,
    tourId: tour.id,
    startDate: parsed.data.startDate,
    travelers: parsed.data.travelers,
    totalPrice,
    status: 'confirmed',
  })

  revalidatePath('/dashboard')
  revalidatePath(`/tours/${tour.slug}`)
  return { success: true }
}

export async function cancelBooking(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await getSession()
  if (!session) return { success: false, error: 'Not authenticated.' }
  const bookingId = Number(formData.get('bookingId'))
  if (!bookingId) return { success: false, error: 'Invalid booking.' }

  const rows = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1)
  const booking = rows[0]
  if (!booking || booking.userId !== session.id) return { success: false, error: 'Booking not found.' }

  await db.update(bookings).set({ status: 'cancelled', updatedAt: new Date() }).where(eq(bookings.id, bookingId))
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await getSession()
  if (!session) return { success: false, error: 'Not authenticated.' }
  const parsed = profileSchema.safeParse({
    name: formData.get('name'),
    bio: formData.get('bio') || undefined,
  })
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message })
    return { success: false, error: 'Please fix the errors below.', fieldErrors }
  }
  await db.update(users).set({ name: parsed.data.name, bio: parsed.data.bio ?? null, updatedAt: new Date() }).where(eq(users.id, session.id))
  revalidatePath('/dashboard')
  return { success: true }
}

export async function createReview(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await getSession()
  if (!session) return { success: false, error: 'You must be signed in to review.' }

  const parsed = reviewSchema.safeParse({
    tourId: formData.get('tourId'),
    rating: formData.get('rating'),
    comment: formData.get('comment'),
  })
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message })
    return { success: false, error: 'Please fix the errors below.', fieldErrors }
  }

  const eligible = await userHasBookedTour(session.id, parsed.data.tourId)
  if (!eligible) return { success: false, error: 'Only travelers who booked this tour can review it.' }

  const already = await userHasReviewedTour(session.id, parsed.data.tourId)
  if (already) return { success: false, error: 'You have already reviewed this tour.' }

  const tour = await getTourById(parsed.data.tourId)
  if (!tour) return { success: false, error: 'Tour not found.' }

  await db.insert(reviews).values({
    userId: session.id,
    tourId: parsed.data.tourId,
    rating: parsed.data.rating,
    comment: parsed.data.comment,
  })
  revalidatePath(`/tours/${tour.slug}`)
  return { success: true }
}

export async function submitContact(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message })
    return { success: false, error: 'Please fix the errors below.', fieldErrors }
  }
  await db.insert(contactMessages).values(parsed.data)
  return { success: true }
}
