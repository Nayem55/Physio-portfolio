import { ArrowUpRight, CalendarDays, Mail, MapPin, Phone, Plus, type LucideIcon } from 'lucide-react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { AppointmentForm } from '@/components/contact/AppointmentForm'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { HeroImage } from '@/components/sections/HeroImage'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { fallbackImages } from '@/components/ui/CmsImage'
import { Container } from '@/components/ui/Container'
import { IconBadge } from '@/components/ui/IconBadge'
import { Eyebrow, Highlight } from '@/components/ui/Typography'
import { asMedia, getContactInfo, getProfile, getServices } from '@/lib/cms'
import { telHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact & Appointment',
  description: 'Book a physiotherapy appointment or get in touch. Call 10647 or send a request online.',
}

function DetailRow({ icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex items-center gap-4">
      <IconBadge icon={icon} size="sm" />
      <div className="text-base text-ink sm:text-lg">{children}</div>
    </li>
  )
}

const linkClass = 'rounded-sm underline-offset-4 hover:text-brand-700 hover:underline'

export default async function ContactPage() {
  const [profile, contact, services] = await Promise.all([getProfile(), getContactInfo(), getServices()])
  const mapSrc = contact.mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`
    : null

  return (
    <>
      <PageHero
        title={
          <>
            Get in Touch &amp; <br className="hidden sm:block" />
            <Highlight>Book an Appointment.</Highlight>
          </>
        }
        lede="Reach out for an appointment or any physiotherapy-related consultation. I’m here to support your movement, recovery and long-term independence."
        actions={
          <>
            <ButtonLink href="#appointment" icon={CalendarDays}>
              Book Appointment
            </ButtonLink>
            <ButtonLink href="#faq" variant="outline">
              Ask a Question
            </ButtonLink>
          </>
        }
        image={<HeroImage shape="framed" media={asMedia(profile.treatmentPhoto)} imageUrl={profile.treatmentPhotoUrl} fallback={fallbackImages.treatment} />}
      />

      {/* Details + form */}
      <section aria-labelledby="connect-title" className="py-14 sm:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow className="mb-3">Contact details</Eyebrow>
            <h2 id="connect-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let’s Connect
            </h2>
            <p className="mt-4 max-w-md leading-relaxed">
              Use the details below to book an appointment, ask a question or get more information about
              physiotherapy care.
            </p>
            <ul className="mt-8 space-y-5">
              <DetailRow icon={CalendarDays}>
                <span className="flex flex-wrap items-center gap-3">
                  For Appointment:
                  <a
                    href={telHref(contact.appointmentNumber)}
                    className="rounded-md bg-brand-600 px-3 py-0.5 text-lg font-bold text-white hover:bg-brand-700"
                  >
                    {contact.appointmentNumber}
                  </a>
                </span>
              </DetailRow>
              {contact.phones && contact.phones.length > 0 && (
                <DetailRow icon={Phone}>
                  {contact.phones.map(({ number, id }, i) => (
                    <span key={id ?? number}>
                      {i > 0 && ', '}
                      <a href={telHref(number)} className={linkClass}>
                        {number}
                      </a>
                    </span>
                  ))}
                </DetailRow>
              )}
              {contact.email && (
                <DetailRow icon={Mail}>
                  <a href={`mailto:${contact.email}`} className={`${linkClass} break-all`}>
                    {contact.email}
                  </a>
                </DetailRow>
              )}
              {contact.address && (
                <DetailRow icon={MapPin}>
                  {contact.clinicName && <strong className="block font-semibold">{contact.clinicName}</strong>}
                  {contact.address}
                </DetailRow>
              )}
            </ul>
          </div>

          <AppointmentForm services={services.map((s) => s.title)} />
        </Container>
      </section>

      {/* Location */}
      {mapSrc && (
        <section aria-labelledby="location-title" className="pb-14 sm:pb-20">
          <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
            <div>
              <Eyebrow className="mb-3">Location</Eyebrow>
              <h2 id="location-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Find Us Easily
              </h2>
              <p className="mt-4 max-w-md leading-relaxed">
                Visit us at {contact.clinicName}, conveniently located at Panthapath, Dhaka.
              </p>
              <ul className="mt-6">
                <DetailRow icon={MapPin}>
                  {contact.clinicName && <strong className="block font-semibold">{contact.clinicName}</strong>}
                  <span className="text-base">{contact.address}</span>
                </DetailRow>
              </ul>
            </div>
            <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-card)]">
              <iframe
                title={`Map showing ${contact.clinicName ?? 'our location'}`}
                src={mapSrc}
                className="block h-72 w-full sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {contact.faqs && contact.faqs.length > 0 && (
        <section id="faq" aria-labelledby="faq-title" className="bg-surface py-14 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
            <div>
              <Eyebrow className="mb-3">Visit information</Eyebrow>
              <h2 id="faq-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Helpful Information for <Highlight>Your Visit</Highlight>
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed">
                A few quick answers to help you plan your appointment and visit with confidence.
              </p>
            </div>
            <div className="space-y-3">
              {contact.faqs.map((faq) => (
                <details
                  key={faq.id ?? faq.question}
                  className="group rounded-xl border border-line bg-white shadow-[var(--shadow-card)] open:border-brand-200"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <Plus aria-hidden className="size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner
        title="Start with a conversation."
        text={
          <>
            For appointment information, call <strong className="text-white">{contact.appointmentNumber}</strong> or
            reach out using the contact details above.
          </>
        }
        action={
          <ButtonLink href="#appointment" variant="light" trailingIcon={ArrowUpRight}>
            Book Appointment
          </ButtonLink>
        }
      />
    </>
  )
}
