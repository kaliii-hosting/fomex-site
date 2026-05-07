// ── CarPlayDashboard ──
// Deployed-site twin of the admin Builder's CarPlayDashboardPreview.
// Floating left sidebar (status + dock icons + home button) plus a content
// column with above-zone widgets, the app-icon grid, and below-zone
// widgets — scrollable. Keep this file in sync with the admin repo's
// src/components/CarPlayDashboardPreview.jsx so visitor-facing render and
// admin-facing preview stay visually identical.

import { WidgetRenderer } from '../widgets'

const ICON_BASE = 'https://fchtwxunzmkzbnibqbwl.supabase.co/storage/v1/object/public/kaliii/Palntier%20ICons'

// v1: hardcoded app icons. Visitors see the CarPlay-style grid even on a
// brand-new client. Per-client icon customisation lands in a follow-up
// where the dock + grid become widget-driven too.
const PREVIEW_APPS = [
  { id: 'phone',      name: 'Phone',       src: `${ICON_BASE}/Icons-%20phone.png` },
  { id: 'maps',       name: 'Maps',        src: `${ICON_BASE}/icon-maps%201400149999.png` },
  { id: 'messages',   name: 'Messages',    src: `${ICON_BASE}/icons-messages%20II.png` },
  { id: 'mail',       name: 'Mail',        src: `${ICON_BASE}/icon-mail%208988.png` },
  { id: 'orders',     name: 'Orders',      src: `${ICON_BASE}/icon-orders%202000.png` },
  { id: 'shop',       name: 'Shop',        src: `${ICON_BASE}/icon-shop%209000.png` },
  { id: 'calendar',   name: 'Calendar',    src: `${ICON_BASE}/icon-calendar%20iui93939jjdhdhd.png` },
  { id: 'settings',   name: 'Settings',    src: `${ICON_BASE}/icon-settings%209090.png` },
  { id: 'barcode',    name: 'Barcode',     src: 'https://fchtwxunzmkzbnibqbwl.supabase.co/storage/v1/object/public/kaliii/icons-%20barcodes%20II.png' },
  { id: 'onboarding', name: 'Get Started', src: `${ICON_BASE}/icon-start%20onboarding%20100.png` },
]

const SIDEBAR_DOCK = [
  { id: 'phone',      title: 'Phone',       src: `${ICON_BASE}/Icons-%20phone.png` },
  { id: 'messages',   title: 'Messages',    src: `${ICON_BASE}/icons-messages%20II.png` },
  { id: 'onboarding', title: 'Get Started', src: `${ICON_BASE}/icon-start%20onboarding%20100.png` },
]

function Sidebar() {
  return (
    <div className="cp-sidebar cpdp-sidebar">
      <div className="cp-dock">
        <div className="cp-dock-status">
          <span className="cp-sb-time">10:24</span>
          <div className="cp-sb-signal">
            <svg width="14" height="10" viewBox="0 0 16 12" fill="#fff">
              <rect x="0" y="9" width="3" height="3" rx="0.5"/>
              <rect x="4.5" y="6" width="3" height="6" rx="0.5"/>
              <rect x="9" y="3" width="3" height="9" rx="0.5"/>
              <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3"/>
            </svg>
            <span className="cp-sb-5g">LTE</span>
          </div>
          <div className="cp-dock-battery">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="#30D158">
              <path d="M6.5 0L0 9h4L3.5 16 10 7H6L6.5 0z"/>
            </svg>
            <svg width="22" height="11" viewBox="0 0 27 13" fill="none">
              <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="#fff" strokeWidth="1.2"/>
              <rect x="2" y="2" width="16" height="9" rx="1.5" fill="#30D158"/>
              <rect x="23.5" y="3.5" width="2.5" height="6" rx="1" fill="#fff" opacity="0.35"/>
            </svg>
          </div>
        </div>

        <div className="cp-dock-divider"/>

        {SIDEBAR_DOCK.map(d => (
          <button key={d.id} type="button" className="cp-dock-btn" tabIndex={-1} title={d.title}>
            <div className="cp-dock-icon-wrap cp-dock-icon-img">
              <img src={d.src} alt={d.title} draggable={false}/>
            </div>
          </button>
        ))}

        <div className="cp-dock-spacer"/>

        <button type="button" className="cp-dock-btn" tabIndex={-1} title="Home">
          <div className="cp-dock-home-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="1" width="6" height="6" rx="1"/>
              <rect x="9" y="1" width="6" height="6" rx="1"/>
              <rect x="1" y="9" width="6" height="6" rx="1"/>
              <rect x="9" y="9" width="6" height="6" rx="1"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function CarPlayDashboard({ above = [], below = [] }) {
  return (
    <div className="cpdp-root">
      <Sidebar />
      <div className="cpdp-content">
        {above.length > 0 && (
          <div className="cpdp-zone">
            {above.map((w, i) => (
              <WidgetRenderer key={w.id || `above-${i}`} widget={w} />
            ))}
          </div>
        )}

        <div className="cpdp-grid-frame">
          <div className="cp-icon-grid cpdp-grid">
            {PREVIEW_APPS.map(app => (
              <button key={app.id} type="button" className="cp-icon-btn" tabIndex={-1}>
                <div className="cp-icon-square cp-icon-image">
                  <img
                    src={app.src}
                    alt={app.name}
                    width="100%"
                    height="100%"
                    draggable={false}
                    style={{ objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <span className="cp-icon-label">{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        {below.length > 0 && (
          <div className="cpdp-zone">
            {below.map((w, i) => (
              <WidgetRenderer key={w.id || `below-${i}`} widget={w} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
