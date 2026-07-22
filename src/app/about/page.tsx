import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'About',
  description: 'Turisto is a travel company crafting curated tours and unforgettable trips for modern explorers.',
}

export default function AboutPage() {
  return (
    <>
      <div className="relative h-64 overflow-hidden md:h-80">
        <Image src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="The Turisto team" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <Container><h1 className="text-3xl font-bold text-white md:text-5xl">About Turisto</h1></Container>
        </div>
      </div>
      <Section>
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-3 text-gray-700 dark:text-gray-300">At Turisto, we believe travel should be effortless, meaningful, and genuinely memorable. We curate every tour by hand — partnering with local guides and vetting each experience — so you can focus on the journey, not the planning.</p>
          <h2 className="mt-10 text-2xl font-semibold">Why Turisto</h2>
          <p className="mt-3 text-gray-700 dark:text-gray-300">From luxury sailings in the Aegean to backpacking through cherry-blossom Japan, our range spans every kind of traveler. Transparent pricing, flexible bookings, and real human support mean you can book with confidence, every time.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { label: 'Curated', text: 'Every trip vetted by experts.' },
              { label: 'Trusted', text: 'Thousands of happy travelers.' },
              { label: 'Local', text: 'Guides who know the way.' },
            ].map((v) => (
              <div key={v.label} className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
                <h3 className="font-semibold text-brand-600">{v.label}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
