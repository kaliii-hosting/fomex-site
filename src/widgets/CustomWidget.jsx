// ── CustomWidget ─────────────────────────────────────────────────────
// Admin-composed widget rendered entirely from structured form fields —
// no HTML editing needed by the admin. Layout: eyebrow + headline +
// subtitle + bullet list + optional inline image + two CTAs, all on top
// of a configurable surface (glass / color / gradient / image / video /
// none).
//
// Two modes, controlled by `needsFunctionality`:
//
//   • Design mode (default) — renders the structured content over the
//     chosen background. Admins use this for hero banners, promo cards,
//     photo strips, video walls — anything that's pure layout + content.
//
//   • Functionality mode (`needsFunctionality === true|'yes'`) — the
//     runtime widget shows a "needs code" placeholder card and the
//     Builder surfaces a "Push to GitHub" button that drops a stub file
//     into the client's site repo. A developer wires up the real
//     behaviour later. We never execute admin-supplied JS in the
//     deployed site — that would punch a hole in tenant isolation.
//
// Self-contained, inline styles only, container-query responsive. Ships
// unchanged into the deployed template repo.
// ─────────────────────────────────────────────────────────────────────

const GLASS_BG = 'rgba(255,255,255,0.04)'
const GLASS_BORDER = '1px solid rgba(255,255,255,0.10)'
const GLASS_SHADOW = '0 12px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)'

export default function CustomWidget({
  // ── Content (structured — no HTML body required) ──
  name = 'Custom widget',
  eyebrow = '',
  headline = 'A custom block, your way',
  subtitle = 'Edit this widget in the Builder to change the headline, copy, list items, image, and call-to-action buttons.',
  bullets = [],
  imageUrl = '',
  imagePosition = 'right',           // right | left | top | bottom | none
  primaryLabel = '',
  primaryUrl = '#',
  secondaryLabel = '',
  secondaryUrl = '#',

  // ── Layout / surface ──
  backgroundType = 'glass',           // glass | color | gradient | image | video | none
  backgroundColor = '#0a0a0a',
  gradientFrom = '#7c3aed',
  gradientTo = '#0ea5e9',
  backgroundImage = '',
  backgroundVideo = '',
  videoPoster = '',                   // optional poster image while the video loads
  textColor = '#ffffff',
  accent = '#a78bfa',
  align = 'left',                     // left | center | right
  padding = 32,
  minHeight = 220,

  // ── Functionality placeholder (Push-to-GitHub flow) ──
  needsFunctionality = false,
  functionalityNote = 'Interactive form / API call / dynamic data',
  pushedAt = '',
  pushedUrl = '',
}) {
  // Coerce booleans + select-string. Form select stores 'yes' / ''
  // while the runtime / Test Lab may pass actual booleans.
  const isPlaceholder = needsFunctionality === true || needsFunctionality === 'yes'

  // Build the outer background.
  // For image / video we render the media at z-index 0 and put the
  // content stack at z-index 2 with a subtle gradient veil at z-index 1
  // so the text stays legible. backdrop-filter is NOT used over a video
  // because it would blur the video unrecognisably.
  let outerFill = GLASS_BG
  if (backgroundType === 'color') outerFill = backgroundColor
  else if (backgroundType === 'gradient') outerFill = `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
  else if (backgroundType === 'image' || backgroundType === 'video') outerFill = '#000'
  else if (backgroundType === 'none') outerFill = 'transparent'

  const useGlassEffect = backgroundType === 'glass'

  // Functionality-mode placeholder. We deliberately do NOT render the
  // admin's content here — a "needs JS" widget is usually missing the
  // logic that would make its UI behave, so showing static content
  // would mislead clients.
  if (isPlaceholder) {
    return <PlaceholderCard {...{ name, headline, subtitle, functionalityNote, textColor, pushedAt, pushedUrl }} />
  }

  // ── Design-mode render ────────────────────────────────────────────
  const horizontalImage = imageUrl && (imagePosition === 'left' || imagePosition === 'right')
  const verticalImage = imageUrl && (imagePosition === 'top' || imagePosition === 'bottom')
  const stackDir = imagePosition === 'top' ? 'column' :
                   imagePosition === 'bottom' ? 'column-reverse' :
                   imagePosition === 'left' ? 'row' :
                   imagePosition === 'right' ? 'row-reverse' : 'column'

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        containerType: 'inline-size',
        borderRadius: 'clamp(20px, 2.4cqi, 28px)',
        padding: typeof padding === 'number' ? `clamp(16px, 3.2cqi, ${padding}px)` : padding,
        minHeight: typeof minHeight === 'number' ? `clamp(${Math.min(minHeight, 180)}px, 22cqi, ${minHeight}px)` : minHeight,
        background: outerFill,
        backdropFilter: useGlassEffect ? 'blur(28px) saturate(160%)' : undefined,
        WebkitBackdropFilter: useGlassEffect ? 'blur(28px) saturate(160%)' : undefined,
        border: backgroundType === 'none' ? 'none' : GLASS_BORDER,
        boxShadow: backgroundType === 'none' ? 'none' : GLASS_SHADOW,
        color: textColor,
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Layer 0: image / video bg fills the card behind everything */}
      {backgroundType === 'image' && backgroundImage && (
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
      )}
      {backgroundType === 'video' && backgroundVideo && (
        <video
          key={backgroundVideo}
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={videoPoster || undefined}
          src={backgroundVideo}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0, pointerEvents: 'none',
            // Hint browsers to keep playing even when the element is
            // partially off-screen (e.g. inside a horizontally-scrolling
            // preview frame).
          }}
        />
      )}
      {/* Layer 1: gradient veil for text legibility — only over media. */}
      {(backgroundType === 'image' || backgroundType === 'video') && (
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.55) 100%)',
        }} />
      )}

      {/* Layer 2: content stack */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: stackDir,
        alignItems: imagePosition === 'top' || imagePosition === 'bottom' ? 'stretch' : 'center',
        gap: 'clamp(16px, 2.4cqi, 28px)',
        textAlign: align,
      }}>
        {/* Inline image — sits beside the text stack on left/right, or
            above/below depending on imagePosition. */}
        {(horizontalImage || verticalImage) && (
          <div style={{
            flex: horizontalImage ? '0 0 40%' : 'unset',
            width: verticalImage ? '100%' : 'auto',
            aspectRatio: '4 / 3',
            borderRadius: 18,
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.10)',
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        )}

        {/* Text + bullets + CTAs */}
        <div style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(8px, 1.4cqi, 14px)',
          alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        }}>
          {eyebrow && (
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '5px 11px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: textColor,
            }}>{eyebrow}</span>
          )}
          {headline && (
            <h2 style={{
              margin: 0,
              fontSize: 'clamp(20px, 4.4cqi, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              textShadow: backgroundType === 'image' || backgroundType === 'video'
                ? '0 2px 16px rgba(0,0,0,0.45)' : 'none',
            }}>{headline}</h2>
          )}
          {subtitle && (
            <p style={{
              margin: 0,
              fontSize: 'clamp(13px, 1.7cqi, 16px)',
              opacity: 0.82,
              lineHeight: 1.55,
              maxWidth: '62ch',
            }}>{subtitle}</p>
          )}
          {Array.isArray(bullets) && bullets.length > 0 && (
            <ul style={{
              margin: '4px 0 0',
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              alignSelf: align === 'center' ? 'center' : 'stretch',
            }}>
              {bullets.map((b, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: 'clamp(13px, 1.5cqi, 14px)',
                  lineHeight: 1.55,
                  opacity: 0.92,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}>
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{String(b)}</span>
                </li>
              ))}
            </ul>
          )}
          {(primaryLabel || secondaryLabel) && (
            <div style={{
              marginTop: 'clamp(6px, 1.4cqi, 14px)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
            }}>
              {primaryLabel && (
                <a href={primaryUrl || '#'} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 20px',
                  borderRadius: 999,
                  background: textColor,
                  color: '#0a0a0a',
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}>
                  {primaryLabel}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              )}
              {secondaryLabel && (
                <a href={secondaryUrl || '#'} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 20px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  color: textColor,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.22)',
                }}>
                  {secondaryLabel}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating accent glow — purely decorative */}
      <div aria-hidden style={{
        position: 'absolute', top: -40, right: -40, width: 180, height: 180,
        borderRadius: '50%', zIndex: 0,
        background: `radial-gradient(circle, ${accent}55, transparent 70%)`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ── Placeholder card shown when needsFunctionality === 'yes' ────────
function PlaceholderCard({ name, headline, subtitle, functionalityNote, textColor, pushedAt, pushedUrl }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        containerType: 'inline-size',
        borderRadius: 'clamp(20px, 2.4cqi, 28px)',
        padding: 'clamp(20px, 3.6cqi, 36px)',
        background: GLASS_BG,
        backdropFilter: 'blur(28px) saturate(160%)',
        WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        border: GLASS_BORDER,
        boxShadow: GLASS_SHADOW,
        color: textColor,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        padding: '5px 10px',
        borderRadius: 999,
        background: 'rgba(251, 191, 36, 0.16)',
        border: '1px solid rgba(251, 191, 36, 0.36)',
        color: '#fde68a',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L1 22h22L12 2zm0 4l8.5 14h-17L12 6zm-1 5v5h2v-5h-2zm0 7v2h2v-2h-2z" />
        </svg>
        Custom widget · needs code
      </span>
      <h3 style={{
        margin: 0,
        fontSize: 'clamp(18px, 3.2cqi, 26px)',
        fontWeight: 700,
        letterSpacing: '-0.015em',
      }}>{name || headline || 'Custom widget'}</h3>
      {subtitle && (
        <p style={{
          margin: 0,
          fontSize: 'clamp(13px, 1.6cqi, 15px)',
          opacity: 0.78,
          lineHeight: 1.5,
          maxWidth: '60ch',
        }}>{subtitle}</p>
      )}
      <p style={{
        margin: 0,
        fontSize: 'clamp(12px, 1.5cqi, 14px)',
        opacity: 0.7,
        lineHeight: 1.5,
        maxWidth: '60ch',
      }}>
        {functionalityNote || 'This widget needs JS / API / form behaviour. A stub component will be pushed to the client repo for a developer to wire up.'}
      </p>
      <div style={{
        marginTop: 4,
        padding: '12px 14px',
        borderRadius: 14,
        background: 'rgba(255,255,255,0.04)',
        border: '1px dashed rgba(255,255,255,0.18)',
        fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.5,
        overflowX: 'auto',
      }}>
        {pushedAt ? (
          <>
            Stub pushed to GitHub on {new Date(pushedAt).toLocaleString()}.<br />
            {pushedUrl ? <>File: <a href={pushedUrl} target="_blank" rel="noreferrer" style={{ color: '#7dd3fc' }}>{pushedUrl.replace(/^https?:\/\//, '')}</a></> : null}
          </>
        ) : (
          <>// awaiting code push — admin can press &ldquo;Agent code&rdquo; on the Builder card</>
        )}
      </div>
    </div>
  )
}
