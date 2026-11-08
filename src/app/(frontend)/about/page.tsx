import { ArrowUpRight, GraduationCap, Heart, Layers, Target, User } from 'lucide-react'
import type { Metadata } from 'next'

import { CtaBanner } from '@/components/sections/CtaBanner'
import { FeatureCard } from '@/components/sections/FeatureCard'
import { HeroImage } from '@/components/sections/HeroImage'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { CmsImage, fallbackImages } from '@/components/ui/CmsImage'
import { Container } from '@/components/ui/Container'
import { IconBadge } from '@/components/ui/IconBadge'
import { AccentBar, Eyebrow } from '@/components/ui/Typography'
import { asMedia, getContactInfo, getProfile } from '@/lib/cms'
import { appointmentHref, telHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, qualifications and approach to care of clinical physiotherapist Abdullah Shuchorit.',
}

const principles = [
  { icon: User, title: 'Person-Centered Care', text: 'Understanding individual goals, needs and daily life priorities.' },
  {
    icon: Target,
    title: 'Functional Independence',
    text: 'Focusing on mobility, function and greater independence in everyday activities.',
  },
  {
    icon: Layers,
    title: 'Evidence-Based Practice',
    text: 'Using clinically proven physiotherapy approaches for safe and effective care.',
  },
  {
    icon: Heart,
    title: 'Better Quality of Life',
    text: 'Supporting meaningful participation, confidence and overall well-being.',
  },
]

/** Split a textarea into paragraphs on blank lines. */
function paragraphs(text: string | null | undefined) {
  return (text ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
}

export default async function AboutPage() {
  const [profile, contact] = await Promise.all([getProfile(), getContactInfo()])

  return (
    <>
      <PageHero
        eyebrow="About me"
        title="About Me"
        lede={profile.intro || profile.bio}
        actions={
          <>
            <ButtonLink href={appointmentHref} trailingIcon={ArrowUpRight}>
              Book Appointment
            </ButtonLink>
            <ButtonLink href="/services" variant="outline">
              Explore Services
            </ButtonLink>
          </>
        }
        image={
          <HeroImage
            shape="framed"
            aspect="aspect-[20/21]"
            media={asMedia(profile.portrait)}
            imageUrl={profile.portraitUrl}
            fallback={fallbackImages.portrait}
          />
        }
      />

      {/* Profile + qualifications */}
      <section aria-labelledby="profile-name" className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-0 lg:divide-x lg:divide-line">
          <div className="lg:pr-12">
            <Eyebrow className="mb-3">My profile</Eyebrow>
            <h2 id="profile-name" className="text-3xl font-bold tracking-tight sm:text-4xl">
              {profile.name}
            </h2>
            {profile.credentials && <p className="mt-2 text-lg text-ink">{profile.credentials}</p>}
            {profile.specialty && <p className="mt-2 italic text-ink">{profile.specialty}</p>}
            {profile.position && <p className="mt-1 font-semibold italic text-ink">{profile.position}</p>}
            <AccentBar className="my-6" />
            <p className="max-w-lg leading-relaxed">{profile.bio}</p>
          </div>

          {profile.qualifications && profile.qualifications.length > 0 && (
            <div className="lg:pl-12">
              <h2 className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                Qualifications
              </h2>
              <ul className="space-y-4">
                {profile.qualifications.map((q) => (
                  <li key={q.id ?? q.degree} className="flex items-center gap-4 rounded-2xl bg-surface p-5">
                    <IconBadge icon={GraduationCap} size="lg" className="bg-brand-100/70" />
                    <div>
                      <p className="font-display text-lg font-bold text-ink">{q.degree}</p>
                      {q.description && <p className="text-sm text-body">{q.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      {/* Experience */}
      {profile.experience && (
        <section aria-labelledby="experience-title" className="pb-14 sm:pb-20">
          <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow className="mb-3">Experience &amp; approach</Eyebrow>
              <h2 id="experience-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Clinical experience with a rehabilitation-focused approach.
              </h2>
              <AccentBar className="my-6" />
              <div className="space-y-4 leading-relaxed">
                {paragraphs(profile.experience).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border-4 border-white bg-brand-50 shadow-[var(--shadow-float)]">
              <CmsImage
                media={asMedia(profile.treatmentPhoto)}
                imageUrl={profile.treatmentPhotoUrl}
                fallback={fallbackImages.treatment}
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
          </Container>
        </section>
      )}

      {/* Principles */}
      <section aria-labelledby="approach-title" className="bg-surface py-14 sm:py-20">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow className="mb-3">Care philosophy</Eyebrow>
              <h2 id="approach-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                My Approach to Care
              </h2>
            </div>
            <p className="max-w-md leading-relaxed lg:justify-self-end">
              A simple set of principles that guide my clinical practice and the care I provide to every individual.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title}>
                <FeatureCard {...p} />
              </li>
            ))}
          </ul>
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
