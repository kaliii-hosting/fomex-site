// Palntier widget registry — deployed-template twin of the admin's
// src/widgets/index.jsx. Same widget components, same defaults, same
// `WidgetRenderer` contract — keep this file in sync with the admin
// repo so any widget the admin Builder composes renders identically on
// the live client site.
//
// What's stripped from the admin version:
//   • The `useEnabledWidgetTypes` Firestore subscription hook —
//     visitors don't read `adminSettings/widgets`. The deployed site
//     just renders whatever is stored in `siteWidgets/{slug}`; the
//     admin-side activation toggle only filters the Builder palette,
//     never affects what visitors see.
//   • The lucide-react palette icons — only relevant for the admin's
//     Widgets app catalogue. Template doesn't need them.

import HeroSection from './HeroSection.jsx'
import FeaturesGrid from './FeaturesGrid.jsx'
import ProductShowcase from './ProductShowcase.jsx'
import ImageGallerySlider from './ImageGallerySlider.jsx'
import TestimonialsReviews from './TestimonialsReviews.jsx'
import ContactForm from './ContactForm.jsx'
import BlogPosts from './BlogPosts.jsx'
import AnalyticsStats from './AnalyticsStats.jsx'
import FooterCompanyInfo from './FooterCompanyInfo.jsx'

export const WIDGET_TYPES = [
  { type: 'heroSection',         Component: HeroSection,         defaultProps: {} },
  { type: 'featuresGrid',        Component: FeaturesGrid,        defaultProps: {} },
  { type: 'productShowcase',     Component: ProductShowcase,     defaultProps: {} },
  { type: 'imageGallerySlider',  Component: ImageGallerySlider,  defaultProps: {} },
  { type: 'testimonialsReviews', Component: TestimonialsReviews, defaultProps: {} },
  { type: 'contactForm',         Component: ContactForm,         defaultProps: {} },
  { type: 'blogPosts',           Component: BlogPosts,           defaultProps: {} },
  { type: 'analyticsStats',      Component: AnalyticsStats,      defaultProps: {} },
  { type: 'footerCompanyInfo',   Component: FooterCompanyInfo,   defaultProps: {} },
]

export const WIDGET_BY_TYPE = Object.fromEntries(WIDGET_TYPES.map(w => [w.type, w]))

// WidgetRenderer — given `{ id, type, props }`, looks up the component
// and renders it. Unknown types render a soft glass placeholder so the
// deployed site never crashes when a brand-new widget type lands in
// Firestore before the template repo has been re-deployed.
export function WidgetRenderer({ widget }) {
  if (!widget?.type) return null
  const entry = WIDGET_BY_TYPE[widget.type]
  if (!entry) {
    return (
      <div style={{
        padding: 16,
        fontSize: 12,
        color: 'rgba(255,255,255,0.55)',
        textAlign: 'center',
        background: 'rgba(255,255,255,0.04)',
        border: '1px dashed rgba(255,255,255,0.18)',
        borderRadius: 16,
        backdropFilter: 'blur(20px)',
      }}>
        (unknown widget type: <code>{widget.type}</code>)
      </div>
    )
  }
  const { Component, defaultProps } = entry
  return <Component {...defaultProps} {...(widget.props || {})} />
}

// SiteRenderer — used by HomePage.jsx (and any other page) to render a
// widget stack. Reads `widgets.above` and `widgets.below` arrays. Wraps
// items in a column-flex container with consistent spacing.
export function SiteRenderer({ widgets, children }) {
  const above = Array.isArray(widgets?.above) ? widgets.above : []
  const below = Array.isArray(widgets?.below) ? widgets.below : []
  const stack = (arr, prefix) => (
    arr.length === 0 ? null : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: 18 }}>
        {arr.map((w, i) => <WidgetRenderer key={w.id || `${prefix}-${i}`} widget={w} />)}
      </div>
    )
  )
  return (
    <>
      {stack(above, 'above')}
      {children}
      {stack(below, 'below')}
    </>
  )
}
