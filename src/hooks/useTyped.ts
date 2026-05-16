import { useEffect, useState } from 'react'
import { hero } from '../data/hero'

export function useTyped() {
  const ROLES = hero.typedRoles
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [text, setText] = useState(reduced ? ROLES[0] : '')

  useEffect(() => {
    if (reduced) return

    let ri = 0
    let ci = 0
    let del = false
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      const word = ROLES[ri]
      if (!del) {
        ci++
        setText(word.slice(0, ci))
        if (ci === word.length) {
          del = true
          timer = setTimeout(tick, 1800)
          return
        }
      } else {
        ci--
        setText(word.slice(0, ci))
        if (ci === 0) {
          del = false
          ri = (ri + 1) % ROLES.length
        }
      }
      timer = setTimeout(tick, del ? 60 : 90)
    }

    timer = setTimeout(tick, 90)
    return () => clearTimeout(timer)
  }, [reduced])

  return text
}
