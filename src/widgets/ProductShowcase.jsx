// ── ProductShowcase ──
// Premium e-commerce strip — horizontal scroll of glass product cards
// with image, title, price, star ratings, and an Add-to-cart pill button.
// Cards float on a translucent surface so the strip drops onto any
// dashboard wallpaper without a visible "card boundary". Self-contained.

const DEFAULT_ITEMS = [
  { id: 'p1', title: 'Aurora Pro', price: '$249', oldPrice: '$299', rating: 4.8, image: '', accent: '#f97316' },
  { id: 'p2', title: 'Nimbus Air', price: '$189', rating: 4.6, image: '', accent: '#a78bfa' },
  { id: 'p3', title: 'Halo Edition', price: '$319', rating: 4.9, image: '', accent: '#22d3ee' },
  { id: 'p4', title: 'Eclipse Mini', price: '$129', rating: 4.4, image: '', accent: '#ec4899' },
]

function StarRow({ value = 0 }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <span aria-label={`${value} stars`} style={{ display: 'inline-flex', gap: 1, color: '#fbbf24' }}>
      {[0,1,2,3,4].map(i => {
        const fill = i < full ? '#fbbf24' : (i === full && half ? 'url(#half)' : 'rgba(255,255,255,0.18)')
        return (
          <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={fill}>
            <defs>
              <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#fbbf24"/>
                <stop offset="50%" stopColor="rgba(255,255,255,0.18)"/>
              </linearGradient>
            </defs>
            <path d="M12 2l2.39 6.61L21 11l-6.61 2.39L12 20l-2.39-6.61L3 11l6.61-2.39L12 2z"/>
          </svg>
        )
      })}
    </span>
  )
}

export default function ProductShowcase({
  title = 'Featured drops',
  subtitle = 'New arrivals this week — curated, in stock, ready to ship.',
  items = DEFAULT_ITEMS,
  textColor = '#ffffff',
  ctaLabel = 'View all',
  ctaUrl = '#',
}) {
  return (
    <div style={{
      borderRadius: 28,
      padding: 'clamp(20px, 3vw, 28px)',
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
      color: textColor,
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h3 style={{ margin: 0, fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 700, letterSpacing: '-0.015em' }}>{title}</h3>
          {subtitle && <span style={{ fontSize: 13, opacity: 0.65 }}>{subtitle}</span>}
        </div>
        <a href={ctaUrl} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 600, color: textColor, opacity: 0.85,
          textDecoration: 'none',
          padding: '8px 14px', borderRadius: 999,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
        }}>
          {ctaLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
      }}>
        {items.map(p => (
          <div key={p.id} style={{
            position: 'relative',
            borderRadius: 22,
            padding: 12,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', flexDirection: 'column', gap: 10,
            overflow: 'hidden',
          }}>
            {/* Image / accent tile */}
            <div style={{
              position: 'relative',
              aspectRatio: '4 / 3',
              borderRadius: 16,
              background: p.image
                ? `url('${p.image}') center/cover`
                : `linear-gradient(135deg, ${p.accent || '#a78bfa'}, ${p.accent || '#a78bfa'}66)`,
              boxShadow: `0 8px 24px ${(p.accent || '#a78bfa')}55, inset 0 1px 0 rgba(255,255,255,0.25)`,
              overflow: 'hidden',
            }}>
              {p.oldPrice && (
                <span style={{
                  position: 'absolute', top: 8, left: 8,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  padding: '4px 8px', borderRadius: 999,
                  background: 'rgba(0,0,0,0.45)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.20)',
                }}>SALE</span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.title}</span>
              <StarRow value={p.rating} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{p.price}</span>
                {p.oldPrice && <span style={{ fontSize: 12, opacity: 0.5, textDecoration: 'line-through' }}>{p.oldPrice}</span>}
              </span>
              <button type="button" aria-label="Add to cart" style={{
                width: 32, height: 32, borderRadius: '50%',
                background: textColor, color: '#0a0a0a',
                border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
