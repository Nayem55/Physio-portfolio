import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { PostCard } from '@/components/blog/PostCard'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/Typography'
import { getPosts } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on physiotherapy, rehabilitation, disability management and staying active.',
}

type Props = { searchParams: Promise<{ page?: string }> }

export default async function BlogPage({ searchParams }: Props) {
  const page = Math.max(1, Number((await searchParams).page) || 1)
  const { docs: posts, totalPages, hasNextPage, hasPrevPage } = await getPosts(page)

  return (
    <>
      <section className="bg-gradient-to-br from-white via-surface to-brand-50/60">
        <Container className="py-14 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow="Blog"
            title="Notes on Movement & Recovery"
            lede="Practical guidance on physiotherapy, rehabilitation and living well with a disability."
          />
        </Container>
      </section>

      <section aria-label="Articles" className="py-14 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="rounded-2xl bg-surface p-8 text-center">No articles have been published yet. Please check back soon.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex items-center justify-between gap-4">
              {hasPrevPage ? (
                <Link href={`/blog?page=${page - 1}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-700 hover:underline">
                  <ArrowLeft aria-hidden className="size-4" /> Newer articles
                </Link>
              ) : (
                <span />
              )}
              <span className="text-sm text-muted">
                Page {page} of {totalPages}
              </span>
              {hasNextPage ? (
                <Link href={`/blog?page=${page + 1}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-700 hover:underline">
                  Older articles <ArrowRight aria-hidden className="size-4" />
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </Container>
      </section>
    </>
  )
}
