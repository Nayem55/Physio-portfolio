import { getProfile } from '@/lib/cms'

import { Container } from '../ui/Container'
import { Logo } from './Logo'
import { Navigation } from './Navigation'

export async function Header() {
  const profile = await getProfile()
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Logo name={profile.name} title={profile.title} />
        <Navigation />
      </Container>
    </header>
  )
}
