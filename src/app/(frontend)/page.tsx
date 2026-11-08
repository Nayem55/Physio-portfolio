import { Accessibility, CalendarDays, GraduationCap, HandHeart, Phone, PersonStanding } from 'lucide-react'

import { CtaBanner } from '@/components/sections/CtaBanner'
import { HeroImage } from '@/components/sections/HeroImage'
import { PageHero } from '@/components/sections/PageHero'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { SplitStatement } from '@/components/sections/SplitStatement'
import { ButtonLink } from '@/components/ui/Button'
import { CmsImage, fallbackImages } from '@/components/ui/CmsImage'
import { Container } from '@/components/ui/Container'
import { Eyebrow, Highlight, SectionHeading } from '@/components/ui/Typography'
import { asMedia, getContactInfo, getHomeServices, getProfile } from '@/lib/cms'
import { appointmentHref, telHref } from '@/lib/site'

const highlights = [
  { icon: Accessibility, label: 'Disability Management' },
  { icon: PersonStanding, label: 'Functional Rehabilitation' },
  { icon: HandHeart, label: 'Mobility & Independence' },
  { icon: GraduationCap, label: 'Evidence-Based Physiotherapy' },
]

export default async function HomePage() {
  const [profile, contact, services] = await Promise.all([getProfile(), getContactInfo(), getHomeServices()])

  return (
    <>
      <PageHero
        title={
          <>
            Restoring Movement, <br className="hidden sm:block" />
            Improving <Highlight>Independence.</Highlight>
          </>
        }
        lede="Specialized physiotherapy for mobility, functional recovery and long-term disability management."
        actions={
          <>
            <ButtonLink href={appointmentHref} icon={CalendarDays}>
              Book Appointment
            </ButtonLink>
            <ButtonLink href="/services" variant="outline">
              Explore Services
            </ButtonLink>
          </>
        }
        image={
          <HeroImage shape="swoosh" media={asMedia(profile.treatmentPhoto)} imageUrl={profile.treatmentPhotoUrl} fallback={fallbackImages.treatment} />
        }
      />

      {/* Highlights strip */}
      <section aria-label="Areas of expertise" className="border-b border-line/60 bg-white">
        <Container>
          <ul className="grid grid-cols-2 gap-y-6 py-8 lg:grid-cols-4 lg:divide-x lg:divide-line">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center justify-center gap-3 px-3 lg:px-6">
                <Icon aria-hidden strokeWidth={1.75} className="size-9 shrink-0 text-brand-600 sm:size-10" />
                <span className="max-w-[9rem] text-sm leading-snug font-semibold text-ink sm:text-[0.95rem]">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* About */}
      <section aria-labelledby="home-about" className="py-14 sm:py-20">
        <Container className="grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_1fr] lg:gap-16">
          <div className="relative mx-auto aspect-[10/9] w-full max-w-sm overflow-hidden rounded-3xl bg-brand-50 shadow-[var(--shadow-float)] md:max-w-none">
            <CmsImage
              media={asMedia(profile.portrait)}
              imageUrl={profile.portraitUrl}
              fallback={fallbackImages.portrait}
              sizes="(min-width: 768px) 400px, 100vw"
            />
            <div aria-hidden className="absolute -right-10 -bottom-10 size-40 rounded-full border-[14px] border-brand-300/80" />
          </div>
          <div>
            <Eyebrow className="mb-3">About</Eyebrow>
            <h2 id="home-about" className="text-3xl font-bold tracking-tight sm:text-4xl">
              {profile.name}
            </h2>
            {profile.credentials && <p className="mt-2 text-lg text-ink">{profile.credentials}</p>}
            {profile.specialty && <p className="mt-3 italic text-ink">{profile.specialty}</p>}
            {profile.position && <p className="mt-4 text-lg font-semibold text-ink">{profile.position}</p>}
            <p className="mt-5 max-w-xl leading-relaxed">{profile.bio}</p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section aria-labelledby="home-services" className="pb-14 sm:pb-20">
        <Container>
          <SectionHeading
            eyebrow="Services"
            id="home-services"
            title="Key Areas of Care"
            lede="Focused physiotherapy services to support movement, recovery and long-term independence."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <li key={service.id}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <SplitStatement
        tinted
        eyebrow="Care philosophy"
        title="Person-centered rehabilitation for meaningful independence."
      >
        <p className="max-w-md leading-relaxed lg:mt-8">
          Rehabilitation is personal. I focus on understanding each individual’s goals, needs and daily life, and
          provide a thoughtful, goal-oriented approach to restore function, build confidence and support long-term
          independence.
        </p>
      </SplitStatement>

      <CtaBanner
        eyebrow="Appointment"
        title="Book a Consultation"
        text="Get expert physiotherapy care for your mobility, rehabilitation or disability-related concerns."
        action={
          <ButtonLink href={telHref(contact.appointmentNumber)} variant="light" icon={Phone} className="px-7 py-3 text-base">
            For Appointment: {contact.appointmentNumber}
          </ButtonLink>
        }
      />
    </>
  )
}
