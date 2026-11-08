import {
  Accessibility,
  Activity,
  BedSingle,
  Bone,
  Brain,
  Dumbbell,
  Footprints,
  GraduationCap,
  HandHeart,
  Heart,
  HeartPulse,
  Layers,
  PersonStanding,
  ShieldCheck,
  Sprout,
  Stethoscope,
  Target,
  User,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'

/**
 * Icons the client can pick for a service in the dashboard.
 * Keys are stored in the database, so rename labels freely but keep keys stable.
 */
export const iconMap = {
  accessibility: { label: 'Wheelchair / accessibility', icon: Accessibility },
  spine: { label: 'Bone / musculoskeletal', icon: Bone },
  brain: { label: 'Brain / neurological', icon: Brain },
  movement: { label: 'Person moving', icon: PersonStanding },
  footsteps: { label: 'Footsteps / walking', icon: Footprints },
  sports: { label: 'Dumbbell / sports', icon: Dumbbell },
  bed: { label: 'Bed / post-surgical', icon: BedSingle },
  people: { label: 'People / daily living', icon: Users },
  person: { label: 'Single person', icon: User },
  heartPulse: { label: 'Heart pulse', icon: HeartPulse },
  handHeart: { label: 'Hand with heart / care', icon: HandHeart },
  heart: { label: 'Heart', icon: Heart },
  activity: { label: 'Activity line', icon: Activity },
  target: { label: 'Target / goals', icon: Target },
  shield: { label: 'Shield / safety', icon: ShieldCheck },
  sprout: { label: 'Sprout / growth', icon: Sprout },
  zap: { label: 'Lightning / pain relief', icon: Zap },
  layers: { label: 'Layers / evidence', icon: Layers },
  graduation: { label: 'Graduation cap', icon: GraduationCap },
  stethoscope: { label: 'Stethoscope', icon: Stethoscope },
} satisfies Record<string, { label: string; icon: LucideIcon }>

export type IconKey = keyof typeof iconMap

export const iconOptions = Object.entries(iconMap).map(([value, { label }]) => ({ value, label }))

export function getIcon(key: string | null | undefined): LucideIcon {
  return (key && key in iconMap ? iconMap[key as IconKey].icon : Activity) as LucideIcon
}
