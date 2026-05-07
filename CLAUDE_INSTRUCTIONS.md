# Claude Code Customization Guide

This is a Palntier client website template. All connections (Shopify, Firebase, branding)
are pre-wired via environment variables in `src/config/site.config.js`.

## Files to CUSTOMIZE (these are your focus)

### Brand & Design
- `index.html` — Update `<title>`, meta description, Google Fonts
- `src/styles/theme.css` — Brand colors, dark/light mode, typography
- `src/styles/globals.css` — Only if you need new CSS variables

### Pages (content & layout)
- `src/pages/HomePage.jsx` — Hero section, featured products, brand story
- `src/pages/AboutPage.jsx` — Company story, team, mission
- `src/pages/ContactPage.jsx` — Contact info, location, hours

### Layout
- `src/components/layout/Header.jsx` — Logo, navigation links, brand styling
- `src/components/layout/Footer.jsx` — Company info, social links, legal

## Files to NEVER modify (auto-configured from env vars)
- `src/config/site.config.js` — Reads env vars, never hardcode values
- `src/lib/shopify.js` — Works with any Shopify store
- `src/lib/firebase.js` — Initializes from config
- `netlify.toml` — Standard SPA config
- `package.json` — Dependencies are set

## Prompt Template
```
Build a [industry] e-commerce website for [Client Name]. They sell [products]
through Shopify. Brand colors: [primary], [accent]. Style: [modern/rustic/minimal].
Shopify and Firebase are connected via environment variables (see site.config.js).
DO NOT hardcode any API keys or store domains.
Focus on: HomePage hero, product display, About page, and brand-consistent design.
```
