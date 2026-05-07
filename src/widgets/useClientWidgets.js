// useClientWidgets — anonymous live subscription to this client's widget
// config. Used by HomePage (and any other page) to render widgets composed
// in the Palntier Builder.
//
// Data path: siteWidgets/{VITE_CLIENT_ID}
//   - Public-readable Firestore collection (no auth required for visitors)
//   - Admin-only write via the Builder UI
//   - Schema: { above: [...], below: [...], updatedAt: ISO string }
//
// Why a separate collection from clients/{slug}: visitors browsing a
// deployed client site are unauthenticated — clients/{slug} can't be
// publicly-readable because it carries private fields (admin emails,
// telnyx passwords, shopify storefront tokens). Field-level read rules
// don't exist in Firestore, so a separate publicly-readable collection
// is the only way to expose widget config without leaking the rest.
//
// onSnapshot delivers admin saves to the live site within seconds — no
// rebuild required for content edits (the whole point of the
// architecture).

import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { siteConfig } from '../config/site.config'

export function useClientWidgets() {
  const [widgets, setWidgets] = useState({ above: [], below: [], loading: true })

  useEffect(() => {
    if (!db || !siteConfig.clientId) {
      setWidgets({ above: [], below: [], loading: false })
      return
    }
    const ref = doc(db, 'siteWidgets', siteConfig.clientId)
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.exists() ? (snap.data() || {}) : {}
        setWidgets({
          above: Array.isArray(data.above) ? data.above : [],
          below: Array.isArray(data.below) ? data.below : [],
          loading: false,
        })
      },
      (err) => {
        if (typeof console !== 'undefined') {
          console.warn('[widgets] subscription error:', err && err.message ? err.message : err)
        }
        setWidgets({ above: [], below: [], loading: false })
      }
    )
    return unsub
  }, [])

  return widgets
}
