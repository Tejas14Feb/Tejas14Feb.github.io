import type { HeroData } from '../data/hero'
import type { ContactData } from '../data/contact'
import type { Project } from '../data/projects'
import type { SkillGroup } from '../data/skills'
import type { ExperienceEntry, Award } from '../data/education'

const HERO_IFACE = `export interface HeroData {
  name: string
  subtitle: string
  tagline: string
  about: string
  typedRoles: string[]
  github: string
  linkedin: string
  email: string
}`

const CONTACT_IFACE = `export interface ContactData {
  description: string
  email: string
  linkedin: string
  linkedinHandle: string
  github: string
  githubHandle: string
  resumeFile: string
}`

const PROJECTS_IFACE = `export interface Project {
  type: string
  title: string
  desc: string
  tags: string[]
  href: string
  ariaLabel: string
  previewTitle: string
  previewImg: string
  previewAlt: string
  previewDesc: string
  cta: string
}`

const SKILLS_IFACE = `export interface SkillGroup {
  id: string
  label: string
  items: string[]
  proficiency: number
}`

const EDUCATION_IFACE = `export interface ExperienceEntry {
  date: string
  role: string
  org: string
  bullets: string[]
}

export interface Award {
  title: string
  sub: string
}`

export function serializeHero(data: HeroData): string {
  return `${HERO_IFACE}\n\nexport const hero: HeroData = ${JSON.stringify(data, null, 2)}\n`
}

export function serializeContact(data: ContactData): string {
  return `${CONTACT_IFACE}\n\nexport const contact: ContactData = ${JSON.stringify(data, null, 2)}\n`
}

export function serializeProjects(data: Project[]): string {
  return `${PROJECTS_IFACE}\n\nexport const projects: Project[] = ${JSON.stringify(data, null, 2)}\n`
}

export function serializeSkills(data: SkillGroup[]): string {
  return `${SKILLS_IFACE}\n\nexport const skills: SkillGroup[] = ${JSON.stringify(data, null, 2)}\n`
}

export function serializeEducation(
  education: ExperienceEntry[],
  experience: ExperienceEntry[],
  awards: Award[],
  leadership: Award[],
): string {
  return [
    EDUCATION_IFACE,
    `\nexport const education: ExperienceEntry[] = ${JSON.stringify(education, null, 2)}`,
    `\nexport const experience: ExperienceEntry[] = ${JSON.stringify(experience, null, 2)}`,
    `\nexport const awards: Award[] = ${JSON.stringify(awards, null, 2)}`,
    `\nexport const leadership: Award[] = ${JSON.stringify(leadership, null, 2)}\n`,
  ].join('\n')
}
