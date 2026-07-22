import { db } from './index'
import { users, destinations, tours, bookings, reviews } from './schema'
import bcrypt from 'bcryptjs'

async function seed() {
  console.log('Seeding database...')

  await db.delete(reviews)
  await db.delete(bookings)
  await db.delete(tours)
  await db.delete(destinations)
  await db.delete(users)

  const hashed = await bcrypt.hash('password123', 10)

  const insertedUsers = await db.insert(users).values([
    { name: 'Ada Traveler', email: 'traveler@turisto.com', password: hashed, role: 'traveler', bio: 'Loves mountains and coffee.' },
    { name: 'Turisto Admin', email: 'admin@turisto.com', password: hashed, role: 'admin', bio: 'Curates the best trips.' },
    { name: 'Marco Silva', email: 'marco@example.com', password: hashed, role: 'traveler', bio: 'Backpacker at heart.' },
  ]).returning()

  const insertedDestinations = await db.insert(destinations).values([
    { name: 'Kyoto', slug: 'kyoto', country: 'Japan', description: 'Ancient temples, serene gardens, and timeless tradition.', imageUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    { name: 'Santorini', slug: 'santorini', country: 'Greece', description: 'Whitewashed villages perched over the deep blue Aegean.', imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1200' },
    { name: 'Patagonia', slug: 'patagonia', country: 'Argentina', description: 'Dramatic peaks, glaciers, and untamed wilderness.', imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    { name: 'Bali', slug: 'bali', country: 'Indonesia', description: 'Lush rice terraces, sacred temples, and golden beaches.', imageUrl: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  ]).returning()

  const [kyoto, santorini, patagonia, bali] = insertedDestinations

  const insertedTours = await db.insert(tours).values([
    { destinationId: kyoto.id, title: 'Kyoto Temples & Gardens Escape', slug: 'kyoto-temples-gardens', description: 'A 5-day immersive journey through Kyoto\'s most iconic temples, tranquil zen gardens, and hidden tea houses. Includes a traditional tea ceremony and a guided bamboo forest walk.', category: 'Cultural', price: 1899, durationDays: 5, location: 'Kyoto, Japan', imageUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600', galleryUrls: ['https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1200'], capacity: 12, featured: 1 },
    { destinationId: santorini.id, title: 'Santorini Sunset Sailing', slug: 'santorini-sunset-sailing', description: 'A 4-day escape to the Cyclades. Sail the caldera, swim in volcanic hot springs, and watch the legendary Oia sunset from a private catamaran.', category: 'Luxury', price: 2499, durationDays: 4, location: 'Santorini, Greece', imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=600', galleryUrls: ['https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1200'], capacity: 8, featured: 1 },
    { destinationId: patagonia.id, title: 'Patagonia Wilderness Trek', slug: 'patagonia-wilderness-trek', description: 'An 8-day adventure trekking the Torres del Paine circuit, camping under glaciers, and spotting Andean wildlife with expert mountain guides.', category: 'Adventure', price: 3299, durationDays: 8, location: 'Torres del Paine, Argentina', imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600', galleryUrls: ['https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200'], capacity: 10, featured: 1 },
    { destinationId: bali.id, title: 'Bali Rice Terraces & Temples', slug: 'bali-rice-terraces-temples', description: 'A 6-day cultural and beach retreat exploring Ubud\'s rice terraces, ancient water temples, and Seminyak\'s golden shores.', category: 'Family', price: 1599, durationDays: 6, location: 'Ubud & Seminyak, Bali', imageUrl: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600', galleryUrls: ['https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1200'], capacity: 14, featured: 0 },
    { destinationId: kyoto.id, title: 'Japan Cherry Blossom Budget Tour', slug: 'japan-cherry-blossom-budget', description: 'A 7-day budget-friendly spring tour chasing cherry blossoms across Kyoto and its surrounds, staying in cozy guesthouses.', category: 'Budget', price: 999, durationDays: 7, location: 'Kyoto, Japan', imageUrl: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600', galleryUrls: ['https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1200'], capacity: 20, featured: 0 },
  ]).returning()

  const [kyotoTour, santoriniTour, patagoniaTour] = insertedTours

  await db.insert(bookings).values([
    { userId: insertedUsers[0].id, tourId: kyotoTour.id, startDate: '2025-09-15', travelers: 2, totalPrice: 3798, status: 'confirmed' },
    { userId: insertedUsers[0].id, tourId: santoriniTour.id, startDate: '2024-06-10', travelers: 2, totalPrice: 4998, status: 'confirmed' },
    { userId: insertedUsers[2].id, tourId: patagoniaTour.id, startDate: '2025-11-01', travelers: 1, totalPrice: 3299, status: 'pending' },
  ])

  await db.insert(reviews).values([
    { userId: insertedUsers[0].id, tourId: santoriniTour.id, rating: 5, comment: 'Absolutely magical. The sunset sail was the highlight of our year.' },
    { userId: insertedUsers[0].id, tourId: kyotoTour.id, rating: 4, comment: 'Beautiful temples and a wonderful guide. Would recommend.' },
    { userId: insertedUsers[2].id, tourId: patagoniaTour.id, rating: 5, comment: 'Tough but unforgettable. Guides were top notch.' },
  ])

  console.log('Seed complete.')
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
