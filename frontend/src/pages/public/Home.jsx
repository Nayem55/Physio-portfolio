import { Link } from 'react-router-dom'
import { ServiceCard } from '../../components/common/ServiceCard'

export function Home({ site }) {
  const { profile, services = [] } = site
  return <>
    <section className="hero"><div><p className="eyebrow">CLINICAL PHYSIOTHERAPY · DHAKA</p><h1>Practical care for a <em>more independent</em> life.</h1><p className="hero-copy">{profile.intro}</p><div className="actions"><Link className="button primary" to="/contact#appointment">Request an appointment →</Link><Link className="button secondary" to="/services">Explore services</Link></div></div><div className="hero-panel"><p>YOUR CARE, YOUR GOALS</p><blockquote>“Evidence-based rehabilitation focused on the movements that matter to you.”</blockquote><span>{profile.name}<br />{profile.position}</span></div></section>
    <section className="section"><p className="eyebrow">FOCUSED SUPPORT</p><div className="section-heading"><h2>Rehabilitation built around everyday life.</h2><Link to="/services">All services →</Link></div><div className="service-grid">{services.filter((service) => service.showOnHome).slice(0, 3).map((service) => <ServiceCard key={service._id || service.title} service={service} />)}</div></section>
    <section className="statement"><div><p className="eyebrow">WHY PHYSIOTHERAPY</p><h2>Small, consistent steps can change what your body lets you do.</h2></div><ul>{['Personalised assessment and treatment plans', 'Clear goals for mobility and daily function', 'Support for disability management and recovery'].map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>
  </>
}
