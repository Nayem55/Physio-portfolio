import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

import type { Media } from '@/payload-types'

/** Internal links inside posts point at other posts. */
const internalDocToHref = ({ linkNode }: { linkNode: { fields: { doc?: unknown } } }) => {
  const doc = linkNode.fields.doc as { relationTo?: string; value?: { slug?: string } } | undefined
  if (doc?.relationTo === 'posts' && doc.value?.slug) return `/blog/${doc.value.slug}`
  return '/'
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // Render images uploaded inside a post with next/image and an optional caption.
  upload: ({ node }) => {
    const media = node.value as Media | number
    if (typeof media !== 'object' || !media?.url || !media.mimeType?.startsWith('image/')) return null
    return (
      <figure className="not-prose my-8">
        <Image
          src={media.url}
          alt={media.alt}
          width={media.width ?? 1200}
          height={media.height ?? 800}
          sizes="(min-width: 768px) 720px, 100vw"
          className="h-auto w-full rounded-2xl"
        />
      </figure>
    )
  },
})

export function RichText({ data }: { data: SerializedEditorState }) {
  return (
    <LexicalRichText
      data={data}
      converters={converters}
      className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-brand-700 prose-blockquote:border-brand-300 prose-strong:text-ink"
    />
  )
}
