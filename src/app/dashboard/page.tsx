import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { getUserBookings } from '@/lib/queries'
import { Container } from '@/components/ui/Container'
import { Card, CardBody } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { CancelBookingForm } from '@/components/dashboard/CancelBookingForm'
import { ProfileForm } from '@/components/dashboard/ProfileForm'
import { formatPrice, formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Dashboard' }

const statusStyles: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')
  const bookings = await getUserBookings(session.id)
  const now = new Date()
  const upcoming = bookings.filter((b) => new Date(b.booking.startDate) >= now && b.booking.status !== 'cancelled')
  const past = bookings.filter((b) => new Date(b.booking.startDate) < now || b.booking.status === 'cancelled')

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold md:text-3xl">Welcome, {session.name}</h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400">Manage your bookings and profile.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold">Upcoming Trips</h2>
            {upcoming.length === 0 ? (
              <div className="mt-4"><EmptyState title="No upcoming trips" message="Browse our tours and book your next adventure." actionLabel="Browse Tours" actionHref="/tours" /></div>
            ) : (
              <div className="mt-4 space-y-4">
                {upcoming.map(({ booking, tour }) => (
                  <Card key={booking.id}>
                    <CardBody className="flex items-center justify-between gap-4">
                      <div>
                        <Link href={`/tours/${tour?.slug}`} className="font-semibold hover:text-brand-600">{tour?.title}</Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(booking.startDate)} &middot; {booking.travelers} travelers &middot; {formatPrice(booking.totalPrice)}</p>
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[booking.status]}`}>{booking.status}</span>
                      </div>
                      {booking.status !== 'cancelled' && <CancelBookingForm bookingId={booking.id} />}
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold">Past & Cancelled</h2>
            {past.length === 0 ? (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No past trips yet.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {past.map(({ booking, tour }) => (
                  <Card key={booking.id}>
                    <CardBody className="flex items-center justify-between gap-4">
                      <div>
                        <Link href={`/tours/${tour?.slug}`} className="font-semibold hover:text-brand-600">{tour?.title}</Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(booking.startDate)} &middot; {booking.travelers} travelers</p>
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[booking.status]}`}>{booking.status}</span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="lg:col-span-1">
          <Card>
            <CardBody>
              <h2 className="text-lg font-semibold">Your Profile</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{session.email}</p>
              <div className="mt-4"><ProfileForm name={session.name} bio={session.bio ?? null} /></div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </Container>
  )
}
