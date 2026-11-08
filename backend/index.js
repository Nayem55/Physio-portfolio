import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { connectDB } from './config/db.js'
import siteRoutes from './routes/site.js'
import { seedDefaults } from './scripts/seed.js'

const app = express()
const port = Number(process.env.PORT || 1021)
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:1020'
app.use(cors({ origin: frontendURL, methods: ['GET', 'POST', 'OPTIONS'] }))
app.use(express.json({ limit: '100kb' }))
app.use('/api', siteRoutes)
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ error: 'The server could not complete that request.' }) })

try {
  await connectDB()
  await seedDefaults()
  app.listen(port, () => console.log(`Physio API listening on http://localhost:${port}`))
} catch (error) {
  console.error('Could not start the API:', error.message)
  process.exit(1)
}
