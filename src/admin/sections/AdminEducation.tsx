import { useState } from 'react'
import {
  education as initEdu,
  experience as initExp,
  awards as initAwards,
  leadership as initLeadership,
  type ExperienceEntry,
  type Award,
} from '../../data/education'
import { serializeEducation } from '../serialize'
import { saveFile } from '../saveData'
import { SaveButton, Field, GripIcon } from '../components'
import { useDragSort } from '../useDragSort'

const BLANK_ENTRY: ExperienceEntry = { date: '', role: '', org: '', bullets: [''] }
const BLANK_AWARD: Award = { title: '', sub: '' }

function EntryEditor({
  entry,
  onUpdate,
  onDelete,
  dragHandleProps,
  dropZoneProps,
  isDragOver,
}: {
  entry: ExperienceEntry
  onUpdate: (e: ExperienceEntry) => void
  onDelete: () => void
  dragHandleProps: ReturnType<ReturnType<typeof useDragSort>['dragHandleProps']>
  dropZoneProps: ReturnType<ReturnType<typeof useDragSort>['dropZoneProps']>
  isDragOver: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  const set = (key: keyof ExperienceEntry) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onUpdate({ ...entry, [key]: e.target.value })

  const updateBullet = (i: number, v: string) =>
    onUpdate({ ...entry, bullets: entry.bullets.map((b, j) => j === i ? v : b) })

  return (
    <div
      className={`admin-card${isDragOver ? ' admin-card--drag-over' : ''}`}
      style={{ marginBottom: '0.5rem' }}
      {...dropZoneProps}
    >
      <div className="admin-card-row">
        <span className="admin-drag-handle" {...dragHandleProps} title="Drag to reorder">
          <GripIcon />
        </span>
        <button className="admin-card-header" style={{ flex: 1 }} onClick={() => setExpanded(!expanded)}>
          <div>
            <div className="admin-card-meta">{entry.date || '—'}</div>
            <div className="admin-card-name">{entry.role || 'Untitled entry'}</div>
            <div className="admin-card-meta">{entry.org}</div>
          </div>
          <span className="admin-chevron">{expanded ? '▴' : '▾'}</span>
        </button>
      </div>

      {expanded && (
        <div className="admin-card-body">
          <Field label="Date range">
            <input className="admin-input" value={entry.date} onChange={set('date')} />
          </Field>
          <Field label="Role / title">
            <input className="admin-input" value={entry.role} onChange={set('role')} />
          </Field>
          <Field label="Organization">
            <input className="admin-input" value={entry.org} onChange={set('org')} />
          </Field>
          <Field label="Bullet points">
            {entry.bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', alignItems: 'flex-start' }}>
                <textarea
                  className="admin-textarea"
                  rows={2}
                  value={b}
                  onChange={e => updateBullet(i, e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  className="admin-tag-x"
                  onClick={() => onUpdate({ ...entry, bullets: entry.bullets.filter((_, j) => j !== i) })}
                  style={{ marginTop: '0.3rem', flexShrink: 0 }}
                >×</button>
              </div>
            ))}
            <button
              className="admin-btn-sm"
              onClick={() => onUpdate({ ...entry, bullets: [...entry.bullets, ''] })}
            >+ Add bullet</button>
          </Field>
          <button className="admin-btn-danger" onClick={onDelete}>Delete entry</button>
        </div>
      )}
    </div>
  )
}

function AwardEditor({
  award,
  onUpdate,
  onDelete,
  dragHandleProps,
  dropZoneProps,
  isDragOver,
}: {
  award: Award
  onUpdate: (a: Award) => void
  onDelete: () => void
  dragHandleProps: ReturnType<ReturnType<typeof useDragSort>['dragHandleProps']>
  dropZoneProps: ReturnType<ReturnType<typeof useDragSort>['dropZoneProps']>
  isDragOver: boolean
}) {
  return (
    <div
      className={`admin-award-row${isDragOver ? ' admin-card--drag-over' : ''}`}
      {...dropZoneProps}
    >
      <span className="admin-drag-handle" {...dragHandleProps} title="Drag to reorder">
        <GripIcon />
      </span>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <input
          className="admin-input"
          value={award.title}
          onChange={e => onUpdate({ ...award, title: e.target.value })}
          placeholder="Award title"
        />
        <input
          className="admin-input"
          value={award.sub}
          onChange={e => onUpdate({ ...award, sub: e.target.value })}
          placeholder="Org · Date"
        />
      </div>
      <button className="admin-tag-x" onClick={onDelete} style={{ marginTop: '0.3rem', flexShrink: 0 }}>×</button>
    </div>
  )
}

function EntryList({
  label,
  list,
  setList,
  blankEntry,
  addLabel,
}: {
  label: string
  list: ExperienceEntry[]
  setList: React.Dispatch<React.SetStateAction<ExperienceEntry[]>>
  blankEntry: ExperienceEntry
  addLabel: string
}) {
  const drag = useDragSort(list, setList)
  return (
    <>
      <p className="admin-section-heading">{label}</p>
      {list.map((e, i) => (
        <EntryEditor
          key={i}
          entry={e}
          onUpdate={v => setList(prev => prev.map((x, j) => j === i ? v : x))}
          onDelete={() => setList(prev => prev.filter((_, j) => j !== i))}
          dragHandleProps={drag.dragHandleProps(i)}
          dropZoneProps={drag.dropZoneProps(i)}
          isDragOver={drag.overIdx === i}
        />
      ))}
      <button className="admin-btn-add" onClick={() => setList(prev => [...prev, { ...blankEntry, bullets: [''] }])}>
        {addLabel}
      </button>
    </>
  )
}

function AwardList({
  label,
  list,
  setList,
  addLabel,
}: {
  label: string
  list: Award[]
  setList: React.Dispatch<React.SetStateAction<Award[]>>
  addLabel: string
}) {
  const drag = useDragSort(list, setList)
  return (
    <>
      <p className="admin-section-heading" style={{ marginTop: '1.5rem' }}>{label}</p>
      {list.map((a, i) => (
        <AwardEditor
          key={i}
          award={a}
          onUpdate={v => setList(prev => prev.map((x, j) => j === i ? v : x))}
          onDelete={() => setList(prev => prev.filter((_, j) => j !== i))}
          dragHandleProps={drag.dragHandleProps(i)}
          dropZoneProps={drag.dropZoneProps(i)}
          isDragOver={drag.overIdx === i}
        />
      ))}
      <button className="admin-btn-add" onClick={() => setList(prev => [...prev, { title: '', sub: '' }])}>
        {addLabel}
      </button>
    </>
  )
}

export default function AdminEducation() {
  const [edu, setEdu] = useState<ExperienceEntry[]>(initEdu.map(e => ({ ...e, bullets: [...e.bullets] })))
  const [exp, setExp] = useState<ExperienceEntry[]>(initExp.map(e => ({ ...e, bullets: [...e.bullets] })))
  const [awardsList, setAwards] = useState<Award[]>([...initAwards])
  const [leadList, setLead] = useState<Award[]>([...initLeadership])
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const save = async () => {
    setStatus('saving')
    try {
      await saveFile('education.ts', serializeEducation(edu, exp, awardsList, leadList))
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="admin-section">
      <EntryList label="Education"   list={edu}        setList={setEdu}    blankEntry={BLANK_ENTRY} addLabel="+ Add education" />
      <EntryList label="Experience"  list={exp}        setList={setExp}    blankEntry={BLANK_ENTRY} addLabel="+ Add experience" />
      <AwardList label="Awards & Recognition" list={awardsList} setList={setAwards} addLabel="+ Add award" />
      <AwardList label="Leadership"  list={leadList}   setList={setLead}   addLabel="+ Add leadership" />
      <SaveButton status={status} label="Save Education" onClick={save} />
    </div>
  )
}
