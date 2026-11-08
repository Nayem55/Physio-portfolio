import type { ReactNode } from 'react'

import { cn } from '@/lib/site'

import { Container } from '../ui/Container'
import { AccentBar, Eyebrow } from '../ui/Typography'

/**
 * Heading on the left, supporting content on the right, separated by a thin
 * vertical line on large screens ("Care philosophy", "Outcomes" sections).
 */
export function SplitStatement({
  eyebrow,
  title,
  children,
  className,
  tinted = false,
}: {
  eyebrow: string
  title: ReactNode
  children: ReactNode
  className?: string
  tinted?: boolean
}) {
  return (
    <section className={cn('py-14 sm:py-20', tinted && 'bg-surface', className)}>
      <Container className="grid gap-8 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-line">
        <div className="lg:pr-12">
          <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <AccentBar className="mt-6" />
        </div>
        <div className="lg:pl-12">{children}</div>
      </Container>
    </section>
  )
}
