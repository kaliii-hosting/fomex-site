import { useClientWidgets } from '../widgets/useClientWidgets'
import CarPlayDashboard from '../components/CarPlayDashboard'

// HomePage — the entire deployed site is a CarPlay-style dashboard. The
// admin Builder composes widgets in two zones (above / below the app
// icon grid); we render that exact layout via <CarPlayDashboard/>, so
// what the admin sees in the Builder preview is what visitors see live.
//
// Widget config is loaded via useClientWidgets() which subscribes to
// siteWidgets/{VITE_CLIENT_ID} on Firestore. Admin saves land within
// seconds — no rebuild needed for content edits. v1 ships a hardcoded
// app dock + grid; per-client icon customisation is a follow-up.

export default function HomePage() {
  const widgets = useClientWidgets()
  const above = Array.isArray(widgets?.above) ? widgets.above : []
  const below = Array.isArray(widgets?.below) ? widgets.below : []

  if (widgets?.loading) {
    return <div style={loadingStyle} aria-label="Loading…" />
  }

  // Brand-new clients (admin hasn't composed anything yet) still get the
  // dashboard frame — the dock + app grid look intentional, and the empty
  // zones simply collapse. No separate "Site is being set up" screen
  // needed any more; the dashboard IS the placeholder.
  return <CarPlayDashboard above={above} below={below} />
}

const loadingStyle = {
  minHeight: '100vh',
  background: '#0a0a0a',
}
