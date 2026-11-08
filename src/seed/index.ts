/**
 * Fills an empty database with the starting content and photos.
 *
 *   npm run seed
 *
 * Safe to run more than once: it skips anything that already exists, so it
 * never overwrites changes made in the dashboard.
 */
import path from 'path'
import type { Payload } from 'payload'
import { fileURLToPath } from 'url'

import { defaultContactInfo, defaultProfile, defaultServices } from '../content/defaults'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const context = { disableRevalidate: true }

async function uploadImage(payload: Payload, file: string, alt: string) {
  const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
  if (existing.docs[0]) return existing.docs[0].id
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.resolve(dirname, 'images', file),
    context,
  })
  return doc.id
}

export async function seed(payload: Payload) {
  payload.logger.info('Seeding starter content…')

  const portrait = await uploadImage(payload, 'portrait.jpg', 'Portrait of Abdullah Shuchorit in clinical scrubs')
  const treatment = await uploadImage(
    payload,
    'treatment.jpg',
    'Physiotherapist guiding a patient through a resistance-band shoulder exercise',
  )
  const rehab = await uploadImage(
    payload,
    'wheelchair.jpg',
    'Physiotherapist kneeling to assess the leg of a patient using a wheelchair',
  )

  const profile = await payload.findGlobal({ slug: 'profile' })
  if (!profile?.name) {
    await payload.updateGlobal({
      slug: 'profile',
      data: { ...defaultProfile, portrait, treatmentPhoto: treatment, rehabPhoto: rehab },
      context,
    })
    payload.logger.info('  ✓ Profile')
  }

  const contact = await payload.findGlobal({ slug: 'contact-info' })
  if (!contact?.appointmentNumber) {
    await payload.updateGlobal({ slug: 'contact-info', data: defaultContactInfo, context })
    payload.logger.info('  ✓ Contact & appointment details')
  }

  const { totalDocs: serviceCount } = await payload.count({ collection: 'services' })
  if (serviceCount === 0) {
    for (const service of defaultServices) {
      await payload.create({ collection: 'services', data: service, context })
    }
    payload.logger.info(`  ✓ ${defaultServices.length} services`)
  }

  const { totalDocs: postCount } = await payload.count({ collection: 'posts' })
  if (postCount === 0) {
    await payload.create({
      collection: 'posts',
      context,
      data: {
        title: 'What to Expect at Your First Physiotherapy Visit',
        excerpt:
          'A first appointment is about understanding you — your concerns, your daily life and your goals. Here is how it usually goes.',
        coverImage: treatment,
        _status: 'published',
        publishedAt: new Date().toISOString(),
        content: richText([
          ['paragraph', 'Starting physiotherapy can feel uncertain. Knowing what happens at the first visit makes it easier to prepare and to get the most out of it.'],
          ['heading', 'Listening and assessment'],
          ['paragraph', 'We begin by talking about your condition, how it affects your daily activities and what you would like to achieve. A physical assessment follows, looking at movement, strength, balance and function.'],
          ['heading', 'Setting goals together'],
          ['paragraph', 'Rehabilitation works best when the goals are yours. Together we agree on realistic, meaningful goals and a plan to work toward them.'],
          ['heading', 'What to bring'],
          ['paragraph', 'Bring any medical reports, X-rays or scans, a list of your medicines, and wear comfortable clothes that let you move easily.'],
        ]),
      },
    })
    payload.logger.info('  ✓ Sample blog post')
  }

  payload.logger.info('Seed complete.')
}

/** Minimal Lexical document builder for seed content. */
function richText(blocks: Array<['paragraph' | 'heading', string]>) {
  const textNode = (text: string) => ({
    type: 'text',
    text,
    version: 1,
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
  })
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: blocks.map(([kind, text]) =>
        kind === 'heading'
          ? { type: 'heading', tag: 'h2', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(text)] }
          : { type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, textFormat: 0, children: [textNode(text)] },
      ),
    },
  }
}

// `payload run src/seed/index.ts` executes this file with Payload already configured.
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
const payload = await getPayload({ config })
await seed(payload)
process.exit(0)
