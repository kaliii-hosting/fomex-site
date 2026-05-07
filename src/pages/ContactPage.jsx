import { useState } from 'react'
import { siteConfig } from '../config/site.config'

// CUSTOMIZE: Add real contact info, location, hours
export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch { setSent(true) }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 20px' }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: 'var(--fg)', margin: '0 0 12px' }}>Contact Us</h1>
      <p style={{ fontSize: 16, color: 'var(--fg-muted)', marginBottom: 32 }}>Have a question? We'd love to hear from you.</p>

      {sent ? (
        <div style={{ padding: 24, borderRadius: 12, background: 'rgba(34,197,94,.1)', color: 'var(--primary)', textAlign: 'center', fontSize: 16, fontWeight: 600 }}>
          Thank you! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', fontSize: 16, outline: 'none' }} />
          <input type="email" placeholder="Your Email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', fontSize: 16, outline: 'none' }} />
          <textarea placeholder="Your Message" required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', fontSize: 16, outline: 'none', resize: 'vertical' }} />
          <button type="submit" style={{ padding: '14px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}
