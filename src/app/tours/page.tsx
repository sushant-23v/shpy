import type { Metadata } from 'next'
import { getTours, getDestinations, getCategories } from '@/lib/queries'
import { Container } from '@/components/ui/Container'
import { TourCard } from '@/components/tours/TourCard'
import { TourFilters } from '@/components/tours/TourFilters'
import { EmptyState } from '@/components/ui/EmptyState'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tours',
  description: 'Browse and filter Turisto\'s curated tours by destination, category, price, and duration.',
}

export default async function ToursPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const [destinations, categories] = await Promise.all([getDestinations(), getCategories()])
  const tours = await getTours({
    destinationId: searchParams.destination ? Number(searchParams.destination) : undefined,
    category: searchParams.category,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    search: searchParams.search,
    sort: searchParams.sort,
  })

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold md:text-3xl">Explore Tours</h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400">Find your perfect trip from our curated collection.</p>
      <div className="mt-6"><TourFilters destinations={destinations} categories={categories} /></div>
      {tours.length === 0 ? (
        <div className="mt-8"><EmptyState title="No tours found" message="Try adjusting your filters to see more results." /></div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map(({ tour, destination }) => <TourCard key={tour.id} tour={tour} destination={destination} />)}
        </div>
      )}
    </Container>
  )
}
