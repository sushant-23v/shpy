import { cn } from '@/lib/utils'

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn('py-14 md:py-20', className)} {...props} />
}
