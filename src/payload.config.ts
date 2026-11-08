import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { AppointmentRequests } from './collections/AppointmentRequests'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { ContactInfo } from './globals/ContactInfo'
import { MediaSettings } from './globals/MediaSettings'
import { Profile } from './globals/Profile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Email is optional. Without SMTP settings, Payload logs outgoing emails to the
 * console instead, and appointment requests are still saved in the dashboard.
 */
const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM_ADDRESS || process.env.SMTP_USER || '',
      defaultFromName: process.env.SMTP_FROM_NAME || 'Abdullah Shuchorit Website',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    })
  : undefined

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Abdullah Shuchorit',
    },
    theme: 'light',
  },
  collections: [Posts, Services, Media, AppointmentRequests, Users],
  globals: [Profile, ContactInfo, MediaSettings],
  editor: lexicalEditor(),
  email,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/physio-portfolio',
  }),
  sharp,
  plugins: [],
})
