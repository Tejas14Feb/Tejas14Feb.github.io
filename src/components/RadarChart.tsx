import { useEffect, useRef, useState } from 'react'
import { skills, type SkillGroup } from '../data/skills'

const CX = 250
const CY = 250
const R = 145
const LABEL_R = 182
const DURATION = 900
const ANGLES = Array.from({ length: 5 }, (_, i) => (i * 72 - 90) * (Math.PI / 180))

const SHORT_LABELS = ['Languages', 'AI / ML', 'Data Eng.', 'Visualization', 'Dev Tools']
const TEXT_ANCHOR = ['middle', 'start', 'start', 'end', 'end'] as const
const DOM_BASELINE = ['auto', 'middle', 'auto', 'auto', 'middle'] as const

function pt(angle: number, radius: number): [number, number] {
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)]
}

function gridPoints(frac: number) {
  return ANGLES.map(a => {
    const [x, y] = pt(a, R * frac)
    return `${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')
}

function dataPoints(progress: number) {
  return skills.map((s, i) => {
    const [x, y] = pt(ANGLES[i], R * (s.proficiency / 100) * progress)
    return `${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')
}

function badgePos(i: number): [number, number] {
  const [lx, ly] = pt(ANGLES[i], LABEL_R)
  return [lx, ly + (i === 0 ? -16 : 18)]
}

export default function RadarChart({ onSelect }: { onSelect: (g: SkillGroup) => void }) {
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const rafRef = useRef<number>(0)
  const t0Ref = useRef<number>(0)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const tick = (ts: number) => {
          if (!t0Ref.current) t0Ref.current = ts
          const t = Math.min((ts - t0Ref.current) / DURATION, 1)
          const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2
          setProgress(eased)
          if (t < 1) rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
      },
      { threshold: 0.25 },
    )
    if (svgRef.current) io.observe(svgRef.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 500"
      width="100%"
      style={{ maxWidth: 460, display: 'block', margin: '1.5rem auto 0' }}
      role="img"
      aria-label="Skill proficiency radar chart — click any label to explore tools"
    >
      {/* Grid polygons */}
      {[0.25, 0.5, 0.75, 1].map((frac, li) => (
        <polygon
          key={frac}
          points={gridPoints(frac)}
          fill="none"
          stroke="var(--border)"
          strokeWidth={li === 3 ? 1.5 : 1}
          strokeDasharray={li === 3 ? undefined : '4 3'}
        />
      ))}

      {/* Axis spokes */}
      {ANGLES.map((a, i) => {
        const [x, y] = pt(a, R)
        return (
          <line
            key={i}
            x1={CX} y1={CY} x2={x} y2={y}
            stroke={hovered === i ? '#f97316' : 'var(--border)'}
            strokeWidth={1.5}
            style={{ transition: 'stroke 0.25s' }}
          />
        )
      })}

      {/* Data polygon — animates in on scroll */}
      <polygon
        points={dataPoints(progress)}
        fill="rgba(249,115,22,0.13)"
        stroke="#f97316"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Grid level hints along the top axis */}
      {[0.25, 0.5, 0.75].map(frac => {
        const [x, y] = pt(ANGLES[0], R * frac)
        return (
          <text
            key={frac}
            x={x + 7}
            y={y}
            fill="var(--muted)"
            fontSize={9}
            fontFamily="var(--mono)"
            dominantBaseline="middle"
            style={{ pointerEvents: 'none' }}
          >
            {Math.round(frac * 100)}%
          </text>
        )
      })}

      {/* Axis endpoints: hit area + dot + label */}
      {skills.map((group, i) => {
        const [dx, dy] = pt(ANGLES[i], R)
        const [lx, ly] = pt(ANGLES[i], LABEL_R)
        const [bx, by] = badgePos(i)
        const active = hovered === i

        return (
          <g
            key={group.id}
            role="button"
            tabIndex={0}
            aria-label={`${SHORT_LABELS[i]}: ${group.proficiency}% proficiency, ${group.items.length} tools — click to explore`}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect(group)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(group)
              }
            }}
          >
            {/* Invisible enlarged hit area */}
            <circle cx={dx} cy={dy} r={22} fill="transparent" />

            {/* Axis dot */}
            <circle
              cx={dx} cy={dy}
              r={active ? 7 : 5}
              fill={active ? '#f97316' : 'var(--bg3)'}
              stroke="#f97316"
              strokeWidth={2}
              style={{ transition: 'r 0.2s, fill 0.2s' }}
            />

            {/* Axis label */}
            <text
              x={lx} y={ly}
              textAnchor={TEXT_ANCHOR[i]}
              dominantBaseline={DOM_BASELINE[i]}
              fontSize={12}
              fontFamily="var(--mono)"
              fontWeight={active ? 700 : 500}
              fill={active ? '#f97316' : 'var(--text)'}
              style={{ transition: 'fill 0.2s', userSelect: 'none' }}
            >
              {SHORT_LABELS[i]}
            </text>

            {/* Hover badge: proficiency % + tool count */}
            {active && (
              <text
                x={bx} y={by}
                textAnchor={TEXT_ANCHOR[i]}
                dominantBaseline="middle"
                fontSize={9}
                fontFamily="var(--mono)"
                fill="var(--muted)"
                style={{ pointerEvents: 'none' }}
              >
                {group.proficiency}% · {group.items.length} tools
              </text>
            )}
          </g>
        )
      })}

      {/* Center dot */}
      <circle cx={CX} cy={CY} r={3} fill="var(--muted)" />
    </svg>
  )
}
