import type { ReactNode } from 'react'

import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Typography'

type Props = {
  eyebrow?: ReactNode
  title: ReactNode
  lede: ReactNode
  actions: ReactNode
  /** Extra content under the buttons. */
  footnote?: ReactNode
  image: ReactNode
}

/** Two-column page hero used at the top of every main page. */
export function PageHero({ eyebrow, title, lede, actions, footnote, image }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-surface to-brand-50/60">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-20">
        <div>
          {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
          <h1 className="text-[2.35rem] leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">{lede}</p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">{actions}</div>
          {footnote && <div className="mt-8">{footnote}</div>}
        </div>
        <div className="relative">{image}</div>
      </Container>
    </section>
  )
}
