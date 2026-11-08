export const profile = {
  name: 'Abdullah Shuchorit', title: 'Clinical Physiotherapist', credentials: 'BPT (DU), MDMR (BOU)',
  specialty: 'Specialty in Disability Management and Rehabilitation', position: 'Sr. Clinical Physiotherapist – BRB Physiotherapy Center',
  intro: 'A clinical physiotherapist focused on disability management, functional rehabilitation and improving quality of life through evidence-based physiotherapy care.',
  bio: 'I am a clinical physiotherapist with a focus on disability management, functional rehabilitation and improving quality of life through personalized, evidence-based physiotherapy care.',
  experience: 'I work as a Sr. Clinical Physiotherapist at BRB Physiotherapy Center, where I provide individualized physiotherapy care for people with different functional needs, including those with disabilities.\n\nMy approach is evidence-based, goal-oriented and person-centered, focusing on mobility, independence and meaningful participation in daily life.',
  qualifications: [{ degree: 'BPT (DU)', description: 'Bachelor in Physiotherapy' }, { degree: 'MDMR (BOU)', description: 'Master in Disability Management & Rehabilitation' }],
}
export const contact = { appointmentNumber: '10647', phones: [{ number: '01709 636 869' }, { number: '01761 399 066' }], email: 'abdullah.dibbi06@gmail.com', clinicName: 'BRB Hospitals Limited', address: '77/A, Panthapath, Dhaka-1215', affiliations: [{ name: 'BRB Physiotherapy Center' }, { name: 'BRB Hospitals Limited' }], mapQuery: 'BRB Hospitals Limited, Panthapath, Dhaka', faqs: [] }
export const services = [
  ['Musculoskeletal Physiotherapy', 'Pain relief, mobility improvement and functional recovery for muscle, joint and movement issues.', false],
  ['Neurological Rehabilitation', 'Care for stroke, spinal cord injury, nerve and other movement disorders to improve function and independence.', false],
  ['Disability Management', 'Assessment, therapy and long-term functional support for persons with disabilities.', true],
  ['Sports & Injury Rehabilitation', 'Recovery from sports injuries and safe, tailored return to activity and performance.', false],
  ['Post-surgical Rehabilitation', 'Regaining strength, mobility and daily function after surgery, with a structured rehabilitation plan.', true],
  ['Functional & Daily Living Training', 'Improving independence in movement, self-care and daily life activities.', true],
].map(([title, summary, showOnHome], index) => ({ title, summary, showOnHome, order: (index + 1) * 10, icon: ['spine', 'brain', 'accessibility', 'sports', 'bed', 'people'][index] }))
