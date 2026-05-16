import { useEffect, useRef } from 'react'

export default function Coin() {
  const bodyRef = useRef<HTMLDivElement>(null)
  const rotation = useRef(0)
  const velocity = useRef(0)
  const frameId = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lastTime = performance.now()

    function animate(now: number) {
      const dt = Math.min((now - lastTime) / 16.67, 2)
      lastTime = now

      velocity.current *= Math.pow(0.93, dt)
      rotation.current += (0.3 + velocity.current) * dt

      if (bodyRef.current) {
        bodyRef.current.style.transform = `rotateY(${rotation.current}deg)`
      }

      frameId.current = requestAnimationFrame(animate)
    }

    frameId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId.current)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    velocity.current = Math.max(-20, Math.min(20, e.movementX * 0.55))
  }

  return (
    <div className="coin-scene" onMouseMove={handleMouseMove} aria-hidden="true">
      <div className="coin-glow" />
      <div ref={bodyRef} className="coin-body">
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="coin-svg">
          <defs>
            <radialGradient id="coinGold" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fff7db" />
              <stop offset="20%" stopColor="#fbbf24" />
              <stop offset="55%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#9a3412" />
            </radialGradient>
            <mask id="tbCut">
              <rect width="300" height="300" fill="white" />
              <text
                x="150"
                y="155"
                fontFamily="Anton, sans-serif"
                fontSize="104"
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
                letterSpacing="-4"
              >
                TB
              </text>
            </mask>
          </defs>

          {/* Outer ambient ring */}
          <circle cx="150" cy="150" r="148" fill="none" stroke="rgba(249,115,22,0.18)" strokeWidth="6" />

          {/* Coin face — TB letters are punched through as transparent holes */}
          <circle cx="150" cy="150" r="136" fill="url(#coinGold)" mask="url(#tbCut)" />

          {/* Thick rim */}
          <circle cx="150" cy="150" r="136" fill="none" stroke="#7c2d12" strokeWidth="11" />

          {/* Rim highlight (inner edge) */}
          <circle cx="150" cy="150" r="130" fill="none" stroke="#fde68a" strokeWidth="1.2" opacity="0.55" />

          {/* TB outline to give cut-edge depth */}
          <text
            x="150"
            y="155"
            fontFamily="Anton, sans-serif"
            fontSize="104"
            fill="none"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="2.5"
            textAnchor="middle"
            dominantBaseline="central"
            letterSpacing="-4"
          >
            TB
          </text>
        </svg>
      </div>
    </div>
  )
}
