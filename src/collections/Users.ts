import type { CollectionConfig } from 'payload'

/** Dashboard logins. Only logged-in users can see or manage other users. */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Settings',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
