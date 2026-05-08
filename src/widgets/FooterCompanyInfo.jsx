// ── FooterCompanyInfo ──
// Multi-column dark glass footer: brand block + tagline + 3 link columns
// + newsletter signup + social row + bottom copyright. Self-contained.

import { useState } from 'react'

const DEFAULT_COLUMNS = [
  { id: 'c1', heading: 'Product',  links: [
    { label: 'Overview',     url: '#' },
    { label: 'Features',     url: '#' },
    { label: 'Integrations', url: '#' },
    { label: 'Changelog',    url: '#' },
  ] },
  { id: 'c2', heading: 'Company',  links: [
    { label: 'About',     url: '#' },
    { label: 'Customers', url: '#' },
    { label: 'Careers',   url: '#' },
    { label: 'Press',     url: '#' },
  ] },
  { id: 'c3', heading: 'Resources', links: [
    { label: 'Docs',     url: '#' },
    { label: 'Guides',   url: '#' },
    { label: 'Status',   url: '#' },
    { label: 'Contact',  url: '#' },
  ] },
]

const SOCIAL_PATHS = {
  x:        'M22 5.8a8.5 8.5 0 01-2.36.65 4.13 4.13 0 001.81-2.27 8.21 8.21 0 01-2.6 1A4.1 4.1 0 0011.85 9a11.65 11.65 0 01-8.45-4.29 4.1 4.1 0 001.27 5.47A4.07 4.07 0 012.8 9.7v.05a4.1 4.1 0 003.3 4.03 4.1 4.1 0 01-1.86.07 4.11 4.11 0 003.83 2.85A8.23 8.23 0 012 18.34 11.6 11.6 0 008.29 20c7.55 0 11.68-6.25 11.68-11.67v-.53A8.4 8.4 0 0022 5.8z',
  github:   'M12 .5a11.5 11.5 0 00-3.63 22.4c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.4-3.87-1.4-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.74 1.27 3.41.97.1-.76.4-1.27.74-1.56-2.55-.28-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a11 11 0 015.74 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.77 1.06.77 2.15v3.18c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z',
  linkedin: 'M4 4.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 11h3v10H3V11zm6 0h3v1.5c.6-1 1.7-1.8 3.4-1.8 3 0 3.6 2 3.6 4.6V21h-3v-5.4c0-1.4-.4-2.4-1.8-2.4-1.4 0-2 1-2 2.4V21H9V11z',
  instagram:'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm5-3a1 1 0 110 2 1 1 0 010-2z',
  youtube:  'M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8-1.6-.4-7.8-.4-7.8-.4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3-5.2 3z',
}

function SocialIcon({ name }) {
  const d = SOCIAL_PATHS[name]
  if (!d) return null
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={d}/></svg>
}

export default function FooterCompanyInfo({
  brand = 'Palntier',
  tagline = 'A composable platform for premium white-label dashboards. Built for teams that ship.',
  columns = DEFAULT_COLUMNS,
  newsletterTitle = 'Join the changelog',
  newsletterSubtitle = 'Monthly notes, no spam. Unsubscribe anytime.',
  newsletterPlaceholder = 'you@company.com',
  newsletterSubmit = 'Subscribe',
  socials = ['x', 'github', 'linkedin', 'instagram'],
  copyright = `© ${new Date().getFullYear()} Palntier. All rights reserved.`,
  textColor = '#ffffff',
  accent = '#a78bfa',
}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const onSubmit = (e) => { e.preventDefault(); if (email) setSubmitted(true) }

  return (
    <footer style={{
      width: '100%',
      containerType: 'inline-size',
      borderRadius: 'clamp(20px, 2.4cqi, 28px)',
      padding: 'clamp(20px, 3.6cqi, 36px)',
      background: 'rgba(8,8,12,0.55)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 16px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)',
      color: textColor,
      display: 'flex', flexDirection: 'column', gap: 28,
    }}>
      {/* Top — brand + columns + newsletter */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
        gap: 'clamp(20px, 3cqi, 32px)',
      }}>
        {/* Brand block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{
            fontSize: 'clamp(20px, 3.4cqi, 26px)', fontWeight: 800, letterSpacing: '-0.02em',
            backgroundImage: `linear-gradient(135deg, ${textColor}, ${accent})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', color: 'transparent',
            display: 'inline-block',
          }}>{brand}</span>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.70, lineHeight: 1.55, maxWidth: 320 }}>{tagline}</p>
          {/* Newsletter */}
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.65 }}>{newsletterTitle}</span>
            {!submitted ? (
              <div style={{
                display: 'flex', gap: 6,
                padding: 4, borderRadius: 999,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={newsletterPlaceholder}
                  style={{
                    flex: 1, padding: '8px 14px',
                    background: 'transparent', color: textColor,
                    fontFamily: 'inherit', fontSize: 13,
                    border: 'none', outline: 'none',
                  }}
                />
                <button type="submit" style={{
                  padding: '8px 14px', borderRadius: 999,
                  background: `linear-gradient(135deg, ${accent}, #ec4899)`,
                  color: '#fff', fontSize: 12, fontWeight: 700,
                  border: '1px solid rgba(255,255,255,0.20)', cursor: 'pointer',
                  boxShadow: `0 4px 16px ${accent}66, inset 0 1px 0 rgba(255,255,255,0.4)`,
                }}>{newsletterSubmit}</button>
              </div>
            ) : (
              <span style={{ fontSize: 12, color: '#86efac', fontWeight: 600 }}>✓ Subscribed — see you in the inbox.</span>
            )}
            {newsletterSubtitle && <span style={{ fontSize: 11, opacity: 0.55 }}>{newsletterSubtitle}</span>}
          </form>
        </div>

        {/* Link columns */}
        {columns.map(col => (
          <div key={col.id} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', opacity: 0.65 }}>{col.heading}</span>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {(col.links || []).map((l, i) => (
                <li key={i}>
                  <a href={l.url || '#'} style={{
                    fontSize: 13, color: textColor, opacity: 0.78,
                    textDecoration: 'none', transition: 'opacity .15s',
                  }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 14,
        paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.10)',
      }}>
        <span style={{ fontSize: 12, opacity: 0.55, letterSpacing: '0.01em' }}>{copyright}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {socials.map(s => (
            <a key={s} href="#" aria-label={s} style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: textColor, opacity: 0.85,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', transition: 'background .15s, opacity .15s',
            }}>
              <SocialIcon name={s} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
