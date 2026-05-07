import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { siteConfig } from '../config/site.config'

const app = siteConfig.firebase.projectId
  ? initializeApp(siteConfig.firebase)
  : null

export const auth = app ? getAuth(app) : null

// Scope all auth operations to this client's tenant (Identity Platform)
// Users created/signed-in under this tenant are isolated from other clients
if (auth && siteConfig.firebase.tenantId) {
  auth.tenantId = siteConfig.firebase.tenantId
}

// Use named database if configured (per-client isolation), otherwise default
export const db = app
  ? (siteConfig.firebase.databaseId
      ? getFirestore(app, siteConfig.firebase.databaseId)
      : getFirestore(app))
  : null

export const storage = app ? getStorage(app) : null
export default app
