import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/site'

const sizes = {
  sm: 'size-10 [&>svg]:size-5',
  md: 'size-12 [&>svg]:size-6',
  lg: 'size-14 [&>svg]:size-7',
}

/** Icon in a soft green circle (or rounded square). Decorative: hidden from screen readers. */
export function IconBadge({
  icon: Icon,
  size = 'md',
  shape = 'circle',
  className,
}: {
  icon: LucideIcon
  size?: keyof typeof sizes
  shape?: 'circle' | 'square'
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center bg-brand-50 text-brand-600',
        shape === 'circle' ? 'rounded-full' : 'rounded-lg',
        sizes[size],
        className,
      )}
    >
      <Icon strokeWidth={1.75} />
    </span>
  )
}
