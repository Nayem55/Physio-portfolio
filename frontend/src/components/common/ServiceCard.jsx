export function ServiceCard({ service }) {
  return <article className="service-card"><span className="service-number">{String(service.order || 0).padStart(2, '0')}</span><h3>{service.title}</h3><p>{service.summary}</p><span aria-hidden="true">↗</span></article>
}
