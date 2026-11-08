import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

/**
 * Requests sent through the contact page form.
 * Every request is stored here, and an email notification is sent when email is configured.
 */
const notifyByEmail: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc

  const contact = await req.payload.findGlobal({ slug: 'contact-info', req })
  const to = contact?.notificationEmail || process.env.CONTACT_NOTIFICATION_EMAIL || contact?.email
  if (!to) return doc

  const lines = [
    `Name: ${doc.name}`,
    `Phone: ${doc.phone}`,
    `Service / concern: ${doc.service}`,
    `Message: ${doc.message || '—'}`,
  ]

  try {
    await req.payload.sendEmail({
      to,
      subject: `New appointment request from ${doc.name}`,
      text: `${lines.join('\n')}\n\nView all requests in the website dashboard under "Appointment requests".`,
    })
  } catch (error) {
    // The request is already saved, so a mail failure must not fail the form.
    req.payload.logger.error({ err: error, msg: 'Could not send appointment request email' })
  }

  return doc
}

export const AppointmentRequests: CollectionConfig = {
  slug: 'appointment-requests',
  labels: { singular: 'Appointment request', plural: 'Appointment requests' },
  admin: {
    useAsTitle: 'name',
    group: 'Enquiries',
    defaultColumns: ['name', 'phone', 'service', 'status', 'createdAt'],
    description: 'Requests sent from the contact page form.',
  },
  defaultSort: '-createdAt',
  access: {
    // Created only by the website's server action (which bypasses access control).
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [notifyByEmail],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'service', type: 'text', required: true, label: 'Service / concern' },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal notes',
      admin: { position: 'sidebar', description: 'Only visible in the dashboard.' },
    },
  ],
}
