// ── ImageGallerySlider ──
// Hero-image showcase with thumbnail strip + glass nav arrows. Active
// image is selected by index — non-interactive in the deployed
// template (admin presets the `activeIndex`); future revs can wire
// onClick on the thumbs to swap. Self-contained, no external deps.

import { useState } from 'react'

const DEFAULT_IMAGES = [
  // Soft gradient placeholders so the widget reads even before admin
  // pastes real image URLs. Each is a `linear-gradient` reference
  // re-built into a CSS background string at render time.
  { id: 'g1', url: '', caption: 'Aurora over the bay',     accent: '#7c3aed' },
  { id: 'g2', url: '', caption: 'Quiet morning light',     accent: '#0ea5e9' },
  { id: 'g3', url: '', caption: 'Studio at dawn',          accent: '#ec4899' },
  { id: 'g4', url: '', caption: 'Skyline reflected',       accent: '#f97316' },
  { id: 'g5', url: '', caption: 'Hand-poured concrete',    accent: '#22d3ee' },
]

export default function ImageGallerySlider({
  title = 'Selected work',
  subtitle = '',
  images = DEFAULT_IMAGES,
  activeIndex = 0,
  textColor = '#ffffff',
}) {
  const [idx, setIdx] = useState(Math.min(activeIndex, images.length - 1))
  const cur = images[idx] || images[0]
  const tile = (img) => img.url
    ? `url('${img.url}') center/cover`
    : `linear-gradient(135deg, ${img.accent || '#a78bfa'}, ${img.accent || '#a78bfa'}55)`

  const move = (delta) => setIdx(i => (i + delta + images.length) % images.length)

  return (
    <div style={{
      width: '100%',
      containerType: 'inline-size',
      borderRadius: 'clamp(20px, 2.4cqi, 28px)',
      padding: 'clamp(14px, 2.8cqi, 24px)',
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
      color: textColor,
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      {(title || subtitle) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {title && <h3 style={{ margin: 0, fontSize: 'clamp(17px, 2.6cqi, 24px)', fontWeight: 700, letterSpacing: '-0.015em' }}>{title}</h3>}
          {subtitle && <span style={{ fontSize: 'clamp(12px, 1.4cqi, 13px)', opacity: 0.65 }}>{subtitle}</span>}
        </div>
      )}

      {/* Hero image */}
      <div style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        borderRadius: 22,
        background: tile(cur),
        boxShadow: `0 16px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.18)`,
        overflow: 'hidden',
      }}>
        {/* Soft top haze + bottom dark gradient for caption legibility */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 25%, rgba(0,0,0,0.55) 100%)',
        }} />
        {/* Caption pill */}
        {cur?.caption && (
          <div style={{
            position: 'absolute', left: 12, bottom: 12,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(0,0,0,0.45)', color: '#fff',
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.18)',
            fontSize: 12, fontWeight: 600, letterSpacing: '-0.01em',
          }}>{cur.caption}</div>
        )}
        {/* Index pill */}
        <div style={{
          position: 'absolute', right: 12, top: 12,
          padding: '4px 10px', borderRadius: 999,
          background: 'rgba(0,0,0,0.45)', color: '#fff',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.16)',
          fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums',
        }}>{idx + 1} / {images.length}</div>
        {/* Nav arrows */}
        <button type="button" aria-label="Previous" onClick={() => move(-1)} style={navBtn('left')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button type="button" aria-label="Next" onClick={() => move(1)} style={navBtn('right')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Thumbs */}
      <div style={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'minmax(60px, 1fr)',
        gap: 8,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {images.map((img, i) => (
          <button
            key={img.id || i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              position: 'relative',
              border: 'none', padding: 0, cursor: 'pointer',
              aspectRatio: '4 / 3',
              borderRadius: 12,
              background: tile(img),
              boxShadow: i === idx
                ? `0 0 0 2px rgba(255,255,255,0.95), 0 6px 18px rgba(0,0,0,0.35)`
                : `0 4px 12px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.10)`,
              opacity: i === idx ? 1 : 0.65,
              transition: 'opacity .15s, box-shadow .15s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function navBtn(side) {
  return {
    position: 'absolute',
    [side]: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 36, height: 36, borderRadius: '50%',
    background: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.20)',
    color: '#fff', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  }
}
