import type { Media } from '@/payload-types'
import { cn } from '@/lib/site'

import { CmsImage } from '../ui/CmsImage'

type Props = {
  media: Media | null
  imageUrl?: string | null
  fallback: { src: string; alt: string }
  /**
   * - `swoosh`: large sweeping curve on the bottom-left with a green band (Home, Services)
   * - `framed`: rounded card with white border and a soft green circle behind (About, Contact)
   * - `arch`: arched top (Disability & Rehab)
   */
  shape: 'swoosh' | 'framed' | 'arch'
  aspect?: string
}

const sizes = '(min-width: 1024px) 560px, 100vw'

export function HeroImage({ media, imageUrl, fallback, shape, aspect }: Props) {
  if (shape === 'swoosh') {
    const radius = 'rounded-[2rem] [border-bottom-left-radius:62%_78%]'
    return (
      <div className={cn('relative mx-auto w-full max-w-xl', aspect ?? 'aspect-[4/3]')}>
        {/* Green band peeking out along the curve */}
        <div aria-hidden className={cn('absolute inset-0 translate-x-2 translate-y-3 bg-gradient-to-br from-brand-200 via-brand-300 to-brand-500', radius)} />
        <div className={cn('relative h-full overflow-hidden bg-brand-50 shadow-[var(--shadow-float)]', radius)}>
          <CmsImage media={media} imageUrl={imageUrl} fallback={fallback} sizes={sizes} priority />
        </div>
      </div>
    )
  }

  if (shape === 'arch') {
    return (
      <div className={cn('relative mx-auto w-full max-w-lg', aspect ?? 'aspect-[8/7]')}>
        <div className="relative h-full overflow-hidden rounded-t-[50%_40%] rounded-b-3xl border-4 border-white bg-brand-50 shadow-[var(--shadow-float)]">
          <div aria-hidden className="absolute bottom-0 left-0 z-10 h-10 w-2/5 bg-gradient-to-r from-brand-300 to-brand-200/0 [clip-path:polygon(0_30%,100%_100%,0_100%)]" />
          <CmsImage media={media} imageUrl={imageUrl} fallback={fallback} sizes="(min-width: 1024px) 450px, 100vw" priority />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative mx-auto w-full max-w-lg', aspect ?? 'aspect-[4/3]')}>
      <div aria-hidden className="absolute -right-16 top-1/4 size-64 rounded-full bg-gradient-to-br from-brand-200 to-brand-400 opacity-70 sm:size-72" />
      <div className="relative h-full overflow-hidden rounded-[2rem] border-4 border-white bg-brand-50 shadow-[var(--shadow-float)]">
        <CmsImage media={media} imageUrl={imageUrl} fallback={fallback} sizes={sizes} priority />
      </div>
    </div>
  )
}
