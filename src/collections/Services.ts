import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { iconOptions } from '../lib/icons'

/** Services shown on the Services page, the home page and in the contact form. */
export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Website Content',
    defaultColumns: ['title', 'showOnHome', 'order'],
    description: 'Services appear on the Services page and as choices in the appointment form.',
  },
  defaultSort: 'order',
  access: {
    read: () => true,
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
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One or two short sentences.' },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'activity',
      options: iconOptions,
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      label: 'Show on home page',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'The home page shows up to three of these.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 10,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers are listed first.',
      },
    },
  ],
}
