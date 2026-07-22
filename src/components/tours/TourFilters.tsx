'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import type { Destination } from '@/db/schema'

export function TourFilters({ destinations, categories }: { destinations: Destination[]; categories: string[] }) {
  const router = useRouter()
  const params = useSearchParams()

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    router.push(`/tours?${next.toString()}`)
  }

  return (
    <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 md:grid-cols-5">
      <Input placeholder="Search tours..." defaultValue={params.get('search') ?? ''} onChange={(e) => update('search', e.target.value)} />
      <select value={params.get('destination') ?? ''} onChange={(e) => update('destination', e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900">
        <option value="">All destinations</option>
        {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <select value={params.get('category') ?? ''} onChange={(e) => update('category', e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900">
        <option value="">All categories</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={params.get('maxPrice') ?? ''} onChange={(e) => update('maxPrice', e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900">
        <option value="">Any price</option>
        <option value="1000">Under $1,000</option>
        <option value="2000">Under $2,000</option>
        <option value="3000">Under $3,000</option>
      </select>
      <select value={params.get('sort') ?? ''} onChange={(e) => update('sort', e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900">
        <option value="">Featured</option>
        <option value="price_asc">Price: low to high</option>
        <option value="price_desc">Price: high to low</option>
        <option value="duration_asc">Shortest first</option>
      </select>
    </div>
  )
}
