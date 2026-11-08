/**
 * Starting content for the dashboard. `npm run seed` writes this into the database;
 * the site also falls back to it if the dashboard content has never been saved.
 * After seeding, the client edits everything here from /admin — not in this file.
 */
import type { ContactInfo, Profile, Service } from '@/payload-types'

export const defaultProfile = {
  name: 'Abdullah Shuchorit',
  title: 'Clinical Physiotherapist',
  credentials: 'BPT (DU), MDMR (BOU)',
  specialty: 'Specialty in Disability Management and Rehabilitation',
  position: 'Sr. Clinical Physiotherapist – BRB Physiotherapy Center',
  intro:
    'A clinical physiotherapist focused on disability management, functional rehabilitation and improving quality of life through evidence-based physiotherapy care.',
  bio: 'I am a clinical physiotherapist with a focus on disability management, functional rehabilitation and improving quality of life through personalized, evidence-based physiotherapy care.',
  experience:
    'I work as a Sr. Clinical Physiotherapist at BRB Physiotherapy Center, where I provide individualized physiotherapy care for people with different functional needs, including those with disabilities.\n\nMy approach is evidence-based, goal-oriented and person-centered, focusing on mobility, independence and meaningful participation in daily life.',
  qualifications: [
    { degree: 'BPT (DU)', description: 'Bachelor in Physiotherapy' },
    { degree: 'MDMR (BOU)', description: 'Master in Disability Management & Rehabilitation' },
  ],
} satisfies Partial<Profile>

export const defaultContactInfo = {
  appointmentNumber: '10647',
  phones: [{ number: '01709 636 869' }, { number: '01761 399 066' }],
  email: 'abdullah.dibbi06@gmail.com',
  clinicName: 'BRB Hospitals Limited',
  address: '77/A, Panthapath, Dhaka-1215',
  affiliations: [{ name: 'BRB Physiotherapy Center' }, { name: 'BRB Hospitals Limited' }],
  mapQuery: 'BRB Hospitals Limited, Panthapath, Dhaka',
  faqs: [
    {
      question: 'How do I book an appointment?',
      answer:
        'Call the appointment number 10647, or send a request using the form on this page and we will contact you to confirm a time.',
    },
    {
      question: 'Do I need a referral to consult?',
      answer:
        'No referral is needed to book a physiotherapy consultation. If you have a referral or reports from a doctor, please bring them along.',
    },
    {
      question: 'What should I bring to my appointment?',
      answer:
        'Bring any previous medical reports, X-rays or scans, a list of current medicines, and wear comfortable clothing that allows easy movement.',
    },
  ],
} satisfies Partial<ContactInfo>

export const defaultServices: Array<Pick<Service, 'title' | 'summary' | 'icon' | 'showOnHome' | 'order'>> = [
  {
    title: 'Musculoskeletal Physiotherapy',
    summary: 'Pain relief, mobility improvement and functional recovery for muscle, joint and movement issues.',
    icon: 'spine',
    showOnHome: false,
    order: 10,
  },
  {
    title: 'Neurological Rehabilitation',
    summary:
      'Care for stroke, spinal cord injury, nerve and other movement disorders to improve function and independence.',
    icon: 'brain',
    showOnHome: false,
    order: 20,
  },
  {
    title: 'Disability Management',
    summary: 'Assessment, therapy and long-term functional support for persons with disabilities.',
    icon: 'accessibility',
    showOnHome: true,
    order: 30,
  },
  {
    title: 'Sports & Injury Rehabilitation',
    summary: 'Recovery from sports injuries and safe, tailored return to activity and performance.',
    icon: 'sports',
    showOnHome: false,
    order: 40,
  },
  {
    title: 'Post-surgical Rehabilitation',
    summary:
      'Regaining strength, mobility and daily function after surgery, with a structured rehabilitation plan.',
    icon: 'bed',
    showOnHome: true,
    order: 50,
  },
  {
    title: 'Functional & Daily Living Training',
    summary: 'Improving independence in movement, self-care and daily life activities.',
    icon: 'people',
    showOnHome: true,
    order: 60,
  },
]
