// ── ContactForm ──
// Frosted-glass contact panel with name + email + message inputs and a
// gradient submit button. Self-contained — submit is a plain `mailto:`
// fallback so the deployed widget works without any backend wiring.
// Admin can override `submitUrl` to point at a real form endpoint.

import { useState } from 'react'

export default function ContactForm({
  title = 'Start a conversation',
  subtitle = 'Tell us about the project — we usually reply the same day.',
  emailTo = 'hello@example.com',
  submitUrl = '',          // optional POST endpoint
  submitLabel = 'Send message',
  accent = '#7c3aed',
  textColor = '#ffffff',
  successMessage = 'Thanks — we got it. We will be in touch shortly.',
}) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState('idle') // idle | sending | sent | error

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    if (submitUrl) {
      setState('sending')
      try {
        const res = await fetch(submitUrl, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('post failed')
        setState('sent')
      } catch {
        setState('error')
      }
    } else {
      // No backend wired — fall through to a mailto compose so the
      // widget still does something useful out of the box.
      const subject = encodeURIComponent(`Hello from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`)
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`
      setState('sent')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 14,
    background: 'rgba(255,255,255,0.06)',
    color: textColor,
    fontSize: 14,
    fontFamily: 'inherit',
    border: '1px solid rgba(255,255,255,0.14)',
    outline: 'none',
    transition: 'border-color .15s, box-shadow .15s, background .15s',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  }

  return (
    <div style={{
      borderRadius: 28,
      padding: 'clamp(22px, 3.4vw, 32px)',
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
      color: textColor,
      display: 'flex', flexDirection: 'column', gap: 18,
      maxWidth: 560,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{ margin: 0, fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 700, letterSpacing: '-0.015em' }}>{title}</h3>
        {subtitle && <span style={{ fontSize: 13, opacity: 0.65 }}>{subtitle}</span>}
      </div>

      {state === 'sent' ? (
        <div style={{
          padding: 18, borderRadius: 18,
          background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.30)',
          color: '#86efac',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{successMessage}</span>
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6 }}>Name</span>
            <input
              type="text" autoComplete="name" required
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Your full name"
              style={inputStyle}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6 }}>Email</span>
            <input
              type="email" autoComplete="email" required
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="you@company.com"
              style={inputStyle}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6 }}>Message</span>
            <textarea
              required rows={4}
              value={form.message}
              onChange={e => set('message', e.target.value)}
              placeholder="Tell us a little about what you’re building…"
              style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
            />
          </label>
          <button type="submit" disabled={state === 'sending'} style={{
            marginTop: 4,
            padding: '14px 22px',
            borderRadius: 999,
            background: `linear-gradient(135deg, ${accent}, #ec4899)`,
            color: '#fff',
            fontSize: 14, fontWeight: 700, letterSpacing: '0.01em',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: `0 10px 28px ${accent}66, inset 0 1px 0 rgba(255,255,255,0.4)`,
            cursor: state === 'sending' ? 'not-allowed' : 'pointer',
            opacity: state === 'sending' ? 0.7 : 1,
          }}>
            {state === 'sending' ? 'Sending…' : submitLabel}
          </button>
          {state === 'error' && (
            <span style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong — please try again.</span>
          )}
        </form>
      )}
    </div>
  )
}
