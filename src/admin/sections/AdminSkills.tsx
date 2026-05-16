import { useState } from 'react'
import { skills as initial, type SkillGroup } from '../../data/skills'
import { serializeSkills } from '../serialize'
import { saveFile } from '../saveData'
import { SaveButton, Field } from '../components'

function SkillGroupEditor({
  group,
  onChange,
}: {
  group: SkillGroup
  onChange: (g: SkillGroup) => void
}) {
  const [input, setInput] = useState('')

  const addItem = () => {
    const v = input.trim()
    if (v && !group.items.includes(v)) {
      onChange({ ...group, items: [...group.items, v] })
      setInput('')
    }
  }

  const removeItem = (i: number) =>
    onChange({ ...group, items: group.items.filter((_, j) => j !== i) })

  return (
    <div className="admin-card" style={{ marginBottom: '0.75rem' }}>
      <div className="admin-skill-header">
        <span className="admin-skill-name">{group.label.replace(/<|>/g, '')}</span>
        <span className="admin-proficiency-badge">{group.proficiency}%</span>
      </div>

      <Field label="Proficiency (radar chart)">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="range"
            min={0}
            max={100}
            value={group.proficiency}
            onChange={e => onChange({ ...group, proficiency: Number(e.target.value) })}
            className="admin-range"
            style={{ flex: 1 }}
          />
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--orange)', minWidth: '2.5rem', textAlign: 'right' }}>
            {group.proficiency}%
          </span>
        </div>
      </Field>

      <Field label="Tools">
        <div className="admin-tags">
          {group.items.map((item, i) => (
            <span key={i} className="admin-tag">
              {item}
              <button className="admin-tag-x" onClick={() => removeItem(i)}>×</button>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input
            className="admin-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addItem() } }}
            placeholder="Add tool..."
          />
          <button className="admin-btn-sm" onClick={addItem}>Add</button>
        </div>
      </Field>
    </div>
  )
}

export default function AdminSkills() {
  const [groups, setGroups] = useState<SkillGroup[]>(
    initial.map(g => ({ ...g, items: [...g.items] })),
  )
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const updateGroup = (idx: number, g: SkillGroup) =>
    setGroups(prev => prev.map((x, i) => i === idx ? g : x))

  const save = async () => {
    setStatus('saving')
    try {
      await saveFile('skills.ts', serializeSkills(groups))
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="admin-section">
      {groups.map((g, idx) => (
        <SkillGroupEditor
          key={g.id}
          group={g}
          onChange={g => updateGroup(idx, g)}
        />
      ))}
      <SaveButton status={status} label="Save Skills" onClick={save} />
    </div>
  )
}
