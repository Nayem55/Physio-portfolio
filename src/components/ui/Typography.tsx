import type { ReactNode } from 'react'

import { cn } from '@/lib/site'

/** Small uppercase green label above headings ("ABOUT", "SERVICES" …). */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-xs font-bold uppercase tracking-[0.2em] text-brand-600', className)}>{children}</p>
  )
}

/** Green highlighted word(s) inside a heading. */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-brand-600">{children}</span>
}

/** Short green bar used under some headings. */
export function AccentBar({ className }: { className?: string }) {
  return <span aria-hidden className={cn('block h-1 w-14 rounded-full bg-brand-500', className)} />
}

type SectionHeadingProps = {
  eyebrow?: ReactNode
  title: ReactNode
  lede?: ReactNode
  /** Heading level; defaults to h2. */
  as?: 'h1' | 'h2'
  /** Heading id, for `aria-labelledby` on the surrounding section. */
  id?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, lede, as: Tag = 'h2', id, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <Tag id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </Tag>
      {lede && <p className="mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">{lede}</p>}
    </div>
  )
}
