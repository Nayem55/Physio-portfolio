import type { LucideIcon } from 'lucide-react'

import { IconBadge } from '../ui/IconBadge'

/** Card with an icon above a title and short text. */
export function FeatureCard({
  icon,
  title,
  text,
  iconShape = 'circle',
}: {
  icon: LucideIcon
  title: string
  text: string
  iconShape?: 'circle' | 'square'
}) {
  return (
    <article className="h-full rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
      <IconBadge icon={icon} shape={iconShape} />
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-body">{text}</p>
    </article>
  )
}
