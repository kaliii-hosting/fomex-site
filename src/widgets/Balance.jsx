// ── Balance widget ──
// iOS / Wells-Fargo style account-balance card. Big tabular-number value,
// label, optional change %, account meta line, and a primary action pill.
// Mobile-responsive — uses clamp() for the headline and a column-flex layout
// so it shrinks gracefully into 320px-ish viewports.

export default function Balance({
  label = 'Available balance',
  amount = '$12,480.55',
  change = '+$340 today',
  changeDirection = 'up',
  accountMeta = '••• 4582 · Checking',
  ctaLabel = 'Transfer',
  ctaUrl = '#',
  background = '#ffffff',
  textColor = '#15171a',
  accent = '#C8102E', // WF red
}) {
  const isUp = changeDirection !== 'down'
  const changeColor = isUp ? '#1f7a3f' : '#b3261e'
  return (
    <div style={{
      background,
      color: textColor,
      borderRadius: 22,
      padding: 'clamp(16px, 4vw, 22px)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.55)',
        }}>{label}</span>
        <span aria-hidden style={{
          width: 32, height: 32, borderRadius: 10,
          background: accent + '1a', color: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700,
        }}>$</span>
      </div>

      <div style={{
        fontSize: 'clamp(28px, 8vw, 40px)',
        fontWeight: 700,
        letterSpacing: -0.6,
        lineHeight: 1.05,
        fontVariantNumeric: 'tabular-nums',
      }}>{amount}</div>

      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: changeColor,
            background: changeColor + '14',
            padding: '4px 8px',
            borderRadius: 999,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <span aria-hidden>{isUp ? '▲' : '▼'}</span>
            {change}
          </span>
          <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>{accountMeta}</span>
        </div>
      )}

      {ctaLabel && (
        <a href={ctaUrl || '#'} style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          padding: '0 18px',
          borderRadius: 999,
          background: accent,
          color: '#fff',
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
          alignSelf: 'flex-start',
        }}>{ctaLabel}</a>
      )}
    </div>
  )
}
