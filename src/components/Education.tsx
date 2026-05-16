import { type ReactNode, useState } from 'react'
import { awards, education, experience, leadership, type Award, type ExperienceEntry } from '../data/education'
import Reveal from './Reveal'

interface AccordionCardProps {
  id: string
  isOpen: boolean
  onToggle: () => void
  title: string
  meta: string
  children: ReactNode
}

function AccordionCard({ id, isOpen, onToggle, title, meta, children }: AccordionCardProps) {
  return (
    <div className={`acc-card${isOpen ? ' acc-card--open' : ''}`}>
      <button
        className="acc-header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`acc-body-${id}`}
        id={`acc-btn-${id}`}
      >
        <div className="acc-header-left">
          <svg className="acc-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
          </svg>
          <div className="acc-header-text">
            <div className="acc-title">{title}</div>
            <div className="acc-meta">{meta}</div>
          </div>
        </div>
        <svg
          className="acc-chevron"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`acc-body${isOpen ? ' acc-body--open' : ''}`}
        id={`acc-body-${id}`}
        role="region"
        aria-labelledby={`acc-btn-${id}`}
      >
        <div className="acc-body-inner">
          {children}
        </div>
      </div>
    </div>
  )
}

function EduCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <Reveal className="edu-card">
      <div className="edu-date">{entry.date}</div>
      <div className="edu-role">{entry.role}</div>
      <div className="edu-org">{entry.org}</div>
      <ul className="edu-bullets">
        {entry.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </Reveal>
  )
}

function CertCard({ award }: { award: Award }) {
  return (
    <Reveal className="cert-card">
      <div className="cert-dot" aria-hidden="true" />
      <div>
        <div className="cert-title">{award.title}</div>
        <div className="cert-sub">{award.sub}</div>
      </div>
    </Reveal>
  )
}

export default function Education() {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id))

  return (
    <section id="education" aria-labelledby="edu-heading">
      <p className="section-tag">// Background</p>
      <h2 className="section-title" id="edu-heading">
        Education &amp; <span>Experience</span>
      </h2>
      <div className="section-line" aria-hidden="true" />

      <div className="edu-grid">
        <div>
          <div className="edu-section-label">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Education
          </div>
          {education.map((e, i) => <EduCard key={i} entry={e} />)}

          <div className="edu-section-label" style={{ marginTop: '2rem' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
            </svg>
            Experience
          </div>
          <div className="accordion">
            {experience.map((e, i) => {
              const id = `exp-${i}`
              return (
                <AccordionCard
                  key={id}
                  id={id}
                  isOpen={openId === id}
                  onToggle={() => toggle(id)}
                  title={e.role}
                  meta={`${e.org} · ${e.date}`}
                >
                  <ul className="edu-bullets">
                    {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </AccordionCard>
              )
            })}
          </div>
        </div>

        <div>
          <div className="edu-section-label">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            Awards &amp; Recognition
          </div>
          {awards.map((a, i) => <CertCard key={i} award={a} />)}

          <div className="edu-section-label" style={{ marginTop: '2rem' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            Leadership
          </div>
          {leadership.map((a, i) => <CertCard key={i} award={a} />)}
        </div>
      </div>
    </section>
  )
}
