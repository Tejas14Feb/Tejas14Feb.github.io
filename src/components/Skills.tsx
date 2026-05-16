import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { skills, type SkillGroup } from '../data/skills'

const CHECKPOINT_ICONS = ['01', '02', '03', '04', '05']

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

      <div className="roadmap" aria-label="Skills roadmap — click a checkpoint to view skills">
        <div className="roadmap-line" aria-hidden="true" />
        {skills.map((group, i) => (
          <button
            key={group.id}
            className="checkpoint"
            onClick={() => setActive(group)}
            aria-label={`View ${group.label.replace(/<|>/g, '')} skills`}
          >
            <div className="checkpoint-dot">
              <span className="checkpoint-num">{CHECKPOINT_ICONS[i]}</span>
            </div>
            <div className="checkpoint-label">
              {group.label.replace(/<|>/g, '')}
            </div>
          </button>
        ))}
      </div>

      <SkillModal group={active} onClose={() => setActive(null)} />
    </section>
  )
}
