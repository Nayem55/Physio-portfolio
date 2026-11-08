import { useState } from 'react'
import { submitAppointment } from '../../api/site'

export function Contact({ site }) {
  const [state, setState] = useState({ status: 'idle', message: '' })
  const { contact, services = [] } = site
  async function onSubmit(event) {
    event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); setState({ status: 'sending', message: '' })
    try { await submitAppointment(data); event.currentTarget.reset(); setState({ status: 'success', message: 'Thank you. Your appointment request has been received.' }) }
    catch (error) { setState({ status: 'error', message: error.response?.data?.error || 'We could not send your request. Please try again.' }) }
  }
  return <section className="page contact-page"><p className="eyebrow">CONTACT</p><h1>Let’s plan your next step.</h1><div className="contact-layout"><div className="prose"><h2>Book an appointment</h2><p>Call <a href={`tel:${contact.appointmentNumber}`}>{contact.appointmentNumber}</a>, or use this form and the clinic will contact you to confirm a time.</p><p><strong>{contact.clinicName}</strong><br />{contact.address}<br />{contact.email}</p></div><form id="appointment" className="appointment-form" onSubmit={onSubmit}><label>Name<input required name="name" maxLength="100" /></label><label>Phone<input required name="phone" maxLength="25" /></label><label>Service<select required name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label><label>Message<textarea name="message" rows="4" maxLength="2000" /></label>{state.message && <p className={`form-message ${state.status}`}>{state.message}</p>}<button className="button primary" disabled={state.status === 'sending'}>{state.status === 'sending' ? 'Sending…' : 'Send request'}</button></form></div></section>
}
