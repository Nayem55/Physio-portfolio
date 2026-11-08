import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '../hooks/revalidate'

/** Phone numbers, appointment number, address, map and FAQs. */
export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'Contact & Appointment',
  admin: {
    group: 'Website Content',
    description: 'Contact details shown in the footer, contact page and appointment buttons.',
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
          label: 'Contact details',
          fields: [
            {
              name: 'appointmentNumber',
              type: 'text',
              required: true,
              admin: { description: 'The hotline used for "Book Appointment" and "Call" buttons.' },
            },
            {
              name: 'phones',
              type: 'array',
              labels: { singular: 'Phone number', plural: 'Phone numbers' },
              fields: [{ name: 'number', type: 'text', required: true }],
            },
            { name: 'email', type: 'email' },
            {
              name: 'clinicName',
              type: 'text',
              label: 'Clinic / hospital name',
              admin: { description: 'e.g. BRB Hospitals Limited' },
            },
            { name: 'address', type: 'text', admin: { description: 'e.g. 77/A, Panthapath, Dhaka-1215' } },
            {
              name: 'affiliations',
              type: 'array',
              fields: [{ name: 'name', type: 'text', required: true }],
            },
            {
              name: 'mapQuery',
              type: 'text',
              label: 'Map location',
              admin: {
                description:
                  'What to search for on the Google map on the contact page, e.g. "BRB Hospitals Limited, Panthapath, Dhaka".',
              },
            },
          ],
        },
        {
          label: 'Appointment form',
          fields: [
            {
              name: 'notificationEmail',
              type: 'email',
              label: 'Send form requests to',
              admin: {
                description:
                  'Email address that receives new appointment requests. All requests are also saved under "Appointment requests".',
              },
            },
          ],
        },
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqs',
              type: 'array',
              label: 'Frequently asked questions',
              admin: { description: 'Shown on the contact page under "Helpful Information".' },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
