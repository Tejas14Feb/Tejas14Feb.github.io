import { useState } from 'react'
import { skills, type SkillGroup } from '../data/skills'

const mid = Math.ceil(skills.length / 2)
const LEFT_GROUPS = skills.slice(0, mid)
const RIGHT_GROUPS = skills.slice(mid)

// VS Code–style language colours per category
function getAccent(label: string): string {
  const l = label.toLowerCase()
  if (l.includes('lang') || l.includes('code') || l.includes('program')) return '#4ec9b0'
  if (l.includes('ai') || l.includes('ml') || l.includes('machine') || l.includes('statistic') || l.includes('learn')) return '#c586c0'
  if (l.includes('data') || l.includes('engineer') || l.includes('pipeline') || l.includes('etl')) return '#ce9178'
  if (l.includes('viz') || l.includes('visual') || l.includes('chart') || l.includes('graph') || l.includes('dashboard')) return '#4fc1ff'
  if (l.includes('dev') || l.includes('tool') || l.includes('method') || l.includes('system')) return '#6a9955'
  return '#9ca3af'
}

function TabIcon({ label }: { label: string }) {
  const l = label.toLowerCase()
  const p = {
    width: 13, height: 13,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (l.includes('lang') || l.includes('code') || l.includes('program'))
    return <svg {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>

  if (l.includes('ai') || l.includes('ml') || l.includes('machine') || l.includes('statistic') || l.includes('learn'))
    return (
      <svg {...p}>
        <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
        <line x1="12" y1="7" x2="5" y2="17"/>
        <line x1="12" y1="7" x2="19" y2="17"/>
        <line x1="6.5" y1="17" x2="17.5" y2="17"/>
      </svg>
    )

  if (l.includes('data') || l.includes('engineer') || l.includes('pipeline') || l.includes('etl'))
    return (
      <svg {...p}>
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    )

  if (l.includes('viz') || l.includes('visual') || l.includes('chart') || l.includes('graph') || l.includes('dashboard'))
    return (
      <svg {...p}>
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
        <line x1="2"  y1="20" x2="22" y2="20"/>
      </svg>
    )

  if (l.includes('dev') || l.includes('tool') || l.includes('method') || l.includes('system'))
    return (
      <svg {...p}>
        <polyline points="4 17 10 11 4 5"/>
        <line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
    )

  return (
    <svg {...p}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="desk-progress-track">
      <div className="desk-progress-fill" style={{ width: `${value}%` }} />
    </div>
  )
}

function Monitor({ groups, side }: { groups: SkillGroup[]; side: 'left' | 'right' }) {
  const [active, setActive] = useState(0)
  const group = groups[active] ?? null

  return (
    <div className={`desk-monitor desk-monitor--${side}`}>
      <div className="desk-bezel">
        <div className="desk-bezel-top">
          <span className="desk-bezel-cam" aria-hidden="true" />
        </div>

        <div className="desk-screen">
          <div className="desk-chrome">
            <span className="desk-dot desk-dot--red" />
            <span className="desk-dot desk-dot--yellow" />
            <span className="desk-dot desk-dot--green" />
          </div>

          <div className="desk-tabs" role="tablist">
            {groups.map((g, i) => {
              const label = g.label.replace(/<|>/g, '')
              const accent = getAccent(label)
              const isActive = active === i
              return (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`desk-tab${isActive ? ' desk-tab--active' : ''}`}
                  style={{ '--tab-accent': accent } as React.CSSProperties}
                  onClick={() => setActive(i)}
                >
                  <TabIcon label={label} />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>

          <div className="desk-content" key={`${side}-${active}`}>
            {group && (
              <>
                <div className="desk-content-header">
                  <span className="desk-content-label">// {group.label.replace(/<|>/g, '')}</span>
                  <span className="desk-content-meta">{group.items.length} tools</span>
                </div>

                <div className="desk-content-proficiency">
                  <span className="desk-content-pct">{group.proficiency}%</span>
                  <ProgressBar value={group.proficiency} />
                </div>

                <div className="tags desk-tags">
                  {group.items.map(item => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="desk-scanlines" aria-hidden="true" />
        </div>

        <div className="desk-bezel-bottom">
          <span className="desk-led" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

export default function DeskSetup() {
  return (
    <div className="desk-scene">
      <div className="desk-monitors">
        <Monitor groups={LEFT_GROUPS} side="left" />
        <Monitor groups={RIGHT_GROUPS} side="right" />
      </div>
      <div className="desk-surface" aria-hidden="true" />
    </div>
  )
}
