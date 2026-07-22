import Link from 'next/link'
import { Button } from './Button'

export function EmptyState({ title, message, actionLabel, actionHref }: { title: string; message: string; actionLabel?: string; actionHref?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-4 inline-block"><Button>{actionLabel}</Button></Link>
      )}
    </div>
  )
}
