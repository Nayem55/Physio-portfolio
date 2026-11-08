import Image from 'next/image'

import type { Media } from '@/payload-types'
import { cn } from '@/lib/site'

type Props = {
  /** Image uploaded in the dashboard (may be missing). */
  media: Media | null
  /** Optional public image URL pasted in the dashboard. */
  imageUrl?: string | null
  /** Used when no image has been uploaded yet. */
  fallback: { src: string; alt: string }
  sizes: string
  className?: string
  priority?: boolean
}

/**
 * Fills its (relatively positioned) parent with an image from the CMS,
 * respecting the focal point the editor chose in the dashboard.
 */
export function CmsImage({ media, imageUrl, fallback, sizes, className, priority }: Props) {
  const uploadedURL = media?.url
  // Payload returns a fully qualified local URL when `serverURL` is configured.
  // Keep same-origin uploads as paths so Next treats them as local images rather
  // than making an optimizer request back to localhost.
  const localSrc = uploadedURL?.startsWith(process.env.NEXT_PUBLIC_SERVER_URL || '__no-local-server-url__')
    ? new URL(uploadedURL).pathname
    : uploadedURL || fallback.src
  const src = imageUrl?.trim() || localSrc
  const alt = media?.alt || fallback.alt
  const position =
    media?.focalX != null && media?.focalY != null ? `${media.focalX}% ${media.focalY}%` : 'center'

  if (/^https?:\/\//i.test(src)) {
    return <img src={src} alt={alt} className={cn('absolute inset-0 size-full object-cover', className)} style={{ objectPosition: position }} />
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover', className)}
      style={{ objectPosition: position }}
    />
  )
}

export const fallbackImages = {
  portrait: { src: '/images/portrait.jpg', alt: 'Portrait of Abdullah Shuchorit in clinical scrubs' },
  treatment: {
    src: '/images/treatment.jpg',
    alt: 'Physiotherapist guiding a patient through a resistance-band shoulder exercise',
  },
  rehab: {
    src: '/images/wheelchair.jpg',
    alt: 'Physiotherapist kneeling to assess the leg of a patient using a wheelchair',
  },
}
