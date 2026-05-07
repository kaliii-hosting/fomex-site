import { siteConfig } from '../../config/site.config'

// CUSTOMIZE: Update company info, social links, legal text
export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 20px', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--fg)', margin: '0 0 8px' }}>{siteConfig.siteName}</h3>
          <p style={{ color: 'var(--fg-muted)', fontSize: 14, margin: 0, maxWidth: 300 }}>
            {siteConfig.siteDescription || 'Quality products for our customers.'}
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1 }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="/shop" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: 14 }}>Shop</a>
            <a href="/about" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: 14 }}>About</a>
            <a href="/contact" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: 14 }}>Contact</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '32px auto 0', paddingTop: 20, borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--fg-muted)', fontSize: 13 }}>
        &copy; {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.
      </div>
    </footer>
  )
}
