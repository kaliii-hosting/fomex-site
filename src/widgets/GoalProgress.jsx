// ── GoalProgress widget ──
// Progress bar widget — current vs target with a percentage pill. Useful
// for savings goals, monthly targets, fundraising, etc.

export default function GoalProgress({
  label = 'Savings goal',
  title = 'New laptop',
  current = '$1,420',
  target = '$2,000',
  percent = 71,
  caption = 'On track to hit your goal by Apr 30.',
  background = '#ffffff',
  textColor = '#15171a',
  accent = '#0F62A6',
}) {
  const pct = Math.max(0, Math.min(100, Number(percent) || 0))
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
      gap: 12,
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.55)',
          }}>{label}</span>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.2 }}>{title}</span>
        </div>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          color: accent,
          background: accent + '14',
          padding: '5px 10px',
          borderRadius: 999,
          fontVariantNumeric: 'tabular-nums',
        }}>{pct}%</span>
      </div>

      <div style={{
        height: 10,
        borderRadius: 999,
        background: 'rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: pct + '%',
          height: '100%',
          background: `linear-gradient(90deg, ${accent} 0%, ${accent}cc 100%)`,
          borderRadius: 999,
          transition: 'width 0.4s ease',
        }}/>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}>
        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{current}</span>
        <span style={{ color: 'rgba(0,0,0,0.55)', fontVariantNumeric: 'tabular-nums' }}>of {target}</span>
      </div>

      {caption && (
        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)', lineHeight: 1.4 }}>{caption}</span>
      )}
    </div>
  )
}
