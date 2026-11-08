import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSite } from './api/site'
import { Layout } from './components/common/Layout'
import { Loading } from './components/common/Loading'
import { Home } from './pages/public/Home'
import { About } from './pages/public/About'
import { Services } from './pages/public/Services'
import { Blog } from './pages/public/Blog'
import { Contact } from './pages/public/Contact'
import { NotFound } from './pages/public/NotFound'

export default function App() {
  const [site, setSite] = useState(null); const [error, setError] = useState('')
  useEffect(() => { getSite().then(setSite).catch(() => setError('The practice information is temporarily unavailable. Please try again shortly.')) }, [])
  if (error) return <div className="loading">{error}</div>
  if (!site) return <Loading />
  return <Layout contact={site.contact}><Routes>
    <Route path="/" element={<Home site={site} />} /><Route path="/about" element={<About profile={site.profile} />} />
    <Route path="/services" element={<Services services={site.services} />} /><Route path="/blog" element={<Blog posts={site.posts} />} />
    <Route path="/contact" element={<Contact site={site} />} /><Route path="*" element={<NotFound />} />
  </Routes></Layout>
}
