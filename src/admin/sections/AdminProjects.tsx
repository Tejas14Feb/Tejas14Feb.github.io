import { useState } from 'react'
import { projects as initial, type Project } from '../../data/projects'
import { serializeProjects } from '../serialize'
import { saveFile } from '../saveData'
import { TagInput, SaveButton, Field, GripIcon } from '../components'
import { useDragSort } from '../useDragSort'

const BLANK: Project = {
  type: '', title: '', desc: '', tags: [], href: '',
  ariaLabel: '', previewTitle: '', previewImg: '', previewAlt: '', previewDesc: '', cta: '',
}

const TEXT_FIELDS: Array<[string, keyof Project, boolean]> = [
  ['Type (e.g. Data Science • ML)', 'type', false],
  ['Title', 'title', false],
  ['Short description', 'desc', true],
  ['Link (href)', 'href', false],
  ['Aria label', 'ariaLabel', false],
  ['Preview title', 'previewTitle', false],
  ['Preview image path', 'previewImg', false],
  ['Preview alt text', 'previewAlt', false],
  ['Preview description', 'previewDesc', true],
  ['CTA text', 'cta', false],
]

function ProjectCard({
  project,
  expanded,
  onToggle,
  onUpdate,
  onDelete,
  dragHandleProps,
  dropZoneProps,
  isDragOver,
}: {
  project: Project
  expanded: boolean
  onToggle: () => void
  onUpdate: (p: Project) => void
  onDelete: () => void
  dragHandleProps: ReturnType<ReturnType<typeof useDragSort>['dragHandleProps']>
  dropZoneProps: ReturnType<ReturnType<typeof useDragSort>['dropZoneProps']>
  isDragOver: boolean
}) {
  const set = (key: keyof Project) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onUpdate({ ...project, [key]: e.target.value })

  return (
    <div className={`admin-card${isDragOver ? ' admin-card--drag-over' : ''}`} {...dropZoneProps}>
      <div className="admin-card-row">
        <span className="admin-drag-handle" {...dragHandleProps} title="Drag to reorder">
          <GripIcon />
        </span>
        <button className="admin-card-header" style={{ flex: 1 }} onClick={onToggle}>
          <div>
            <div className="admin-card-meta">{project.type || '—'}</div>
            <div className="admin-card-name">{project.title || 'Untitled project'}</div>
          </div>
          <span className="admin-chevron">{expanded ? '▴' : '▾'}</span>
        </button>
      </div>

      {expanded && (
        <div className="admin-card-body">
          {TEXT_FIELDS.map(([label, key, multi]) => (
            <Field key={String(key)} label={label}>
              {multi ? (
                <textarea className="admin-textarea" rows={2} value={project[key] as string} onChange={set(key)} />
              ) : (
                <input className="admin-input" value={project[key] as string} onChange={set(key)} />
              )}
            </Field>
          ))}
          <Field label="Tags">
            <TagInput tags={project.tags} placeholder="Add tag..." onChange={tags => onUpdate({ ...project, tags })} />
          </Field>
          <button className="admin-btn-danger" onClick={onDelete}>Delete project</button>
        </div>
      )}
    </div>
  )
}

export default function AdminProjects() {
  const [list, setList] = useState<Project[]>(initial.map(p => ({ ...p, tags: [...p.tags] })))
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const drag = useDragSort(list, setList)

  const remove = (idx: number) => {
    setList(prev => prev.filter((_, i) => i !== idx))
    setExpandedIdx(null)
  }

  const save = async () => {
    setStatus('saving')
    try {
      await saveFile('projects.ts', serializeProjects(list))
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="admin-section">
      {list.map((p, idx) => (
        <ProjectCard
          key={idx}
          project={p}
          expanded={expandedIdx === idx}
          onToggle={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
          onUpdate={p => setList(prev => prev.map((x, i) => i === idx ? p : x))}
          onDelete={() => remove(idx)}
          dragHandleProps={drag.dragHandleProps(idx)}
          dropZoneProps={drag.dropZoneProps(idx)}
          isDragOver={drag.overIdx === idx}
        />
      ))}
      <button className="admin-btn-add" onClick={() => { setList(prev => [...prev, { ...BLANK }]); setExpandedIdx(list.length) }}>
        + Add project
      </button>
      <SaveButton status={status} label="Save Projects" onClick={save} />
    </div>
  )
}
