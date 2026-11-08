import { Link, NavLink } from 'react-router-dom'

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/blog', 'Resources'],
  ['/contact', 'Contact'],
]

export function Layout({ children, contact }) {
  return (
    <div className="site-shell">
      <header className="header">
        <Link className="brand" to="/"><span aria-hidden="true">✦</span><span>Abdullah <strong>Shuchorit</strong></span></Link>
        <nav aria-label="Main navigation">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
        <a className="header-cta" href="/contact#appointment">Book a visit</a>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div><p className="eyebrow">PERSON-CENTRED REHABILITATION</p><h2>Move with more confidence.</h2></div>
        <div className="footer-details">
          <a href={`tel:${contact?.appointmentNumber || '10647'}`}>Appointment: {contact?.appointmentNumber || '10647'}</a>
          <span>{contact?.address || 'Dhaka, Bangladesh'}</span>
        </div>
      </footer>
    </div>
  )
}
