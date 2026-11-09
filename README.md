# Abdullah Shuchorit — Physiotherapy Website

## Authoritative application

The only website UI is the root **Next.js + Payload CMS** application. It is served by the supervisor on port **1020**. Its dashboard is available at `/admin` on the same port.

`backend/` is a separate Express auxiliary API on port **1023**. It is supervised independently, but it is not a replacement UI and must never be used to serve the website.

The retired Vite fallback has been removed to prevent the wrong UI being launched again.

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **Payload CMS 3**, which runs inside the same Next.js app. The dashboard is at `/admin`.
- **SQLite** database (a local file by default)

## Getting started

```bash
cp .env.example .env      # then set PAYLOAD_SECRET
npm install
npm run seed              # loads starter content + photos (safe to re-run)
npm run dev
```

- Website: http://localhost:1020
- Dashboard: http://localhost:1020/admin. On the first visit it asks you to create the first login.

Requires Node `^22.23.4 || >=24.22.1`.

## What the client can edit in the dashboard

| Dashboard section                       | Controls                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------- |
| **Website Content → Profile & Bio**     | Name, credentials, specialty, position, bio, qualifications, main photos  |
| **Website Content → Contact & Appointment** | Appointment number, phones, email, address, affiliations, map, FAQs, where form requests are emailed |
| **Website Content → Services**          | Service cards (title, summary, icon, order, show on home page)            |
| **Website Content → Images**            | Uploaded photos (with descriptions for screen readers)                    |
| **Blog → Blog posts**                   | Write posts with headings, lists, links and images; save drafts; publish  |
| **Enquiries → Appointment requests**    | Every request sent from the contact form, with a status and internal notes |

Edits show on the live site immediately: every save clears the page cache (`src/hooks/revalidate.ts`).

## Contact form

`src/app/(frontend)/contact/actions.ts` is a server action. It validates the input, blocks simple spam (a hidden field plus a minimum fill time), and saves the request to **Appointment requests**. A hook in `src/collections/AppointmentRequests.ts` then emails it to the address set in the dashboard. If that is empty, it uses `CONTACT_NOTIFICATION_EMAIL`, then the public contact email.

To send real email, set the `SMTP_*` variables in `.env` (see `.env.example`). Without them, requests are still saved and the email is printed to the server log.

## Project structure

```
src/
  app/
    (frontend)/            Public website: one folder per page
      layout.tsx           Fonts, header, footer, skip link, default metadata
      globals.css          Tailwind + design tokens (colours, fonts, shadows)
      contact/actions.ts   Appointment form server action
      blog/                Blog list (paginated) and post pages
    (payload)/             Payload admin + REST/GraphQL API (generated, don't edit)
    sitemap.ts, robots.ts
  collections/             Payload collections (Posts, Services, Media, AppointmentRequests, Users)
  globals/                 Payload globals (Profile, ContactInfo)
  components/
    layout/                Header, Navigation (mobile menu), Footer, Logo
    sections/              Page building blocks: PageHero, HeroImage, CtaBanner, cards…
    ui/                    Button, Container, Typography, IconBadge, CmsImage
    blog/, contact/        Feature-specific components
  lib/
    cms.ts                 All CMS reads used by pages (single place to change queries)
    site.ts                Nav items, URLs and small helpers
    icons.tsx              Icons the client can pick for services
  content/defaults.ts      Starter content (used by the seed and as a fallback)
  seed/                    `npm run seed` script + starter photos
  migrations/              Database migrations for production
```

**Conventions**

- Pages never import Payload directly. They call the helpers in `src/lib/cms.ts`.
- Structural page copy (section headings, process steps, principles) lives in each page file. Anything the client needs to change regularly belongs in a collection or global.
- Colours and fonts are Tailwind theme tokens in `globals.css` (`brand-*`, `ink`, `body`, `surface`, `footer`…).
- After changing a collection or global, run `npm run generate:types`. For production, also run `npm run payload migrate:create <name>`.

## Deploying

The site needs a Node.js server (`npm run build && npm start`), because the dashboard, uploads and form all run on it.

1. Set the environment variables from `.env.example`. Use a strong `PAYLOAD_SECRET` and the real `NEXT_PUBLIC_SERVER_URL`.
2. On start-up in production, the database tables are created automatically from `src/migrations`.
3. Seed once on the server: `NODE_ENV=production npm run seed`.
4. Keep these on persistent storage and back them up: the database file (`physio.db`) and the uploaded images (`/media`).

Serverless hosts such as Vercel have no persistent disk. There, use hosted SQLite (Turso, via `DATABASE_URL` and `DATABASE_AUTH_TOKEN`) and add a Payload storage adapter (for example `@payloadcms/storage-s3`) for uploads.

## Accessibility notes

Includes a skip link, landmark regions, `aria-current` on the active nav item, and an accessible mobile menu (Escape closes it). Images have alt text from the dashboard, form errors are announced and linked to their fields, FAQs use native `<details>`, focus rings are visible, and reduced-motion settings are respected.
