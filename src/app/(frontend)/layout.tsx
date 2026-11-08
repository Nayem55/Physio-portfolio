import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getProfile } from '@/lib/cms'
import { siteUrl } from '@/lib/site'

import './globals.css'

const heading = Outfit({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile()
  const siteName = `${profile.name} — ${profile.title}`
  return {
    metadataBase: new URL(siteUrl),
    title: { default: siteName, template: `%s | ${profile.name}` },
    description: profile.intro || profile.bio,
    openGraph: { siteName, type: 'website', locale: 'en_GB' },
  }
}

export const viewport: Viewport = {
  themeColor: '#0f7d5c',
  colorScheme: 'light',
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-brand-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
