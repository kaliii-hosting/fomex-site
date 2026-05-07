// Palntier widget registry — single source of truth for widget types,
// metadata, default props, and the React components themselves. The admin
// Builder UI imports `WIDGET_TYPES` (palette + settings panel) and
// `WidgetRenderer` (canvas preview). The deployed client template imports
// the same `WidgetRenderer` to render the live site.
//
// Design language: iOS Home-Screen / Wells-Fargo-app-style cards. Rounded
// 22px corners, soft shadows, tabular-num values, tinted icon tiles. Each
// widget is a self-contained card with inline styles and no external CSS,
// so it ships unchanged into the deployed template repo.
//
// Adding a new widget type:
//   1. Create a new <WidgetName>.jsx in this directory (inline styles, no
//      external CSS, accept all knobs as props with sensible defaults).
//   2. Append to WIDGET_TYPES below with: { type, label, description,
//      icon (Lucide), Component, defaultProps, settingsFields }.
//   3. Re-deploy the template repo so the deployed site knows about it.

import {
  Wallet, Grid3x3, ListChecks, TrendingUp, Sparkles, Target,
} from 'lucide-react'
import Balance from './Balance.jsx'
import QuickActions from './QuickActions.jsx'
import ActivityList from './ActivityList.jsx'
import StatTrend from './StatTrend.jsx'
import Promo from './Promo.jsx'
import GoalProgress from './GoalProgress.jsx'

// settingsFields = a tiny schema the Builder uses to render an edit form.
// Each field: { key, label, type, placeholder?, options? }
//   type ∈ 'text' | 'textarea' | 'url' | 'image' | 'color' | 'select'
// JSON-typed fields (items / sparkline) are stringified in the Builder
// settings panel and parsed back to arrays/objects on save.

export const WIDGET_TYPES = [
  {
    type: 'balance',
    label: 'Balance',
    description: 'Big-number account balance with delta and primary CTA.',
    icon: Wallet,
    accent: '#C8102E',
    Component: Balance,
    defaultProps: {
      label: 'Available balance',
      amount: '$12,480.55',
      change: '+$340 today',
      changeDirection: 'up',
      accountMeta: '••• 4582 · Checking',
      ctaLabel: 'Transfer',
      ctaUrl: '#',
      background: '#ffffff',
      textColor: '#15171a',
      accent: '#C8102E',
    },
    settingsFields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'amount', label: 'Amount', type: 'text' },
      { key: 'change', label: 'Change line', type: 'text' },
      { key: 'changeDirection', label: 'Direction', type: 'select', options: [
        { value: 'up', label: 'Up (green)' },
        { value: 'down', label: 'Down (red)' },
      ] },
      { key: 'accountMeta', label: 'Account meta', type: 'text' },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
      { key: 'ctaUrl', label: 'CTA URL', type: 'url' },
      { key: 'background', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'accent', label: 'Accent color', type: 'color' },
    ],
  },
  {
    type: 'quickActions',
    label: 'Quick actions',
    description: '4-tile colored shortcut grid (Pay / Transfer / Deposit / More).',
    icon: Grid3x3,
    accent: '#0F62A6',
    Component: QuickActions,
    defaultProps: {
      title: 'Quick actions',
      items: [
        { emoji: '↗',  label: 'Transfer', color: '#0F62A6', href: '#' },
        { emoji: '＋', label: 'Deposit',  color: '#1f7a3f', href: '#' },
        { emoji: '⚡', label: 'Pay',      color: '#A05B00', href: '#' },
        { emoji: '⋯',  label: 'More',     color: '#3c3f44', href: '#' },
      ],
      background: '#ffffff',
      textColor: '#15171a',
    },
    settingsFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'background', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'items', label: 'Items (JSON)', type: 'textarea',
        placeholder: '[{"emoji":"↗","label":"Transfer","color":"#0F62A6","href":"#"}]' },
    ],
  },
  {
    type: 'activityList',
    label: 'Activity list',
    description: 'iOS-list of recent transactions / orders / events.',
    icon: ListChecks,
    accent: '#1f7a3f',
    Component: ActivityList,
    defaultProps: {
      title: 'Recent activity',
      items: [
        { emoji: '☕', label: 'Blue Bottle Coffee',  meta: 'Today',     amount: '−$6.25',  amountTone: 'debit' },
        { emoji: '🚖', label: 'Uber',                meta: 'Yesterday', amount: '−$24.10', amountTone: 'debit' },
        { emoji: '💼', label: 'Payroll deposit',     meta: 'Mar 1',     amount: '+$3,200', amountTone: 'credit' },
        { emoji: '🎬', label: 'Netflix',             meta: 'Feb 28',    amount: '−$15.99', amountTone: 'debit' },
      ],
      ctaLabel: 'See all',
      ctaUrl: '#',
      background: '#ffffff',
      textColor: '#15171a',
    },
    settingsFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
      { key: 'ctaUrl', label: 'CTA URL', type: 'url' },
      { key: 'background', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'items', label: 'Items (JSON)', type: 'textarea',
        placeholder: '[{"emoji":"☕","label":"Coffee","meta":"Today","amount":"−$6.25","amountTone":"debit"}]' },
    ],
  },
  {
    type: 'statTrend',
    label: 'Stat trend',
    description: 'Single metric + sparkline + delta pill.',
    icon: TrendingUp,
    accent: '#7c3aed',
    Component: StatTrend,
    defaultProps: {
      label: "Today's sales",
      value: '$1,240',
      change: '+12%',
      changeDirection: 'up',
      sparkline: [4, 6, 5, 8, 7, 11, 13],
      background: '#ffffff',
      textColor: '#15171a',
      accent: '#1f7a3f',
    },
    settingsFields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'value', label: 'Value', type: 'text' },
      { key: 'change', label: 'Change pill', type: 'text' },
      { key: 'changeDirection', label: 'Direction', type: 'select', options: [
        { value: 'up', label: 'Up (green)' },
        { value: 'down', label: 'Down (red)' },
      ] },
      { key: 'background', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'accent', label: 'Accent', type: 'color' },
      { key: 'sparkline', label: 'Sparkline (JSON array)', type: 'textarea',
        placeholder: '[4,6,5,8,7,11,13]' },
    ],
  },
  {
    type: 'promo',
    label: 'Promo',
    description: 'Featured offer card with optional background image + pill CTA.',
    icon: Sparkles,
    accent: '#A05B00',
    Component: Promo,
    defaultProps: {
      eyebrow: 'Limited offer',
      headline: 'Earn 5% back this quarter',
      body: 'Activate the bonus category before the period ends.',
      ctaLabel: 'Activate',
      ctaUrl: '#',
      backgroundImage: '',
      background: '#0F62A6',
      textColor: '#ffffff',
      accent: '#FFCD41',
    },
    settingsFields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'body', label: 'Body', type: 'textarea' },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
      { key: 'ctaUrl', label: 'CTA URL', type: 'url' },
      { key: 'backgroundImage', label: 'Background image URL', type: 'image' },
      { key: 'background', label: 'Background color (no image)', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'accent', label: 'Eyebrow accent', type: 'color' },
    ],
  },
  {
    type: 'goalProgress',
    label: 'Goal progress',
    description: 'Progress bar widget — current vs target with % pill.',
    icon: Target,
    accent: '#0F62A6',
    Component: GoalProgress,
    defaultProps: {
      label: 'Savings goal',
      title: 'New laptop',
      current: '$1,420',
      target: '$2,000',
      percent: 71,
      caption: 'On track to hit your goal by Apr 30.',
      background: '#ffffff',
      textColor: '#15171a',
      accent: '#0F62A6',
    },
    settingsFields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'current', label: 'Current', type: 'text' },
      { key: 'target', label: 'Target', type: 'text' },
      { key: 'percent', label: 'Percent (0–100)', type: 'text' },
      { key: 'caption', label: 'Caption', type: 'text' },
      { key: 'background', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text color', type: 'color' },
      { key: 'accent', label: 'Accent', type: 'color' },
    ],
  },
]

// Map type → entry for fast lookup.
export const WIDGET_BY_TYPE = Object.fromEntries(WIDGET_TYPES.map(w => [w.type, w]))

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
        color: '#888',
        textAlign: 'center',
        background: '#f4f4f4',
        border: '1px dashed #ccc',
        borderRadius: 12,
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 14 }}>
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
