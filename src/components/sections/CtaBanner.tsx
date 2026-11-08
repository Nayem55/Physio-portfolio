import type { ReactNode } from 'react'

import { Container } from '../ui/Container'

type Props = {
  eyebrow?: string
  title: ReactNode
  text: ReactNode
  action: ReactNode
}

/** Green call-to-action banner shown above the footer. */
export function CtaBanner({ eyebrow = 'Appointment & Enquiries', title, text, action }: Props) {
  return (
    <section aria-labelledby="cta-title" className="py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 px-6 py-10 text-white shadow-[var(--shadow-float)] sm:px-12 sm:py-12">
          <div aria-hidden className="absolute -top-24 -right-16 size-72 rounded-full bg-white/5" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">{eyebrow}</p>
              <h2 id="cta-title" className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-3 leading-relaxed text-white/90">{text}</p>
            </div>
            <div className="shrink-0">{action}</div>
          </div>
        </div>
      </Container>
    </section>
  )
}
