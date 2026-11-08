import Link from 'next/link'

export function Logo({ name, title }: { name: string; title: string }) {
  return (
    <Link href="/" className="group flex items-center gap-3 rounded-md" aria-label={`${name}, home`}>
      <svg viewBox="0 0 40 40" aria-hidden className="size-9 shrink-0 text-brand-600 sm:size-10">
        <rect x="3" y="3" width="34" height="34" rx="10" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(-6 20 20)" />
        <path d="M14 26 26 14M17 14h9v9" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="leading-tight">
        <span className="block font-display text-base font-bold text-ink sm:text-lg">{name}</span>
        <span className="block text-xs text-muted">{title}</span>
      </span>
    </Link>
  )
}
