'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight01Icon } from '@/app/components/icons/arrow-up-right-01'
import { useEmailJS } from '../hooks/useEmailJS'
import { SERVICES } from '@/lib/site'

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const { sendEmail, isLoading, message } = useEmailJS()
  const isError = message && !message.includes('successfully')

  /* The home page's inquiry bar submits here with ?service, ?org, ?timeline. */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const notes = [['Organization', q.get('org')], ['Timeline', q.get('timeline')]]
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
    if (!q.get('service') && !notes.length) return
    setForm((f) => ({
      ...f,
      subject: SERVICES.some((s) => s.title === q.get('service')) ? q.get('service') : f.subject,
      message: notes.length ? `${notes.join('\n')}\n\n` : f.message,
    }))
  }, [])

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (await sendEmail(form)) setForm(EMPTY)
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} required />
        </div>
        <div className="field">
          <label htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} required />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} />
        </div>
        <div className="field">
          <label htmlFor="subject">Service</label>
          <select id="subject" name="subject" value={form.subject} onChange={update}>
            <option value="">Not sure yet</option>
            {SERVICES.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>Open data partnership</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Project details</label>
        <textarea id="message" name="message" value={form.message} onChange={update} required aria-describedby="message-hint" />
        <span id="message-hint" className="hint">
          Goals, data you already have, and any deadline.
        </span>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Sending…' : 'Send message'}
        <span className="dot" aria-hidden="true">
          <ArrowUpRight01Icon size={18} />
        </span>
      </button>
      <p className={`status ${isError ? 'status--error' : 'status--ok'}`} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  )
}
