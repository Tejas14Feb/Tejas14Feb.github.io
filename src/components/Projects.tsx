import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { projects, type Project } from '../data/projects'

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  }, [project, onClose])

  if (!project) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="modal-panel modal-panel--wide" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="project-type" style={{ marginBottom: '0.4rem' }}>{project.type}</div>
        <h3 className="modal-title">{project.title}</h3>
        <div className="section-line" style={{ margin: '1rem 0 1.5rem' }} />
        <img
          className="modal-img"
          src={project.previewImg}
          alt={project.previewAlt}
          onError={e => { ;(e.target as HTMLImageElement).style.display = 'none' }}
        />
        <p className="modal-desc">{project.previewDesc}</p>
        <div className="tags" style={{ margin: '1.5rem 0' }}>
          {project.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {project.cta}
        </a>
      </div>
    </div>,
    document.body,
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const doubled = [...projects, ...projects]

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <p className="section-tag">// Projects</p>
      <h2 className="section-title" id="projects-heading">
        Featured <span>Projects</span>
      </h2>
      <div className="section-line" aria-hidden="true" />

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((p, i) => (
            <button
              key={`${p.title}-${i}`}
              className="marquee-card"
              onClick={() => setSelected(p)}
              aria-label={`View details: ${p.title}`}
            >
              <img
                className="marquee-card-img"
                src={p.previewImg}
                alt={p.previewAlt}
                onError={e => { ;(e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div className="marquee-card-body">
                <div className="project-type">{p.type}</div>
                <div className="project-title">{p.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
