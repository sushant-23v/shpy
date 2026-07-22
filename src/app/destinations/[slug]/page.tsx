import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getDestinationBySlug, getTours } from '@/lib/queries'
import { Container } from '@/components/ui/Container'
import { TourCard } from '@/components/tours/TourCard'
import { EmptyState } from '@/components/ui/EmptyState'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dest = await getDestinationBySlug(params.slug)
  if (!dest) return { title: 'Destination not found' }
  return { title: dest.name, description: dest.description, openGraph: { title: dest.name, images: [dest.imageUrl] } }
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const dest = await getDestinationBySlug(params.slug)
  if (!dest) notFound()
  const tours = await getTours({ destinationId: dest.id })

  return (
    <>
      <div className="relative h-64 overflow-hidden md:h-80">
        <Image src={dest.imageUrl} alt={dest.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-0 right-0">
          <Container>
            <h1 className="text-3xl font-bold text-white md:text-4xl">{dest.name}</h1>
            <p className="text-gray-200">{dest.country}</p>
          </Container>
        </div>
      </div>
      <Container className="py-10">
        <p className="max-w-2xl text-gray-700 dark:text-gray-300">{dest.description}</p>
        <h2 className="mt-8 text-xl font-semibold">Tours in {dest.name}</h2>
        {tours.length === 0 ? (
          <div className="mt-6"><EmptyState title="No tours yet" message="Check back soon for tours in this destination." actionLabel="Browse all tours" actionHref="/tours" /></div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map(({ tour, destination }) => <TourCard key={tour.id} tour={tour} destination={destination} />)}
          </div>
        )}
      </Container>
    </>
  )
}
