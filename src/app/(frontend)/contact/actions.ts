'use server'


export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'phone' | 'service' | 'message', string>>
  /** Echo of submitted values so the form keeps them after a validation error. */
  values?: Record<string, string>
}

const MIN_FILL_TIME_MS = 1500

function field(data: FormData, key: string) {
  const v = data.get(key)
  return typeof v === 'string' ? v.trim() : ''
}

/**
 * Handles the "Request an Appointment" form. Saves the request in the dashboard
 * (Enquiries → Appointment requests); the collection hook then emails it.
 */
export async function submitAppointmentRequest(_prev: FormState, data: FormData): Promise<FormState> {
  const values = {
    name: field(data, 'name'),
    phone: field(data, 'phone'),
    service: field(data, 'service'),
    message: field(data, 'message'),
  }

  // Basic spam protection: a hidden field bots fill in, and a minimum time on the page.
  const startedAt = Number(field(data, 'startedAt'))
  if (field(data, 'website') || (startedAt && Date.now() - startedAt < MIN_FILL_TIME_MS)) {
    // Pretend it worked so bots get no signal.
    return { status: 'success', message: 'Thank you! Your request has been sent.' }
  }

  const errors: FormState['errors'] = {}
  if (values.name.length < 2) errors.name = 'Please enter your name.'
  else if (values.name.length > 100) errors.name = 'Please use 100 characters or fewer.'

  const digits = values.phone.replace(/\D/g, '')
  if (!values.phone) errors.phone = 'Please enter a phone number so we can call you back.'
  else if (digits.length < 6 || digits.length > 15 || !/^[\d\s+()-]+$/.test(values.phone))
    errors.phone = 'Please enter a valid phone number, e.g. 01709 636 869.'

  if (!values.service) errors.service = 'Please choose a service or concern.'
  if (values.message.length > 2000) errors.message = 'Please keep your message under 2000 characters.'

  if (Object.keys(errors).length) {
    return { status: 'error', message: 'Please check the highlighted fields.', errors, values }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'appointment-requests',
      data: { ...values, service: values.service.slice(0, 120), status: 'new' },
      overrideAccess: true,
    })
  } catch (error) {
    console.error('Failed to save appointment request', error)
    return {
      status: 'error',
      message: 'Sorry, something went wrong sending your request. Please call us instead.',
      values,
    }
  }

  return {
    status: 'success',
    message: 'Thank you! Your request has been sent. We will call you soon to confirm your appointment.',
  }
}
import config from '@payload-config'
import { getPayload } from 'payload'
