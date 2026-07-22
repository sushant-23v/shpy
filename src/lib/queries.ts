import { db } from '@/db'
import { tours, destinations, bookings, reviews, users } from '@/db/schema'
import { and, asc, desc, eq, gte, lte, sql } from 'drizzle-orm'

export type TourFilters = {
  destinationId?: number
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sort?: string
}

export async function getDestinations() {
  return db.select().from(destinations).orderBy(asc(destinations.name))
}

export async function getDestinationBySlug(slug: string) {
  const rows = await db.select().from(destinations).where(eq(destinations.slug, slug)).limit(1)
  return rows[0] ?? null
}

export async function getTours(filters: TourFilters = {}) {
  const conditions = []
  if (filters.destinationId) conditions.push(eq(tours.destinationId, filters.destinationId))
  if (filters.category) conditions.push(eq(tours.category, filters.category))
  if (filters.minPrice !== undefined) conditions.push(gte(tours.price, filters.minPrice))
  if (filters.maxPrice !== undefined) conditions.push(lte(tours.price, filters.maxPrice))
  if (filters.search) conditions.push(sql`lower(${tours.title}) like ${'%' + filters.search.toLowerCase() + '%'}`)

  let order
  switch (filters.sort) {
    case 'price_asc': order = asc(tours.price); break
    case 'price_desc': order = desc(tours.price); break
    case 'duration_asc': order = asc(tours.durationDays); break
    default: order = desc(tours.featured)
  }

  const rows = await db
    .select({
      tour: tours,
      destination: destinations,
    })
    .from(tours)
    .leftJoin(destinations, eq(tours.destinationId, destinations.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(order)
  return rows
}

export async function getFeaturedTours() {
  const rows = await db
    .select({ tour: tours, destination: destinations })
    .from(tours)
    .leftJoin(destinations, eq(tours.destinationId, destinations.id))
    .where(eq(tours.featured, 1))
  return rows
}

export async function getTourBySlug(slug: string) {
  const rows = await db
    .select({ tour: tours, destination: destinations })
    .from(tours)
    .leftJoin(destinations, eq(tours.destinationId, destinations.id))
    .where(eq(tours.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

export async function getTourById(id: number) {
  const rows = await db.select().from(tours).where(eq(tours.id, id)).limit(1)
  return rows[0] ?? null
}

export async function getTourReviews(tourId: number) {
  return db
    .select({ review: reviews, user: users })
    .from(reviews)
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.tourId, tourId))
    .orderBy(desc(reviews.createdAt))
}

export async function getTourRating(tourId: number) {
  const rows = await db
    .select({ avg: sql<number>`coalesce(avg(${reviews.rating}), 0)`, count: sql<number>`count(*)` })
    .from(reviews)
    .where(eq(reviews.tourId, tourId))
  return { avg: Number(rows[0]?.avg ?? 0), count: Number(rows[0]?.count ?? 0) }
}

export async function getUserBookings(userId: number) {
  return db
    .select({ booking: bookings, tour: tours })
    .from(bookings)
    .leftJoin(tours, eq(bookings.tourId, tours.id))
    .where(eq(bookings.userId, userId))
    .orderBy(desc(bookings.startDate))
}

export async function getTourBookedCount(tourId: number) {
  const rows = await db
    .select({ total: sql<number>`coalesce(sum(${bookings.travelers}), 0)` })
    .from(bookings)
    .where(and(eq(bookings.tourId, tourId), sql`${bookings.status} != 'cancelled'`))
  return Number(rows[0]?.total ?? 0)
}

export async function userHasBookedTour(userId: number, tourId: number) {
  const rows = await db
    .select({ id: bookings.id })
    .from(bookings)
    .where(and(eq(bookings.userId, userId), eq(bookings.tourId, tourId)))
    .limit(1)
  return rows.length > 0
}

export async function userHasReviewedTour(userId: number, tourId: number) {
  const rows = await db
    .select({ id: reviews.id })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.tourId, tourId)))
    .limit(1)
  return rows.length > 0
}

export async function getCategories() {
  const rows = await db.selectDistinct({ category: tours.category }).from(tours)
  return rows.map((r) => r.category)
}
