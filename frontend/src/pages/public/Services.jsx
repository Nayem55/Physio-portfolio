import { ServiceCard } from '../../components/common/ServiceCard'
export function Services({ services }) { return <section className="page"><p className="eyebrow">SERVICES</p><h1>Therapy for movement, function and independence.</h1><div className="service-grid all-services">{services.map((service) => <ServiceCard key={service._id || service.title} service={service} />)}</div></section> }
