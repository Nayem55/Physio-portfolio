import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/blog/RichText'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { ButtonLink } from '@/components/ui/Button'
import { CmsImage } from '@/components/ui/CmsImage'
import { Container } from '@/components/ui/Container'
import { asMedia, getAllPostSlugs, getPostBySlug, getProfile } from '@/lib/cms'
import { appointmentHref, formatDate } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getAllPostSlugs()
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug)
  if (!post) return {}
  const image = asMedia(post.coverImage)
  const imageUrl = post.coverImageUrl || image?.url
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.publishedAt ?? undefined,
      images: imageUrl ? [{ url: imageUrl, alt: image?.alt || post.title }] : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const [post, profile] = await Promise.all([getPostBySlug(slug), getProfile()])
  if (!post) notFound()

  const cover = asMedia(post.coverImage)

  return (
    <>
      <article>
        <header className="bg-gradient-to-br from-white via-surface to-brand-50/60">
          <Container className="max-w-3xl py-12 sm:py-16">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
            >
              <ArrowLeft aria-hidden className="size-4" /> All articles
            </Link>
            <h1 className="mt-4 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-sm text-muted">
              By <span className="font-semibold text-ink">{profile.name}</span>
              {post.publishedAt && (
                <>
                  {' · '}
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </>
              )}
            </p>
          </Container>
        </header>

        <Container className="max-w-3xl py-10 sm:py-14">
          {(cover || post.coverImageUrl) && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-brand-50 shadow-[var(--shadow-card)]">
              <CmsImage media={cover} imageUrl={post.coverImageUrl} fallback={{ src: cover?.url || '', alt: cover?.alt || post.title }} sizes="(min-width: 768px) 720px, 100vw" priority />
            </div>
          )}
          <RichText data={post.content} />
        </Container>
      </article>

      <CtaBanner
        title="Have a question about your recovery?"
        text="Book an appointment to discuss your needs and find the right physiotherapy care for you."
        action={
          <ButtonLink href={appointmentHref} variant="light" trailingIcon={ArrowUpRight}>
            Book Appointment
          </ButtonLink>
        }
      />
    </>
  )
}
