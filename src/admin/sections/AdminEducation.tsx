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
import { SaveButton, Field } from '../components'

const BLANK_ENTRY: ExperienceEntry = { date: '', role: '', org: '', bullets: [''] }
const BLANK_AWARD: Award = { title: '', sub: '' }

function EntryEditor({
  entry,
  onUpdate,
  onDelete,
}: {
  entry: ExperienceEntry
  onUpdate: (e: ExperienceEntry) => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const set = (key: keyof ExperienceEntry) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onUpdate({ ...entry, [key]: e.target.value })

  const updateBullet = (i: number, v: string) =>
    onUpdate({ ...entry, bullets: entry.bullets.map((b, j) => j === i ? v : b) })

  return (
    <div className="admin-card" style={{ marginBottom: '0.5rem' }}>
      <button className="admin-card-header" onClick={() => setExpanded(!expanded)}>
        <div>
          <div className="admin-card-meta">{entry.date || '—'}</div>
          <div className="admin-card-name">{entry.role || 'Untitled entry'}</div>
          <div className="admin-card-meta">{entry.org}</div>
        </div>
        <span className="admin-chevron">{expanded ? '▴' : '▾'}</span>
      </button>

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
}: {
  award: Award
  onUpdate: (a: Award) => void
  onDelete: () => void
}) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
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

  const updateList = <T,>(
    list: T[],
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    idx: number,
    val: T,
  ) => setter(list.map((x, i) => i === idx ? val : x))

  const removeFrom = <T,>(list: T[], setter: React.Dispatch<React.SetStateAction<T[]>>, idx: number) =>
    setter(list.filter((_, i) => i !== idx))

  return (
    <div className="admin-section">
      <p className="admin-section-heading">Education</p>
      {edu.map((e, i) => (
        <EntryEditor
          key={i}
          entry={e}
          onUpdate={v => updateList(edu, setEdu, i, v)}
          onDelete={() => removeFrom(edu, setEdu, i)}
        />
      ))}
      <button className="admin-btn-add" onClick={() => setEdu(prev => [...prev, { ...BLANK_ENTRY }])}>+ Add education</button>

      <p className="admin-section-heading" style={{ marginTop: '1.5rem' }}>Experience</p>
      {exp.map((e, i) => (
        <EntryEditor
          key={i}
          entry={e}
          onUpdate={v => updateList(exp, setExp, i, v)}
          onDelete={() => removeFrom(exp, setExp, i)}
        />
      ))}
      <button className="admin-btn-add" onClick={() => setExp(prev => [...prev, { ...BLANK_ENTRY }])}>+ Add experience</button>

      <p className="admin-section-heading" style={{ marginTop: '1.5rem' }}>Awards & Recognition</p>
      {awardsList.map((a, i) => (
        <AwardEditor
          key={i}
          award={a}
          onUpdate={v => updateList(awardsList, setAwards, i, v)}
          onDelete={() => removeFrom(awardsList, setAwards, i)}
        />
      ))}
      <button className="admin-btn-add" onClick={() => setAwards(prev => [...prev, { ...BLANK_AWARD }])}>+ Add award</button>

      <p className="admin-section-heading" style={{ marginTop: '1.5rem' }}>Leadership</p>
      {leadList.map((a, i) => (
        <AwardEditor
          key={i}
          award={a}
          onUpdate={v => updateList(leadList, setLead, i, v)}
          onDelete={() => removeFrom(leadList, setLead, i)}
        />
      ))}
      <button className="admin-btn-add" onClick={() => setLead(prev => [...prev, { ...BLANK_AWARD }])}>+ Add leadership</button>

      <SaveButton status={status} label="Save Education" onClick={save} />
    </div>
  )
}
