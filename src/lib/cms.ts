import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { defaultContactInfo, defaultProfile } from '@/content/defaults'
import type { ContactInfo, Media, Post, Profile, Service } from '@/payload-types'

/**
 * All website reads from the CMS go through this file, so pages never talk to
 * Payload directly. Each helper is wrapped in React `cache` to dedupe calls
 * within a single render.
 */

const payload = cache(() => getPayload({ config }))

export const getProfile = cache(async (): Promise<Profile> => {
  const doc = await (await payload()).findGlobal({ slug: 'profile', depth: 1 })
  return doc?.name ? doc : ({ ...defaultProfile, ...doc, id: doc?.id ?? 0 } as Profile)
})

export const getContactInfo = cache(async (): Promise<ContactInfo> => {
  const doc = await (await payload()).findGlobal({ slug: 'contact-info', depth: 0 })
  return doc?.appointmentNumber
    ? doc
    : ({ ...defaultContactInfo, ...doc, id: doc?.id ?? 0 } as ContactInfo)
})

export const getServices = cache(async (): Promise<Service[]> => {
  const { docs } = await (await payload()).find({
    collection: 'services',
    sort: 'order',
    limit: 100,
    depth: 0,
  })
  return docs
})

export const getHomeServices = cache(async (): Promise<Service[]> => {
  const services = await getServices()
  const featured = services.filter((s) => s.showOnHome)
  return (featured.length ? featured : services).slice(0, 3)
})

const publishedOnly = { _status: { equals: 'published' } } as const

export const getPosts = cache(async (page = 1, limit = 9) => {
  return (await payload()).find({
    collection: 'posts',
    where: publishedOnly,
    sort: '-publishedAt',
    page,
    limit,
    depth: 1,
    select: { title: true, slug: true, excerpt: true, coverImage: true, coverImageUrl: true, publishedAt: true },
  })
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const { docs } = await (await payload()).find({
    collection: 'posts',
    where: { and: [{ slug: { equals: slug } }, publishedOnly] },
    limit: 1,
    depth: 2,
  })
  return docs[0] ?? null
})

export const getAllPostSlugs = cache(async () => {
  const { docs } = await (await payload()).find({
    collection: 'posts',
    where: publishedOnly,
    limit: 1000,
    depth: 0,
    select: { slug: true, updatedAt: true },
  })
  return docs
})

/** Narrow an upload field (id or populated doc) to a usable media doc. */
export function asMedia(value: string | number | Media | null | undefined): Media | null {
  return value && typeof value === 'object' && value.url ? value : null
}
