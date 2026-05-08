// ── FeaturesGrid ──
// Responsive 3-column glass grid of feature cards. Each card has a glowing
// inline-SVG icon tile, title, and short description. Self-contained so
// it works inside the deployed CarPlay client site without any external
// icon library — admin picks one of the named glyphs below per item, or
// falls back to the default sparkle.

const ICON_PATHS = {
  spark: 'M12 2l2.39 6.61L21 11l-6.61 2.39L12 20l-2.39-6.61L3 11l6.61-2.39L12 2z',
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7l1-8z',
  shield: 'M12 2L4 6v6c0 5 3.5 9.7 8 10 4.5-.3 8-5 8-10V6l-8-4z',
  rocket: 'M12 2c-3.5 4-5 8-5 12 0 1.5.5 3 1 4l4-3 4 3c.5-1 1-2.5 1-4 0-4-1.5-8-5-12zm0 9a2 2 0 110-4 2 2 0 010 4z',
  globe: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.7 0 3.3.5 4.6 1.4-.6 1.5-1.6 2.6-2.6 2.6h-4c-1 0-2-1.1-2.6-2.6C8.7 4.5 10.3 4 12 4zm-7 8c0-1.5.4-2.9 1.1-4.1.7 1.6 2 2.7 3.4 3.1H7c-1 0-2 1.1-2 3v.5c0-.8 0-1.7 0-2.5zm14 0c0 .8 0 1.7 0 2.5V14c0-1.9-1-3-2-3h-2.5c1.4-.4 2.7-1.5 3.4-3.1.7 1.2 1.1 2.6 1.1 4.1z',
  layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  lock: 'M12 2a4 4 0 00-4 4v3H6v13h12V9h-2V6a4 4 0 00-4-4zm0 2a2 2 0 012 2v3h-4V6a2 2 0 012-2z',
  chart: 'M3 3v18h18M7 14l4-4 4 3 5-7',
  heart: 'M12 21s-7-4.5-9-9.5S4 4 8 4s4 3 4 3 0-3 4-3 5 4.5 5 7.5-9 9.5-9 9.5z',
}

function GlyphIcon({ name = 'spark', color = '#fff' }) {
  const d = ICON_PATHS[name] || ICON_PATHS.spark
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

const DEFAULT_ITEMS = [
  { icon: 'bolt',   title: 'Instant launch',  description: 'Deploy a polished site in minutes — no scaffolding, no setup.', accent: '#f97316' },
  { icon: 'shield', title: 'Locked down',     description: 'Per-tenant isolation, signed previews, and audit-ready logs by default.', accent: '#22d3ee' },
  { icon: 'layers', title: 'Modular by design', description: 'Stack widgets, swap themes, and recompose any client site live.', accent: '#a78bfa' },
]

export default function FeaturesGrid({
  title = 'Built for premium teams',
  subtitle = 'A composable system designed to scale with your most demanding clients.',
  items = DEFAULT_ITEMS,
  textColor = '#ffffff',
}) {
  return (
    <div style={{
      width: '100%',
      containerType: 'inline-size',
      borderRadius: 'clamp(20px, 2.4cqi, 28px)',
      padding: 'clamp(18px, 3.6cqi, 32px)',
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
      color: textColor,
      display: 'flex', flexDirection: 'column', gap: 24,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 640 }}>
        <h3 style={{
          margin: 0, fontSize: 'clamp(18px, 3.2cqi, 30px)',
          fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15,
        }}>{title}</h3>
        {subtitle && (
          <p style={{ margin: 0, fontSize: 'clamp(12px, 1.5cqi, 15px)', opacity: 0.7, lineHeight: 1.55 }}>{subtitle}</p>
        )}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
        gap: 14,
      }}>
        {items.map((it, i) => (
          <div key={i} style={{
            position: 'relative',
            borderRadius: 20,
            padding: 18,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', flexDirection: 'column', gap: 12,
            overflow: 'hidden',
          }}>
            <div aria-hidden style={{
              position: 'absolute', top: -30, right: -30, width: 100, height: 100,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${it.accent || '#a78bfa'}55, transparent 70%)`,
              filter: 'blur(8px)',
            }} />
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: `linear-gradient(135deg, ${it.accent || '#a78bfa'}, ${it.accent || '#a78bfa'}99)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 6px 18px ${it.accent || '#a78bfa'}55, inset 0 1px 0 rgba(255,255,255,0.4)`,
              border: '1px solid rgba(255,255,255,0.25)',
            }}>
              <GlyphIcon name={it.icon} color="#fff" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>{it.title}</span>
              <span style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.5 }}>{it.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
