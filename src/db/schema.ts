import { pgTable, serial, text, integer, timestamp, pgEnum, doublePrecision, date } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const roleEnum = pgEnum('role', ['traveler', 'admin'])
export const bookingStatusEnum = pgEnum('booking_status', ['pending', 'confirmed', 'cancelled'])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: roleEnum('role').notNull().default('traveler'),
  bio: text('bio'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const destinations = pgTable('destinations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  country: text('country').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const tours = pgTable('tours', {
  id: serial('id').primaryKey(),
  destinationId: integer('destination_id').notNull().references(() => destinations.id),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  price: doublePrecision('price').notNull(),
  durationDays: integer('duration_days').notNull(),
  location: text('location').notNull(),
  imageUrl: text('image_url').notNull(),
  galleryUrls: text('gallery_urls').array().notNull().default([]),
  capacity: integer('capacity').notNull().default(12),
  featured: integer('featured').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  tourId: integer('tour_id').notNull().references(() => tours.id),
  startDate: date('start_date').notNull(),
  travelers: integer('travelers').notNull().default(1),
  totalPrice: doublePrecision('total_price').notNull(),
  status: bookingStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  tourId: integer('tour_id').notNull().references(() => tours.id),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  reviews: many(reviews),
}))

export const destinationsRelations = relations(destinations, ({ many }) => ({
  tours: many(tours),
}))

export const toursRelations = relations(tours, ({ one, many }) => ({
  destination: one(destinations, { fields: [tours.destinationId], references: [destinations.id] }),
  bookings: many(bookings),
  reviews: many(reviews),
}))

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  tour: one(tours, { fields: [bookings.tourId], references: [tours.id] }),
}))

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  tour: one(tours, { fields: [reviews.tourId], references: [tours.id] }),
}))

export type User = typeof users.$inferSelect
export type Destination = typeof destinations.$inferSelect
export type Tour = typeof tours.$inferSelect
export type Booking = typeof bookings.$inferSelect
export type Review = typeof reviews.$inferSelect
export type ContactMessage = typeof contactMessages.$inferSelect
