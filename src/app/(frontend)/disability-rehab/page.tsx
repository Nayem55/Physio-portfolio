import { Accessibility, ArrowDown, ArrowUpRight, HeartPulse, PersonStanding } from 'lucide-react'
import type { Metadata } from 'next'

import { CtaBanner } from '@/components/sections/CtaBanner'
import { FeatureCard } from '@/components/sections/FeatureCard'
import { HeroImage } from '@/components/sections/HeroImage'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { CmsImage, fallbackImages } from '@/components/ui/CmsImage'
import { Container } from '@/components/ui/Container'
import { AccentBar, Eyebrow, Highlight, SectionHeading } from '@/components/ui/Typography'
import { asMedia, getContactInfo, getProfile } from '@/lib/cms'
import { appointmentHref, telHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Disability & Rehabilitation',
  description:
    'Person-centered disability management and rehabilitation focused on mobility, everyday independence and long-term wellbeing.',
}

const focusAreas = [
  {
    icon: PersonStanding,
    title: 'Mobility & movement',
    text: 'Supporting movement, balance and confidence in physical activity where appropriate.',
  },
  {
    icon: Accessibility,
    title: 'Everyday independence',
    text: 'Working toward meaningful daily activities and individual functional goals.',
  },
  {
    icon: HeartPulse,
    title: 'Long-term wellbeing',
    text: 'Considering sustainable rehabilitation goals and ongoing support needs over time.',
  },
]

const process = [
  { title: 'Listen & assess', text: 'Begin with the person’s concerns, functional abilities and priorities.' },
  { title: 'Set meaningful goals', text: 'Discuss realistic priorities and an approach suited to individual needs.' },
  { title: 'Follow progress', text: 'Revisit goals and adapt recommendations in response to progress.' },
]

export default async function DisabilityRehabPage() {
  const [profile, contact] = await Promise.all([getProfile(), getContactInfo()])
  const rehabPhoto = asMedia(profile.rehabPhoto)

  return (
    <>
      <PageHero
        title={
          <>
            Supporting movement. <Highlight>Building independence.</Highlight>
          </>
        }
        lede="Thoughtful rehabilitation care focused on everyday function, mobility and supporting people with disabilities."
        actions={
          <>
            <ButtonLink href={appointmentHref} trailingIcon={ArrowUpRight}>
              Discuss an Appointment
            </ButtonLink>
            <ButtonLink href="#approach" variant="outline" trailingIcon={ArrowDown}>
              Explore the Approach
            </ButtonLink>
          </>
        }
        footnote={
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {['Individual goals', 'Long-term focus'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="size-2 rounded-full bg-brand-500" />
                {t}
              </li>
            ))}
          </ul>
        }
        image={<HeroImage shape="arch" media={rehabPhoto} imageUrl={profile.rehabPhotoUrl} fallback={fallbackImages.rehab} />}
      />

      <section aria-labelledby="understanding-title" className="py-14 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow className="mb-3">Understanding rehabilitation</Eyebrow>
            <h2 id="understanding-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              Care centered on the person, not just the condition.
            </h2>
            <AccentBar className="mt-6" />
          </div>
          <div className="space-y-4 leading-relaxed text-muted lg:pt-8">
            <p>
              Disability and rehabilitation care is about more than addressing symptoms. It can involve understanding
              someone’s daily routines, physical capabilities, goals and environment.
            </p>
            <p>
              Rehabilitation is personal. It starts by understanding the goals that matter in daily life, then
              considering ways to support movement, participation and independence.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="focus-title" className="pb-14 sm:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Areas of focus"
            id="focus-title"
            title="What rehabilitation can support"
            lede="A simple overview of important rehabilitation goals. Specific treatments and eligibility should be confirmed directly with the clinician."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {focusAreas.map((area) => (
              <li key={area.title}>
                <FeatureCard {...area} iconShape="square" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="approach" aria-labelledby="approach-title" className="bg-surface py-14 sm:py-24">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow className="mb-3">A thoughtful process</Eyebrow>
              <h2 id="approach-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                A clear path, shaped around individual needs.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted lg:justify-self-end">
              A thoughtful approach begins by understanding the individual, setting meaningful goals and reviewing
              progress along the way.
            </p>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {process.map((step) => (
              <li key={step.title} className="border-t border-brand-200 pt-6">
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="bigger-picture-title" className="py-14 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-brand-50 shadow-[var(--shadow-float)]">
            <CmsImage media={rehabPhoto} imageUrl={profile.rehabPhotoUrl} fallback={fallbackImages.rehab} sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
          <div>
            <Eyebrow className="mb-3">The bigger picture</Eyebrow>
            <h2 id="bigger-picture-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              Rehabilitation that respects every journey.
            </h2>
            <p className="mt-5 leading-relaxed">
              People’s needs and goals differ. An effective rehabilitation conversation should make space for each
              person’s circumstances and what matters most to them.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ink">
              <strong className="block font-semibold">{profile.name}</strong>
              {profile.credentials && <span className="block">{profile.credentials}</span>}
              {profile.position && <span className="block">{profile.position}</span>}
            </p>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Start with a conversation."
        text={
          <>
            For appointment information, contact {contact.clinicName} at {contact.address}.
          </>
        }
        action={
          <ButtonLink href={telHref(contact.appointmentNumber)} variant="light" trailingIcon={ArrowUpRight}>
            Call {contact.appointmentNumber}
          </ButtonLink>
        }
      />
    </>
  )
}
