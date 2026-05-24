import type { LucideIcon } from 'lucide-react'
import {
  Atom,
  Braces,
  Cloud,
  CreditCard,
  Database,
  GitBranch,
  Layers,
  Settings,
  Smartphone,
  Terminal,
} from 'lucide-react'

export const IMAGES = {
  profile: '/images/portfolio/profile-avatar.png',
  hyperdrive: '/images/portfolio/hyperdrive-engine.png',
  holocron: '/images/portfolio/holocron-archive.png',
  rebel: '/images/portfolio/rebel-data-stream.png',
} as const

export const CONTACT = {
  email: 'brandon.rod182@gmail.com',
  phone: '+52 612 150 5307',
  location: 'La Paz, México',
  linkedin: 'https://linkedin.com/in/brandon-alan-rodriguez/',
} as const

export const NAV_LINK_KEYS = [
  { href: '#missions', labelKey: 'nav.projects' },
  { href: '#systems', labelKey: 'nav.skills' },
  { href: '#experience', labelKey: 'nav.experience' },
  { href: '#education', labelKey: 'nav.education' },
  { href: '#transmissions', labelKey: 'nav.contact' },
] as const

export type ProjectId = 'ipally' | 'rvco' | 'cucufate'

export const PROJECTS_STRUCTURE: ReadonlyArray<{
  id: ProjectId
  accent: 'green' | 'coral' | 'blue'
  image: string
  url?: string
}> = [
  {
    id: 'ipally',
    accent: 'green',
    image: IMAGES.hyperdrive,
  },
  {
    id: 'rvco',
    accent: 'coral',
    image: IMAGES.holocron,
  },
  {
    id: 'cucufate',
    accent: 'blue',
    image: IMAGES.rebel,
    url: 'https://www.cucufate.mx/',
  },
] as const

export const SKILLS: ReadonlyArray<{
  name: string
  icon: LucideIcon
}> = [
  { name: 'TYPESCRIPT', icon: Braces },
  { name: 'REACT / NEXT.JS', icon: Atom },
  { name: 'REACT NATIVE', icon: Smartphone },
  { name: 'NODE / NESTJS', icon: Terminal },
  { name: 'POSTGRESQL', icon: Database },
  { name: 'FIREBASE', icon: Cloud },
  { name: 'STRIPE API', icon: CreditCard },
  { name: 'GIT', icon: GitBranch },
  { name: 'TAILWIND', icon: Layers },
  { name: 'SSR / CACHE', icon: Settings },
] as const

export const EXPERIENCE_STRUCTURE = [
  { id: 'promatic-lead', side: 'right' as const },
  { id: 'promatic-junior', side: 'left' as const },
  { id: 'devco-mobile', side: 'right' as const },
] as const

export const FOOTER_LINK_KEYS = [
  { labelKey: 'footer.terminal', href: '#hero' },
  { labelKey: 'footer.encryption', href: '#transmissions' },
  { labelKey: 'footer.logs', href: '#experience' },
] as const

export const accentStyles = {
  green: {
    title: 'text-neon-green',
    border: 'border-neon-green',
    shadow: 'drop-shadow-[0_0_7.5px_rgba(4,233,6,0.2)]',
    tag: 'border-neon-green text-neon-green',
  },
  coral: {
    title: 'text-neon-coral',
    border: 'border-neon-coral',
    shadow: 'drop-shadow-[0_0_7.5px_rgba(255,111,91,0.2)]',
    tag: 'border-neon-coral text-neon-coral',
  },
  blue: {
    title: 'text-accent-glow',
    border: 'border-accent-glow',
    shadow: 'drop-shadow-[0_0_7.5px_rgba(0,163,255,0.2)]',
    tag: 'border-accent-glow text-accent-glow',
  },
} as const
