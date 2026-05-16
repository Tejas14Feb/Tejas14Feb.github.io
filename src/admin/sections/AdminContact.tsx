import { useState } from 'react'
import { contact, type ContactData } from '../../data/contact'
import { serializeContact } from '../serialize'
import { saveFile } from '../saveData'
import { SaveButton, Field } from '../components'

export default function AdminContact() {
  const [data, setData] = useState<ContactData>({ ...contact })
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const set = (key: keyof ContactData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [key]: e.target.value }))

  const save = async () => {
    setStatus('saving')
    try {
      await saveFile('contact.ts', serializeContact(data))
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="admin-section">
      <Field label="Description paragraph">
        <textarea className="admin-textarea" rows={3} value={data.description} onChange={set('description')} />
      </Field>
      <Field label="Email address">
        <input className="admin-input" type="email" value={data.email} onChange={set('email')} />
      </Field>
      <Field label="LinkedIn URL">
        <input className="admin-input" value={data.linkedin} onChange={set('linkedin')} />
      </Field>
      <Field label="LinkedIn display name">
        <input className="admin-input" value={data.linkedinHandle} onChange={set('linkedinHandle')} />
      </Field>
      <Field label="GitHub URL">
        <input className="admin-input" value={data.github} onChange={set('github')} />
      </Field>
      <Field label="GitHub handle">
        <input className="admin-input" value={data.githubHandle} onChange={set('githubHandle')} />
      </Field>
      <Field label="Resume filename (in /public)">
        <input className="admin-input" value={data.resumeFile} onChange={set('resumeFile')} />
      </Field>
      <SaveButton status={status} label="Save Contact" onClick={save} />
    </div>
  )
}
