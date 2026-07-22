import type { MetadataRoute } from 'next'
import { getTours, getDestinations } from '@/lib/queries'

const base = 'https://turisto.example.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, destinations] = await Promise.all([getTours(), getDestinations()])
  const staticRoutes = ['', '/tours', '/destinations', '/about', '/contact'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }))
  const tourRoutes = tours.map(({ tour }) => ({ url: `${base}/tours/${tour.slug}`, lastModified: tour.updatedAt }))
  const destRoutes = destinations.map((d) => ({ url: `${base}/destinations/${d.slug}`, lastModified: d.updatedAt }))
  return [...staticRoutes, ...tourRoutes, ...destRoutes]
}
