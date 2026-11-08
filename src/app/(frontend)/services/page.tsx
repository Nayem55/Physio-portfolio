import { ArrowUpRight, CalendarDays, ShieldCheck, Sprout, Target, Zap } from 'lucide-react'
import type { Metadata } from 'next'

import { CtaBanner } from '@/components/sections/CtaBanner'
import { HeroImage } from '@/components/sections/HeroImage'
import { PageHero } from '@/components/sections/PageHero'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { SplitStatement } from '@/components/sections/SplitStatement'
import { ButtonLink } from '@/components/ui/Button'
import { fallbackImages } from '@/components/ui/CmsImage'
import { Container } from '@/components/ui/Container'
import { IconBadge } from '@/components/ui/IconBadge'
import { Highlight, SectionHeading } from '@/components/ui/Typography'
import { asMedia, getProfile, getServices } from '@/lib/cms'
import { appointmentHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Musculoskeletal, neurological, sports, post-surgical and disability physiotherapy services in Dhaka.',
}

const steps = [
  { title: 'Assess', text: 'Understand your condition, concerns and goals.' },
  { title: 'Plan', text: 'Design a personalized rehabilitation program for your needs.' },
  { title: 'Treat', text: 'Receive evidence-based physiotherapy and guided rehabilitation.' },
  { title: 'Progress', text: 'Review, adapt and work toward your functional goals.' },
]

const outcomes = [
  { icon: Zap, text: 'Reduced pain and improved movement' },
  { icon: Target, text: 'Greater functional independence' },
  { icon: ShieldCheck, text: 'Safer return to daily, work or sports activities' },
  { icon: Sprout, text: 'Better long-term quality of life' },
]

export default async function ServicesPage() {
  const [profile, services] = await Promise.all([getProfile(), getServices()])

  return (
    <>
      <PageHero
        title={
          <>
            Comprehensive Physiotherapy Services for Mobility, Recovery and <Highlight>Independence.</Highlight>
          </>
        }
        lede="Evidence-based, person-centered physiotherapy care to reduce pain, restore function, improve mobility and support long-term quality of life."
        actions={
          <>
            <ButtonLink href={appointmentHref} icon={CalendarDays}>
              Book Appointment
            </ButtonLink>
            <ButtonLink href="#services" variant="outline">
              Explore All Services
            </ButtonLink>
          </>
        }
        image={
          <HeroImage shape="swoosh" media={asMedia(profile.treatmentPhoto)} imageUrl={profile.treatmentPhotoUrl} fallback={fallbackImages.treatment} />
        }
      />

      <section id="services" aria-labelledby="services-title" className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our services"
            id="services-title"
            title="Specialized Physiotherapy Services"
            lede="A focused range of rehabilitation and physiotherapy services to address different needs, from pain relief and recovery to long-term functional independence."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.id}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="process-title" className="bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The treatment process"
            id="process-title"
            title="A Clear and Personalized Care Process"
            lede="A simple, structured approach to understand your needs, plan the right care and help you achieve meaningful progress."
          />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-100 font-display font-bold text-brand-700"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-1.5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    {i < steps.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-brand-200 lg:block" />}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <SplitStatement eyebrow="The outcomes we aim for" title="Meaningful Improvement in Everyday Life">
        <ul className="space-y-4">
          {outcomes.map(({ icon, text }) => (
            <li key={text} className="flex items-center gap-5">
              <IconBadge icon={icon} shape="square" />
              <span className="font-medium text-ink">{text}</span>
            </li>
          ))}
        </ul>
      </SplitStatement>

      <CtaBanner
        title="Start Your Rehabilitation Journey."
        text="Book an appointment or get in touch to discuss your needs and find the right physiotherapy care for you."
        action={
          <ButtonLink href={appointmentHref} variant="light" icon={CalendarDays} trailingIcon={ArrowUpRight} className="text-brand-700">
            Book Appointment
          </ButtonLink>
        }
      />
    </>
  )
}
