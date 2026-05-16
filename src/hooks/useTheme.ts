import { useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(true)

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  return { dark, toggle }
}
