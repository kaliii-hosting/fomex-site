// ── QuickActions widget ──
// iOS-style 4-tile colored shortcut grid. Each tile is a colored icon-square
// + label, link target. Wraps to 2-col on narrow viewports automatically via
// auto-fit grid.

export default function QuickActions({
  title = 'Quick actions',
  items = [
    { emoji: '↗',  label: 'Transfer', color: '#0F62A6', href: '#' },
    { emoji: '＋', label: 'Deposit',  color: '#1f7a3f', href: '#' },
    { emoji: '⚡', label: 'Pay',      color: '#A05B00', href: '#' },
    { emoji: '⋯',  label: 'More',     color: '#3c3f44', href: '#' },
  ],
  background = '#ffffff',
  textColor = '#15171a',
}) {
  return (
    <div style={{
      background,
      color: textColor,
      borderRadius: 22,
      padding: 'clamp(14px, 3.5vw, 20px)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
    }}>
      {title && (
        <div style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.55)',
        }}>{title}</div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(64px, 1fr))',
        gap: 10,
      }}>
        {items.map((item, i) => (
          <a key={i} href={item.href || '#'} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
            color: textColor,
          }}>
            <span aria-hidden style={{
              width: 'clamp(46px, 12vw, 56px)',
              height: 'clamp(46px, 12vw, 56px)',
              borderRadius: 16,
              background: (item.color || '#3c3f44') + '14',
              color: item.color || '#3c3f44',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              boxShadow: 'inset 0 0 0 1px ' + (item.color || '#3c3f44') + '22',
            }}>{item.emoji || '◦'}</span>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
