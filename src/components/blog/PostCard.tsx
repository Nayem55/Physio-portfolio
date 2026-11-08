import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { Post } from '@/payload-types'
import { asMedia } from '@/lib/cms'
import { formatDate } from '@/lib/site'

import { CmsImage, fallbackImages } from '../ui/CmsImage'

type Props = { post: Pick<Post, 'title' | 'slug' | 'excerpt' | 'coverImage' | 'coverImageUrl' | 'publishedAt'> }

/** Blog list card. The whole card is clickable via the title link's stretched overlay. */
export function PostCard({ post }: Props) {
  const href = `/blog/${post.slug}`
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] transition-shadow focus-within:shadow-[var(--shadow-float)] hover:shadow-[var(--shadow-float)]">
      <div className="relative aspect-[16/10] bg-brand-50">
        <CmsImage
          media={asMedia(post.coverImage)}
          imageUrl={post.coverImageUrl}
          fallback={{ ...fallbackImages.treatment, alt: '' }}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {post.publishedAt && (
          <time dateTime={post.publishedAt} className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            {formatDate(post.publishedAt)}
          </time>
        )}
        <h2 className="mt-2 text-xl leading-snug font-bold">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>}
        <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-700">
          Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  )
}
