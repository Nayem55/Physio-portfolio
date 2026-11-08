import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { cn } from '@/lib/site'

type Variant = 'primary' | 'outline' | 'light'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand-700 to-brand-500 text-white shadow-[0_8px_20px_-8px_rgb(12_104_77/0.7)] hover:from-brand-800 hover:to-brand-600',
  outline: 'border border-brand-200 bg-white text-ink hover:border-brand-400 hover:bg-brand-50',
  light: 'bg-white text-ink shadow-sm hover:bg-brand-50',
}

type Props = {
  href: string
  children: ReactNode
  variant?: Variant
  /** Icon shown before the label. */
  icon?: LucideIcon
  /** Icon shown after the label (e.g. an arrow). */
  trailingIcon?: LucideIcon
  className?: string
}

/**
 * A link styled as a button. Uses a plain <a> for tel:, mailto: and in-page
 * anchors so they never go through the client router.
 */
export function ButtonLink({ href, children, variant = 'primary', icon: Icon, trailingIcon: Trailing, className }: Props) {
  const classes = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors sm:text-[0.95rem]',
    variants[variant],
    className,
  )
  const content = (
    <>
      {Icon && <Icon aria-hidden className="size-[1.1em] shrink-0" />}
      <span>{children}</span>
      {Trailing && <Trailing aria-hidden className="size-[1em] shrink-0" />}
    </>
  )
  const isPlainLink = /^(tel:|mailto:|https?:|#)/.test(href)
  return isPlainLink ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
