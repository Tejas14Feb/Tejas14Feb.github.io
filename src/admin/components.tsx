import { useState, type ReactNode } from 'react'

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      {children}
    </div>
  )
}

export function TagInput({
  tags,
  placeholder,
  onChange,
}: {
  tags: string[]
  placeholder: string
  onChange: (t: string[]) => void
}) {
  const [input, setInput] = useState('')

  const add = () => {
    const v = input.trim()
    if (v) { onChange([...tags, v]); setInput('') }
  }

  return (
    <div>
      <div className="admin-tags">
        {tags.map((t, i) => (
          <span key={i} className="admin-tag">
            {t}
            <button
              className="admin-tag-x"
              onClick={() => onChange(tags.filter((_, j) => j !== i))}
              aria-label={`Remove ${t}`}
            >×</button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <input
          className="admin-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder={placeholder}
        />
        <button className="admin-btn-sm" onClick={add}>Add</button>
      </div>
    </div>
  )
}

type Status = 'idle' | 'saving' | 'saved' | 'error'

const LABEL: Record<Status, string> = {
  idle: '',
  saving: 'Saving...',
  saved: '✓ Saved',
  error: 'Error — retry',
}

export function SaveButton({
  status,
  label,
  onClick,
}: {
  status: Status
  label: string
  onClick: () => void
}) {
  return (
    <div className="admin-actions">
      <button
        className={`admin-save-btn${status === 'saved' ? ' admin-save-btn--saved' : status === 'error' ? ' admin-save-btn--error' : ''}`}
        onClick={onClick}
        disabled={status === 'saving'}
      >
        {status === 'idle' ? label : LABEL[status]}
      </button>
    </div>
  )
}
