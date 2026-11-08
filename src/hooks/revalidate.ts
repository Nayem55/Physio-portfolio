import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

/**
 * Pages are statically rendered and cached. Whenever the client edits content in
 * the dashboard we purge the whole site cache so the change shows up immediately.
 * The site is small, so a full purge is simpler and safer than tracking which
 * pages use which content.
 */
function revalidateSite(req: PayloadRequest) {
  // Seeding (and other scripts) run outside Next.js, where revalidatePath throws.
  if (req.context?.disableRevalidate) return
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Not running inside a Next.js request — nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateSite(req)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req)
  return doc
}
