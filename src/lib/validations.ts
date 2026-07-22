import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signInSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().max(500, 'Bio is too long').optional(),
})

export const bookingSchema = z.object({
  tourId: z.coerce.number().int().positive(),
  startDate: z.string().min(1, 'Select a start date'),
  travelers: z.coerce.number().int().min(1, 'At least 1 traveler').max(20, 'Too many travelers'),
})

export const reviewSchema = z.object({
  tourId: z.coerce.number().int().positive(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(5, 'Please write a few words').max(1000, 'Comment is too long'),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
