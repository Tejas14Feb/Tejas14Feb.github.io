import { useState } from 'react'
import { skills as initial, type SkillGroup } from '../../data/skills'
import { serializeSkills } from '../serialize'
import { saveFile } from '../saveData'
import { SaveButton, Field, GripIcon } from '../components'
import { useDragSort } from '../useDragSort'

function SkillGroupEditor({
  group,
  onChange,
  onRemove,
  dragHandleProps,
  dropZoneProps,
  isDragOver,
}: {
  group: SkillGroup
  onChange: (g: SkillGroup) => void
  onRemove: () => void
  dragHandleProps: ReturnType<ReturnType<typeof useDragSort>['dragHandleProps']>
  dropZoneProps: ReturnType<ReturnType<typeof useDragSort>['dropZoneProps']>
  isDragOver: boolean
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
    <div
      className={`admin-card${isDragOver ? ' admin-card--drag-over' : ''}`}
      style={{ marginBottom: '0.75rem' }}
      {...dropZoneProps}
    >
      <div className="admin-skill-header" style={{ alignItems: 'center', gap: '0.5rem' }}>
        <span className="admin-drag-handle" {...dragHandleProps} title="Drag to reorder">
          <GripIcon />
        </span>
        <input
          className="admin-input"
          style={{ flex: 1 }}
          value={group.label}
          onChange={e => onChange({ ...group, label: e.target.value })}
          placeholder="Heading (e.g. <Languages>)"
        />
        <span className="admin-proficiency-badge">{group.proficiency}%</span>
        <button
          className="admin-tag-x"
          style={{ marginLeft: '0.25rem', fontSize: '1rem', lineHeight: 1 }}
          onClick={onRemove}
          title="Remove group"
        >×</button>
      </div>

      <Field label="Proficiency">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="range" min={0} max={100}
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
  const drag = useDragSort(groups, setGroups)

  const updateGroup = (idx: number, g: SkillGroup) =>
    setGroups(prev => prev.map((x, i) => i === idx ? g : x))

  const removeGroup = (idx: number) =>
    setGroups(prev => prev.filter((_, i) => i !== idx))

  const addGroup = () =>
    setGroups(prev => [...prev, { id: `group-${Date.now()}`, label: '<New Group>', items: [], proficiency: 50 }])

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
          onRemove={() => removeGroup(idx)}
          dragHandleProps={drag.dragHandleProps(idx)}
          dropZoneProps={drag.dropZoneProps(idx)}
          isDragOver={drag.overIdx === idx}
        />
      ))}
      <button className="admin-btn-sm" onClick={addGroup} style={{ marginBottom: '0.75rem', width: '100%' }}>
        + Add Group
      </button>
      <SaveButton status={status} label="Save Skills" onClick={save} />
    </div>
  )
}
