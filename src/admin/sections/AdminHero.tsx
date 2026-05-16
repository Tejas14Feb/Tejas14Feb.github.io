import { useState } from 'react'
import { hero, type HeroData } from '../../data/hero'
import { serializeHero } from '../serialize'
import { saveFile } from '../saveData'
import { TagInput, SaveButton, Field } from '../components'

export default function AdminHero() {
  const [data, setData] = useState<HeroData>({ ...hero, typedRoles: [...hero.typedRoles] })
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const set = (key: keyof HeroData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [key]: e.target.value }))

  const save = async () => {
    setStatus('saving')
    try {
      await saveFile('hero.ts', serializeHero(data))
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="admin-section">
      <Field label="Name">
        <input className="admin-input" value={data.name} onChange={set('name')} />
      </Field>
      <Field label="Subtitle (degree line)">
        <input className="admin-input" value={data.subtitle} onChange={set('subtitle')} />
      </Field>
      <Field label="Tagline">
        <input className="admin-input" value={data.tagline} onChange={set('tagline')} />
      </Field>
      <Field label="About paragraph">
        <textarea className="admin-textarea" rows={3} value={data.about} onChange={set('about')} />
      </Field>
      <Field label="Typed roles">
        <TagInput
          tags={data.typedRoles}
          placeholder="Add role..."
          onChange={roles => setData(prev => ({ ...prev, typedRoles: roles }))}
        />
      </Field>
      <Field label="GitHub URL">
        <input className="admin-input" value={data.github} onChange={set('github')} />
      </Field>
      <Field label="LinkedIn URL">
        <input className="admin-input" value={data.linkedin} onChange={set('linkedin')} />
      </Field>
      <Field label="Email address">
        <input className="admin-input" type="email" value={data.email} onChange={set('email')} />
      </Field>
      <SaveButton status={status} label="Save Hero" onClick={save} />
    </div>
  )
}
