import { useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTIONS = ['home', 'skills', 'projects', 'education', 'contact']

interface NavProps {
  dark: boolean
  onThemeToggle: () => void
}

export default function Nav({ dark, onThemeToggle }: NavProps) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTIONS)

  const close = () => setOpen(false)

  return (
    <nav aria-label="Primary navigation">
      <a href="#home" className="nav-logo" aria-label="Tejas Budharamu — home">
        &lt;Tejas Budharamu /&gt;
      </a>

      <ul className={`nav-links${open ? ' open' : ''}`} id="navLinks" role="list">
        {SECTIONS.map(id => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={close}
              style={active === id ? { color: 'var(--orange)' } : undefined}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
        <li>
          <a href="Tejas_Budharamu_Resume_2026.pdf" target="_blank" rel="noopener noreferrer" className="btn-resume" onClick={close}>
            ⬇ Resume
          </a>
        </li>
      </ul>

      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {dark ? '🌙' : '☀️'}
        </button>
        <button
          className="hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle mobile menu"
          aria-expanded={open}
          aria-controls="navLinks"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
