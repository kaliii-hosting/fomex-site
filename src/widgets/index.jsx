// Palntier widget registry — single source of truth for widget types,
// metadata, default props, and the React components themselves. The admin
// Builder UI imports `WIDGET_TYPES` (palette + settings panel) and
// `WidgetRenderer` (canvas preview). The deployed client template imports
// the same `WidgetRenderer` to render the live site.
//
// Design language (2026-05-07 rewrite): ultra-modern glassmorphism for a
// futuristic white-label dashboard system inspired by Apple CarPlay,
// Apple Vision Pro UI, premium SaaS platforms (Stripe, Linear), and
// modern frosted-glass interfaces. Each widget is self-contained with
// inline styles — no external CSS, no Lucide / icon libraries — so they
// ship unchanged into the deployed template repo.
//
// Adding a new widget type:
//   1. Create a new <WidgetName>.jsx in this directory (inline styles, no
//      external imports beyond React, accept all knobs as props with
//      sensible defaults, transparent / semi-transparent background).
//   2. Append to WIDGET_TYPES below with: { type, label, description,
//      icon (inline svg path), Component, defaultProps, settingsFields }.
//   3. Re-deploy the template repo so the deployed site knows about it.

import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db as palntierDb } from '../lib/firebase.js'

import HeroSection from './HeroSection.jsx'
import FeaturesGrid from './FeaturesGrid.jsx'
import ProductShowcase from './ProductShowcase.jsx'
import ImageGallerySlider from './ImageGallerySlider.jsx'
import TestimonialsReviews from './TestimonialsReviews.jsx'
import ContactForm from './ContactForm.jsx'
import BlogPosts from './BlogPosts.jsx'
import AnalyticsStats from './AnalyticsStats.jsx'
import FooterCompanyInfo from './FooterCompanyInfo.jsx'
import CustomWidget from './CustomWidget.jsx'

// Inline-SVG icon helper so the registry can hand admin-UI icons to the
// Builder palette without depending on lucide-react. Each icon is a tiny
// React component returning a sized <svg/>.
const makeIcon = (path) => function PaletteIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  )
}
const HeroIco       = makeIcon('M3 5h18v8H3zM3 17h12M3 21h18')
const FeaturesIco   = makeIcon('M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z')
const ShopIco       = makeIcon('M3 6l1.5 12h15L21 6zM8 10a4 4 0 008 0')
const GalleryIco    = makeIcon('M3 5h18v14H3zM3 14l5-5 5 5 4-4 4 4')
const QuoteIco      = makeIcon('M7 8c-2 0-3 2-3 4v4h4v-4H6c0-1 0-2 1-2zm10 0c-2 0-3 2-3 4v4h4v-4h-2c0-1 0-2 1-2z')
const ContactIco    = makeIcon('M4 5h16v14H4zM4 7l8 6 8-6')
const BlogIco       = makeIcon('M4 4h12l4 4v12H4zM8 12h8M8 16h6')
const AnalyticsIco  = makeIcon('M3 21v-8m6 8V5m6 16v-12m6 12V9')
const FooterIco     = makeIcon('M3 19h18M3 14h18M3 9h18M3 4h6')
const CustomIco     = makeIcon('M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z')

// settingsFields = a tiny schema the Builder uses to render an edit form.
// Each field: { key, label, type, placeholder?, options? }
//   type ∈ 'text' | 'textarea' | 'url' | 'image' | 'color' | 'select'
// JSON-typed fields (items / sources / kpis / series / images / columns)
// are stringified in the Builder settings panel and parsed back to
// arrays/objects on save.

export const WIDGET_TYPES = [
  {
    type: 'heroSection',
    label: 'Hero section',
    description: 'Full-width glass hero — eyebrow, bold headline, subtitle, two CTAs, optional background image.',
    icon: HeroIco,
    accent: '#7c3aed',
    Component: HeroSection,
    defaultProps: {
      eyebrow: 'New release',
      headline: 'Build faster. Launch sharper.',
      subtitle: 'A modular dashboard system designed for the next generation of premium web experiences.',
      primaryLabel: 'Get started',
      primaryUrl: '#',
      secondaryLabel: 'Watch demo',
      secondaryUrl: '#',
      backgroundImage: '',
      gradientFrom: '#7c3aed',
      gradientTo: '#0ea5e9',
      accent: '#a78bfa',
      textColor: '#ffffff',
      badgeText: 'v2.0 · Live',
    },
    settingsFields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'primaryLabel', label: 'Primary CTA label', type: 'text' },
      { key: 'primaryUrl', label: 'Primary CTA URL', type: 'url' },
      { key: 'secondaryLabel', label: 'Secondary CTA label', type: 'text' },
      { key: 'secondaryUrl', label: 'Secondary CTA URL', type: 'url' },
      { key: 'backgroundImage', label: 'Background image URL', type: 'image' },
      { key: 'gradientFrom', label: 'Gradient — from', type: 'color' },
      { key: 'gradientTo', label: 'Gradient — to', type: 'color' },
      { key: 'accent', label: 'Glow accent', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'badgeText', label: 'Floating badge text', type: 'text' },
    ],
  },
  {
    type: 'featuresGrid',
    label: 'Features grid',
    description: 'Responsive grid of feature cards with glowing icon tiles, titles, and short descriptions.',
    icon: FeaturesIco,
    accent: '#22d3ee',
    Component: FeaturesGrid,
    defaultProps: {
      title: 'Built for premium teams',
      subtitle: 'A composable system designed to scale with your most demanding clients.',
      items: [
        { icon: 'bolt',   title: 'Instant launch',    description: 'Deploy a polished site in minutes — no scaffolding, no setup.', accent: '#f97316' },
        { icon: 'shield', title: 'Locked down',       description: 'Per-tenant isolation, signed previews, and audit-ready logs by default.', accent: '#22d3ee' },
        { icon: 'layers', title: 'Modular by design', description: 'Stack widgets, swap themes, and recompose any client site live.', accent: '#a78bfa' },
      ],
      textColor: '#ffffff',
    },
    settingsFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'items', label: 'Feature items (JSON)', type: 'textarea',
        placeholder: '[{"icon":"bolt","title":"...","description":"...","accent":"#f97316"}]' },
    ],
  },
  {
    type: 'productShowcase',
    label: 'Product showcase',
    description: 'Premium e-commerce strip — glass product cards with image, price, rating, and add-to-cart.',
    icon: ShopIco,
    accent: '#f97316',
    Component: ProductShowcase,
    defaultProps: {
      title: 'Featured drops',
      subtitle: 'New arrivals this week — curated, in stock, ready to ship.',
      ctaLabel: 'View all',
      ctaUrl: '#',
      textColor: '#ffffff',
      items: [
        { id: 'p1', title: 'Aurora Pro',    price: '$249', oldPrice: '$299', rating: 4.8, image: '', accent: '#f97316' },
        { id: 'p2', title: 'Nimbus Air',    price: '$189', rating: 4.6, image: '', accent: '#a78bfa' },
        { id: 'p3', title: 'Halo Edition',  price: '$319', rating: 4.9, image: '', accent: '#22d3ee' },
        { id: 'p4', title: 'Eclipse Mini',  price: '$129', rating: 4.4, image: '', accent: '#ec4899' },
      ],
    },
    settingsFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
      { key: 'ctaUrl', label: 'CTA URL', type: 'url' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'items', label: 'Products (JSON)', type: 'textarea',
        placeholder: '[{"id":"p1","title":"...","price":"$0","rating":4.5,"image":"","accent":"#f97316"}]' },
    ],
  },
  {
    type: 'imageGallerySlider',
    label: 'Image gallery slider',
    description: 'Hero-image showcase with thumbnail strip, glass nav arrows, and caption pill.',
    icon: GalleryIco,
    accent: '#0ea5e9',
    Component: ImageGallerySlider,
    defaultProps: {
      title: 'Selected work',
      subtitle: '',
      activeIndex: 0,
      textColor: '#ffffff',
      images: [
        { id: 'g1', url: '', caption: 'Aurora over the bay',  accent: '#7c3aed' },
        { id: 'g2', url: '', caption: 'Quiet morning light',  accent: '#0ea5e9' },
        { id: 'g3', url: '', caption: 'Studio at dawn',       accent: '#ec4899' },
        { id: 'g4', url: '', caption: 'Skyline reflected',    accent: '#f97316' },
        { id: 'g5', url: '', caption: 'Hand-poured concrete', accent: '#22d3ee' },
      ],
    },
    settingsFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'activeIndex', label: 'Default slide index', type: 'text' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'images', label: 'Images (JSON)', type: 'textarea',
        placeholder: '[{"id":"g1","url":"","caption":"...","accent":"#7c3aed"}]' },
    ],
  },
  {
    type: 'testimonialsReviews',
    label: 'Testimonials & reviews',
    description: 'Soft glass quote cards with avatar, 5-star rating, quote, and name+title.',
    icon: QuoteIco,
    accent: '#ec4899',
    Component: TestimonialsReviews,
    defaultProps: {
      title: 'What teams are saying',
      subtitle: 'Real reviews from operators shipping production-grade work.',
      textColor: '#ffffff',
      items: [
        { id: 't1', name: 'Avery Chen',  title: 'Head of Design, Northwave',   rating: 5, quote: 'The cleanest white-label dashboard system I have shipped. Our clients onboarded in under an hour.', avatar: '', accent: '#a78bfa' },
        { id: 't2', name: 'Marcus Hale', title: 'Founder, Halecraft',          rating: 5, quote: 'Premium feel, modular pieces. We replaced three separate tools with one beautiful surface.', avatar: '', accent: '#22d3ee' },
        { id: 't3', name: 'Priya Anand', title: 'CTO, Stellar Goods',          rating: 4, quote: 'Set up the whole storefront on a Friday afternoon. Looked like a six-month build.', avatar: '', accent: '#f97316' },
      ],
    },
    settingsFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'items', label: 'Testimonials (JSON)', type: 'textarea',
        placeholder: '[{"id":"t1","name":"...","title":"...","rating":5,"quote":"...","avatar":"","accent":"#a78bfa"}]' },
    ],
  },
  {
    type: 'contactForm',
    label: 'Contact form',
    description: 'Frosted glass contact panel — name, email, message, gradient submit. mailto fallback.',
    icon: ContactIco,
    accent: '#10b981',
    Component: ContactForm,
    defaultProps: {
      title: 'Start a conversation',
      subtitle: 'Tell us about the project — we usually reply the same day.',
      emailTo: 'hello@example.com',
      submitUrl: '',
      submitLabel: 'Send message',
      accent: '#7c3aed',
      textColor: '#ffffff',
      successMessage: 'Thanks — we got it. We will be in touch shortly.',
    },
    settingsFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'emailTo', label: 'Recipient email (mailto fallback)', type: 'text', placeholder: 'hello@example.com' },
      { key: 'submitUrl', label: 'Submit URL (optional POST endpoint)', type: 'url' },
      { key: 'submitLabel', label: 'Submit button label', type: 'text' },
      { key: 'accent', label: 'Accent / gradient start', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'successMessage', label: 'Success message', type: 'text' },
    ],
  },
  {
    type: 'blogPosts',
    label: 'Blog / news posts',
    description: 'Editorial 3-up grid of article cards with thumbnail, category pill, title, date.',
    icon: BlogIco,
    accent: '#3b82f6',
    Component: BlogPosts,
    defaultProps: {
      title: 'Latest from the team',
      subtitle: 'Field notes, deep dives, and product changelog highlights.',
      textColor: '#ffffff',
      items: [
        { id: 'b1', category: 'Design',      title: 'Designing for the next decade of dashboards',     date: 'May 2026', minutes: 6, thumb: '', accent: '#a78bfa', url: '#' },
        { id: 'b2', category: 'Engineering', title: 'How we shipped 200 client sites in one quarter',  date: 'Apr 2026', minutes: 4, thumb: '', accent: '#22d3ee', url: '#' },
        { id: 'b3', category: 'Product',     title: 'A modular widget system, explained',              date: 'Mar 2026', minutes: 5, thumb: '', accent: '#f97316', url: '#' },
      ],
    },
    settingsFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'items', label: 'Posts (JSON)', type: 'textarea',
        placeholder: '[{"id":"b1","category":"...","title":"...","date":"...","minutes":5,"thumb":"","accent":"#a78bfa","url":"#"}]' },
    ],
  },
  {
    type: 'analyticsStats',
    label: 'Analytics / business stats',
    description: 'Futuristic data viz — KPI tiles, neon sparkline, and traffic-source breakdown.',
    icon: AnalyticsIco,
    accent: '#06b6d4',
    Component: AnalyticsStats,
    defaultProps: {
      title: 'Live overview',
      subtitle: 'Last 30 days · auto-refreshed',
      accent: '#22d3ee',
      textColor: '#ffffff',
      kpis: [
        { id: 'k1', label: 'Visitors',    value: '24.8K', change: '+12.4%', up: true,  accent: '#22d3ee' },
        { id: 'k2', label: 'Revenue',     value: '$182K', change: '+8.1%',  up: true,  accent: '#a78bfa' },
        { id: 'k3', label: 'Conversion',  value: '3.42%', change: '-0.6%',  up: false, accent: '#f97316' },
        { id: 'k4', label: 'Avg session', value: '4m 21s',change: '+19s',   up: true,  accent: '#ec4899' },
      ],
      series: [12, 18, 14, 22, 28, 24, 30, 34, 31, 38, 42, 40, 46, 52],
      sources: [
        { label: 'Direct',   pct: 38, color: '#a78bfa' },
        { label: 'Search',   pct: 28, color: '#22d3ee' },
        { label: 'Social',   pct: 18, color: '#ec4899' },
        { label: 'Referral', pct: 11, color: '#f97316' },
        { label: 'Other',    pct: 5,  color: '#10b981' },
      ],
    },
    settingsFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'accent', label: 'Sparkline accent', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'kpis', label: 'KPIs (JSON)', type: 'textarea',
        placeholder: '[{"id":"k1","label":"Visitors","value":"24.8K","change":"+12%","up":true,"accent":"#22d3ee"}]' },
      { key: 'series', label: 'Sparkline series (JSON array)', type: 'textarea', placeholder: '[12, 18, 14, ...]' },
      { key: 'sources', label: 'Traffic sources (JSON)', type: 'textarea',
        placeholder: '[{"label":"Direct","pct":38,"color":"#a78bfa"}]' },
    ],
  },
  {
    type: 'footerCompanyInfo',
    label: 'Footer / company info',
    description: 'Multi-column dark-glass footer — brand, link columns, newsletter signup, social icons.',
    icon: FooterIco,
    accent: '#8b5cf6',
    Component: FooterCompanyInfo,
    defaultProps: {
      brand: 'Palntier',
      tagline: 'A composable platform for premium white-label dashboards. Built for teams that ship.',
      columns: [
        { id: 'c1', heading: 'Product',  links: [
          { label: 'Overview',     url: '#' },
          { label: 'Features',     url: '#' },
          { label: 'Integrations', url: '#' },
          { label: 'Changelog',    url: '#' },
        ] },
        { id: 'c2', heading: 'Company',  links: [
          { label: 'About',     url: '#' },
          { label: 'Customers', url: '#' },
          { label: 'Careers',   url: '#' },
          { label: 'Press',     url: '#' },
        ] },
        { id: 'c3', heading: 'Resources', links: [
          { label: 'Docs',     url: '#' },
          { label: 'Guides',   url: '#' },
          { label: 'Status',   url: '#' },
          { label: 'Contact',  url: '#' },
        ] },
      ],
      newsletterTitle: 'Join the changelog',
      newsletterSubtitle: 'Monthly notes, no spam. Unsubscribe anytime.',
      newsletterPlaceholder: 'you@company.com',
      newsletterSubmit: 'Subscribe',
      socials: ['x', 'github', 'linkedin', 'instagram'],
      copyright: '© 2026 Palntier. All rights reserved.',
      textColor: '#ffffff',
      accent: '#a78bfa',
    },
    settingsFields: [
      { key: 'brand', label: 'Brand name', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'textarea' },
      { key: 'newsletterTitle', label: 'Newsletter title', type: 'text' },
      { key: 'newsletterSubtitle', label: 'Newsletter subtitle', type: 'text' },
      { key: 'newsletterPlaceholder', label: 'Email placeholder', type: 'text' },
      { key: 'newsletterSubmit', label: 'Newsletter button', type: 'text' },
      { key: 'copyright', label: 'Copyright', type: 'text' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'accent', label: 'Accent', type: 'color' },
      { key: 'columns', label: 'Link columns (JSON)', type: 'textarea',
        placeholder: '[{"id":"c1","heading":"Product","links":[{"label":"...","url":"#"}]}]' },
      { key: 'socials', label: 'Socials (JSON array)', type: 'textarea',
        placeholder: '["x","github","linkedin","instagram","youtube"]' },
    ],
  },
  {
    type: 'customWidget',
    label: 'Custom widget',
    description: 'Admin-composed block — structured form fields (headline / subtitle / bullets / image / CTAs) over a glass / color / gradient / image / video background. Flip "Needs functionality" to drop a code stub into the client repo for a developer to wire up real behaviour.',
    icon: CustomIco,
    accent: '#fbbf24',
    Component: CustomWidget,
    defaultProps: {
      name: 'New custom widget',
      eyebrow: 'Section',
      headline: 'A custom block, your way',
      subtitle: 'Edit this widget in the Builder to change the headline, copy, list items, image, and call-to-action buttons. No HTML required.',
      bullets: [
        'Edit any field in the Builder modal',
        'Pick a background (glass / image / video / gradient)',
        'Toggle "Needs functionality" to push a code stub',
      ],
      imageUrl: '',
      imagePosition: 'right',
      primaryLabel: 'Get started',
      primaryUrl: '#',
      secondaryLabel: 'Learn more',
      secondaryUrl: '#',
      backgroundType: 'glass',
      backgroundColor: '#0a0a0a',
      gradientFrom: '#7c3aed',
      gradientTo: '#0ea5e9',
      backgroundImage: '',
      backgroundVideo: '',
      videoPoster: '',
      textColor: '#ffffff',
      accent: '#a78bfa',
      align: 'left',
      padding: 32,
      minHeight: 220,
      needsFunctionality: false,
      functionalityNote: 'Interactive form / API call / dynamic data',
      pushedAt: '',
      pushedUrl: '',
    },
    settingsFields: [
      { key: 'name', label: 'Widget name (internal)', type: 'text', placeholder: 'Custom widget' },
      { key: 'eyebrow', label: 'Eyebrow (small uppercase pill)', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'subtitle', label: 'Subtitle / body paragraph', type: 'textarea' },
      { key: 'bullets', label: 'Bullet points', type: 'textarea',
        placeholder: '["First feature", "Second feature", "Third feature"]' },
      { key: 'primaryLabel', label: 'Primary CTA label', type: 'text', placeholder: 'Get started' },
      { key: 'primaryUrl', label: 'Primary CTA URL', type: 'url' },
      { key: 'secondaryLabel', label: 'Secondary CTA label', type: 'text', placeholder: 'Learn more' },
      { key: 'secondaryUrl', label: 'Secondary CTA URL', type: 'url' },
      { key: 'imageUrl', label: 'Inline image URL', type: 'image' },
      { key: 'imagePosition', label: 'Image position', type: 'select', options: [
        { value: 'right',  label: 'Right of text' },
        { value: 'left',   label: 'Left of text' },
        { value: 'top',    label: 'Above text' },
        { value: 'bottom', label: 'Below text' },
        { value: 'none',   label: 'Hide image' },
      ]},
      { key: 'align', label: 'Text alignment', type: 'select', options: [
        { value: 'left',   label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right',  label: 'Right' },
      ]},
      { key: 'backgroundType', label: 'Background type', type: 'select', options: [
        { value: 'glass',    label: 'Glass (semi-transparent + blur)' },
        { value: 'color',    label: 'Solid color' },
        { value: 'gradient', label: 'Gradient' },
        { value: 'image',    label: 'Image' },
        { value: 'video',    label: 'Video' },
        { value: 'none',     label: 'None (fully transparent)' },
      ]},
      { key: 'backgroundColor', label: 'Background color (if Solid color)', type: 'color' },
      { key: 'gradientFrom', label: 'Gradient — from', type: 'color' },
      { key: 'gradientTo', label: 'Gradient — to', type: 'color' },
      { key: 'backgroundImage', label: 'Background image URL (if Image)', type: 'image' },
      { key: 'backgroundVideo', label: 'Background video URL (if Video)', type: 'url',
        placeholder: 'https://.../video.mp4' },
      { key: 'videoPoster', label: 'Video poster image URL (optional)', type: 'image' },
      { key: 'accent', label: 'Accent colour (bullets + glow)', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'needsFunctionality', label: 'Needs functionality (form / JS / API) — switches to placeholder + enables Push to GitHub', type: 'select', options: [
        { value: '',    label: 'No · design-only' },
        { value: 'yes', label: 'Yes · show placeholder + enable Push to GitHub' },
      ]},
      { key: 'functionalityNote', label: 'Functionality note (shown on placeholder + saved into the stub)', type: 'textarea',
        placeholder: 'What does this widget need to do?' },
    ],
  },
]

// Map type → entry for fast lookup.
export const WIDGET_BY_TYPE = Object.fromEntries(WIDGET_TYPES.map(w => [w.type, w]))

// Live subscription to the admin Widgets-page activation doc. The Widgets
// page (admin-only) writes a `disabled` array of widget-type strings; the
// Builder palette uses this hook to drop deactivated types so admins can
// pause a widget globally without re-deploying client repos. Returns the
// filtered WIDGET_TYPES list and the raw disabled-set for UI badges.
//
// Schema:  adminSettings/widgets = { disabled: ['heroSection', ...], updatedAt, updatedBy }
export function useEnabledWidgetTypes() {
  const [disabled, setDisabled] = useState(() => new Set())
  useEffect(() => {
    const ref = doc(palntierDb, 'adminSettings', 'widgets')
    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.exists() ? snap.data() : null
      const list = Array.isArray(data?.disabled) ? data.disabled : []
      setDisabled(new Set(list))
    }, (err) => {
      console.warn('[widgets] adminSettings/widgets listen error:', err?.code || err?.message)
    })
    return unsub
  }, [])
  const enabledTypes = WIDGET_TYPES.filter(w => !disabled.has(w.type))
  return { enabledTypes, disabled }
}

// JSON-typed prop keys that the Builder + WidgetsApp settings panels store
// as strings in the textarea but which the runtime widgets expect as real
// arrays/objects. Listed centrally so any consumer that converts settings-
// form values can match the same set without each call site re-deriving it.
export const JSON_PROP_KEYS = new Set([
  'items', 'images', 'columns', 'sources', 'kpis', 'series', 'socials',
  'bullets',
])

// WidgetRenderer — given a widget config object `{ id, type, props }`,
// looks up the component and renders it. Unknown types render a tiny
// "(unknown widget)" placeholder so the deployed site never crashes when
// a new widget type lands in Firestore before the template repo has been
// re-deployed.
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

// SiteRenderer — used by the deployed template to render an entire client
// site. Reads `widgets.above` and `widgets.below` arrays from the client
// config and renders them around whatever the template's main content is
// (passed as `children`). Empty arrays = nothing rendered. Wraps the items
// in a column-flex container with consistent spacing so widgets stack
// cleanly without each one needing its own outer margin.
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
