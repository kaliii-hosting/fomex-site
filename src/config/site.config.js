// Central config — reads ALL values from VITE_ environment variables.
// NEVER hardcode credentials here. Set them via Netlify env vars.
export const siteConfig = {
  clientId: import.meta.env.VITE_CLIENT_ID || '',
  siteName: import.meta.env.VITE_SITE_NAME || 'My Store',
  siteDescription: import.meta.env.VITE_SITE_DESCRIPTION || '',

  shopify: {
    domain: import.meta.env.VITE_SHOPIFY_DOMAIN || '',
    storefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
    apiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10',
  },

  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    tenantId: import.meta.env.VITE_FIREBASE_TENANT_ID || '',
    databaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || '',
  },

  palntier: {
    url: import.meta.env.VITE_PALNTIER_URL || 'https://palntier.netlify.app',
  },

  brand: {
    primary: import.meta.env.VITE_BRAND_PRIMARY || '#22c55e',
    accent: import.meta.env.VITE_BRAND_ACCENT || '#8b5cf6',
  },

  websiteType: import.meta.env.VITE_WEBSITE_TYPE || '',
  featureCount: import.meta.env.VITE_FEATURE_COUNT || '0',
}
