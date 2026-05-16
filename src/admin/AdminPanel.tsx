import { useEffect, useState } from 'react'
import AdminHero from './sections/AdminHero'
import AdminProjects from './sections/AdminProjects'
import AdminSkills from './sections/AdminSkills'
import AdminEducation from './sections/AdminEducation'
import AdminContact from './sections/AdminContact'

const TABS = ['Hero', 'Projects', 'Skills', 'Education', 'Contact'] as const
type Tab = typeof TABS[number]

export default function AdminPanel() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('Hero')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button
        className={`admin-trigger${open ? ' admin-trigger--hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open content editor"
        title="Open editor (Ctrl+Shift+E)"
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        edit
      </button>

      {open && <div className="admin-backdrop" onClick={() => setOpen(false)} />}

      <div className={`admin-drawer${open ? ' admin-drawer--open' : ''}`} aria-modal={open} role="dialog" aria-label="Content editor">
        <div className="admin-header">
          <span className="admin-title">// content editor</span>
          <button className="admin-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </div>

        <div className="admin-tabs" role="tablist">
          {TABS.map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={`admin-tab${tab === t ? ' admin-tab--active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="admin-body">
          {tab === 'Hero'      && <AdminHero />}
          {tab === 'Projects'  && <AdminProjects />}
          {tab === 'Skills'    && <AdminSkills />}
          {tab === 'Education' && <AdminEducation />}
          {tab === 'Contact'   && <AdminContact />}
        </div>
      </div>
    </>
  )
}
