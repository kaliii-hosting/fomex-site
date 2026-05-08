// ── TestimonialsReviews ──
// Soft glass quote cards with avatar (initials chip if no image), 5-star
// rating, the quote, and a name+title row. Self-contained.

const DEFAULT_ITEMS = [
  { id: 't1', name: 'Avery Chen',     title: 'Head of Design, Northwave',   rating: 5, quote: 'The cleanest white-label dashboard system I have shipped. Our clients onboarded in under an hour.', avatar: '', accent: '#a78bfa' },
  { id: 't2', name: 'Marcus Hale',    title: 'Founder, Halecraft',          rating: 5, quote: 'Premium feel, modular pieces. We replaced three separate tools with one beautiful surface.', avatar: '', accent: '#22d3ee' },
  { id: 't3', name: 'Priya Anand',    title: 'CTO, Stellar Goods',          rating: 4, quote: 'Set up the whole storefront on a Friday afternoon. Looked like a six-month build.', avatar: '', accent: '#f97316' },
]

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(p => p[0]?.toUpperCase()).join('') || '·'
}

function StarRow({ value = 0 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[0,1,2,3,4].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < value ? '#fbbf24' : 'rgba(255,255,255,0.20)'}>
          <path d="M12 2l2.39 6.61L21 11l-6.61 2.39L12 20l-2.39-6.61L3 11l6.61-2.39L12 2z"/>
        </svg>
      ))}
    </span>
  )
}

export default function TestimonialsReviews({
  title = 'What teams are saying',
  subtitle = 'Real reviews from operators shipping production-grade work.',
  items = DEFAULT_ITEMS,
  textColor = '#ffffff',
}) {
  return (
    <div style={{
      width: '100%',
      containerType: 'inline-size',
      borderRadius: 'clamp(20px, 2.4cqi, 28px)',
      padding: 'clamp(16px, 3.2cqi, 28px)',
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
      color: textColor,
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 640 }}>
        <h3 style={{ margin: 0, fontSize: 'clamp(17px, 2.6cqi, 24px)', fontWeight: 700, letterSpacing: '-0.015em' }}>{title}</h3>
        {subtitle && <span style={{ fontSize: 'clamp(12px, 1.4cqi, 13px)', opacity: 0.65 }}>{subtitle}</span>}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
        gap: 14,
      }}>
        {items.map(t => (
          <figure key={t.id} style={{
            margin: 0,
            position: 'relative',
            borderRadius: 22,
            padding: 20,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', flexDirection: 'column', gap: 14,
            overflow: 'hidden',
          }}>
            {/* Quote glyph */}
            <svg aria-hidden width="34" height="34" viewBox="0 0 24 24" style={{
              position: 'absolute', top: 12, right: 14, opacity: 0.18,
              color: t.accent || '#a78bfa', fill: 'currentColor',
            }}>
              <path d="M9.13 8.23a4.93 4.93 0 00-3.13 4.6V18h5v-5.13H8.5c0-1.42 1.04-2.6 2.4-2.83l-1.77-1.81zm9 0a4.93 4.93 0 00-3.13 4.6V18h5v-5.13h-2.5c0-1.42 1.04-2.6 2.4-2.83l-1.77-1.81z"/>
            </svg>
            <StarRow value={t.rating} />
            <blockquote style={{
              margin: 0, fontSize: 14, lineHeight: 1.55,
              fontWeight: 500, letterSpacing: '-0.005em', color: textColor,
              opacity: 0.92,
            }}>
              “{t.quote}”
            </blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
              <span style={{
                width: 38, height: 38, borderRadius: '50%',
                background: t.avatar
                  ? `url('${t.avatar}') center/cover`
                  : `linear-gradient(135deg, ${t.accent || '#a78bfa'}, ${t.accent || '#a78bfa'}66)`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 13, fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.20)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.30)',
              }}>{!t.avatar && initials(t.name)}</span>
              <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.005em' }}>{t.name}</span>
                <span style={{ fontSize: 11, opacity: 0.65, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
