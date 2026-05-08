// ── HeroSection ──
// Full-width glass hero with eyebrow + headline + subtitle + 2 CTAs.
// Optional backgroundImage paints behind a frosted overlay so the card
// looks layered. Floating UI indicator pills at top-right add the
// "production-ready dashboard" feel the brief calls for.
// Self-contained — no external imports — so it ships into the deployed
// template repo unchanged. Inline SVG glyphs only.

export default function HeroSection({
  eyebrow = 'New release',
  headline = 'Build faster. Launch sharper.',
  subtitle = 'A modular dashboard system designed for the next generation of premium web experiences.',
  primaryLabel = 'Get started',
  primaryUrl = '#',
  secondaryLabel = 'Watch demo',
  secondaryUrl = '#',
  backgroundImage = '',
  gradientFrom = '#7c3aed',
  gradientTo = '#0ea5e9',
  accent = '#a78bfa',
  textColor = '#ffffff',
  badgeText = 'v2.0 · Live',
}) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 28,
      padding: 'clamp(24px, 4vw, 40px)',
      minHeight: 'clamp(260px, 32vw, 420px)',
      overflow: 'hidden',
      isolation: 'isolate',
      background: backgroundImage
        ? `linear-gradient(135deg, ${gradientFrom}33, ${gradientTo}33)`
        : `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      border: '1px solid rgba(255,255,255,0.16)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
      color: textColor,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      gap: 20,
    }}>
      {/* Optional backdrop image */}
      {backgroundImage && (
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: -1,
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.55, filter: 'saturate(140%)',
        }} />
      )}
      {/* Frosted overlay haze */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: -1,
        background: 'radial-gradient(120% 60% at 0% 0%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(80% 60% at 100% 100%, rgba(0,0,0,0.28), transparent 60%)',
      }} />

      {/* Top row — eyebrow + floating badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '6px 12px', borderRadius: 999,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: textColor,
        }}>{eyebrow}</span>
        {badgeText && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.16)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: `0 0 10px #34d399` }} />
            {badgeText}
          </span>
        )}
      </div>

      {/* Headline + subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: '720px' }}>
        <h2 style={{
          margin: 0,
          fontSize: 'clamp(28px, 4.4vw, 56px)',
          fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05,
          textShadow: '0 2px 16px rgba(0,0,0,0.25)',
        }}>{headline}</h2>
        <p style={{
          margin: 0,
          fontSize: 'clamp(14px, 1.4vw, 18px)',
          lineHeight: 1.5, opacity: 0.85,
          maxWidth: '60ch',
        }}>{subtitle}</p>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <a href={primaryUrl} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 22px',
          borderRadius: 999,
          background: textColor,
          color: gradientFrom,
          fontWeight: 700, fontSize: 14,
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.5)',
          border: '1px solid rgba(255,255,255,0.4)',
        }}>
          {primaryLabel}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </a>
        <a href={secondaryUrl} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 22px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(20px)',
          color: textColor,
          fontWeight: 600, fontSize: 14,
          textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.22)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          {secondaryLabel}
        </a>
      </div>

      {/* Floating accent dot */}
      <div aria-hidden style={{
        position: 'absolute', top: -40, right: -40, width: 180, height: 180,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}66, transparent 70%)`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
