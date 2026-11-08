'use client'

import { CalendarDays, CheckCircle2, ChevronDown, Send } from 'lucide-react'
import { useActionState, useEffect, useRef } from 'react'

import { submitAppointmentRequest, type FormState } from '@/app/(frontend)/contact/actions'
import { cn } from '@/lib/site'

const inputClass =
  'block w-full rounded-lg border bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  )
}

export function AppointmentForm({ services }: { services: string[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitAppointmentRequest, { status: 'idle' })
  const statusRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const startedAtRef = useRef<HTMLInputElement>(null)

  // Record when the form became usable (spam check: bots submit instantly).
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now())
  }, [])

  // Move focus to the status message so keyboard and screen-reader users hear the result.
  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
    if (state.status !== 'idle') statusRef.current?.focus()
  }, [state])

  const err = state.errors ?? {}
  const v = state.values ?? {}
  const describedBy = (key: keyof typeof err) => (err[key] ? `${key}-error` : undefined)

  return (
    <div
      id="appointment"
      className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-float)] sm:p-8"
    >
      <h2 id="appointment-title" className="mb-6 flex items-center gap-3 text-2xl font-bold">
        <CalendarDays aria-hidden className="size-8 text-brand-600" strokeWidth={1.75} />
        Request an Appointment
      </h2>

      <div
        ref={statusRef}
        tabIndex={-1}
        role={state.status === 'error' ? 'alert' : 'status'}
        className="outline-none"
      >
        {state.status === 'success' && (
          <p className="mb-5 flex items-start gap-3 rounded-lg bg-brand-50 p-4 text-sm font-medium text-brand-800">
            <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
            {state.message}
          </p>
        )}
        {state.status === 'error' && state.message && (
          <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-800">{state.message}</p>
        )}
      </div>

      <form ref={formRef} action={action} noValidate aria-labelledby="appointment-title" className="space-y-4">
        {/* Spam traps — hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

        <div>
          <label htmlFor="name" className="sr-only">
            Your name (required)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your Name *"
            defaultValue={v.name}
            aria-invalid={Boolean(err.name)}
            aria-describedby={describedBy('name')}
            className={cn(inputClass, err.name ? 'border-red-500' : 'border-line')}
          />
          <FieldError id="name-error" message={err.name} />
        </div>

        <div>
          <label htmlFor="phone" className="sr-only">
            Phone number (required)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={25}
            placeholder="Phone Number *"
            defaultValue={v.phone}
            aria-invalid={Boolean(err.phone)}
            aria-describedby={describedBy('phone')}
            className={cn(inputClass, err.phone ? 'border-red-500' : 'border-line')}
          />
          <FieldError id="phone-error" message={err.phone} />
        </div>

        <div>
          <label htmlFor="service" className="sr-only">
            Service or concern (required)
          </label>
          <div className="relative">
            <select
              id="service"
              name="service"
              required
              defaultValue={v.service ?? ''}
              aria-invalid={Boolean(err.service)}
              aria-describedby={describedBy('service')}
              className={cn(
                inputClass,
                'appearance-none pr-10 invalid:text-muted',
                err.service ? 'border-red-500' : 'border-line',
              )}
            >
              <option value="" disabled>
                Service / Concern *
              </option>
              {services.map((s) => (
                <option key={s} value={s} className="text-ink">
                  {s}
                </option>
              ))}
              <option value="Other / general question" className="text-ink">
                Other / general question
              </option>
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink" />
          </div>
          <FieldError id="service-error" message={err.service} />
        </div>

        <div>
          <label htmlFor="message" className="sr-only">
            Message (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={2000}
            placeholder="Message (Optional)"
            defaultValue={v.message}
            aria-invalid={Boolean(err.message)}
            aria-describedby={describedBy('message')}
            className={cn(inputClass, 'resize-y', err.message ? 'border-red-500' : 'border-line')}
          />
          <FieldError id="message-error" message={err.message} />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-700 to-brand-500 px-5 font-semibold text-white shadow-[0_8px_20px_-8px_rgb(12_104_77/0.7)] transition-colors hover:from-brand-800 hover:to-brand-600 disabled:cursor-wait disabled:opacity-70"
        >
          <Send aria-hidden className="size-5" />
          {pending ? 'Sending…' : 'Send Request'}
        </button>
      </form>
    </div>
  )
}
