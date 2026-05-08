// ── AnalyticsStats ──
// Futuristic data viz: 4 KPI tiles with neon trend arrows + a compact
// SVG sparkline area chart + a traffic-source breakdown row. All shapes
// are pure inline SVG — no chart library — so the widget is portable.

const DEFAULT_KPIS = [
  { id: 'k1', label: 'Visitors',    value: '24.8K', change: '+12.4%', up: true,  accent: '#22d3ee' },
  { id: 'k2', label: 'Revenue',     value: '$182K', change: '+8.1%',  up: true,  accent: '#a78bfa' },
  { id: 'k3', label: 'Conversion',  value: '3.42%', change: '-0.6%',  up: false, accent: '#f97316' },
  { id: 'k4', label: 'Avg session', value: '4m 21s',change: '+19s',   up: true,  accent: '#ec4899' },
]
const DEFAULT_SERIES = [12, 18, 14, 22, 28, 24, 30, 34, 31, 38, 42, 40, 46, 52]
const DEFAULT_SOURCES = [
  { label: 'Direct',   pct: 38, color: '#a78bfa' },
  { label: 'Search',   pct: 28, color: '#22d3ee' },
  { label: 'Social',   pct: 18, color: '#ec4899' },
  { label: 'Referral', pct: 11, color: '#f97316' },
  { label: 'Other',    pct: 5,  color: '#10b981' },
]

function Sparkline({ series = DEFAULT_SERIES, accent = '#22d3ee', height = 80 }) {
  if (!Array.isArray(series) || series.length < 2) return null
  const w = 320
  const max = Math.max(...series), min = Math.min(...series)
  const range = max - min || 1
  const dx = w / (series.length - 1)
  const pts = series.map((v, i) => [i * dx, height - 10 - ((v - min) / range) * (height - 24)])
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L ${w},${height} L 0,${height} Z`
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" width="100%" height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="ana-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.65"/>
          <stop offset="100%" stopColor={accent} stopOpacity="0"/>
        </linearGradient>
        <filter id="ana-glow"><feGaussianBlur stdDeviation="2.4" /></filter>
      </defs>
      <path d={areaPath} fill="url(#ana-grad)" />
      <path d={linePath} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#ana-glow)" opacity="0.55" />
      <path d={linePath} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AnalyticsStats({
  title = 'Live overview',
  subtitle = 'Last 30 days · auto-refreshed',
  kpis = DEFAULT_KPIS,
  series = DEFAULT_SERIES,
  sources = DEFAULT_SOURCES,
  accent = '#22d3ee',
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
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h3 style={{ margin: 0, fontSize: 'clamp(17px, 2.6cqi, 24px)', fontWeight: 700, letterSpacing: '-0.015em' }}>{title}</h3>
          {subtitle && <span style={{ fontSize: 'clamp(11px, 1.3cqi, 12px)', opacity: 0.65 }}>{subtitle}</span>}
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 999,
          background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.32)',
          color: '#86efac', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          LIVE
        </span>
      </div>

      {/* KPI tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: 10 }}>
        {kpis.map(k => (
          <div key={k.id} style={{
            position: 'relative',
            borderRadius: 18, padding: 14,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', flexDirection: 'column', gap: 6,
            overflow: 'hidden',
          }}>
            <div aria-hidden style={{
              position: 'absolute', top: -16, right: -16, width: 60, height: 60,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${k.accent}55, transparent 70%)`,
              filter: 'blur(8px)',
            }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', opacity: 0.65 }}>{k.label}</span>
            <span style={{ fontSize: 'clamp(18px, 3.2cqi, 26px)', fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.015em' }}>{k.value}</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              alignSelf: 'flex-start',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.02em',
              color: k.up ? '#86efac' : '#fca5a5',
              padding: '3px 8px', borderRadius: 999,
              background: k.up ? 'rgba(34,197,94,0.10)' : 'rgba(239,68,68,0.10)',
              border: `1px solid ${k.up ? 'rgba(34,197,94,0.30)' : 'rgba(239,68,68,0.30)'}`,
            }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                {k.up ? <path d="M12 4l8 8h-5v8h-6v-8H4z"/> : <path d="M12 20l8-8h-5V4h-6v8H4z"/>}
              </svg>
              {k.change}
            </span>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div style={{
        position: 'relative',
        borderRadius: 20, padding: 14,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.7 }}>Traffic · 30d</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: '0.04em' }}>↗ trending up</span>
        </div>
        <Sparkline series={series} accent={accent} />
      </div>

      {/* Sources */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.65 }}>Top sources</span>
        <div style={{ display: 'flex', height: 8, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
          {sources.map(s => (
            <div key={s.label} title={`${s.label} ${s.pct}%`} style={{
              flex: s.pct,
              background: s.color,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.30), 0 0 12px ${s.color}99`,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {sources.map(s => (
            <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, opacity: 0.85 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
              <span style={{ fontWeight: 600 }}>{s.label}</span>
              <span style={{ opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>{s.pct}%</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
