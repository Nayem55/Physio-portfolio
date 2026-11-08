import { Router } from 'express'
import { getDB } from '../config/db.js'

const router = Router()

router.get('/health', (_req, res) => res.json({ status: 'ok', database: 'mongodb' }))
router.get('/site', async (_req, res, next) => {
  try {
    const db = getDB()
    const [profile, contact, services, posts] = await Promise.all([
      db.collection('globals').findOne({ globalType: 'profile' }),
      db.collection('globals').findOne({ globalType: 'contact-info' }),
      db.collection('services').find({}).sort({ order: 1 }).toArray(),
      db.collection('posts').find({ _status: 'published' }).project({ title: 1, excerpt: 1, slug: 1, publishedAt: 1 }).sort({ publishedAt: -1 }).limit(9).toArray(),
    ])
    res.json({ profile, contact, services, posts })
  } catch (error) { next(error) }
})

router.post('/appointments', async (req, res, next) => {
  try {
    const { name, phone, service, message = '' } = req.body
    if (![name, phone, service].every((value) => typeof value === 'string' && value.trim())) return res.status(400).json({ error: 'Name, phone, and service are required.' })
    if (name.length > 100 || phone.length > 25 || message.length > 2000) return res.status(400).json({ error: 'Please shorten the submitted information.' })
    const result = await getDB().collection('appointment-requests').insertOne({ name: name.trim(), phone: phone.trim(), service: service.trim(), message: message.trim(), status: 'new', createdAt: new Date(), updatedAt: new Date() })
    res.status(201).json({ id: result.insertedId, message: 'Appointment request received.' })
  } catch (error) { next(error) }
})

export default router
