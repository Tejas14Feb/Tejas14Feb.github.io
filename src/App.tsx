import { useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const glow = document.getElementById('cursor-glow')
    if (!glow) return
    const handler = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`
      glow.style.top = `${e.clientY}px`
    }
    document.addEventListener('mousemove', handler)
    return () => document.removeEventListener('mousemove', handler)
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div id="cursor-glow" aria-hidden="true" />
      <Nav dark={dark} onThemeToggle={toggle} />
      <main id="main-content">
        <Hero />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  )
}
