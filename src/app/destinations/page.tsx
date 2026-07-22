import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getDestinations } from '@/lib/queries'
import { Container } from '@/components/ui/Container'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Discover Turisto\'s handpicked destinations around the world.',
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold md:text-3xl">Destinations</h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400">Explore the places our travelers love most.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <Link key={d.id} href={`/destinations/${d.slug}`} className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image src={d.imageUrl} alt={d.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold">{d.name}</h2>
              <p className="text-sm text-gray-400">{d.country}</p>
              <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{d.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}
