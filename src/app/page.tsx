import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedTours, getDestinations } from '@/lib/queries'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { TourCard } from '@/components/tours/TourCard'
import { StarRating } from '@/components/ui/StarRating'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featured = await getFeaturedTours()
  const destinations = await getDestinations()

  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <Image src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Scenic travel landscape" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-6xl">Explore the world, curated for you</h1>
          <p className="mt-4 text-lg text-gray-100 md:text-xl">Handpicked tours and unforgettable trips, designed by travelers who know the way.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/tours"><Button size="lg">Browse Tours</Button></Link>
            <Link href="/destinations"><Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">Destinations</Button></Link>
          </div>
        </div>
      </section>

      <Section>
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">Featured Tours</h2>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Our travelers&apos; favorite adventures</p>
            </div>
            <Link href="/tours" className="text-sm font-medium text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(({ tour, destination }) => <TourCard key={tour.id} tour={tour} destination={destination} />)}
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold md:text-3xl">Popular Destinations</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <Link key={d.id} href={`/destinations/${d.slug}`} className="group relative aspect-square overflow-hidden rounded-xl">
                <Image src={d.imageUrl} alt={d.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">{d.name}</p>
                  <p className="text-sm text-gray-200">{d.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: 'Handpicked Tours', text: 'Every trip is curated and vetted by our travel experts.' },
              { title: 'Best Price Promise', text: 'Transparent pricing with no hidden fees, ever.' },
              { title: 'Book with Confidence', text: 'Flexible bookings and support whenever you need it.' },
            ].map((v) => (
              <div key={v.title} className="rounded-xl border border-gray-200 p-6 text-center dark:border-gray-800">
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50 dark:bg-gray-900/50">
        <Container className="max-w-3xl text-center">
          <StarRating value={5} />
          <blockquote className="mt-4 text-xl font-medium">&ldquo;Turisto made planning our anniversary trip effortless. The Santorini sail was pure magic.&rdquo;</blockquote>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">— Ada, verified traveler</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-2xl bg-brand-600 px-8 py-14 text-center text-white">
            <h2 className="text-3xl font-bold">Ready for your next adventure?</h2>
            <p className="mt-2 text-brand-100">Browse our curated tours and book your dream trip today.</p>
            <Link href="/tours" className="mt-6 inline-block"><Button size="lg" variant="secondary">Start Exploring</Button></Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
