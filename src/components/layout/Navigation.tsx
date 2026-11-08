'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState } from 'react'

import { appointmentHref, cn, navItems } from '@/lib/site'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

/** Desktop nav, "Book Appointment" button, and the mobile menu. */
export function Navigation() {
  const pathname = usePathname()
  // Remember which page the menu was opened on, so it closes automatically after navigating.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (value: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((typeof value === 'function' ? value(open) : value) ? pathname : null)
  const menuId = useId()

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-7">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors',
                    active ? 'text-brand-600 after:bg-brand-600' : 'text-ink hover:text-brand-600 after:bg-transparent',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <Link
          href={appointmentHref}
          className="hidden min-h-11 items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-700 to-brand-500 px-4 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgb(12_104_77/0.8)] transition-colors hover:from-brand-800 hover:to-brand-600 sm:inline-flex"
        >
          Book Appointment
          <ArrowUpRight aria-hidden className="size-4" />
        </Link>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-ink hover:bg-brand-50 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lg lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-12 items-center rounded-lg px-3 text-base font-medium',
                      active ? 'bg-brand-50 text-brand-700' : 'text-ink hover:bg-surface',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href={appointmentHref}
            className="mt-3 mb-2 flex min-h-12 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-700 to-brand-500 font-semibold text-white"
          >
            Book Appointment
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </nav>
      </div>
    </>
  )
}
