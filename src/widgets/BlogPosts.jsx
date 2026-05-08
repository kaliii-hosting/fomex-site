// ── BlogPosts ──
// Editorial-style 3-up grid of article cards with thumbnail, category
// pill, title, date, and read-more arrow. Self-contained.

const DEFAULT_ITEMS = [
  { id: 'b1', category: 'Design', title: 'Designing for the next decade of dashboards',     date: 'May 2026', minutes: 6, thumb: '', accent: '#a78bfa', url: '#' },
  { id: 'b2', category: 'Engineering', title: 'How we shipped 200 client sites in one quarter', date: 'Apr 2026', minutes: 4, thumb: '', accent: '#22d3ee', url: '#' },
  { id: 'b3', category: 'Product', title: 'A modular widget system, explained',              date: 'Mar 2026', minutes: 5, thumb: '', accent: '#f97316', url: '#' },
]

export default function BlogPosts({
  title = 'Latest from the team',
  subtitle = 'Field notes, deep dives, and product changelog highlights.',
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
        {items.map(post => (
          <a key={post.id} href={post.url || '#'} style={{
            position: 'relative',
            display: 'flex', flexDirection: 'column', gap: 12,
            padding: 14,
            borderRadius: 22,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: textColor, textDecoration: 'none',
            overflow: 'hidden',
            transition: 'transform .15s, box-shadow .15s',
          }}>
            {/* Thumb */}
            <div style={{
              aspectRatio: '16 / 9',
              borderRadius: 16,
              background: post.thumb
                ? `url('${post.thumb}') center/cover`
                : `linear-gradient(135deg, ${post.accent || '#a78bfa'}, ${post.accent || '#a78bfa'}55)`,
              boxShadow: `0 6px 20px ${(post.accent || '#a78bfa')}55, inset 0 1px 0 rgba(255,255,255,0.20)`,
              overflow: 'hidden',
            }} />
            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, opacity: 0.72, letterSpacing: '0.04em' }}>
              <span style={{
                padding: '3px 8px', borderRadius: 999,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
                fontWeight: 700, textTransform: 'uppercase',
              }}>{post.category}</span>
              <span>·</span>
              <span>{post.date}</span>
              {post.minutes && <><span>·</span><span>{post.minutes} min read</span></>}
            </div>
            {/* Title */}
            <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.01em' }}>
              {post.title}
            </h4>
            {/* Read more */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 'auto', fontSize: 12, fontWeight: 600, opacity: 0.85 }}>
              Read article
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
