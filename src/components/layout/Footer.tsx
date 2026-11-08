import { Building2, CalendarDays, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { getContactInfo, getProfile } from '@/lib/cms'
import { telHref } from '@/lib/site'

import { Container } from '../ui/Container'

function Item({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-white/80" />
      <span>{children}</span>
    </li>
  )
}

const linkClass = 'rounded-sm underline-offset-4 hover:text-white hover:underline'

export async function Footer() {
  const [profile, contact] = await Promise.all([getProfile(), getContactInfo()])
  const year = new Date().getFullYear()

  return (
    <footer className="bg-footer text-sm text-white/80">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-footer-line">
          <section aria-labelledby="footer-about" className="md:pr-10">
            <h2 id="footer-about" className="mb-4 font-display text-base font-semibold text-white">
              {profile.name}
            </h2>
            <p className="space-y-1 leading-relaxed">
              <span className="block">{profile.title}</span>
              {profile.credentials && <span className="block">{profile.credentials}</span>}
              {profile.specialty && <span className="block">{profile.specialty}</span>}
            </p>
          </section>

          <section aria-labelledby="footer-contact" className="md:px-10">
            <h2 id="footer-contact" className="mb-4 font-display text-base font-semibold text-white">
              Contact &amp; Appointment
            </h2>
            <ul className="space-y-2.5">
              {contact.phones?.map(({ number, id }) => (
                <Item key={id ?? number} icon={Phone}>
                  <a href={telHref(number)} className={linkClass}>
                    {number}
                  </a>
                </Item>
              ))}
              {contact.email && (
                <Item icon={Mail}>
                  <a href={`mailto:${contact.email}`} className={`${linkClass} break-all`}>
                    {contact.email}
                  </a>
                </Item>
              )}
              <Item icon={CalendarDays}>
                For Appointment:{' '}
                <a href={telHref(contact.appointmentNumber)} className={`${linkClass} font-semibold text-white`}>
                  {contact.appointmentNumber}
                </a>
              </Item>
            </ul>
          </section>

          <section aria-labelledby="footer-location" className="md:pl-10">
            <h2 id="footer-location" className="mb-4 font-display text-base font-semibold text-white">
              Location &amp; Affiliation
            </h2>
            <ul className="space-y-2.5">
              {contact.address && <Item icon={MapPin}>{contact.address}</Item>}
              {contact.affiliations?.map(({ name, id }) => (
                <Item key={id ?? name} icon={Building2}>
                  {name}
                </Item>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 border-t border-footer-line pt-6 text-xs text-white/70">
          © {year} {profile.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
