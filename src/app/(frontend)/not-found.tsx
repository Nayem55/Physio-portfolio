import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Typography'

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <Eyebrow>Page not found</Eyebrow>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">We couldn’t find that page.</h1>
      <p className="mx-auto mt-4 max-w-md">It may have moved, or the link may be incorrect.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Go to home page</ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  )
}
