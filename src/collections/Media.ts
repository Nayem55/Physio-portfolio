import type { CollectionConfig } from 'payload'
import path from 'path'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

/** Images used across the site and inside blog posts. */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image', plural: 'Images' },
  admin: {
    group: 'Website Content',
    description: 'Photos used on the website and in blog posts.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Image description',
      admin: {
        description:
          'Describe what is in the photo for visitors using screen readers, e.g. "Physiotherapist guiding a shoulder exercise".',
      },
    },
  ],
  upload: {
    // Keep uploaded files in the project's persistent media directory.
    // An explicit path is required after switching Payload from SQLite to MongoDB.
    staticDir: path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/*'],
  },
}
