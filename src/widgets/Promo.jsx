// ── Promo widget ──
// iOS-style featured-offer card. Optional background image (with gradient
// overlay so text stays readable) or a flat tinted background. Eyebrow tag,
// large headline, body, and a pill CTA. Mobile-responsive.

export default function Promo({
  eyebrow = 'Limited offer',
  headline = 'Earn 5% back this quarter',
  body = 'Activate the bonus category before the period ends.',
  ctaLabel = 'Activate',
  ctaUrl = '#',
  backgroundImage = '',
  background = '#0F62A6',
  textColor = '#ffffff',
  accent = '#FFCD41',
}) {
  const hasImg = !!backgroundImage
  return (
    <a href={ctaUrl || '#'} style={{
      position: 'relative',
      display: 'block',
      width: '100%',
      boxSizing: 'border-box',
      borderRadius: 22,
      overflow: 'hidden',
      textDecoration: 'none',
      color: textColor,
      background: hasImg ? '#000' : background,
      boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.10)',
      minHeight: 180,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
    }}>
      {hasImg && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            draggable={false}
          />
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)',
          }}/>
        </>
      )}
      <div style={{
        position: 'relative',
        padding: 'clamp(18px, 5vw, 26px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minHeight: 180,
        boxSizing: 'border-box',
      }}>
        {eyebrow && (
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            color: accent,
            alignSelf: 'flex-start',
          }}>{eyebrow}</span>
        )}
        <span style={{
          fontSize: 'clamp(20px, 5.5vw, 26px)',
          fontWeight: 700,
          letterSpacing: -0.3,
          lineHeight: 1.15,
          maxWidth: '90%',
        }}>{headline}</span>
        {body && (
          <span style={{
            fontSize: 14,
            opacity: 0.85,
            maxWidth: '90%',
            lineHeight: 1.4,
          }}>{body}</span>
        )}
        {ctaLabel && (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 38,
            padding: '0 18px',
            borderRadius: 999,
            background: '#fff',
            color: '#15171a',
            fontSize: 14,
            fontWeight: 600,
            alignSelf: 'flex-start',
            marginTop: 4,
          }}>{ctaLabel}</span>
        )}
      </div>
    </a>
  )
}
