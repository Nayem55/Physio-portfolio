import { getDB } from '../config/db.js'
import { contact, profile, services } from '../data/defaults.js'

export async function seedDefaults() {
  const db = getDB()
  await db.collection('siteSettings').updateOne({ key: 'profile' }, { $setOnInsert: { key: 'profile', value: profile } }, { upsert: true })
  await db.collection('siteSettings').updateOne({ key: 'contact' }, { $setOnInsert: { key: 'contact', value: contact } }, { upsert: true })
  if (!(await db.collection('services').countDocuments())) await db.collection('services').insertMany(services)
  for (const service of services) {
    await db.collection('services').updateOne({ title: service.title, icon: { $exists: false } }, { $set: { icon: service.icon } })
  }
  await db.collection('appointmentRequests').createIndex({ createdAt: -1 })
}
