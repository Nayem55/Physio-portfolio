import type { Service } from '@/payload-types'
import { getIcon } from '@/lib/icons'

import { IconBadge } from '../ui/IconBadge'

/** Card with an icon beside the title and a summary below (Home & Services pages). */
export function ServiceCard({ service, headingLevel = 'h3' }: { service: Pick<Service, 'title' | 'summary' | 'icon'>; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <article className="h-full rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-float)]">
      <div className="flex items-center gap-4">
        <IconBadge icon={getIcon(service.icon)} size="lg" />
        <Heading className="text-lg leading-snug font-bold">{service.title}</Heading>
      </div>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-body">{service.summary}</p>
    </article>
  )
}
