import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '../hooks/revalidate'

/** Who Abdullah is: name, credentials, bio, qualifications and the main photos. */
export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Profile & Bio',
  admin: {
    group: 'Website Content',
    description: 'Your name, credentials, bio and photos as shown across the website.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'Shown under your name in the header, e.g. "Clinical Physiotherapist".' },
            },
            { name: 'credentials', type: 'text', admin: { description: 'e.g. BPT (DU), MDMR (BOU)' } },
            { name: 'specialty', type: 'text' },
            {
              name: 'position',
              type: 'text',
              label: 'Current position',
              admin: { description: 'e.g. Sr. Clinical Physiotherapist – BRB Physiotherapy Center' },
            },
          ],
        },
        {
          label: 'Bio',
          fields: [
            {
              name: 'intro',
              type: 'textarea',
              label: 'Short introduction',
              admin: { description: 'One sentence shown at the top of the About page.' },
            },
            {
              name: 'bio',
              type: 'textarea',
              required: true,
              admin: { description: 'A short paragraph shown on the Home and About pages.' },
            },
            {
              name: 'experience',
              type: 'textarea',
              label: 'Experience & approach',
              admin: {
                description: 'Shown on the About page. Leave a blank line between paragraphs.',
              },
            },
            {
              name: 'qualifications',
              type: 'array',
              labels: { singular: 'Qualification', plural: 'Qualifications' },
              fields: [
                { name: 'degree', type: 'text', required: true, admin: { description: 'e.g. BPT (DU)' } },
                {
                  name: 'description',
                  type: 'text',
                  admin: { description: 'e.g. Bachelor in Physiotherapy' },
                },
              ],
            },
          ],
        },
        {
          label: 'Photos',
          fields: [
            {
              name: 'portrait',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload a portrait when no direct image URL is entered below.',
                condition: (_, siblingData) => !siblingData?.portraitUrl,
              },
            },
            {
              name: 'portraitUrl',
              type: 'text',
              label: 'Portrait image URL',
              admin: { description: 'Optional direct image link. When present, it takes priority over the uploaded image.' },
            },
            {
              name: 'treatmentPhoto',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload a treatment photo when no direct image URL is entered below.',
                condition: (_, siblingData) => !siblingData?.treatmentPhotoUrl,
              },
            },
            {
              name: 'treatmentPhotoUrl',
              type: 'text',
              label: 'Treatment photo URL',
              admin: { description: 'Optional direct image link. Paste a Cloudinary, ImgBB, or other public image URL.' },
            },
            {
              name: 'rehabPhoto',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload a rehab photo when no direct image URL is entered below.',
                condition: (_, siblingData) => !siblingData?.rehabPhotoUrl,
              },
            },
            {
              name: 'rehabPhotoUrl',
              type: 'text',
              label: 'Rehab photo URL',
              admin: { description: 'Optional direct image link. When present, it takes priority over the uploaded image.' },
            },
          ],
        },
      ],
    },
  ],
}
