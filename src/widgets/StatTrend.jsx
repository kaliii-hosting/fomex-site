// ── StatTrend widget ──
// Single-metric card with a tiny SVG sparkline + delta pill. Useful for
// daily revenue, signups, orders, etc. Sparkline points are normalized to
// the card width so any monotonic series of 6-12 numbers looks reasonable.

export default function StatTrend({
  label = "Today's sales",
  value = '$1,240',
  change = '+12%',
  changeDirection = 'up',
  sparkline = [4, 6, 5, 8, 7, 11, 13],
  background = '#ffffff',
  textColor = '#15171a',
  accent = '#1f7a3f',
}) {
  const isUp = changeDirection !== 'down'
  const w = 100
  const h = 32
  const series = Array.isArray(sparkline) && sparkline.length > 1
    ? sparkline.map(Number).filter(n => Number.isFinite(n))
    : [1, 1]
  const min = Math.min(...series)
  const max = Math.max(...series)
  const span = max - min || 1
  const stepX = w / (series.length - 1)
  const path = series.map((v, i) => {
    const x = i * stepX
    const y = h - ((v - min) / span) * h
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')

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
      gap: 10,
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
    }}>
      <span style={{
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.55)',
      }}>{label}</span>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
        <span style={{
          fontSize: 'clamp(24px, 7vw, 32px)',
          fontWeight: 700,
          letterSpacing: -0.4,
          fontVariantNumeric: 'tabular-nums',
        }}>{value}</span>
        <svg viewBox={`0 0 ${w} ${h}`} width="100" height="32" preserveAspectRatio="none" aria-hidden>
          <path d={path} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={`${path} L${w},${h} L0,${h} Z`} fill={accent} opacity="0.12"/>
        </svg>
      </div>

      {change && (
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: isUp ? '#1f7a3f' : '#b3261e',
          background: (isUp ? '#1f7a3f' : '#b3261e') + '14',
          padding: '4px 8px',
          borderRadius: 999,
          alignSelf: 'flex-start',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <span aria-hidden>{isUp ? '▲' : '▼'}</span>
          {change}
        </span>
      )}
    </div>
  )
}
