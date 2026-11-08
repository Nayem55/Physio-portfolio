import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

/**
 * Blog posts. Drafts are private; only published posts appear on the website.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog posts' },
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    defaultColumns: ['title', 'publishedAt', '_status'],
    preview: (doc) => (doc?.slug ? `/blog/${doc.slug}` : null),
  },
  defaultSort: '-publishedAt',
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  access: {
    // Visitors only ever see published posts; logged-in users see drafts too.
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 300,
      admin: {
        description: 'Short summary shown on the blog list and in search results.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'coverImageUrl',
      type: 'text',
      label: 'Cover image URL',
      admin: { description: 'Optional direct image link. It takes priority over the uploaded cover image.' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Use the + button or type "/" to add headings, lists, quotes and images.',
      },
    },
    slugField(),
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
        description: 'Set automatically when first published.',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (!value && siblingData?._status === 'published') return new Date().toISOString()
            return value
          },
        ],
      },
    },
  ],
}
