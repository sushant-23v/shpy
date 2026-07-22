import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTourBySlug, getTourReviews, getTourRating, getTourBookedCount, userHasBookedTour, userHasReviewedTour } from '@/lib/queries'
import { getSession } from '@/lib/auth'
import { Container } from '@/components/ui/Container'
import { BookingForm } from '@/components/tours/BookingForm'
import { ReviewForm } from '@/components/tours/ReviewForm'
import { StarRating } from '@/components/ui/StarRating'
import { formatPrice, formatDate } from '@/lib/utils'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getTourBySlug(params.slug)
  if (!data) return { title: 'Tour not found' }
  return {
    title: data.tour.title,
    description: data.tour.description.slice(0, 155),
    openGraph: { title: data.tour.title, images: [data.tour.imageUrl] },
  }
}

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const data = await getTourBySlug(params.slug)
  if (!data) notFound()
  const { tour, destination } = data

  const [reviews, rating, booked, session] = await Promise.all([
    getTourReviews(tour.id),
    getTourRating(tour.id),
    getTourBookedCount(tour.id),
    getSession(),
  ])

  const spotsLeft = Math.max(0, tour.capacity - booked)
  const canReview = session ? await userHasBookedTour(session.id, tour.id) : false
  const alreadyReviewed = session ? await userHasReviewedTour(session.id, tour.id) : false

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            <Image src={tour.imageUrl} alt={tour.title} fill priority sizes="(max-width:1024px) 100vw, 66vw" className="object-cover" />
          </div>
          {tour.galleryUrls.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {tour.galleryUrls.slice(0, 3).map((url, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={url} alt={`${tour.title} ${i + 1}`} fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">{tour.category}</span>
            <h1 className="mt-3 text-2xl font-semibold md:text-3xl">{tour.title}</h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <Link href={`/destinations/${destination?.slug}`} className="hover:text-brand-600">{destination?.name}</Link>
              <span>&middot;</span><span>{tour.durationDays} days</span>
              <span>&middot;</span><span>{tour.location}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <StarRating value={rating.avg} size="sm" />
              <span className="text-sm text-gray-500 dark:text-gray-400">{rating.avg.toFixed(1)} ({rating.count} reviews)</span>
            </div>
            <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">{tour.description}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <div className="mt-4 space-y-4">
              {reviews.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No reviews yet. Be the first!</p>}
              {reviews.map(({ review, user }) => (
                <div key={review.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{user?.name ?? 'Traveler'}</span>
                    <StarRating value={review.rating} size="sm" />
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                  <p className="mt-1 text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                </div>
              ))}
            </div>
            {session && canReview && !alreadyReviewed && (
              <div className="mt-6"><ReviewForm tourId={tour.id} /></div>
            )}
            {session && canReview && alreadyReviewed && (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">You&apos;ve already reviewed this tour. Thanks!</p>
            )}
            {session && !canReview && (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">Book this tour to leave a review.</p>
            )}
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-brand-600">{formatPrice(tour.price)}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">per traveler</span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{spotsLeft} spots left</p>
            <div className="mt-5">
              {session ? (
                <BookingForm tourId={tour.id} price={tour.price} capacity={tour.capacity} slug={tour.slug} />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to book this tour.</p>
                  <Link href={`/login?redirect=/tours/${tour.slug}`} className="mt-3 inline-block w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Sign In to Book</Link>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  )
}
