/** Site-wide constants that are structural rather than editable content. */

export const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const

/** Where every "Book Appointment" button points. */
export const appointmentHref = '/contact#appointment'

/** `tel:` link from a human-formatted number ("01709 636 869" → "tel:01709636869"). */
export function telHref(number: string) {
  return `tel:${number.replace(/[^\d+]/g, '')}`
}

export function formatDate(value: string | null | undefined) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(value),
  )
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
