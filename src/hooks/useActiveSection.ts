import { useEffect, useRef, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  const idsRef = useRef(ids)

  useEffect(() => {
    const handler = () => {
      let cur = ''
      idsRef.current.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return active
}
