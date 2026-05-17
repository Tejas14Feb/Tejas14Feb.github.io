import { useEffect, useMemo, useRef, useState } from 'react'
import { skills, type SkillGroup } from '../data/skills'

const VW = 580
const MIN_R = 50
const MAX_R = 78

function splitLabel(text: string): string[] {
  if (text.length <= 12) return [text]
  const m = text.match(/^(.+?)\s+[&/]\s+(.+)$/)
  if (m) return [m[1], m[2]]
  const words = text.split(' ')
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

function pack(radii: number[], vh: number): { x: number; y: number }[] {
  const cx = VW / 2
  const cy = vh / 2
  const pos = radii.map((_, i) => ({
    x: cx + (i ? Math.cos(i * 2.39996) * Math.sqrt(i) * 65 : 0),
    y: cy + (i ? Math.sin(i * 2.39996) * Math.sqrt(i) * 65 : 0),
  }))
  for (let k = 0; k < 200; k++) {
    for (let i = 0; i < pos.length; i++) {
      let fx = (cx - pos[i].x) * 0.036
      let fy = (cy - pos[i].y) * 0.036
      for (let j = 0; j < pos.length; j++) {
        if (i === j) continue
        const dx = pos[i].x - pos[j].x
        const dy = pos[i].y - pos[j].y
        const d = Math.sqrt(dx * dx + dy * dy) || 0.01
        const gap = radii[i] + radii[j] + 14
        if (d < gap) { const f = (gap - d) / d * 0.58; fx += dx * f; fy += dy * f }
      }
      const pad = radii[i] + 10
      if (pos[i].x < pad) fx += (pad - pos[i].x) * 0.9
      if (pos[i].x > VW - pad) fx -= (pos[i].x - (VW - pad)) * 0.9
      if (pos[i].y < pad) fy += (pad - pos[i].y) * 0.9
      if (pos[i].y > vh - pad) fy -= (pos[i].y - (vh - pad)) * 0.9
      pos[i].x += fx
      pos[i].y += fy
    }
  }
  return pos
}

export default function BubbleChart({ onSelect }: { onSelect: (g: SkillGroup) => void }) {
  const [anim, setAnim] = useState(0)
  const [hov, setHov] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const rafRef = useRef<number>(0)

  const n = skills.length
  const vh = Math.max(380, Math.ceil(n / 4) * 230)

  const radii = useMemo(() => {
    const profs = skills.map(s => s.proficiency)
    const lo = Math.min(...profs)
    const hi = Math.max(...profs)
    return skills.map(s =>
      MIN_R + (hi === lo ? 0.5 : (s.proficiency - lo) / (hi - lo)) * (MAX_R - MIN_R)
    )
  }, [n])

  const positions = useMemo(() => pack(radii, vh), [radii, vh])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      let t0 = 0
      const tick = (ts: number) => {
        if (!t0) t0 = ts
        const t = Math.min((ts - t0) / 950, 1)
        setAnim(1 - Math.pow(1 - t, 3))
        if (t < 1) rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, { threshold: 0.15 })
    if (svgRef.current) io.observe(svgRef.current)
    return () => { io.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VW} ${vh}`}
      width="100%"
      style={{ maxWidth: 560, display: 'block', margin: '1.5rem auto 0' }}
      role="img"
      aria-label="Skill proficiency bubble chart — click any bubble to explore tools"
    >
      {skills.map((g, i) => {
        const { x, y } = positions[i]
        const r = radii[i]
        const on = hov === i
        const label = g.label.replace(/<|>/g, '')
        const lines = splitLabel(label)
        const maxPrev = Math.max(2, Math.floor((r * 1.3) / 14) - lines.length - 1)
        const prev = g.items.slice(0, maxPrev)
        const more = g.items.length - maxPrev
        const lh = 13

        // Scale entire bubble+label group from its center
        const scaleTransform = `translate(${x}px,${y}px) scale(${anim}) translate(${-x}px,${-y}px)`

        return (
          <g
            key={g.id}
            role="button"
            tabIndex={0}
            aria-label={`${label}: ${g.proficiency}% proficiency, ${g.items.length} tools`}
            style={{ cursor: 'pointer', transform: scaleTransform }}
            onClick={() => onSelect(g)}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            onFocus={() => setHov(i)}
            onBlur={() => setHov(null)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(g) } }}
          >
            {/* Glow ring on hover */}
            {on && (
              <circle cx={x} cy={y} r={r + 14}
                fill="none" stroke="rgba(249,115,22,0.18)" strokeWidth={12} />
            )}

            {/* Main bubble */}
            <circle
              cx={x} cy={y} r={r}
              fill={on ? 'rgba(249,115,22,0.16)' : 'rgba(249,115,22,0.08)'}
              stroke="var(--orange)"
              strokeWidth={on ? 2.5 : 1.5}
              style={{ transition: 'fill 0.25s, stroke-width 0.25s' }}
            />

            {/* Label (1–2 lines) */}
            {lines.map((line, li) => (
              <text
                key={li}
                x={x}
                y={on
                  ? y - r * 0.42 + li * lh - ((lines.length - 1) * lh / 2)
                  : y - 12 + li * lh - ((lines.length - 1) * lh / 2)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fontFamily="var(--mono)"
                fontWeight={700}
                fill={on ? 'var(--orange)' : 'var(--text)'}
                style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.25s' }}
              >
                {line}
              </text>
            ))}

            {/* Normal state: big % + tool count */}
            {!on && (
              <>
                <text x={x} y={y + 11 + (lines.length - 1) * lh / 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={15} fontFamily="var(--mono)" fontWeight={700}
                  fill="var(--orange)"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}>
                  {g.proficiency}%
                </text>
                <text x={x} y={y + 29 + (lines.length - 1) * lh / 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={8} fontFamily="var(--mono)" fill="var(--muted)"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}>
                  {g.items.length} tools
                </text>
              </>
            )}

            {/* Hover state: tool preview */}
            {on && prev.map((item, ti) => (
              <text key={ti}
                x={x} y={y - r * 0.08 + ti * lh}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={9} fontFamily="var(--mono)" fill="var(--text)"
                style={{ pointerEvents: 'none', userSelect: 'none' }}>
                {item}
              </text>
            ))}
            {on && more > 0 && (
              <text x={x} y={y - r * 0.08 + prev.length * lh}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={8} fontFamily="var(--mono)" fill="var(--orange)"
                style={{ pointerEvents: 'none', userSelect: 'none' }}>
                +{more} more →
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
