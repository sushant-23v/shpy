# Turisto

A full-stack Next.js travel booking website. Browse curated tours, book trips, and manage your bookings.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (light/dark theme)
- Neon (serverless Postgres) + Drizzle ORM
- Auth via bcryptjs + jose (JWT session cookies)

## Setup

1. **Create a Neon project** at https://neon.tech and copy the connection string.
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — your Neon connection string
   - `AUTH_SECRET` — a random 32+ char secret (e.g. `openssl rand -base64 32`)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Push the schema to your database:
   ```bash
   npm run db:push
   ```
5. Seed realistic data:
   ```bash
   npm run db:seed
   ```
6. Run the dev server:
   ```bash
   npm run dev
   ```

Open http://localhost:3000.

## Seeded Login

- Traveler: `traveler@turisto.com` / `password123`
- Admin: `admin@turisto.com` / `password123`

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run db:push` — push Drizzle schema
- `npm run db:seed` — seed database
- `npm run db:studio` — open Drizzle Studio
