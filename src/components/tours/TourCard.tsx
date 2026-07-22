import Link from 'next/link'
import Image from 'next/image'
import type { Tour, Destination } from '@/db/schema'
import { formatPrice } from '@/lib/utils'

export function TourCard({ tour, destination }: { tour: Tour; destination: Destination | null }) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={tour.imageUrl} alt={tour.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">{tour.category}</span>
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400">{destination?.name ?? tour.location}</p>
        <h3 className="mt-1 line-clamp-1 font-semibold">{tour.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{tour.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">{tour.durationDays} days</span>
          <span className="font-semibold text-brand-600">{formatPrice(tour.price)}</span>
        </div>
      </div>
    </Link>
  )
}
