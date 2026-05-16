import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { type SkillGroup } from '../data/skills'
import RadarChart from './RadarChart'

function SkillModal({ group, onClose }: { group: SkillGroup | null; onClose: () => void }) {
  useEffect(() => {
    if (!group) return
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  }, [group, onClose])

  if (!group) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={group.label}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <p className="section-tag" style={{ marginBottom: '0.4rem' }}>// Skill Set</p>
        <h3 className="modal-title">{group.label.replace(/<|>/g, '')}</h3>
        <div className="section-line" style={{ margin: '1rem 0 1.5rem' }} />
        <div className="tags">
          {group.items.map(item => (
            <span className="tag" key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function Skills() {
  const [active, setActive] = useState<SkillGroup | null>(null)

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <p className="section-tag">// Skills</p>
      <h2 className="section-title" id="skills-heading">
        Skills &amp; <span>Tech Stack</span>
      </h2>
      <div className="section-line" aria-hidden="true" />

      <p
        style={{
          color: 'var(--muted)',
          fontSize: '0.8rem',
          fontFamily: 'var(--mono)',
          textAlign: 'center',
          marginTop: '1.25rem',
          letterSpacing: '0.03em',
        }}
      >
        // hover to inspect · click any axis to explore tools
      </p>

      <RadarChart onSelect={setActive} />

      <SkillModal group={active} onClose={() => setActive(null)} />
    </section>
  )
}
